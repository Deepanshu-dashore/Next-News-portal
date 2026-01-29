'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { categories } from '@/lib/constants';
import { TopBar } from './TopBar';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
      <div className="bg-white border-b border-gray-200 py-6 md:py-10">
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
                <div className="w-12 h-12 bg-(--text-primary) rounded-xl flex items-center justify-center transform -rotate-3 shadow-xl transition-transform hover:rotate-0">
                  <span className="text-white font-black text-3xl">N</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-black text-4xl text-(--text-primary) tracking-tighter uppercase">NewsWeb</span>
                  <span className="text-[11px] font-black text-(--text-muted) tracking-[0.3em] uppercase mt-1">International</span>
                </div>
              </Link>
            </div>

            <div className="flex justify-center md:justify-end gap-3">
              <Button variant="secondary" size="sm">
                Login
              </Button>
              <Button variant="primary" size="sm">
                Subscribe
              </Button>
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
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="px-4 py-1 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-(--accent-primary) transition-colors whitespace-nowrap"
                >
                  {category.label}
                </Link>
              ))}
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

          {/* Search Bar Overlay */}
          {showSearch && (
            <div className="py-6 border-t border-gray-100">
              <Input 
                type="search" 
                placeholder="Type to search and press enter..." 
                className="bg-gray-50 border-none h-14 text-xl font-bold focus:ring-0 placeholder:text-gray-300"
                autoFocus
              />
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}
