<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class TestR2 extends Command
{
    protected $signature = 'test:r2';
    protected $description = 'Test R2 connection';

    public function handle()
    {
        try {
            $result = Storage::disk('r2')->put('test.txt', 'Hello from Laravel!');
            $this->info('Result: ' . ($result ? 'SUCCESS' : 'FAILED'));
        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            $this->error('Class: ' . get_class($e));
            $this->error('Trace: ' . $e->getTraceAsString());
        }
    }
}