<?php

namespace App\Exports;

use App\Models\Career;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CareersExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    WithStyles,
    ShouldAutoSize
{
    public function __construct(
        protected ?string $status = null,
        protected ?int $businessUnitId = null,
    ) {}

    public function collection(): Collection
    {
        return Career::with('businessUnit')
            ->withTrashed()
            ->when($this->status !== null, fn($q) => $q->where('is_active', $this->status === 'active'))
            ->when($this->businessUnitId, fn($q) => $q->where('business_unit_id', $this->businessUnitId))
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Posisi / Jabatan',
            'Slug',
            'Unit Bisnis',
            'Status',
            'Tanggal Dibuat',
        ];
    }

    public function map($career): array
    {
        return [
            $career->id,
            $career->job_title,
            $career->slug,
            $career->businessUnit?->name ?? '-',
            $career->is_active ? 'Aktif' : 'Tidak Aktif',
            $career->created_at->format('d/m/Y'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            // Bold header row
            1 => ['font' => ['bold' => true]],
        ];
    }
}
