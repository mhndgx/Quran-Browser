import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Surah({ surah, verses, isDark: initialTheme }) {
  function removeBismillah(ayahText, ayahNumber) {
    const bismillah = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ";
    if (ayahNumber === 1 && ayahText.startsWith(bismillah)) {
      return ayahText.replace(bismillah, "").trim();
    }
    return ayahText;
  }
  const [isDark, setIsDark] = useState(initialTheme);

  function toggleTheme() {
    console.log('button click');
    fetch('/toggle-theme', {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
    })
      .then((res) => res.json())
      .then((data) => setIsDark(data.theme === 'dark')).catch(()=> console.log('error'));
  }
  return (
    <MainLayout title={`${surah.english_name} - ${surah.name}`}>
      <div className="mb-6 bg-emerald-50 p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl text-emerald-800">
              {surah.english_name} - {surah.english_name_translation}
            </h2>
            <p className="text-gray-600">
              {surah.revelation_type} · {surah.number_of_ayahs} verses
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-2">
              {surah.number > 1 && (
                <Link href={route('surah.show', surah.number - 1)}>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous Surah
                  </Button>
                </Link>
              )}
              {surah.number < 114 && (
                <Link href={route('surah.show', surah.number + 1)}>
                  <Button variant="outline" size="sm" className="flex items-center">
                    Next Surah
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Card className={isDark ? 'bg-gray-800' : 'bg-gray-100'}>
        <CardContent className="p-6">
        <Button onClick={toggleTheme} size="icon" variant="outline" className='cursor-pointer hover:bg-gray-700'>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {/* Bismillah except for Surah At-Tawbah (9) */}
          {surah.number !== 9 && (
            <div className="text-center mb-8 p-4 rounded">
              <p className={`text-2xl font-arabic ${isDark ? "text-white" : "text-gray-900"}`}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className={`mt-2 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
            </div>
          )}

          <div className="space-y-6">
            {verses.map((verse) => (
              <div 
                key={verse.id} 
                className={`group selection:bg-amber-400 ${isDark ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-50 hover:text-black" : "bg-slate-200 text-gray-900 hover:bg-white/10 border-gray-300"}  p-4 border-b rounded-xl `}
                id={`verse-${verse.number_in_surah}`}
              >
                <div className="flex justify-between mb-2">
                  <span className={`${isDark ? "bg-emerald-100 text-emerald-800" : "bg-slate-600 text-gray-100"}   font-bold px-2 py-1 rounded-full text-sm`}>
                    {verse.number_in_surah}
                  </span>
                  <div className={`text-xs ${isDark ? "text-white " : "text-gray-900"} group-hover:text-gray-600 space-x-2`}>
                    <span>Juz {verse.juz}</span>
                    <span>·</span>
                    <span>Hizb {Math.ceil(verse.hizb_quarter / 4)}</span>
                    {verse.text.includes('۩') && (
                      <>
                        <span>·</span>
                        <span className="font-bold text-amber-600">Sajda</span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-right text-2xl leading-loose font-arabic mb-2">{(verse.surah_id !== 1 && verse.number_in_surah === 1) ? removeBismillah(verse.text,verse.number_in_surah) : verse.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}