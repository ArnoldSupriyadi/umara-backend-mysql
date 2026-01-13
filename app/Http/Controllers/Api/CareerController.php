<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CareerResource;
use App\Models\BusinessUnit;
use App\Models\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function index(Request $request)
    {
        // ---------------------------------------------------------
        // BAGIAN 1: Ambil Data Lowongan (Logic Lama)
        // ---------------------------------------------------------
        $query = Career::where('is_active', true)->with('businessUnit');

        // Filter jika ada request ?unit=nama-slug
        if ($request->has('unit')) {
            $query->whereHas('businessUnit', function ($q) use ($request) {
                $q->where('slug', $request->unit);
            });
        }

        $careers = $query->latest()->get();


        // ---------------------------------------------------------
        // BAGIAN 2: Hitung Statistik (Logic Baru)
        // ---------------------------------------------------------

        // Kita ambil semua Unit Bisnis, lalu hitung jumlah career aktifnya
        // withCount adalah fitur "Magic" Laravel yang sangat cepat
        $unitStats = BusinessUnit::withCount(['careers' => function ($query) {
            $query->where('is_active', true);
        }])->get();

        // Kita rapikan format datanya agar mudah dibaca Frontend
        $breakdown = $unitStats->map(function ($unit) {
            return [
                'id' => $unit->id,
                'name' => $unit->name,
                'slug' => $unit->slug, // Berguna buat link filter di frontend
                'job_count' => $unit->careers_count, // Otomatis dibuat Laravel (nama_relasi + _count)
            ];
        });


        // ---------------------------------------------------------
        // BAGIAN 3: Gabungkan Response
        // ---------------------------------------------------------
        return response()->json([
            'status' => 'success',

            // Metadata Statistik ditaruh di sini
            'meta' => [
                'total_jobs_active' => $careers->count(), // Total lowongan yg tampil
                'company_breakdown' => $breakdown,        // Rincian per perusahaan
            ],

            // Data Lowongan
            'data' => CareerResource::collection($careers),
        ]);
    }

    public function show($slug)
    {
        // Cari data berdasarkan slug, pastikan statusnya active
        $career = Career::where('slug', $slug)
            ->where('is_active', true)
            ->with('businessUnit') // Load data PT-nya sekalian
            ->firstOrFail(); // Kalau tidak ketemu, otomatis return 404

        return response()->json([
            'status' => 'success',
            'data' => new CareerResource($career),
        ]);
    }
}
