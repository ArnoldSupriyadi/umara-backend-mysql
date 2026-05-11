<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
   <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Favicon --}}
        <link rel="icon" type="image/x-icon" href="/favicon.ico">

        {{-- Preconnect ke R2 CDN (gambar) --}}
        <link rel="preconnect" href="https://assets.bridgeflow.my.id" crossorigin>
        <link rel="dns-prefetch" href="https://assets.bridgeflow.my.id">

        {{-- Preconnect ke Google Fonts --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        {{-- Konsolidasi semua font ke Google Fonts (1 request) --}}
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">

        {{-- Scripts --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
