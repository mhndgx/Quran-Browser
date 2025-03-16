<?php

use App\Http\Controllers\QuranController;
use Illuminate\Support\Facades\Route;

Route::get('/', [QuranController::class, 'index'])->name('home');
Route::get('/surah/{number}', [QuranController::class, 'showSurah'])->name('surah.show');
Route::get('/search', [QuranController::class, 'search'])->name('search');
Route::post('/toggle-theme', function (Request $request) {
    $theme = session('theme', 'dark') === 'dark' ? 'light' : 'dark';
    session(['theme' => $theme]);
    return response()->json(['theme' => $theme]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
