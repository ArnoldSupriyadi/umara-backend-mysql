<?php

namespace App\Exports;

use App\Models\Applicant;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ApplicantsExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    WithStyles,
    ShouldAutoSize
{
    public function __construct(
        protected ?int $careerId = null,
    ) {}

    public function collection(): Collection
    {
        return Applicant::with('career.businessUnit')
            ->when($this->careerId, fn($q) => $q->where('career_id', $this->careerId))
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Email',
            'No. HP',
            'Alamat',
            'Bisa Mutasi',
            'Posisi Dilamar',
            'Unit Bisnis',
            'Tanggal Melamar',
        ];
    }

    public function map($applicant): array
    {
        return [
            $applicant->id,
            $applicant->name,
            $applicant->place_of_birth ?? '-',
            $applicant->date_of_birth?->format('d/m/Y') ?? '-',
            $applicant->email,
            $applicant->phone,
            $applicant->address ?? '-',
            $applicant->willing_to_relocate ? 'Ya' : 'Tidak',
            $applicant->career?->job_title ?? '-',
            $applicant->career?->businessUnit?->name ?? '-',
            $applicant->created_at->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
