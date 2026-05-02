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
            'id'   => $this->id,

            // FIX: field di model adalah 'job_title', bukan 'title'
            'title' => $this->job_title,

            'slug'    => $this->slug,
            'company' => $this->businessUnit->name ?? 'Umara Group',

            'company_logo' => $this->businessUnit->logo ?? null,

            // FIX: gunakan accessor image_url dari model (sudah handle R2 URL & fallback)
            // Sebelumnya: logika manual filter_var + asset('storage/...') yang inkonsisten
            'image' => $this->image_url ?? ($this->businessUnit->logo ?? null),

            // HTML Description
            'content' => $this->description,

            'is_active'    => (bool) $this->is_active,
            'published_at' => $this->created_at->format('d F Y'),
        ];
    }
}
