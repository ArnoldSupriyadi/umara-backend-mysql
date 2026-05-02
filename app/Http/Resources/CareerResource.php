<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CareerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $businessUnit = $this->businessUnit;

        // Resolve logo perusahaan ke full URL R2
        $logoPath = $businessUnit?->logo;
        $companyLogoUrl = match (true) {
            !$logoPath                          => null,
            str_starts_with($logoPath, 'http') => $logoPath,
            default                             => Storage::disk('r2')->url($logoPath),
        };

        // Banner career — gunakan accessor image_url, fallback ke logo perusahaan
        $imageUrl = $this->image_url ?? $companyLogoUrl;

        return [
            'id'          => $this->id,
            'job_title'   => $this->job_title,
            'slug'        => $this->slug,
            'unit_name'   => $businessUnit?->name ?? 'Umara Group',
            'company_logo'=> $companyLogoUrl,
            'image_url'   => $imageUrl,
            'description' => $this->description,
            'is_active'   => (bool) $this->is_active,
            'published_at'=> $this->created_at->format('d F Y'),
        ];
    }
}
