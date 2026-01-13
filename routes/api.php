<?php

use App\Http\Controllers\Api\BusinessUnitController;
use App\Http\Controllers\Api\CareerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/units', [BusinessUnitController::class, 'index'])->middleware('throttle:30,1');

Route::get('/careers/{slug}', [CareerController::class, 'show'])->middleware('throttle:30,1');
Route::get('/careers', [CareerController::class, 'index'])->middleware('throttle:30,1');
