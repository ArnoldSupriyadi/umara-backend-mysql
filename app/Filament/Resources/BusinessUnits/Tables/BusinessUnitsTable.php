<?php

namespace App\Filament\Resources\BusinessUnits\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BusinessUnitsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // Gunakan getStateUsing agar URL R2 (full https://) langsung dipakai,
                // bukan diproses ulang oleh disk 'public' yang akan merusak URL-nya.
                ImageColumn::make('logo')
                    ->label('Logo')
                    ->getStateUsing(fn($record) => $record->{'logo-path'})
                    ->height(48)
                    ->width(120)
                    ->extraImgAttributes([
                        'style' => 'object-fit: contain;',
                        'class' => 'cursor-pointer hover:opacity-80 transition',
                    ])
                    ->grow(false),

                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('slug'),
                TextColumn::make('created_at')->dateTime()->label('Dibuat Pada'),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(), // Tombol hapus satuan
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
