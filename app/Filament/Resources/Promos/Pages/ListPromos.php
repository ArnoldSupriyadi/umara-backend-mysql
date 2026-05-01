<?php

namespace App\Filament\Resources\Promos\Pages;

use App\Filament\Resources\Promos\PromoResource;
use Filament\Actions\CreateAction;
use App\Models\Promo;
use Filament\Resources\Pages\ListRecords;

class ListPromos extends ListRecords
{
    protected static string $resource = PromoResource::class;


    public function getSubheading(): ?string
    {
        $count = Promo::count();
        return $count . ' total record';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
