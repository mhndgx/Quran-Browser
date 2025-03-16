<?php

namespace App\Http\Controllers;

use App\Models\Surah;
use App\Models\Verse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuranController extends Controller
{
    public function index()
    {
        $surahs = Surah::paginate(9)->toArray();
        return Inertia::render('Home', ['surahs' => $surahs]);
    }

    public function showSurah($number)
    {
        $surah = Surah::where('number', $number)->firstOrFail();
        $verses = $surah->verses()->orderBy('number_in_surah')->get();
        
        return Inertia::render('Surah', [
            'surah' => $surah,
            'verses' => $verses,
            'isDark' => session('theme', 'dark') === 'dark',
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $verses = [];
        $query = removeTashkeel($query);
        if ($query) {
            $verses = Verse::where('text', 'like', '%' . $query . '%')
                ->with('surah')
                ->paginate(20);
        }
        
        return Inertia::render('Search', [
            'query' => $query,
            'verses' => $verses,
        ]);
    }


}