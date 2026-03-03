<?php

namespace App\Filament\Resources\Applicants\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ApplicantsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo_path')
                    ->label('Selfie')
                    ->circular(), // Foto selfie jadi bulat
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                TextColumn::make('career.job_title')
                    ->label('Posisi Dilamar') // Menampilkan posisi dari relasi
                    ->sortable()
                    ->badge(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('phone'),
                IconColumn::make('willing_to_relocate')
                    ->label('Bisa Mutasi?')
                    ->boolean(),
                // Tombol kecil untuk mendownload CV
                TextColumn::make('cv_path')
                    ->label('File CV')
                    ->formatStateUsing(fn() => 'Download CV')
                    ->url(fn($record) => asset('storage/' . $record->cv_path))
                    ->openUrlInNewTab()
                    ->color('primary'),
            ])
            ->filters([
                //
            ]);
    }
}
