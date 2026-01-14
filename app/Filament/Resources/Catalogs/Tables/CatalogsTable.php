<?php

namespace App\Filament\Resources\Catalogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CatalogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('businessUnit.name')
                    ->label('Unit Bisnis')
                    ->badge()
                    ->sortable(),
                TextColumn::make('file_path')
                    ->label('File')
                    ->formatStateUsing(fn($state) => basename($state)) // Mengambil nama filenya saja

                    // SOLUSI: Tambahkan string 'storage/' di depannya
                    ->url(fn($record) => asset('storage/' . $record->file_path))

                    // ATAU cara yang lebih 'Laravel Way' (pilih salah satu):
                    // ->url(fn($record) => Storage::url($record->file_path))

                    ->openUrlInNewTab()
                    ->color('primary')
                    ->icon('heroicon-o-document-arrow-down'), // Tambah icon biar cantik
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
                DeleteAction::make(), // Tombol hapus satuan
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
