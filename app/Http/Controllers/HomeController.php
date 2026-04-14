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
    protected $r2Url = "https://assets.bridgeflow.my.id";

    public function index()
    {
        // 1. Pastikan R2 URL tidak diakhiri slash (opsional untuk keamanan string)
        $r2Base = rtrim($this->r2Url, '/');

        // 2. Mapping Sliders dengan pengecekan URL
        $sliders = Slider::latest()->get()->map(function ($slider) use ($r2Base) {
            $imagePath = $slider->image;

            // Jika path sudah berawalan http/https, pakai langsung. Jika belum, gabung dengan r2Base.
            $finalImageUrl = str_starts_with($imagePath, 'http')
                ? $imagePath
                : $r2Base . '/' . ltrim($imagePath, '/');

            return [
                'id'        => $slider->id,
                'title'     => $slider->title,
                'image_url' => $finalImageUrl,
                'link'      => $slider->link,
            ];
        });

        $clients = Client::latest()->get()->map(function ($client) use ($r2Base) {
            $logoPath = $client->logo;

            // Sama seperti slider, cek apakah logo sudah berupa URL lengkap
            $finalLogoUrl = str_starts_with($logoPath, 'http')
                ? $logoPath
                : $r2Base . '/' . ltrim($logoPath, '/');

            return [
                'id'       => $client->id,
                'name'     => $client->name,
                'logo_url' => $finalLogoUrl,
            ];
        });


        $posts = Post::with('businessUnit')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(fn($post) => [
                'id'         => $post->id,
                'title'      => $post->title,
                'slug'       => $post->slug,
                'image_url'  => $post->main_image_url,
                'excerpt'    => Str::limit(strip_tags($post->content), 100),
                'created_at' => $post->published_at->format('d M Y'),
                'unit_name'  => $post->businessUnit->name ?? 'Umara Group',
            ]);

        return Inertia::render('Home/Index', [
            'sliders' => $sliders,
            'clients' => $clients,
            'posts'   => $posts,
        ]);
    }
}
