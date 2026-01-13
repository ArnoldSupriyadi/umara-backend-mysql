<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\BusinessUnitResource;
use App\Http\Controllers\Controller;
use App\Models\BusinessUnit;
use Illuminate\Http\Request;

class BusinessUnitController extends Controller
{
    public function index()
    {
        // Ambil semua data Business Unit
        $units = BusinessUnit::all();

        return response()->json([
            'status' => 'success',
            'message' => 'List of Business Units',
            'data' => BusinessUnitResource::collection($units),
        ]);
    }
}
