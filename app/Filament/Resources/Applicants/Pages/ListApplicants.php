<?php

namespace App\Filament\Resources\Applicants\Pages;

use App\Filament\Resources\Applicants\ApplicantResource;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListApplicants extends ListRecords
{
    protected static string $resource = ApplicantResource::class;

    protected function modifyQueryWithActiveFilters(Builder $query): Builder
    {
        // Exclude cv_path dari query list karena base64 PDF ~1.33MB per record
        // cv_path hanya diambil saat download via ApplicantCvController
        return parent::modifyQueryWithActiveFilters($query)->select([
            'id',
            'career_id',
            'name',
            'email',
            'phone',
            'date_of_birth',
            'willing_to_relocate',
            'photo_path',  // tetap diambil untuk ImageColumn
            'created_at',
        ]);
    }
}