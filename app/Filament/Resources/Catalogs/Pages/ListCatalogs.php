<?php

namespace App\Filament\Resources\Catalogs\Pages;

use App\Filament\Resources\Catalogs\CatalogResource;
use Filament\Actions\CreateAction;
use App\Models\Catalog;
use Filament\Resources\Pages\ListRecords;

class ListCatalogs extends ListRecords
{
    protected static string $resource = CatalogResource::class;


    public function getSubheading(): ?string
    {
        $count = Catalog::count();
        return $count . ' total record';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
