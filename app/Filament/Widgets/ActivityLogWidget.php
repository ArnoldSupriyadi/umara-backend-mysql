<?php

namespace App\Filament\Widgets;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Database\Eloquent\Builder;

class ActivityLogWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = 'Activity Log';

    public function table(Table $table): Table
    {
        return $table
            ->query($this->getQuery())
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime('d M Y · H:i:s')
                    ->sortable()
                    ->timezone('Asia/Jakarta'),

                TextColumn::make('causer.name')
                    ->label('User')
                    ->default('System')
                    ->badge()
                    ->color('primary'),

                TextColumn::make('event')
                    ->label('Aksi')
                    ->badge()
                    ->color(fn(?string $state) => match ($state) {
                        'created'  => 'success',
                        'updated'  => 'warning',
                        'deleted'  => 'danger',
                        'login'    => 'info',
                        'logout'   => 'gray',
                        default    => 'gray',
                    }),

                TextColumn::make('log_name')
                    ->label('Resource')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('description')
                    ->label('Detail')
                    ->limit(60)
                    ->tooltip(fn($record) => $record->description),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated([10, 25, 50])
            ->striped();
    }

    protected function getQuery(): Builder
    {
        // Superadmin lihat semua, user biasa lihat activity sendiri
        $user = auth()->user();

        if ($user && $user->hasRole('super_admin')) {
            return Activity::query()->with('causer')->latest();
        }

        return Activity::query()
            ->with('causer')
            ->where('causer_type', get_class($user))
            ->where('causer_id', $user->id)
            ->latest();
    }
}
