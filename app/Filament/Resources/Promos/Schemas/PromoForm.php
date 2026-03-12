<?php

namespace App\Filament\Resources\Promos\Schemas;

use App\Models\BusinessUnit;
use App\Services\ImageService;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class PromoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Promo')
                    ->description('Masukkan detail promo di sini.')
                    ->schema([
                        Select::make('business_unit_id')
                            ->label('Unit Bisnis')
                            ->options(BusinessUnit::all()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('title')
                            ->label('Judul Promo')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('location')
                            ->label('Lokasi')
                            ->placeholder('Contoh: Jakarta Selatan')
                            ->maxLength(255),

                        FileUpload::make('image')
                            ->label('Gambar Promo')
                            ->disk('r2')
                            ->directory('promos')
                            ->visibility('public')
                            ->image()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->required()
                            ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                                return ImageService::convertAndUpload($file, 'promos', quality: 85, maxWidth: 1200);
                            }),

                        ToggleButtons::make('status')
                            ->label('Status')
                            ->options([
                                'active'   => 'Active',
                                'inactive' => 'Inactive',
                            ])
                            ->inline()
                            ->required()
                            ->default('active'),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
