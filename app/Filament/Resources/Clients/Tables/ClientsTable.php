<?php

namespace App\Filament\Resources\Clients\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ClientsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo')
                    ->label('Logo')
                    ->circular()
                    ->getStateUsing(function ($record) {
                        if (! $record->logo) {
                            return null;
                        }

                        if (str_starts_with($record->logo, 'http')) {
                            return $record->logo;
                        }

                        if (str_starts_with($record->logo, '/')) {
                            return asset($record->logo);
                        }

                        return asset('storage/' . $record->logo);
                    }),
                TextColumn::make('name')
                    ->label('Nama Client')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('businessUnit.name')
                    ->label('Unit Bisnis')
                    ->badge()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('business_unit_id')
                    ->relationship('businessUnit', 'name')
                    ->label('Filter Unit'),
            ])
            ->recordActions([
                EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
