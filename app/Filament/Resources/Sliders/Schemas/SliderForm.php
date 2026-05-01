<?php

namespace App\Filament\Resources\Sliders\Schemas;

use App\Models\Slider;
use App\Models\BusinessUnit;
use App\Services\ImageService;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class SliderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Slider')
                    ->description('Masukkan detail slider banner di sini.')
                    ->schema([
                        Select::make('business_unit_id')
                            ->label('Unit Bisnis')
                            ->options(BusinessUnit::all()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('headline')
                            ->label('Headline')
                            ->maxLength(255),

                        TextInput::make('subheadline')
                            ->label('Subheadline')
                            ->maxLength(255),

                        FileUpload::make('image')
                            ->label('Gambar Slider')
                            ->disk('r2')
                            ->directory('sliders')
                            ->visibility('public')
                            ->image()
                            ->imageEditor()
                            ->imagePreviewHeight('120')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->nullable()
                            ->dehydrated(fn($state) => filled($state))
                            ->required(fn($record) => $record === null || blank($record->image))
                            ->helperText(fn($record) => $record ? 'Biarkan kosong jika tidak ingin mengganti gambar slider.' : null)
                            ->saveUploadedFileUsing(function (TemporaryUploadedFile $file) {
                                return ImageService::convertAndUpload($file, 'sliders');
                            }),

                        Select::make('text_position')
                            ->label('Posisi Teks')
                            ->options([
                                'left'   => '⬅️ Kiri',
                                'center' => '↔️ Tengah',
                                'right'  => '➡️ Kanan',
                            ])
                            ->default('left')
                            ->required()
                            ->helperText('Tentukan posisi teks headline & subheadline pada slider.'),

                        Select::make('sort_order')
                            ->label('Posisi Urutan')
                            ->reactive()
                            ->required()
                            ->options(function (callable $get, $record) {
                                $buId = $get('business_unit_id') ?? ($record?->business_unit_id ?? null);
                                if (!$buId) return [];

                                $used = Slider::where('business_unit_id', $buId)
                                    ->when($record, fn($query) => $query->where('id', '!=', $record->id))
                                    ->pluck('sort_order')
                                    ->filter()
                                    ->all();

                                $options = [];
                                for ($i = 1; $i <= 30; $i++) {
                                    if (!in_array($i, $used, true)) {
                                        $options[$i] = (string) $i;
                                    }
                                }
                                return $options;
                            })
                            ->helperText('Pilih nomor urutan yang masih kosong (1–30).')
                            ->columnSpanFull(),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
            ]);
    }
}
