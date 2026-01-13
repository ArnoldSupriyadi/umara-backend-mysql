<?php

namespace App\Filament\Resources\Careers\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CareerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Detail Pekerjaan')->schema([

                    // 1. Pilih Business Unit (Dropdown Relasi)
                    Select::make('business_unit_id')
                        ->label('Perusahaan')
                        ->relationship('businessUnit', 'name') // Mengambil nama dari tabel business_units
                        ->searchable()
                        ->preload()
                        ->required(),

                    // 2. Judul Pekerjaan
                    TextInput::make('job_title')
                        ->label('Posisi / Jabatan')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true) // Aktif saat selesai ketik
                        // Otomatis isi slug saat judul diketik
                        ->afterStateUpdated(
                            fn(string $operation, $state, callable $set) =>
                            $operation === 'create' ? $set('slug', Str::slug($state)) : null
                        ),

                    // 3. Slug (URL)
                    TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->unique(ignoreRecord: true)
                        ->readOnly()
                        ->helperText('Otomatis dibuat dari judul posisi.'),

                    // 4. Status Aktif/Tidak
                    Toggle::make('is_active')
                        ->label('Lowongan Dibuka?')
                        ->default(true)
                        ->required(),
                ])->columns(2), // Bagi jadi 2 kolom biar rapi

                Section::make('Konten & Gambar')->schema([

                    // 5. Upload Gambar Banner
                    FileUpload::make('image')
                        ->label('Banner Lowongan (Opsional)')
                        ->image()
                        ->directory('images/career') // Simpan di storage/app/public/careers
                        ->visibility('public')
                        ->disk('public'),

                    // 6. Deskripsi (Rich Text Editor / Word-like)
                    RichEditor::make('description')
                        ->label('Deskripsi Pekerjaan')
                        ->required()
                        ->columnSpanFull(), // Lebar penuh
                ]),
            ]);
    }
}
