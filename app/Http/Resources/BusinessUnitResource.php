<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BusinessUnitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $logo = $this->logo;

        $logoUrl = match (true) {
            !$logo                          => null,
            str_starts_with($logo, 'http') => $logo,
            default                         => Storage::disk('r2')->url($logo),
        };

        return [
            'id'   => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'logo' => $logoUrl,
        ];
    }
}
