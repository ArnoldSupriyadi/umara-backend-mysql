<?php

namespace App\Filament\Resources\Applicants\Tables;

use App\Exports\ApplicantsExport;
use App\Mail\ApplicantAcceptedMail;
use App\Models\Applicant;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup as ActionsBulkActionGroup;
use Filament\Actions\DeleteBulkAction as ActionsDeleteBulkAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\HtmlString;
use Maatwebsite\Excel\Facades\Excel;

class ApplicantsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // ============================================================
                // FOTO COLUMN
                // Format DB: "data:image/png;base64,..." (HRIS-style, prefix
                // sudah include). Pakai $state langsung tanpa prepend prefix.
                // ============================================================
                TextColumn::make('photo_path')
                    ->label('Foto')
                    ->html()
                    ->formatStateUsing(fn ($state) => $state
                        ? '<img src="' . $state . '" '
                            . 'style="width:40px;height:40px;border-radius:50%;'
                            . 'object-fit:cover;border:1px solid #e5e7eb;" '
                            . 'alt="Foto Pelamar" />'
                        : '<div style="width:40px;height:40px;border-radius:50%;'
                            . 'background:#e5e7eb;display:flex;align-items:center;'
                            . 'justify-content:center;color:#9ca3af;font-size:10px;">'
                            . 'N/A</div>'
                    ),

                TextColumn::make('name')
                    ->label('Nama Pelamar')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('career.job_title')
                    ->label('Posisi Dilamar')
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->whereHas('career', fn ($q) =>
                            $q->where('job_title', 'like', "%{$search}%")
                        );
                    })
                    ->sortable()
                    ->badge()
                    ->color('info'),

                // ============================================================
                // STATUS COLUMN - Badge dengan warna sesuai state
                // Searchable: support keyword Indonesia (diterima/ditolak/pending)
                // dan keyword English (accepted/rejected/pending)
                // ============================================================
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        Applicant::STATUS_PENDING  => 'warning',
                        Applicant::STATUS_ACCEPTED => 'success',
                        Applicant::STATUS_REJECTED => 'danger',
                        default                    => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string =>
                        Applicant::STATUSES[$state] ?? $state
                    )
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        // Mapping keyword (ID & EN) → nilai status di DB
                        $keywordMap = [
                            'pending'  => Applicant::STATUS_PENDING,
                            'menunggu' => Applicant::STATUS_PENDING,

                            'accepted' => Applicant::STATUS_ACCEPTED,
                            'accept'   => Applicant::STATUS_ACCEPTED,
                            'diterima' => Applicant::STATUS_ACCEPTED,
                            'terima'   => Applicant::STATUS_ACCEPTED,

                            'rejected' => Applicant::STATUS_REJECTED,
                            'reject'   => Applicant::STATUS_REJECTED,
                            'ditolak'  => Applicant::STATUS_REJECTED,
                            'tolak'    => Applicant::STATUS_REJECTED,
                        ];

                        $searchLower = strtolower(trim($search));
                        $matched     = [];

                        foreach ($keywordMap as $keyword => $dbValue) {
                            if (str_contains($keyword, $searchLower)) {
                                $matched[] = $dbValue;
                            }
                        }

                        // Kalau tidak match keyword apapun, fallback search literal
                        if (empty($matched)) {
                            return $query->where('status', 'like', "%{$search}%");
                        }

                        return $query->whereIn('status', array_unique($matched));
                    })
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Email disalin!'),

                TextColumn::make('phone')
                    ->label('No. HP')
                    ->searchable(),

                TextColumn::make('date_of_birth')
                    ->label('Tgl Lahir')
                    ->date('d M Y')
                    ->sortable(),

                IconColumn::make('willing_to_relocate')
                    ->label('Bisa Mutasi?')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),

                TextColumn::make('cv_path')
                    ->label('File CV')
                    ->formatStateUsing(fn () => '⬇ Download CV')
                    ->url(fn ($record) => route('applicant.cv.download', $record->id))
                    ->openUrlInNewTab()
                    ->color('primary'),

                TextColumn::make('created_at')
                    ->label('Tanggal Melamar')
                    ->dateTime('d M Y, H:i')
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('career_id')
                    ->label('Posisi')
                    ->relationship('career', 'job_title'),

                SelectFilter::make('status')
                    ->label('Status')
                    ->options(Applicant::STATUSES),
            ])
            // ============================================================
            // RECORD ACTIONS - per row
            // 1. Lihat Foto    → modal preview ukuran besar
            // 2. Download Foto → stream download file WebP
            // 3. Accept        → set status = accepted (hanya muncul jika pending)
            // 4. Reject        → set status = rejected (hanya muncul jika pending)
            //
            // Setelah accept/reject, button dikunci (visible: false) supaya
            // status final dan tidak bisa diubah lagi.
            // ============================================================
            ->recordActions([
                Action::make('viewPhoto')
                    ->label('Lihat Foto')
                    ->icon('heroicon-o-eye')
                    ->color('info')
                    ->modalHeading(fn ($record) => 'Foto Pelamar — ' . $record->name)
                    ->modalContent(fn ($record) => new HtmlString(
                        $record->photo_path
                            ? '<div style="display:flex;justify-content:center;'
                                . 'padding:1rem;background:#f9fafb;border-radius:8px;">'
                                . '<img src="' . $record->photo_path . '" '
                                . 'style="max-width:100%;max-height:70vh;'
                                . 'border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);" '
                                . 'alt="Foto Pelamar" />'
                                . '</div>'
                            : '<div style="text-align:center;padding:2rem;color:#9ca3af;">'
                                . 'Foto tidak tersedia.</div>'
                    ))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Tutup')
                    ->modalWidth('2xl'),

                Action::make('downloadPhoto')
                    ->label('Download Foto')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->action(function ($record) {
                        // Pakai accessor → otomatis strip prefix HRIS + decode
                        $content  = $record->photo_binary;
                        $safeName = str_replace(' ', '_', $record->name);
                        $filename = 'Foto_' . $safeName . '.webp';

                        return response()->streamDownload(
                            fn () => print ($content),
                            $filename,
                            ['Content-Type' => 'image/webp']
                        );
                    }),

                // ============================================================
                // ACCEPT - hanya muncul jika status masih pending
                // Workflow:
                // 1. Update status ke 'accepted'
                // 2. Kirim email biodata form ke email applicant
                // 3. Update email_sent_at jika email berhasil terkirim
                // 4. Tampilkan notifikasi sukses/warning sesuai hasil email
                //
                // Status TETAP berubah meskipun email gagal — supaya HR bisa
                // resend manual nanti tanpa stuck di status pending.
                // ============================================================
                Action::make('accept')
                    ->label('Accept')
                    ->icon('heroicon-o-check-badge')
                    ->color('success')
                    ->visible(fn ($record) => $record->status === Applicant::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->modalIcon('heroicon-o-check-badge')
                    ->modalIconColor('success')
                    ->modalHeading('Terima Pelamar & Kirim Email?')
                    ->modalDescription(fn ($record) =>
                        "Yakin ingin MENERIMA pelamar atas nama \"{$record->name}\"? "
                        . "Email berisi link form biodata akan dikirim ke {$record->email}. "
                        . "Status tidak bisa diubah lagi setelah ini."
                    )
                    ->modalSubmitActionLabel('Ya, Terima & Kirim Email')
                    ->modalCancelActionLabel('Batal')
                    ->action(function ($record) {
                        // 1. Update status terlebih dulu
                        $record->update(['status' => Applicant::STATUS_ACCEPTED]);

                        // 2. Kirim email — wrap try/catch supaya status tetap berubah
                        //    meski email gagal (misal SMTP down, kredensial salah)
                        $biodataFormUrl = config('services.applicants.biodata_form_url');

                        try {
                            Mail::to($record->email)
                                ->send(new ApplicantAcceptedMail($record, $biodataFormUrl));

                            $record->update(['email_sent_at' => now()]);

                            Notification::make()
                                ->title('Pelamar Diterima & Email Terkirim')
                                ->body("Email biodata form berhasil dikirim ke {$record->email}.")
                                ->success()
                                ->send();
                        } catch (\Throwable $e) {
                            Log::error('Gagal kirim email applicant accepted', [
                                'applicant_id' => $record->id,
                                'email'        => $record->email,
                                'error'        => $e->getMessage(),
                            ]);

                            Notification::make()
                                ->title('Pelamar Diterima, Tapi Email GAGAL Terkirim')
                                ->body("Status sudah diubah ke 'Diterima', tapi email ke {$record->email} gagal dikirim. "
                                    . "Cek storage/logs/laravel.log untuk detail.")
                                ->warning()
                                ->persistent()
                                ->send();
                        }
                    }),

                // ============================================================
                // REJECT - hanya muncul jika status masih pending
                // ============================================================
                Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn ($record) => $record->status === Applicant::STATUS_PENDING)
                    ->requiresConfirmation()
                    ->modalIcon('heroicon-o-x-circle')
                    ->modalIconColor('danger')
                    ->modalHeading('Tolak Pelamar?')
                    ->modalDescription(fn ($record) =>
                        "Yakin ingin MENOLAK pelamar atas nama \"{$record->name}\"? "
                        . "Status tidak bisa diubah lagi setelah ini."
                    )
                    ->modalSubmitActionLabel('Ya, Tolak')
                    ->modalCancelActionLabel('Batal')
                    ->action(function ($record) {
                        $record->update(['status' => Applicant::STATUS_REJECTED]);

                        Notification::make()
                            ->title('Pelamar Ditolak')
                            ->body("{$record->name} berhasil ditolak.")
                            ->success()
                            ->send();
                    }),
            ])
            ->toolbarActions([
                Action::make('exportExcel')
                    ->label('Export Excel')
                    ->icon('heroicon-o-document-arrow-down')
                    ->color('success')
                    ->action(fn () => Excel::download(
                        new ApplicantsExport(),
                        'pelamar-' . now()->format('Ymd-His') . '.xlsx'
                    )),

                Action::make('exportCsv')
                    ->label('Export CSV')
                    ->icon('heroicon-o-document-arrow-down')
                    ->color('info')
                    ->action(fn () => Excel::download(
                        new ApplicantsExport(),
                        'pelamar-' . now()->format('Ymd-His') . '.csv',
                        \Maatwebsite\Excel\Excel::CSV,
                    )),

                ActionsBulkActionGroup::make([
                    ActionsDeleteBulkAction::make(),
                ]),
            ]);
    }
}
