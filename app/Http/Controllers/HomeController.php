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
        $sliders = Slider::latest()->get()->map(fn($slider) => [
            'id'        => $slider->id,
            'title'     => $slider->title,
            'image_url' => $slider->image_url,
            'link'      => $slider->link,
        ]);

        $clients = Client::latest()->get()->map(fn($client) => [
            'id'       => $client->id,
            'name'     => $client->name,
            'logo_url' => $client->logo_url,
        ]);

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
