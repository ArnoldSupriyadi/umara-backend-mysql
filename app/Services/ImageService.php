<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class ImageService
{
    /**
     * Convert UploadedFile ke WebP lalu upload ke R2.
     * Return path R2, contoh: sliders/abc123.webp
     *
     * @param UploadedFile $file    File yang diupload user
     * @param string       $folder  Folder tujuan di R2 (contoh: 'sliders', 'posts')
     * @param int          $quality Kualitas WebP 1-100 (default 85 — balance antara kualitas & ukuran)
     * @param int|null     $maxWidth  Resize lebar maksimal (null = tidak di-resize)
     */
    public static function convertAndUpload(
        UploadedFile $file,
        string $folder,
        int $quality = 85,
        ?int $maxWidth = 1920
    ): string {
        // 1. Buka gambar dengan Intervention Image
        $image = Image::read($file->getPathname());

        // 2. Resize jika lebar melebihi maxWidth (jaga aspect ratio)
        if ($maxWidth && $image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        // 3. Encode ke WebP
        $webpContent = $image->toWebp(quality: $quality)->toString();

        // 4. Generate nama file unik dengan ekstensi .webp
        $filename = Str::uuid() . '.webp';
        $r2Path   = $folder . '/' . $filename;

        // 5. Upload ke R2
        Storage::disk('r2')->put($r2Path, $webpContent, 'public');

        return $r2Path;
    }

    /**
     * Convert gambar yang sudah ada di R2 ke WebP.
     * Download dari R2 → convert → upload balik → hapus yang lama.
     * Return path R2 baru.
     */
    public static function convertExistingR2ToWebp(
        string $r2Path,
        int $quality = 85,
        ?int $maxWidth = 1920
    ): ?string {
        // Skip kalau sudah WebP
        if (str_ends_with(strtolower($r2Path), '.webp')) {
            return $r2Path;
        }

        try {
            // 1. Download dari R2
            $contents = Storage::disk('r2')->get($r2Path);
            if (!$contents) return null;

            // 2. Convert ke WebP
            $image = Image::read($contents);

            if ($maxWidth && $image->width() > $maxWidth) {
                $image->scale(width: $maxWidth);
            }

            $webpContent = $image->toWebp(quality: $quality)->toString();

            // 3. Buat path baru dengan ekstensi .webp
            $newPath = preg_replace('/\.(jpg|jpeg|png|gif|webp)$/i', '.webp', $r2Path);

            // 4. Upload WebP ke R2
            Storage::disk('r2')->put($newPath, $webpContent, 'public');

            // 5. Hapus file lama (jika nama berbeda)
            if ($newPath !== $r2Path) {
                Storage::disk('r2')->delete($r2Path);
            }

            return $newPath;
        } catch (\Throwable $e) {
            \Log::error("ImageService::convertExistingR2ToWebp gagal untuk {$r2Path}: " . $e->getMessage());
            return null;
        }
    }
}
