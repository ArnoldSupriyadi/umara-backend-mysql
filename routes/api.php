<?php

use App\Http\Controllers\Api\BusinessUnitController;
use App\Http\Controllers\Api\CareerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/* |--------------------------------------------------------------------------
| API ENDPOINTS (DISABLED - SWITCHED TO INERTIA)
|--------------------------------------------------------------------------
| Kami menonaktifkan ini karena beralih ke Inertia JS.
| Simpan sebagai referensi jika nanti butuh integrasi Mobile Apps.
|
Route::get('/units', [BusinessUnitController::class, 'index'])->middleware('throttle:30,1');
Route::get('/careers/{slug}', [CareerController::class, 'show'])->middleware('throttle:30,1');
Route::get('/careers', [CareerController::class, 'index'])->middleware('throttle:30,1');
*/
