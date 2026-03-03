<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    // Menampilkan daftar semua artikel (Halaman Blog/News)
    public function index()
    {
        $posts = Post::with('businessUnit')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->paginate(9)
            ->through(function ($post) {
                $imageUrl = null;
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
                    'image_url' => $imageUrl,
                    'excerpt' => Str::limit(strip_tags($post->excerpt), 120),
                    'created_at' => $post->published_at->format('d M Y'),
                    'unit_name' => $post->businessUnit->name,
                ];
            });

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    //Menampilkan detail artikel (Halaman Single Post)
    public function show($slug)
    {
        $post = Post::with('businessUnit')
            ->where('slug', $slug)
            ->firstOrFail();

        //1. Proses Gambar utama
        $mainImageUrl = null;
        if ($post->main_image) {
            $cleanPath = ltrim($post->main_image, '/');
            $mainImageUrl = str_starts_with($cleanPath, 'images/')
                ? asset($cleanPath)
                : asset('storage/' . $cleanPath);
        }

        //2. Proses Gambar Galeri (Karena bentuknya Array dari JSON)
        $galleryUrls = [];
        if (is_array($post->gallery_images)) {
            foreach ($post->gallery_images as $img) {
                $cleanPath = ltrim($img, '/');
                $galleryUrls[] = str_starts_with($cleanPath, 'images/')
                    ? asset($cleanPath)
                    : asset('storage/' . $cleanPath);
            }
        }

        return Inertia::render('Posts/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'main_image_url' => $mainImageUrl,
                'gallery_urls' => $galleryUrls, // Array berisi URL gambar galeri siap pakai
                'created_at' => $post->published_at ? $post->published_at->format('d M Y') : 'null',
                'unit_name' => $post->businessUnit->name ?? 'Umara Group',
            ],
        ]);
    }
}
