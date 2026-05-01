<?php

namespace App\Filament\Widgets;

use App\Models\Applicant;
use App\Models\BusinessUnit;
use App\Models\Career;
use App\Models\Catalog;
use App\Models\Client;
use App\Models\Menu;
use App\Models\Post;
use App\Models\Promo;
use App\Models\Slider;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Business Units', BusinessUnit::count())
                ->description('Total brand / unit bisnis')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary'),

            Stat::make('Posts', Post::count())
                ->description(Post::whereNotNull('published_at')->count() . ' published · ' . Post::whereNull('published_at')->count() . ' draft')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('success'),

            Stat::make('Sliders', Slider::count())
                ->description('Total banner slider aktif')
                ->descriptionIcon('heroicon-m-photo')
                ->color('warning'),

            Stat::make('Careers', Career::count())
                ->description('Total lowongan pekerjaan')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('info'),

            Stat::make('Applicants', Applicant::count())
                ->description('Total pelamar masuk')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('danger'),

            Stat::make('Promos', Promo::count())
                ->description('Total promo aktif')
                ->descriptionIcon('heroicon-m-tag')
                ->color('warning'),

            Stat::make('Menus', Menu::count())
                ->description('Total item menu')
                ->descriptionIcon('heroicon-m-queue-list')
                ->color('success'),

            Stat::make('Clients', Client::count())
                ->description('Total klien terdaftar')
                ->descriptionIcon('heroicon-m-building-storefront')
                ->color('primary'),

            Stat::make('Catalogs', Catalog::count())
                ->description('Total katalog produk')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('info'),

            Stat::make('Users', User::count())
                ->description('Total pengguna CMS')
                ->descriptionIcon('heroicon-m-users')
                ->color('danger'),
        ];
    }
}
