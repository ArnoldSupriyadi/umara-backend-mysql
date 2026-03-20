<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RnbController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Catalogs
Route::get('/catalogs', [CatalogController::class, 'index'])->name('catalogs.index');

// Careers
Route::get('/careers', [CareerController::class, 'index'])->name('careers.index');
Route::get('/careers/{slug}', [CareerController::class, 'show'])->name('careers.show');

// Route untuk menampilkan halaman form (GET)
Route::get('/careers/{slug}/apply', [CareerController::class, 'applyForm'])->name('careers.apply.form');

// 👇 Route untuk MENYIMPAN data form (WAJIB POST)
Route::post('/careers/apply', [CareerController::class, 'apply'])->name('careers.apply');

// Posts
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');

// About
Route::get('/about', [AboutController::class, 'index'])->name('about.index');

// Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');

Route::prefix('rasa-nusantara-baru')->group(function () {
    // 1. Halaman Utama Rasa Nusantara Baru
    Route::get('/', [RnbController::class, 'index'])->name('brands.rnb.index');
    Route::get('/outlets/lumpang-emas-signature', [RnbController::class, 'lumpangEmasSignature'])->name('rnb.outlets.signature');
    Route::get('/outlets/lumpang-emas-bintaro', [RnbController::class, 'lumpangEmasBintaro'])->name('rnb.outlets.bintaro');
    Route::get('/outlets/umara-house', [RnbController::class, 'umaraHouse'])->name('rnb.outlets.umarahouse');
    Route::get('/outlets/rasa-umara', [RnbController::class, 'rasaUmara'])->name('rnb.outlets.rasaumara');
});

Route::prefix('{brand_slug}')->group(function () {

    // 1. Halaman Utama Brand (contoh: /umara-catering)
    Route::get('/', [BrandController::class, 'show'])->name('brands.show');

    // 2. Halaman Berita (Jika nanti kita buat khusus berita)
    // Route::get('/news', [BrandNewsController::class, 'index']);

    // 👇 3. MAGIC ROUTE UNTUK SEMUA HALAMAN SUB-BRAND (TARUH PALING BAWAH DI DALAM GROUP INI)
    // {page_slug} ini akan otomatis menangkap kata 'wedding', 'meeting', 'gallery', dll  
    Route::get('/{page_slug}', [BrandController::class, 'page'])->name('brands.page');
});

require __DIR__ . '/auth.php';
