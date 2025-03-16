import React from 'react';
import { Link, router } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home({ surahs }) {
  return (
    <MainLayout title="Quran Surahs">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.data.map((surah) => (
          <Link key={surah.id} href={route('surah.show', surah.number)}>
            <Card className="h-full hover:shadow-lg bg-neutral-100 transition-shadow cursor-pointer border-emerald-100">
              <CardHeader className="">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-emerald-800">
                    {surah.number}. {surah.english_name}
                  </CardTitle>
                  <span className="text-2xl font-arabic text-emerald-700">{surah.name}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 italic">{surah.english_name_translation}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-4">Verses: {surah.number_of_ayahs}</span>
                  <span>
                    {surah.revelation_type === 'Meccan' ? 'Meccan' : 'Medinan'}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="hover:underline text-sm text-emerald-600">
                Click to read
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-2">
        {surahs.links.map((link, index) =>
          link.url ? (
            <Button
              key={index}
              onClick={() => router.visit(link.url)}
              className={`cursor-pointer px-4 py-2 ${link.active ? "bg-emerald-600 text-white hover:text-gray-700" : "bg-gray-200 text-gray-700"}`}
            >
              {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
            </Button>
          ) : (
            <span key={index} className="px-4 py-2 text-gray-400">
              {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
            </span>
          )
        )}
      </div>
    </MainLayout>
  );
}