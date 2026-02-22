<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    // Mengizinkan semua kolom diisi
    protected $guarded = [];

    //relasi balik ke model Career
    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}
