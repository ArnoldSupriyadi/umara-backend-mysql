<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CareerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'company' => $this->businessUnit->name,
            'company_logo' => $this->businessUnit->logo ? asset('storage/' . $this->businessUnit->logo) : null,

            // Logika Gambar: Prioritaskan gambar career, kalau kosong pakai logo PT
            'image' => $this->image
                ? (filter_var($this->image, FILTER_VALIDATE_URL) ? $this->image : asset('storage/' . $this->image))
                : ($this->businessUnit->logo ? asset('storage/' . $this->businessUnit->logo) : null),

            // Ini HTML Description yang kamu seeder tadi (<ul><li>...)
            'content' => $this->description,

            'is_active' => (bool) $this->is_active,
            'published_at' => $this->created_at->format('d F Y'),
        ];
    }
}
