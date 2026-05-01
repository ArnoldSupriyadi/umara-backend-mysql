<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sliders', function (Blueprint $table) {
            // 'left' = teks di kiri, 'right' = teks di kanan, 'center' = teks di tengah
            $table->string('text_position')->default('left')->after('sort_order');
        });
    }

    public function down(): void
    {
        Schema::table('sliders', function (Blueprint $table) {
            $table->dropColumn('text_position');
        });
    }
};
