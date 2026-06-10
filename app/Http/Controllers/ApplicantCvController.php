<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;

class ApplicantCvController extends Controller
{
    /**
     * Download CV applicant.
     *
     * Data di DB tersimpan dalam format HRIS-style:
     *   "data:image/png;base64,JVBERi0xLjcK..."  (prefix hardcoded image/png,
     *                                              tapi isi sebenarnya PDF)
     *
     * Saat download, kita strip prefix lalu decode pakai accessor model
     * `$applicant->cv_binary` → return binary PDF dengan Content-Type yang
     * benar (application/pdf), terlepas dari prefix di DB yang "bohong".
     */
    public function download(int $id)
    {
        $applicant = Applicant::select('id', 'name', 'cv_path')
            ->findOrFail($id);

        $pdfContent = $applicant->cv_binary; // accessor strip prefix + decode
        $filename   = 'CV_' . str_replace(' ', '_', $applicant->name) . '.pdf';

        return response($pdfContent, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    /**
     * Preview CV applicant secara inline di browser (tanpa force download).
     *
     * Digunakan oleh fitur "Lihat CV" di Filament — PDF ditampilkan
     * dalam <iframe> modal. Content-Disposition: inline supaya browser
     * render PDF-nya langsung, bukan trigger download.
     */
    public function view(int $id)
    {
        $applicant = Applicant::select('id', 'name', 'cv_path')
            ->findOrFail($id);

        $pdfContent = $applicant->cv_binary;
        $filename   = 'CV_' . str_replace(' ', '_', $applicant->name) . '.pdf';

        return response($pdfContent, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $filename . '"',
        ]);
    }
}
