<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        // 1. Ambil data lowongan kerja dari database dan filter yang active saja
        $careers = Career::with('businessUnit')
            ->latest()
            ->get()
            ->map(function ($career) {
                return [
                    'id' => $career->id,
                    'job_title' => $career->job_title,
                    'slug' => $career->slug,
                    //Ambil nama business unit, jika tidak ada, isi dengan Umara Group
                    'unit_name' => $career->businessUnit->name ?? 'Umara Group',
                    // Potong deskripsi agar tidak kepanjangan di halaman depan, dan hapus tag HTML jika pakai rich text
                    'description' => Str::limit(strip_tags($career->description), 120),
                    // Jika ada gambar, buat URL-nya. Jika kosong, kirim null.
                    'image_url' => $career->image ? asset('storage/' . $career->image) : null
                ];
            });

        return Inertia::render('Careers/Index', [
            'careers' => $careers,
        ]);
    }

    public function show($slug)
    {
        // 1. Cari data berdasarkan slug, dan pastikan is_active = true
        // firstOrFail() akan memunculkan error 404 jika slug tidak ditemukan
        $career = Career::with('businessUnit')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // 2. Kirim 1 data spesifik ke React
        return Inertia::render('Careers/Show', [
            'career' => [
                'id' => $career->id,
                'job_title' => $career->job_title,
                'unit_name' => $career->businessUnit->name ?? 'Umara Group',
                // Ingat: Di halaman detail, kita TIDAK memotong deskripsi (tanpa Str::limit)
                // Jadi, pastikan di React bagian Show, deskripsi ditampilkan sepenuhnya
                'description' => $career->description,
                'image_url' => $career->image ? asset('storage/' . $career->image) : null,
            ]
        ]);
    }

    public function apply(Request $request)
    {
        //1. Validasi data yang masuk
        $request->validate([
            'career_id' => 'required|exists:careers,id',
            'name' => 'required|string|max:255',
            'place_of_birth' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
            'willing_to_relocate' => 'required|in:yes,no', // Harus yes atau no
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048', // Allow PDF, DOC, DOCX
            'photo' => 'required|image|max:2048', // Selfie wajib gambar
        ]);

        //2 .simpan file cv ke dalam folder stroage/app/public/applications_cv
        $cvPath = $request->file('cv')->store('applications_cv', 'public');
        $photoPath = $request->file('photo')->store('applicants_photo', 'public');

        //3. Simpan ke database
        Applicant::create([
            'career_id' => $request->career_id,
            'name' => $request->name,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => $request->date_of_birth,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'willing_to_relocate' => $request->willing_to_relocate === 'yes', // Ubah 'yes' jadi true (boolean 1)
            'cv_path' => $cvPath,
            'photo_path' => $photoPath,
        ]);

        //4. Kembalikan ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Terima kasih! Lamaran Anda Berhasil di Submit.');
    }
}
