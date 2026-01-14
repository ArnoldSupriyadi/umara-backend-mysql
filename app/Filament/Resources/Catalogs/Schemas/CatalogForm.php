<?php

namespace App\Filament\Resources\Catalogs\Schemas;

use App\Models\BusinessUnit;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder; // Untuk Preview PDF
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString; // Untuk HTML Iframe

class CatalogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Upload Katalog')
                    ->description('Silakan upload file PDF menu atau brosur di sini.')
                    ->schema([

                        // 1. Pilih Unit Bisnis
                        Select::make('business_unit_id')
                            ->label('Unit Bisnis')
                            ->options(BusinessUnit::all()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->required(),

                        // 2. Judul Katalog
                        TextInput::make('title')
                            ->label('Nama Katalog')
                            ->placeholder('Contoh: Menu Wedding 2026')
                            ->required()
                            ->maxLength(255),

                        // 3. Upload File PDF
                        FileUpload::make('file_path')
                            ->label('Upload File Katalog (PDF)')
                            ->disk('public')             // Wajib: Disk Public
                            ->directory('images/catalog') // Folder penyimpanan
                            ->visibility('public')       // Akses publik
                            ->acceptedFileTypes(['application/pdf'])
                            ->preserveFilenames()
                            ->live() // Agar preview di bawah bereaksi
                            ->required(),

                        // 4. Preview PDF (Iframe)
                        Placeholder::make('pdf_preview')
                            ->label('Preview Dokumen')
                            ->content(function ($get) {
                                $filePath = $get('file_path');

                                // Jika kosong / belum upload
                                if (! $filePath) {
                                    return new HtmlString('<p class="text-sm text-gray-500">Belum ada file.</p>');
                                }

                                // Jika sedang Create (File masih Temporary) -> Tampilkan pesan
                                // (Karena preview file temporary agak tricky, lebih aman suruh save dulu)
                                if (! is_string($filePath)) {
                                    return new HtmlString('<p class="text-sm text-yellow-600">Simpan data terlebih dahulu untuk melihat preview.</p>');
                                }

                                // Jika sedang Edit (File sudah string path di DB) -> Tampilkan Iframe
                                $url = asset('storage/' . $filePath);

                                return new HtmlString("
                                    <iframe 
                                        src='{$url}' 
                                        width='100%' 
                                        height='600px' 
                                        class='border rounded-lg shadow-sm w-full'
                                        style='border: 1px solid #ddd;'
                                    >
                                        Browser Anda tidak mendukung preview PDF.
                                    </iframe>
                                    <div class='mt-2 text-right'>
                                        <a href='{$url}' target='_blank' class='text-sm text-primary-600 hover:underline'>Buka di Tab Baru &nearr;</a>
                                    </div>
                                ");
                            })
                            ->columnSpanFull(),

                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
