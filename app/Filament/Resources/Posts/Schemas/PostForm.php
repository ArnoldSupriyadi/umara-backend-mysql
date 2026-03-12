<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Services\ImageService;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Post Information')
                    ->schema([
                        Select::make('business_unit_id')
                            ->relationship('businessUnit', 'name')
                            ->required()
                            ->searchable()
                            ->preload(),

                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(debounce: 500)
                            ->afterStateUpdated(fn(callable $set, $state) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->disabled()
                            ->dehydrated()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        DateTimePicker::make('published_at')
                            ->label('Published Date'),

                        RichEditor::make('content')
                            ->columnSpanFull(),

                        // Gambar utama — auto convert ke WebP
                        FileUpload::make('main_image')
                            ->label('Gambar Utama')
                            ->disk('r2')
                            ->directory('posts')
                            ->visibility('public')
                            ->image()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->required()
                            ->columnSpanFull()
                            ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                                return ImageService::convertAndUpload($file, 'posts', quality: 85, maxWidth: 1200);
                            }),

                        // Galeri — auto convert ke WebP (multiple)
                        FileUpload::make('gallery_images')
                            ->label('Galeri Foto')
                            ->disk('r2')
                            ->directory('posts/gallery')
                            ->visibility('public')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->columnSpanFull()
                            ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                                return ImageService::convertAndUpload($file, 'posts/gallery', quality: 80, maxWidth: 1200);
                            }),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
