<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Post;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Ambil data Sliders (misal: ambil yang aktif dan urutkan)
        $sliders = Slider::latest()->get()->map(function ($slider) {

            //Logic for check path
            $imageUrl = null;
            if ($slider->image) {
                // 👇 Bersihkan garis miring di awal (jika ada)
                $cleanPath = ltrim($slider->image, '/');

                // Sekarang polisinya mengecek path yang sudah bersih
                if (str_starts_with($cleanPath, 'images/')) {
                    $imageUrl = asset($cleanPath);
                } else {
                    $imageUrl = asset('storage/' . $cleanPath);
                }
            }

            return [
                'id' => $slider->id,
                'title' => $slider->title,
                'image_url' => $imageUrl,
                'link' => $slider->link
            ];
        });

        // 2. Ambil data Clients
        $clients = Client::latest()->get()->map(function ($client) {
            $logoUrl = null;
            if ($client->logo) {
                // 👇 Lakukan pembersihan yang sama untuk logo
                $cleanPath = ltrim($client->logo, '/');

                if (str_starts_with($cleanPath, 'images/')) {
                    $logoUrl = asset($cleanPath);
                } else {
                    $logoUrl = asset('storage/' . $cleanPath);
                }
            }

            return [
                'id' => $client->id,
                'name' => $client->name,
                'logo_url' => $logoUrl, // 👈 Pakai variabel yang sudah dicek
            ];
        });

        // 3. BARU: Ambil 3 Artikel/Post Terbaru
        $posts = Post::with('businessUnit') // Ambil relasi Business Unit
            ->whereNotNull('published_at') // Hanya ambil yang sudah rilis
            ->latest('published_at') // Urutkan dari yang terbaru rilis
            ->take(3)
            ->get()
            ->map(function ($post) {
                $imageUrl = null;

                // Gunakan nama kolom yang benar: main_image
                if ($post->main_image) {
                    $cleanPath = ltrim($post->main_image, '/');
                    $imageUrl = str_starts_with($cleanPath, 'images/')
                        ? asset($cleanPath)
                        : asset('storage/' . $cleanPath);
                }

                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'image_url' => $imageUrl, // 👈 Gambar sekarang pasti muncul!
                    'excerpt' => \Illuminate\Support\Str::limit(strip_tags($post->content), 100),
                    'created_at' => $post->published_at->format('d M Y'),
                    'unit_name' => $post->businessUnit->name ?? 'Umara Group',
                ];
            });

        // 4. Kirim ke halaman React (Home/Index)
        return Inertia::render('Home/Index', [
            'sliders' => $sliders,
            'clients' => $clients,
            'posts' => $posts,
        ]);
    }
}
