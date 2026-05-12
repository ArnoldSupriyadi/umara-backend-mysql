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
        // ============================================================
        // Select kolom SPESIFIK — JANGAN ambil cv_path & photo_path
        // karena longText base64 ~2-3 MB per row → memory exhausted
        // saat applicants banyak.
        //
        // Untuk file CV/Foto di Excel, cukup tampilkan filename original
        // dari kolom cv_filename & photo_filename (string pendek).
        // ============================================================
        return Applicant::with([
                'career:id,job_title,business_unit_id',
                'career.businessUnit:id,name',
            ])
            ->select([
                'id',
                'career_id',
                'name',
                'place_of_birth',
                'date_of_birth',
                'email',
                'phone',
                'address',
                'willing_to_relocate',
                'status',
                'cv_filename',
                'photo_filename',
                'created_at',
            ])
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
            'Status',
            'Posisi Dilamar',
            'Unit Bisnis',
            'File CV',
            'File Foto',
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
            Applicant::STATUSES[$applicant->status] ?? $applicant->status,
            $applicant->career?->job_title ?? '-',
            $applicant->career?->businessUnit?->name ?? '-',
            $applicant->cv_filename ?? '-',
            $applicant->photo_filename ?? '-',
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
