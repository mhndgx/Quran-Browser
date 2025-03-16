<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Surah extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'name',
        'english_name',
        'english_name_translation',
        'number_of_ayahs',
        'revelation_type',
    ];

    public function verses(): HasMany
    {
        return $this->hasMany(Verse::class);
    }
}
