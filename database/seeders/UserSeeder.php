<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // pastikan role ada
        $role = Role::firstOrCreate([
            'name' => 'super_admin',
            'guard_name' => 'web'
        ]);

        $marcom = User::updateOrCreate(
            ['email' => 'marcom@umaragroup.com'],
            [
                'name' => 'Marcom',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $recruitment = User::updateOrCreate(
            ['email' => 'recruitment@umaragroup.com'],
            [
                'name' => 'HRD',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // assign role
        $marcom->assignRole($role);

        $this->command->info("Users created/updated: marcom@umaragroup.com, recruitment@umaragroup.com");
    }
}
