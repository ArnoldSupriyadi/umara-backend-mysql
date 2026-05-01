<?php

namespace App\Filament\Resources\Posts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class PostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('main_image')
                    ->label('Gambar Utama')
                    ->getStateUsing(function ($record) {
                        if (! $record->main_image) {
                            return null;
                        }
                        // Jika sudah full URL, langsung pakai
                        if (str_starts_with($record->main_image, 'http')) {
                            return $record->main_image;
                        }
                        // Path R2 (posts/uuid.webp) → generate public R2 URL
                        return \Illuminate\Support\Facades\Storage::disk('r2')->url($record->main_image);
                    }),
                TextColumn::make('title')->searchable()->limit(50),
                TextColumn::make('businessUnit.name') // Mengambil nama dari relasi
                    ->label('Unit Bisnis')
                    ->badge()
                    ->color('success'),
                TextColumn::make('published_at')->dateTime()->sortable(),
            ])
            ->filters([
                SelectFilter::make('business_unit_id')
                    ->relationship('businessUnit', 'name')
                    ->label('Filter per Unit')
            ])
            ->recordActions([
                Action::make('preview')
                    ->label('Peek')
                    ->icon('heroicon-o-eye')
                    ->modalHeading(fn($record) => $record->title)
                    ->modalContent(fn($record) => view('filament.tables.actions.post-preview', ['record' => $record]))
                    ->modalSubmitAction(false)
                    ->modalCancelAction(false)
                    ->modalWidth('4xl'),
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
