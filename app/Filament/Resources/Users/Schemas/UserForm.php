<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Validation\Rules\Password;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Information')
                    ->schema([
                        TextInput::make('name')
                            ->label('Name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->unique(ignoreRecord: true)
                            ->required()
                            ->maxLength(255),
                        TextInput::make('password')
                            ->label('Password')
                            ->password()
                            ->revealable()
                            ->dehydrated(fn($state) => filled($state))
                            ->required(fn($record) => $record === null)
                            ->minLength(8)
                            ->rules([Password::min(8)->mixedCase()->numbers()->symbols()])
                            ->helperText('Minimal 8 karakter, wajib huruf besar/kecil, angka, dan simbol.'),
                        Select::make('roles')
                            ->relationship('roles', 'name') // Menghubungkan ke tabel roles, ambil kolom name
                            ->multiple()       // User bisa punya lebih dari 1 role (Wajib untuk Spatie/Shield)
                            ->preload()        // Agar daftar role langsung muncul saat diklik
                            ->searchable(),    // Agar bisa dicari ketik nama role
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
