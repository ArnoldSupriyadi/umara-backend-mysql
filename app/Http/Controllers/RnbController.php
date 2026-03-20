<?php

namespace App\Http\Controllers;

use App\Models\BusinessUnit;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RnbController extends Controller
{
    public function index()
    {
        // 1. Filter menggunakan 'whereHas' karena kita memfilter berdasarkan relasi BusinessUnit
        $posts = Post::with('businessUnit') // Eager loading agar tidak berat (N+1 query problem)
            ->whereHas('businessUnit', function ($query) {
                $query->where('name', 'Rasa Nusantara Baru'); // Cocokkan dengan nama di tabel business_units
            })
            ->latest('created_at')
            ->paginate(4);

        // 2. Format datanya agar sesuai dengan yang diminta oleh Frontend React (JSX)
        $posts->getCollection()->transform(function ($post) {
            return [
                'id'         => $post->id,
                'title'      => $post->title,
                'slug'       => $post->slug,
                // Mengambil dari accessor getMainImageUrlAttribute() di model Post
                'image_url'  => $post->main_image_url,
                // Mengambil nama dari relasi
                'unit_name'  => $post->businessUnit ? $post->businessUnit->name : 'Umara Group',
                // Membuat cuplikan text dari content (maksimal 100 karakter)
                'excerpt'    => Str::limit(strip_tags($post->content), 100),
                // Format tanggal jadi cantik (contoh: 15 March 2026)
                'created_at' => $post->created_at->format('d F Y'),
            ];
        });

        return Inertia::render('Brands/Rnb/Index', [
            'posts' => $posts
            // dd($posts)
        ]);
    }

    public function lumpangEmasSignature()
    {
        return Inertia::render('Brands/Rnb/LumpangEmasSignature');
    }

    public function lumpangEmasBintaro()
    {
        return Inertia::render('Brands/Rnb/LumpangEmasBintaro');
    }

    public function umaraHouse()
    {
        return Inertia::render('Brands/Rnb/UmaraHouse');
    }

    public function rasaUmara()
    {
        return Inertia::render('Brands/Rnb/RasaUmara');
    }
}
