<?php

namespace App\Filament\Resources\Menus\Schemas;

use App\Models\BusinessUnit;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Menu')
                    ->description('Masukkan detail menu di sini.')
                    ->schema([
                        Select::make('business_unit_id')
                            ->label('Unit Bisnis')
                            ->options(BusinessUnit::all()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('title')
                            ->label('Judul Menu')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('location')
                            ->label('Lokasi')
                            ->placeholder('Contoh: Jakarta Selatan')
                            ->maxLength(255),

                        FileUpload::make('image')
                            ->label('Gambar Menu')
                            ->disk('public')
                            ->directory('menus')
                            ->visibility('public')
                            ->image()
                            ->imageEditor()
                            ->required(),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
