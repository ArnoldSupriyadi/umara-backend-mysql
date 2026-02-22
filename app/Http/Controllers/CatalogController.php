<?php

namespace App\Http\Controllers;

use App\Filament\Resources\Catalogs\CatalogResource;
use App\Models\BusinessUnit;
use App\Models\Catalog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index()
    {
        //1. Ambil semua data Catalog
        // Kita gunakan 'with' agar query lebih efisien (Eager Loading)
        $catalogs = Catalog::with('businessUnit')
            ->latest()
            ->get()
            ->map(function ($catalog) {
                return [
                    'id' => $catalog->id,
                    'title' => $catalog->title,

                    // Ambil nama unit bisnis. Jika kosong/dihapus, ganti jadi strip (-)
                    'unit_name' => $catalog->businessUnit?->name ?? '-',

                    //Buat link download file pdf yang valid
                    'file_url' => asset('storage/' . $catalog->file_path),
                ];
            });

        //2. kirm data tersebut ke file react (resources/js/Pages/Catalogs/Index.jsx)
        return Inertia::render('Catalogs/Index', [
            'catalogs' => $catalogs,
        ]);
    }
}
