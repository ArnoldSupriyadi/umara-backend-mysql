<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'marcom@umaragroup.com'], // Cek berdasarkan email agar tidak duplikat
            [
                'name' => 'Marcom',
                'password' => Hash::make('password'), // Ganti dengan password pilihanmu
                'email_verified_at' => now(),
            ]
        );
    }
}
