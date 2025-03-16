import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Search({ query, verses }) {
  const [searchQuery, setSearchQuery] = React.useState(query || '');

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = route('search', { query: searchQuery });
  };

  return (
    <MainLayout title="Search Results">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="text"
            placeholder="Search the Quran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>
      </div>

      {query ? (
        <>
          <h2 className="text-xl mb-4">Results for: <span className="font-semibold">"{query}"</span></h2>
          
          {verses.data && verses.data.length > 0 ? (
            <div className="space-y-4">
              {verses.data.map((verse) => (
                <Card key={verse.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <Link 
                        href={`${route('surah.show', verse.surah.number)}#verse-${verse.number_in_surah}`}
                        className="block"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="text-lg font-semibold text-emerald-800">
                            {verse.surah.english_name} ({verse.surah.number}:{verse.number_in_surah})
                          </h3>
                        </div>
                        <p className="text-right text-xl leading-loose font-arabic mb-2">{verse.text}</p>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No results found for "{query}"</p>
            </div>
          )}

          {/* Pagination controls would go here */}
        </>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Enter a search term to find verses in the Quran</p>
        </div>
      )}
    </MainLayout>
  );
}