<?php

namespace App\Filament\Resources\BusinessUnits\Schemas;

use App\Services\ImageService;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class BusinessUnitForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255)
                    ->live()
                    ->afterStateUpdated(fn(callable $set, ?string $state) => $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->disabled()
                    ->dehydrated(),

                FileUpload::make('logo-path')
                    ->label('Logo')
                    ->disk('r2')
                    ->directory('logos')
                    ->visibility('public')
                    ->image()
                    ->imagePreviewHeight('120')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->nullable()
                    ->dehydrated(fn($state) => filled($state))
                    ->required(fn($record) => $record === null)
                    ->helperText(fn($record) => $record ? 'Biarkan kosong jika tidak ingin mengganti logo.' : null)
                    ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                        return ImageService::convertAndUpload($file, 'logos', quality: 90, maxWidth: 400);
                    }),
            ]);
    }
}
