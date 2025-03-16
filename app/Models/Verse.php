<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Verse extends Model
{
    use HasFactory;

    protected $fillable = [
        'surah_id',
        'number',
        'number_in_surah',
        'juz',
        'manzil',
        'ruku',
        'hizb_quarter',
        'sajda',
        'text',
    ];

    protected $casts = [
        'sajda' => 'boolean',
    ];

    public function surah(): BelongsTo
    {
        return $this->belongsTo(Surah::class);
    }
}