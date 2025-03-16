import React from 'react';
import { Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MainLayout({ children, title = 'Quran Browser' }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = route('search', { query: searchQuery });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href={route('home')} className="text-xl font-bold">Quran Browser</Link>
          </div>
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search the Quran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white text-gray-800"
              />
              <Button type="submit" className="ml-2 bg-emerald-600 hover:bg-emerald-800 cursor-pointer">
                Search
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {title && <h1 className="text-3xl font-bold mb-6 text-emerald-800">{title}</h1>}
        {children}
      </main>

      <footer className="bg-emerald-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Quran Browser - Built with Laravel, Inertia, React & Tailwind CSS by Mohanad Khalaf</p>
          <p className="mt-2 text-sm text-emerald-200">
            Data provided by <a href="https://alquran.cloud/api" className="underline" target="_blank" rel="noopener noreferrer">AlQuran.cloud API</a>
          </p>
        </div>
      </footer>
    </div>
  );
}