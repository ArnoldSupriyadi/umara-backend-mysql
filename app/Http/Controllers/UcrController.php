<?php

namespace App\Http\Controllers;

use App\Models\BusinessUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UcrController extends Controller
{
    protected string $r2 = 'https://assets.bridgeflow.my.id';

    public function index()
    {
    $r2 = 'https://assets.bridgeflow.my.id';

    $heroSlides = [
        ['image' => "{$this->r2}/ucr-assets/sliders/Nasi-Umara-Horizontal.jpg", 'alt' => 'Premium Ambiance'],
        ['image' => "{$this->r2}/ucr-assets/sliders/wedding-slider1.png", 'alt' => 'Wedding Ambiance'],
        ['image' => "{$this->r2}/ucr-assets/sliders/3.jpg", 'alt' => 'Meeting Ambiance'],
    ];

    $showcaseSlides = [
        ['image' => "{$this->r2}/ucr-assets/showcase-1.jpg", 'caption' => "Slices through the golden crust of a classic Beef Wellington"],
        ['image' => "{$this->r2}/ucr-assets/showcase-2.jpg", 'caption' => "Corporate meeting service with curated menus."],
        ['image' => "{$this->r2}/ucr-assets/showcase-3.jpg", 'caption' => "Private dining, tailored by our culinary team."],
        ['image' => "{$this->r2}/ucr-assets/showcase-4.jpg", 'caption' => "Live cooking stations add an exciting visual element to the dining experience."],
    ];

    $experienceImages = [
        ['image' => "{$this->r2}/ucr-assets/wedding.jpg", 'alt' => 'Wedding Ambiance'],
        ['image' => "{$this->r2}/ucr-assets/meeting.jpg", 'alt' => 'Meeting Ambiance'],
        ['image' => "{$this->r2}/ucr-assets/event.jpg", 'alt' => 'Corporate Event Ambiance'],
        ['image' => "{$this->r2}/ucr-assets/mealbox.webp", 'alt' => 'Mealbox Experience Ambiance'],
        ['image' => "{$this->r2}/ucr-assets/dining.jpg", 'alt' => 'Dining Experience Ambiance'],

    ];

    return Inertia::render('Brands/Ucr/Index', [
        'brand'      => BusinessUnit::where('slug', 'umara-cipta-rasa')->first(),
        'heroSlides' => $heroSlides,
        'showcaseSlides' => $showcaseSlides,
        'experienceImages' => $experienceImages,
        ]);
    }

    // Sub-halaman UCR (wedding, meeting, gallery, dll)
    public function page($page_slug)
    {
        $brand = BusinessUnit::where('slug', 'umara-cipta-rasa')->firstOrFail();
        $fileName = ucfirst(Str::camel($page_slug));

        return Inertia::render("Brands/Ucr/{$fileName}", [
            'brand' => $brand,
        ]);
    }

    public function wedding()
    {
        $highlightImages = [
            ['image' => "{$this->r2}/ucr-assets/highlight-moments1.jpg"],
            ['image' => "{$this->r2}/ucr-assets/wedding3.jpg"],
            ['image' => "{$this->r2}/ucr-assets/wedding4.jpg"],   
            ['image' => "{$this->r2}/ucr-assets/wedding5.jpg"],
            ['image' => "{$this->r2}/ucr-assets/wedding6.jpg"],
            ['image' => "{$this->r2}/ucr-assets/wedding7.jpg"],
            ['image' => "{$this->r2}/ucr-assets/wedding8.jpeg"],
            ['image' => "{$this->r2}/ucr-assets/wedding9.jpeg"],
            ['image' => "{$this->r2}/ucr-assets/wedding10.jpeg"]
        ];
        
        return Inertia::render('Brands/Ucr/Wedding', [
            'brand' => BusinessUnit::where('slug', 'umara-cipta-rasa')->first(),
            'highlightImages' => $highlightImages,
        ]);
    }
}
