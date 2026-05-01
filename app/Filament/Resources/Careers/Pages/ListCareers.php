<?php

namespace App\Filament\Resources\Careers\Pages;

use App\Filament\Resources\Careers\CareerResource;
use Filament\Actions\CreateAction;
use App\Models\Career;
use Filament\Resources\Pages\ListRecords;

class ListCareers extends ListRecords
{
    protected static string $resource = CareerResource::class;


    public function getSubheading(): ?string
    {
        $count = Career::count();
        return $count . ' total record';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
