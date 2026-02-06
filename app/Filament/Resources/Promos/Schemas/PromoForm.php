<?php

namespace App\Filament\Resources\Promos\Schemas;

use App\Models\BusinessUnit;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

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
                            ->disk('public')
                            ->directory('promos')
                            ->visibility('public')
                            ->image()
                            ->imageEditor()
                            ->required(),

                        ToggleButtons::make('status')
                            ->label('Status')
                            ->options([
                                'active' => 'Active',
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
