<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BusinessUnit; // 👈 Pastikan model ini di-import

class BrandController extends Controller
{
    public function show($brand_slug)
    {
        // 1. Polisi Database mencari brand yang slug-nya cocok dengan URL
        // Jika tidak ketemu (misal user ngetik asal), otomatis tampil halaman 404
        $brand = BusinessUnit::where('slug', $brand_slug)->firstOrFail();

        // 2. Tentukan File React mana yang mau dipakai berdasarkan slug
        // (Pastikan teks slug di kiri ini SAMA PERSIS dengan di database Anda ya)
        $reactComponent = match ($brand->slug) {
            'umara-cipta-rasa'          => 'Brands/Ucr/Index',
            'rasa-nusantara-baru'       => 'Brands/Rnb/Index',
            'laukita-bersama-indonesia' => 'Brands/Lbi/Index',
            'laukita-niaga-indonesia'   => 'Brands/Lni/Index',
            'umara-mitra-kulina'        => 'Brands/Umk/Index',
            default                     => 'Brands/DefaultShow',
        };
        // 3. Kirim data brand tersebut ke React
        return Inertia::render($reactComponent, [
            'brand' => $brand
        ]);
    }
}
