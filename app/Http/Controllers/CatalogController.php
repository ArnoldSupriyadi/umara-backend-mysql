<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index()
    {
        $catalogs = Catalog::with('businessUnit')
            ->latest()
            ->get()
            ->map(fn($catalog) => [
                'id'        => $catalog->id,
                'title'     => $catalog->title,
                'unit_name' => $catalog->businessUnit?->name ?? '-',
                'file_url'  => $catalog->file_url,
            ]);

        return Inertia::render('Catalogs/Index', [
            'catalogs' => $catalogs,
        ]);
    }
}