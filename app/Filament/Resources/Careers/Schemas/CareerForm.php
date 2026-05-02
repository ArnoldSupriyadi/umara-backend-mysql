<?php

namespace App\Filament\Resources\Careers\Schemas;

use App\Models\BusinessUnit;
use App\Services\ImageService;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class CareerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Detail Pekerjaan')->schema([

                    Select::make('business_unit_id')
                        ->label('Perusahaan')
                        ->relationship('businessUnit', 'name')
                        ->searchable()
                        ->preload()
                        ->required()
                        ->live()
                        ->afterStateUpdated(fn(callable $set) => null),

                    TextInput::make('job_title')
                        ->label('Posisi / Jabatan')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(
                            fn(string $operation, $state, callable $set) =>
                            $operation === 'create' ? $set('slug', Str::slug($state)) : null
                        ),

                    TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->unique(ignoreRecord: true)
                        ->readOnly()
                        ->helperText('Otomatis dibuat dari judul posisi.'),

                    Toggle::make('is_active')
                        ->label('Lowongan Dibuka?')
                        ->default(true)
                        ->required(),

                ])->columns(2),

                Section::make('Konten & Gambar')->schema([

                    Placeholder::make('company_logo_preview')
                        ->label('Logo Perusahaan')
                        ->content(function (callable $get): HtmlString {
                            $businessUnitId = $get('business_unit_id');

                            if (!$businessUnitId) {
                                return new HtmlString('<span class="text-sm text-gray-400 italic">Pilih perusahaan untuk melihat logo.</span>');
                            }

                            $businessUnit = BusinessUnit::find($businessUnitId);

                            if (!$businessUnit || !$businessUnit->logo) {
                                return new HtmlString('<span class="text-sm text-gray-400 italic">Logo tidak ditemukan.</span>');
                            }

                            $logoPath = $businessUnit->logo;
                            $url = str_starts_with($logoPath, 'http')
                                ? $logoPath
                                : Storage::disk('r2')->url($logoPath);

                            return new HtmlString(
                                '<img src="' . e($url) . '" alt="Logo ' . e($businessUnit->name) . '" class="h-20 object-contain rounded border border-gray-200 bg-white p-2">'
                            );
                        }),

                    FileUpload::make('image')
                        ->label('Banner Lowongan (Opsional)')
                        ->disk('r2')
                        ->directory('careers')
                        ->visibility('public')
                        ->image()
                        ->imagePreviewHeight('120')
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->nullable()
                        ->dehydrated(fn($state) => filled($state))
                        ->helperText(fn($record) => $record ? 'Biarkan kosong jika tidak ingin mengganti banner.' : null)
                        ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                            return ImageService::convertAndUpload($file, 'careers');
                        }),

                    RichEditor::make('description')
                        ->label('Deskripsi Pekerjaan')
                        ->required()
                        ->columnSpanFull(),
                ]),
            ]);
    }
}
