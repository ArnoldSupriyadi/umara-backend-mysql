<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('businessUnit')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->paginate(9)
            ->through(fn($post) => [
                'id'         => $post->id,
                'title'      => $post->title,
                'slug'       => $post->slug,
                'image_url'  => $post->main_image_url,
                'excerpt'    => Str::limit(strip_tags($post->content), 120),
                'created_at' => $post->published_at->format('d M Y'),
                'unit_name'  => $post->businessUnit->name ?? 'Umara Group',
            ]);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('businessUnit')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Posts/Show', [
            'post' => [
                'id'             => $post->id,
                'title'          => $post->title,
                'content'        => $post->content,
                'main_image_url' => $post->main_image_url,
                'gallery_urls'   => $post->gallery_urls,
                'created_at'     => $post->published_at ? $post->published_at->format('d M Y') : null,
                'unit_name'      => $post->businessUnit->name ?? 'Umara Group',
            ],
        ]);
    }
}