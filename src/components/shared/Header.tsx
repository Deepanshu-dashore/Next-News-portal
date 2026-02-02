'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TopBar } from './TopBar';
import { useTopCategories } from '@/src/hooks/useCategories';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const { data: categoriesData } = useTopCategories(5);
  const categories = categoriesData?.data || [];

  const scrollToNewsletter = () => {
    const element = document.getElementById('newsletter-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full z-50">
      <TopBar />
      
      {/* Main Header / Logo Section */}
      <div className="bg-white border-b border-gray-200 py-6 md:py-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            <div className="hidden md:flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-(--accent-primary)">
                <span className="flex h-2 w-2 rounded-full bg-(--accent-primary) animate-pulse" />
                Live Now
              </div>
              <p className="text-[11px] font-bold text-(--text-muted)">Latest global updates every hour</p>
            </div>
            
            <div className="flex justify-center">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="NewsWeb Logo"
                  width={200}
                  height={60}
                  priority
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex justify-center md:justify-end gap-3">
              {/* Only show "Subscribe" button on the home page */}
              {pathname === '/' && (
                <button
                  onClick={scrollToNewsletter}
                  className="px-6 py-2 bg-(--accent-primary) text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-xs uppercase tracking-widest cursor-pointer"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation */}
      <nav 
        className={`bg-white transition-all duration-300 z-50 ${
          isScrolled 
            ? 'fixed top-0 left-0 right-0 shadow-xl py-2 border-b-2 border-(--accent-primary)' 
            : 'border-b border-gray-100 py-3'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 transition-all duration-300 ${isScrolled ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden invisible'}`}>
              <Image
                src="/logo-4by4.png"
                alt="NewsWeb"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <Link
                href="/"
                className="px-4 py-1 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-(--accent-primary) transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <Link
                href="/region/india"
                className="px-4 py-1 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-(--accent-primary) transition-colors whitespace-nowrap"
              >
                India
              </Link>
              <Link
                href="/region/world"
                className="px-4 py-1 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-(--accent-primary) transition-colors whitespace-nowrap"
              >
                World
              </Link>
              {categories.filter((cat: any) => cat.isActive).slice(0, 5).map((category: any) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  className="px-4 py-1 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-(--accent-primary) transition-colors whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/categories"
                className="px-4 py-1 text-xs font-black uppercase tracking-widest text-(--accent-primary) hover:text-gray-900 transition-colors whitespace-nowrap border border-(--accent-primary) rounded-full"
              >
                More
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors group"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Minimalistic Search Bar Overlay */}
          {showSearch && (
            <div className="py-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const query = formData.get('search') as string;
                  if (query.trim().length >= 3) {
                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                  }
                }}
                className="relative flex items-center max-w-3xl mx-auto"
              >
                <div className="absolute left-4 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Input 
                  type="search"
                  name="search"
                  placeholder="Search articles... (Press Enter)" 
                  className="pl-12 bg-gray-50 border-gray-200 h-12 text-lg focus:bg-white focus:border-(--accent-primary) transition-all rounded-full w-full"
                  autoFocus
                  minLength={3}
                />
                <button 
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="absolute right-4 text-gray-400 hover:text-gray-950 transition-colors p-1"
                  aria-label="Close search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}
