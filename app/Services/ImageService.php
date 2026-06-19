<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ImageService
{
    /**
     * Convert UploadedFile ke WebP lalu upload ke R2.
     * Return path R2, contoh: sliders/abc123.webp
     *
     * @param UploadedFile $file      File yang diupload user
     * @param string       $folder    Folder tujuan di R2 (contoh: 'sliders', 'posts')
     * @param int          $quality   Kualitas WebP 1-100 (default 85)
     * @param int|null     $maxWidth  Resize lebar maksimal (null = tidak di-resize)
     */
    public static function convertAndUpload(
        UploadedFile $file,
        string $folder,
        int $quality = 85,
        ?int $maxWidth = 1920
    ): string {
        // TemporaryUploadedFile dari R2/S3: getPathname() mengembalikan storage key,
        // bukan local path. Gunakan get() untuk membaca konten langsung dari storage.
        $source = $file instanceof TemporaryUploadedFile
            ? $file->get()
            : $file->getPathname();

        $image = Image::read($source);

        if ($maxWidth && $image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        $webpContent = $image->toWebp(quality: $quality)->toString();

        $filename = Str::uuid() . '.webp';
        $r2Path   = $folder . '/' . $filename;

        Storage::disk('r2')->put($r2Path, $webpContent, 'public');

        return $r2Path;
    }

    /**
     * Convert gambar yang sudah ada di R2 ke WebP.
     * Download dari R2 → convert → upload balik → hapus yang lama.
     * Return path R2 baru.
     *
     * @param string   $r2Path   Path file di R2 (contoh: 'sliders/abc123.jpg')
     * @param int      $quality  Kualitas WebP 1-100 (default 85)
     * @param int|null $maxWidth Resize lebar maksimal (null = tidak di-resize)
     */
    public static function convertExistingR2ToWebp(
        string $r2Path,
        int $quality = 85,
        ?int $maxWidth = 1920
    ): ?string {
        if (str_ends_with(strtolower($r2Path), '.webp')) {
            return $r2Path;
        }

        try {
            $contents = Storage::disk('r2')->get($r2Path);
            if (!$contents) return null;

            $image = Image::read($contents);

            if ($maxWidth && $image->width() > $maxWidth) {
                $image->scale(width: $maxWidth);
            }

            $webpContent = $image->toWebp(quality: $quality)->toString();

            $newPath = preg_replace('/\.(jpg|jpeg|png|gif|webp)$/i', '.webp', $r2Path);

            Storage::disk('r2')->put($newPath, $webpContent, 'public');

            if ($newPath !== $r2Path) {
                Storage::disk('r2')->delete($r2Path);
            }

            return $newPath;
        } catch (\Throwable $e) {
            \Log::error("ImageService::convertExistingR2ToWebp gagal untuk {$r2Path}: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Convert UploadedFile ke WebP lalu encode ke base64 DENGAN prefix HRIS.
     *
     * Format return mengikuti konvensi HRIS Program (hardcoded image/png):
     *   "data:image/png;base64,UklGRlYAAABXRUJQVlA4..."
     *
     * Note: prefix "image/png" sengaja hardcoded untuk konsistensi dengan
     * HRIS, meski isi sebenarnya WebP. Browser lenient → tetap render.
     *
     * @param UploadedFile $file      File foto yang diupload user
     * @param int          $quality   Kualitas WebP 1-100 (default 85)
     * @param int|null     $maxWidth  Resize lebar maksimal (null = tidak di-resize)
     */
    public static function convertToBase64(
        UploadedFile $file,
        int $quality = 85,
        ?int $maxWidth = 800
    ): string {
        $image = Image::read($file->getPathname());

        if ($maxWidth && $image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        $webpContent = $image->toWebp(quality: $quality)->toString();

        // Format HRIS-style: prefix data URI hardcoded image/png
        return \App\Models\Applicant::addHrisPrefix(base64_encode($webpContent));
    }
}