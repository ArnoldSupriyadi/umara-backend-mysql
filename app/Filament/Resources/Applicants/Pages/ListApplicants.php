<?php

namespace App\Filament\Resources\Applicants\Pages;

use App\Filament\Resources\Applicants\ApplicantResource;
use Filament\Actions\CreateAction;
use App\Models\Applicant;
use Filament\Resources\Pages\ListRecords;

class ListApplicants extends ListRecords
{
    protected static string $resource = ApplicantResource::class;


    public function getSubheading(): ?string
    {
        $count = Applicant::count();
        return $count . ' total record';
    }

    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),
        ];
    }
}
