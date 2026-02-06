<?php

namespace App\Filament\Resources\Sliders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SlidersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Image')
                    ->circular()
                    ->getStateUsing(function ($record) {
                        if (! $record->image) {
                            return null;
                        }
                        if (str_starts_with($record->image, 'http')) {
                            return $record->image;
                        }
                        if (str_starts_with($record->image, '/')) {
                            return asset($record->image);
                        }
                        return asset('storage/' . $record->image);
                    }),
                TextColumn::make('headline')
                    ->label('Headline')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('subheadline')
                    ->label('Subheadline')
                    ->searchable(),
                TextColumn::make('businessUnit.name')
                    ->label('Business Unit')
                    ->badge()
                    ->sortable(),
                TextColumn::make('sort_order')
                    ->label('Sort Order')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Created At')
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
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
