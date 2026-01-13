<?php

namespace App\Filament\Resources\BusinessUnits\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class BusinessUnitsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo-path')
                    ->label('Logo')
                    ->disk('public')
                    // Mengarahkan klik ke URL asli gambar
                    ->url(fn($record) => $record->{'logo-path'} ? asset('storage/' . $record->{'logo-path'}) : null)
                    // Membuka di tab baru (efek lightbox sederhana bawaan browser)
                    ->openUrlInNewTab()
                    // Memberikan tanda pointer agar admin tahu ini bisa diklik
                    ->extraImgAttributes([
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
