<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\QuranApiService;

class SyncQuranData extends Command
{
    protected $signature = 'quran:sync';
    protected $description = 'Sync Quran data from AlQuran.cloud API';

    public function handle(QuranApiService $quranApi)
    {
        $this->info('Syncing Quran data...');
        
        $result = $quranApi->syncQuranData();
        
        if ($result) {
            $this->info('Quran data synced successfully!');
        } else {
            $this->error('Failed to sync Quran data.');
        }
        
        return $result ? 0 : 1;
    }
}