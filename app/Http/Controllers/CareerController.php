<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
                'image_url'   => $career->image_url,
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
                'image_url'   => $career->image_url,
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
            'cv'                  => 'required|file|mimes:pdf,doc,docx|max:2048',
            'photo'               => 'required|image|max:2048',
        ]);

        $cvFile    = $request->file('cv');
        $photoFile = $request->file('photo');

        $cvFilename    = 'cv_' . now()->format('Ymd_His') . '_' . Str::random(6) . '.' . $cvFile->getClientOriginalExtension();
        $photoFilename = 'photo_' . now()->format('Ymd_His') . '_' . Str::random(6) . '.' . $photoFile->getClientOriginalExtension();

        $cvPath    = Storage::disk('r2')->putFileAs('applicants/cv', $cvFile, $cvFilename);
        $photoPath = Storage::disk('r2')->putFileAs('applicants/photo', $photoFile, $photoFilename);

        Applicant::create([
            'career_id'           => $request->career_id,
            'name'                => $request->name,
            'place_of_birth'      => $request->place_of_birth,
            'date_of_birth'       => $request->date_of_birth,
            'email'               => $request->email,
            'phone'               => $request->phone,
            'address'             => $request->address,
            'willing_to_relocate' => $request->willing_to_relocate === 'yes',
            'cv_path'             => $cvPath,
            'photo_path'          => $photoPath,
        ]);

        return back()->with('success', 'Lamaran berhasil dikirim!');
    }
}