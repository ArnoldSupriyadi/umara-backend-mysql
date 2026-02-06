@php
    $getImageUrl = function ($path) {
        if (!$path) return null;
        if (str_starts_with($path, 'http')) return $path;
        if (file_exists(public_path(ltrim($path, '/')))) return asset($path);
        return asset('storage/' . $path);
    };
@endphp

<div class="space-y-4">
    <div>
        <h3 class="text-lg font-medium text-gray-950 dark:text-white mb-2">Main Image</h3>
        @if($mainUrl = $getImageUrl($record->main_image))
            <img src="{{ $mainUrl }}" alt="Main Image" class="w-full rounded-lg object-cover" style="max-height: 400px;">
        @else
            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-500">
                No main image available
            </div>
        @endif
    </div>

    @if(!empty($record->gallery_images) && is_array($record->gallery_images))
        <div>
            <h3 class="text-lg font-medium text-gray-950 dark:text-white mb-2">Gallery Images</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                @foreach($record->gallery_images as $image)
                    @if($galleryUrl = $getImageUrl($image))
                        <div class="relative group">
                            <img src="{{ $galleryUrl }}" alt="Gallery Image" class="w-full aspect-square object-cover rounded-lg">
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
    @endif
</div>
