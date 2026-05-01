<?php

namespace App\Filament\Resources\Clients\Schemas;

use App\Models\BusinessUnit;
use App\Services\ImageService;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ClientForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Client')
                    ->description('Masukkan data client baru di sini.')
                    ->schema([
                        Select::make('business_unit_id')
                            ->label('Unit Bisnis')
                            ->options(BusinessUnit::all()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('name')
                            ->label('Nama Client')
                            ->required()
                            ->maxLength(255),

                        FileUpload::make('logo')
                            ->label('Logo Client')
                            ->disk('r2')
                            ->directory('clients')
                            ->visibility('public')
                            ->image()
                            ->imageEditor()
                            ->imagePreviewHeight('120')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->nullable()
                            ->dehydrated(fn($state) => filled($state))
                            ->required(fn($record) => $record === null)
                            ->helperText(fn($record) => $record ? 'Biarkan kosong jika tidak ingin mengganti logo.' : null)
                            ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                                return ImageService::convertAndUpload($file, 'clients', quality: 90, maxWidth: 400);
                            }),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
