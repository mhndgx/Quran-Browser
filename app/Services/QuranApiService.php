<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Surah;
use App\Models\Verse;

class QuranApiService
{
    protected $baseUrl = 'https://api.alquran.cloud/v1';

    public function fetchAllSurahs()
    {
        $response = Http::get("{$this->baseUrl}/surah");
        
        if ($response->successful()) {
            return $response->json()['data'];
        }
        
        return null;
    }

    public function fetchSurahVerses($surahNumber)
    {
        $response = Http::get("{$this->baseUrl}/surah/{$surahNumber}");
        
        if ($response->successful()) {
            return $response->json()['data'];
        }
        
        return null;
    }

    public function syncQuranData()
    {
        // Fetch all surahs
        $surahs = $this->fetchAllSurahs();
        
        if (!$surahs) {
            return false;
        }
        
        foreach ($surahs as $surahData) {
            // Create or update surah
            $surah = Surah::updateOrCreate(
                ['number' => $surahData['number']],
                [
                    'name' => $surahData['name'],
                    'english_name' => $surahData['englishName'],
                    'english_name_translation' => $surahData['englishNameTranslation'],
                    'number_of_ayahs' => $surahData['numberOfAyahs'],
                    'revelation_type' => $surahData['revelationType'],
                ]
            );
            
            // Fetch verses for this surah
            $surahDetail = $this->fetchSurahVerses($surah->number);
            
            if ($surahDetail && isset($surahDetail['ayahs'])) {
                foreach ($surahDetail['ayahs'] as $ayah) {
                    Verse::updateOrCreate(
                        [
                            'surah_id' => $surah->id,
                            'number_in_surah' => $ayah['numberInSurah'],
                        ],
                        [
                            'number' => $ayah['number'],
                            'juz' => $ayah['juz'],
                            'manzil' => $ayah['manzil'],
                            'ruku' => $ayah['ruku'],
                            'hizb_quarter' => $ayah['hizbQuarter'],
                            'sajda' => isset($ayah['sajda']) ? true : false,
                            'text' => $ayah['text'],
                        ]
                    );
                }
            }
        }
        
        return true;
    }
}