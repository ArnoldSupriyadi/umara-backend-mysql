<?php

namespace App\Filament\Resources\Careers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CareersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // 1. Kolom Image (Sesuai request kamu menggunakan asset helper)
                ImageColumn::make('image')
                    ->label('Logo')
                    ->circular() // Membuat gambar bulat agar rapi
                    ->disk('public'),
                // 2. Job Title
                TextColumn::make('job_title')
                    ->label('Posisi')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->sortable(),
                // 3. Unit Bisnis (Dengan warna badge)
                TextColumn::make('businessUnit.name')
                    ->label('Unit Bisnis')
                    ->badge() // Tampil seperti label/tag
                    ->color(fn(string $state): string => match ($state) {
                        'PT Umara Cipta Rasa' => 'warning', // Warna Kuning/Oranye
                        'PT Rasa Nusantara Baru' => 'success', // Warna Hijau
                        default => 'gray',
                    })
                    ->sortable(),
                // 4. Status Aktif (Bisa diklik langsung untuk ON/OFF)
                ToggleColumn::make('is_active')
                    ->label('Status Aktif')
                    ->onColor('success')
                    ->offColor('danger'),
                // 5. Tanggal Dibuat
                TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                // Filter berdasarkan Unit Bisnis
                SelectFilter::make('business_unit_id')
                    ->relationship('businessUnit', 'name')
                    ->label('Filter Unit'),
                // Filter Status Aktif/Tidak
                SelectFilter::make('is_active')
                    ->label('Status Aktif')
                    ->options([
                        '1' => 'Aktif',
                        '0' => 'Tidak Aktif',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
