<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

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

                        FileUpload::make('main_image')
                            ->image()
                            ->directory('posts')
                            ->required()
                            ->columnSpanFull(),

                        FileUpload::make('gallery_images')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->directory('posts/gallery')
                            ->columnSpanFull(),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
