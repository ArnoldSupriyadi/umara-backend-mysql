<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessUnit extends Model
{
    protected $fillable = ['name', 'slug', 'logo-path'];

    public function getLogoAttribute()
    {
        return $this->attributes['logo-path'] ?? null;
    }

    public function setLogoAttribute($value): void
    {
        $this->attributes['logo-path'] = $value;
    }

    public function sliders()
    {
        return $this->hasMany(Slider::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function careers()
    {
        return $this->hasMany(Career::class);
    }

    public function promos()
    {
        return $this->hasMany(Promo::class);
    }

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function catalogs()
    {
        return $this->hasMany(Catalog::class);
    }
}
