<?php

namespace App\Filament\Resources\Careers\Schemas;

use App\Services\ImageService;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
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
                        ->required(),

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

                    FileUpload::make('image')
                        ->label('Banner Lowongan (Opsional)')
                        ->disk('r2')
                        ->directory('careers')
                        ->visibility('public')
                        ->image()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->nullable()
                        // Auto-convert ke WebP sebelum disimpan ke R2
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
