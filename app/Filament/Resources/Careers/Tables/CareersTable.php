<?php

namespace App\Filament\Resources\Careers\Tables;

use App\Exports\CareersExport;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Filters\TrashedFilter;
use Maatwebsite\Excel\Facades\Excel;

class CareersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // 1. Kolom Image — tampilkan logo perusahaan jika banner career kosong
                ImageColumn::make('image')
                    ->label('Logo')
                    ->circular()
                    ->disk('r2')
                    ->defaultImageUrl(function ($record) {
                        $logo = $record->businessUnit?->logo;
                        if (!$logo) return null;
                        // logo-path sudah disimpan sebagai full URL di database
                        return str_starts_with($logo, 'http')
                            ? $logo
                            : \Illuminate\Support\Facades\Storage::disk('r2')->url($logo);
                    }),
                // 2. Job Title
                TextColumn::make('job_title')
                    ->label('Posisi')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->sortable(),
                // 3. Unit Bisnis (Dengan warna badge)
                TextColumn::make('businessUnit.name')
                    ->label('Unit Bisnis')
                    ->badge() // Tampil seperti label/tag
                    ->color(fn(string $state): string => match ($state) {
                        'PT Umara Cipta Rasa' => 'warning', // Warna Kuning/Oranye
                        'PT Rasa Nusantara Baru' => 'success', // Warna Hijau
                        default => 'gray',
                    })

                    ->sortable(),
                // 4. Status Aktif (Bisa diklik langsung untuk ON/OFF)
                ToggleColumn::make('is_active')
                    ->label('Status Aktif')
                    ->onColor('success')
                    ->offColor('danger'),
                // 5. Tanggal Dibuat
                TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TrashedFilter::make(),
                // Filter berdasarkan Unit Bisnis
                SelectFilter::make('business_unit_id')
                    ->relationship('businessUnit', 'name')
                    ->label('Filter Unit'),
                // Filter Status Aktif/Tidak
                SelectFilter::make('is_active')
                    ->label('Status Aktif')
                    ->options([
                        '1' => 'Aktif',
                        '0' => 'Tidak Aktif',
                    ]),
            ])

            ->recordActions([
                EditAction::make(),
                DeleteAction::make(), // Tombol hapus satuan
                \Filament\Actions\ViewAction::make()
                    ->label('Lihat Detail')
                    ->modalHeading('Detail Lowongan Kerja')
                    ->modalWidth('4xl') // '4xl' atau '7xl' direkomendasikan karena deskripsi Anda panjang
                    ->infolist([
                        Section::make('Informasi Lowongan')
                            ->schema([
                                TextEntry::make('job_title')
                                    ->label('Posisi')
                                    ->weight('bold'),

                                TextEntry::make('description')
                                    ->label('Deskripsi & Kualifikasi')
                                    // --- INI BAGIAN PENTING ---
                                    ->html() // Ini akan merender <h3>, <ul>, dan <li> Anda dengan benar
                                    ->columnSpanFull(),
                            ])
                    ]),
            ])
            ->toolbarActions([
                Action::make('exportExcel')
                    ->label('Export Excel')
                    ->icon('heroicon-o-document-arrow-down')
                    ->color('success')
                    ->action(fn () => Excel::download(
                        new CareersExport(),
                        'lowongan-' . now()->format('Ymd-His') . '.xlsx'
                    )),

                Action::make('exportCsv')
                    ->label('Export CSV')
                    ->icon('heroicon-o-document-arrow-down')
                    ->color('info')
                    ->action(fn () => Excel::download(
                        new CareersExport(),
                        'lowongan-' . now()->format('Ymd-His') . '.csv',
                        \Maatwebsite\Excel\Excel::CSV,
                    )),

                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
