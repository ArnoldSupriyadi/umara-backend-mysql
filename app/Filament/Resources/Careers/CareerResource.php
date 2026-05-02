<?php

namespace App\Filament\Resources\Careers;

use App\Filament\Resources\Careers\Pages\CreateCareer;
use App\Filament\Resources\Careers\Pages\EditCareer;
use App\Filament\Resources\Careers\Pages\ListCareers;
use App\Filament\Resources\Careers\Schemas\CareerForm;
use App\Filament\Resources\Careers\Tables\CareersTable;
use App\Models\Career;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Infolists\Infolist;

class CareerResource extends Resource
{
    protected static ?string $model = Career::class;

    // FIX: icon 'Gift' diganti 'Briefcase' yang lebih relevan untuk Career
    protected static string|BackedEnum|null $navigationIcon = Heroicon::Briefcase;

    protected static ?string $recordTitleAttribute = 'job_title';


    public static function getNavigationBadge(): ?string
    {
        // FIX: hanya hitung lowongan aktif, exclude soft-deleted
        // Sebelumnya: ::count() menghitung semua termasuk soft-deleted
        return (string) static::getModel()::where('is_active', true)->count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'primary';
    }
    public static function form(Schema $schema): Schema
    {
        return CareerForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CareersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCareers::route('/'),
            'create' => CreateCareer::route('/create'),
            'edit' => EditCareer::route('/{record}/edit'),
        ];
    }
}
