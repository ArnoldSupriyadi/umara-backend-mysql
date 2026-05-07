<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Career;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

// ============================================================
// Storage dan Str tidak dipakai lagi — sudah dihapus dari use
// ============================================================

class CareerController extends Controller
{
    public function index()
    {
        $careers = Career::with('businessUnit')
            ->where('is_active', true)
            ->latest()
            ->get()
            ->map(fn($career) => [
                'id'          => $career->id,
                'job_title'   => $career->job_title,
                'slug'        => $career->slug,
                'unit_name'   => $career->businessUnit->name ?? 'Umara Group',
                'description' => Str::limit(strip_tags($career->description), 120),
                'image_url'   => $career->image_url ?? $career->businessUnit?->logo,
            ]);

        return Inertia::render('Careers/Index', [
            'careers' => $careers,
        ]);
    }

    public function show($slug)
    {
        $career = Career::with('businessUnit')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Careers/Show', [
            'career' => [
                'id'          => $career->id,
                'slug'        => $career->slug,
                'job_title'   => $career->job_title,
                'unit_name'   => $career->businessUnit->name ?? 'Umara Group',
                'description' => $career->description,
                'image_url'   => $career->image_url ?? $career->businessUnit?->logo,
            ],
        ]);
    }

    public function applyForm($slug)
    {
        $career = Career::with('businessUnit')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Careers/Apply', [
            'career' => [
                'id'        => $career->id,
                'slug'      => $career->slug,
                'job_title' => $career->job_title,
                'unit_name' => $career->businessUnit->name ?? 'Umara Group',
            ],
        ]);
    }

    public function apply(Request $request)
    {
        $request->validate([
            'career_id'           => 'required|exists:careers,id',
            'name'                => 'required|string|max:255',
            'place_of_birth'      => 'nullable|string|max:255',
            'date_of_birth'       => 'required|date',
            'email'               => 'required|email|max:255',
            'phone'               => 'required|string|max:20',
            'address'             => 'nullable|string',
            'willing_to_relocate' => 'required|in:yes,no',
            // ============================================================
            // CV: hanya PDF (doc/docx dihapus karena tidak bisa di-encode
            // dengan cara yang konsisten untuk preview di browser)
            // ============================================================
            'cv'    => 'required|file|mimes:pdf|max:1024',
            'photo' => 'required|image|max:1024',
        ]);

        // ============================================================
        // FOTO → compress ke WebP dulu via ImageService,
        // lalu encode ke base64 → disimpan di DB
        // Estimasi ukuran di DB: ~200KB
        // ============================================================
        $photoBase64 = ImageService::convertToBase64(
            file: $request->file('photo'),
            quality: 85,
            maxWidth: 800
        );

        // ============================================================
        // CV PDF → langsung encode ke base64 → disimpan di DB
        // PDF tidak bisa dicompress, estimasi ukuran di DB: ~1.33MB
        // ============================================================
        $cvBase64 = base64_encode(
            file_get_contents($request->file('cv')->getPathname())
        );

        Applicant::create([
            'career_id'           => $request->career_id,
            'name'                => $request->name,
            'place_of_birth'      => $request->place_of_birth,
            'date_of_birth'       => $request->date_of_birth,
            'email'               => $request->email,
            'phone'               => $request->phone,
            'address'             => $request->address,
            'willing_to_relocate' => $request->willing_to_relocate === 'yes',
            'cv_path'             => $cvBase64,    // base64 tanpa prefix data URI
            'photo_path'          => $photoBase64, // base64 tanpa prefix data URI
        ]);

        return back()->with('success', 'Lamaran berhasil dikirim!');
    }
}