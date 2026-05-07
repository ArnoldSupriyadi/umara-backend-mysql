<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;

class ApplicantCvController extends Controller
{
    public function download(int $id)
    {
        $applicant = Applicant::select('id', 'name', 'cv_path')
            ->findOrFail($id);

        $pdfContent = base64_decode($applicant->cv_path);
        $filename   = 'CV_' . str_replace(' ', '_', $applicant->name) . '.pdf';

        return response($pdfContent, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
