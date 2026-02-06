<?php

namespace App\Filament\Resources\Clients\Schemas;

use App\Models\BusinessUnit;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

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
                            ->disk('public')
                            ->directory('clients')
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
