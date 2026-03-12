<?php

namespace App\Filament\Resources\Applicants\Tables;

use Filament\Actions\BulkActionGroup as ActionsBulkActionGroup;
use Filament\Actions\DeleteBulkAction as ActionsDeleteBulkAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class ApplicantsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo_path')
                    ->label('Foto')
                    ->circular()
                    ->getStateUsing(fn($record) => Storage::disk('r2')->url($record->photo_path)),

                TextColumn::make('name')
                    ->label('Nama Pelamar')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('career.job_title')
                    ->label('Posisi Dilamar')
                    ->sortable()
                    ->badge()
                    ->color('info'),

                TextColumn::make('email')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Email disalin!'),

                TextColumn::make('phone')
                    ->label('No. HP')
                    ->searchable(),

                TextColumn::make('date_of_birth')
                    ->label('Tgl Lahir')
                    ->date('d M Y')
                    ->sortable(),

                IconColumn::make('willing_to_relocate')
                    ->label('Bisa Mutasi?')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),

                TextColumn::make('cv_path')
                    ->label('File CV')
                    ->formatStateUsing(fn() => '⬇ Download CV')
                    ->url(fn($record) => Storage::disk('r2')->url($record->cv_path))
                    ->openUrlInNewTab()
                    ->color('primary'),

                TextColumn::make('created_at')
                    ->label('Tanggal Melamar')
                    ->dateTime('d M Y, H:i')
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('career_id')
                    ->label('Posisi')
                    ->relationship('career', 'job_title'),
            ])
            ->bulkActions([
                ActionsBulkActionGroup::make([
                    ActionsDeleteBulkAction::make(),
                ]),
            ]);
    }
}