<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            //relasi ke tabel careers (agar tahu di melamalar posisi apa)
            $table->foreignId('career_id')->constrained()->cascadeOnDelete();

            $table->string('name'); // Full Name *
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_birth'); // Date of Birth *
            $table->string('email'); // Email *
            $table->string('phone'); // Phone Number *
            $table->text('address')->nullable(); // Address
            $table->boolean('willing_to_relocate')->default(false); // Willing to Relocate
            $table->text('cv_path'); // Upload  CV
            $table->string('photo_path'); // Selfie Photo *

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
