<?php

namespace App\Filament\Resources\Posts\Pages;

use App\Filament\Resources\Posts\PostResource;
use Filament\Actions\CreateAction;
use App\Models\Post;
use Filament\Resources\Pages\ListRecords;

class ListPosts extends ListRecords
{
    protected static string $resource = PostResource::class;


    public function getSubheading(): ?string
    {
        $total     = Post::count();
        $published = Post::whereNotNull('published_at')->count();
        $draft     = Post::whereNull('published_at')->count();
        return "{$total} total record  ·  {$published} published  ·  {$draft} draft";
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
