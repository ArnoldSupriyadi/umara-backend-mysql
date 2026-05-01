<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\BusinessUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function brandNews(Request $request)
    {
        // Detect the brand slug from the current URL path segment
        $brandSlug = $request->segment(1); // e.g. "rasa-nusantara-baru"

        $businessUnit = DB::table('business_units')
            ->where('slug', $brandSlug)
            ->first();

        abort_if(! $businessUnit, 404);

        $posts = Post::with('businessUnit')
            ->where('business_unit_id', $businessUnit->id)
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
                'unit_name'  => $post->businessUnit->name ?? $businessUnit->name,
            ]);

        // Map brand slug → brand-specific News/Index page component
        $pageMap = [
            'umara-mitra-kulina'        => 'Brands/Umk/News',
            'laukita-bersama-indonesia' => 'Brands/Lbi/News',
            'laukita-niaga-indonesia'   => 'Brands/Lni/News',
            'rasa-nusantara-baru'       => 'Brands/Rnb/News',
            'umara-cipta-rasa'          => 'Brands/Ucr/News',
            'umara-nikmat-boga'         => 'Brands/Umk/News',
        ];

        $page = $pageMap[$brandSlug] ?? 'Posts/Index';

        return Inertia::render($page, [
            'posts' => $posts,
            'brand' => [
                'id'   => $businessUnit->id,
                'name' => $businessUnit->name,
                'slug' => $businessUnit->slug,
            ],
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('businessUnit')
            ->where('slug', $slug)
            ->firstOrFail();

        $brandSlug = $post->businessUnit?->slug ?? '';

        // Mapping business unit slug → Inertia page component
        $pageMap = [
            'umara-mitra-kulina'        => 'Brands/Umk/NewsDetail',
            'laukita-bersama-indonesia' => 'Brands/Lbi/NewsDetail',
            'laukita-niaga-indonesia'   => 'Brands/Lni/NewsDetail',
            'rasa-nusantara-baru'       => 'Brands/Rnb/NewsDetail',
            'umara-cipta-rasa'          => 'Brands/Ucr/NewsDetail',
            'umara-nikmat-boga'         => 'Brands/Umk/NewsDetail',
        ];

        $page = $pageMap[$brandSlug] ?? 'Posts/Show';

        $postData = [
            'id'             => $post->id,
            'title'          => $post->title,
            'slug'           => $post->slug,
            'content'        => $post->content,
            'main_image_url' => $post->main_image_url,
            'gallery_urls'   => $post->gallery_urls ?? [],
            'published_at'   => $post->published_at ? $post->published_at->format('d M Y') : null,
            'unit_name'      => $post->businessUnit->name ?? 'Umara Group',
        ];

        $brandData = $post->businessUnit ? [
            'id'   => $post->businessUnit->id,
            'name' => $post->businessUnit->name,
            'slug' => $post->businessUnit->slug,
        ] : null;

        return Inertia::render($page, [
            'post'  => $postData,
            'brand' => $brandData,
        ]);
    }
}