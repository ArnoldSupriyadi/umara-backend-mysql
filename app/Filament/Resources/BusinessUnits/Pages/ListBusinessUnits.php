<?php

namespace App\Filament\Resources\BusinessUnits\Pages;

use App\Filament\Resources\BusinessUnits\BusinessUnitResource;
use Filament\Actions\CreateAction;
use App\Models\BusinessUnit;
use Filament\Resources\Pages\ListRecords;

class ListBusinessUnits extends ListRecords
{
    protected static string $resource = BusinessUnitResource::class;


    public function getSubheading(): ?string
    {
        $count = BusinessUnit::count();
        return $count . ' total record';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
