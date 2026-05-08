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

            // Status workflow review HR:
            // - pending  : default saat applicant submit form
            // - accepted : HR menerima pelamar
            // - rejected : HR menolak pelamar
            // Setelah accepted/rejected, status dikunci di UI Filament.
            $table->string('status', 20)->default('pending');

            // Track kapan email biodata form dikirim ke applicant.
            // Diisi otomatis saat HR klik tombol Accept dan email berhasil terkirim.
            // Null = belum pernah dikirim.
            $table->timestamp('email_sent_at')->nullable();

            // $table->text('cv_path'); // Upload  CV
            // $table->string('photo_path'); // Selfie Photo *
            $table->longText('cv_path');    // PDF base64 ~1.33MB
            $table->longText('photo_path'); // Foto WebP base64 ~200KB

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
