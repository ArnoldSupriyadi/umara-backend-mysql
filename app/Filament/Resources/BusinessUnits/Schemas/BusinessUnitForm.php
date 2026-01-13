<?php

namespace App\Filament\Resources\BusinessUnits\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

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
                    ->image()
                    ->directory('images/logo')
                    ->visibility('public')
                    ->disk('public'),
            ]);
    }
}
