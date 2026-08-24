'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Search, Menu, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/tools-data';

// Dynamically load the search modal only when requested
const ToolSearchModal = dynamic(() => import('./ToolSearchModal'), {
  ssr: false,
});

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Global keyboard shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header id="site-header" className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              id="nav-logo"
              className="flex items-center gap-2 group transition-opacity hover:opacity-85"
            >
              {/* Brand Logo */}
              <div className="relative flex h-8 sm:h-9 w-auto items-center">
                <Image
                  src="/uploads/transparent-logo.png"
                  alt="IDX.ZONE"
                  width={144}
                  height={36}
                  className="h-8 sm:h-9 w-auto max-w-full object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Link
                href="/tools"
                className={`transition-colors hover:text-black ${pathname === '/tools' ? 'text-black font-bold border-b-2 border-black pb-0.5' : ''}`}
              >
                All Tools
              </Link>
              <Link
                href="/categories"
                className={`transition-colors hover:text-black ${pathname === '/categories' ? 'text-black font-bold border-b-2 border-black pb-0.5' : ''}`}
              >
                Categories
              </Link>
              <Link
                href="/privacy"
                className={`transition-colors hover:text-black ${pathname === '/privacy' ? 'text-black font-bold border-b-2 border-black pb-0.5' : ''}`}
              >
                Privacy
              </Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              type="button"
              id="search-open-btn"
              onClick={() => setIsSearchOpen(true)}
              className="group relative flex h-9 items-center gap-2 rounded-sm border border-gray-200 bg-gray-50 px-3 text-xs text-gray-500 transition-colors hover:border-black hover:bg-white hover:text-black sm:w-56"
            >
              <Search className="h-3.5 w-3.5 text-gray-400 group-hover:text-black transition-colors" />
              <span className="flex-1 text-left font-mono text-[11px]">Search tools...</span>
              <kbd className="hidden sm:inline-block border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-gray-500">
                ⌘K
              </kbd>
            </button>

            {/* Privacy Badge */}
            <div className="hidden lg:flex items-center gap-1.5 border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-mono text-gray-700">
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></div>
              <span>100% LOCAL PROCESSING</span>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center border border-gray-200 text-black transition-colors hover:border-black md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 text-black" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="border-b border-gray-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-50"
              >
                Browse All Tools
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-50"
              >
                Browse Categories
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-50"
              >
                Privacy Policy
              </Link>
              <div className="border-t border-gray-100 pt-3">
                <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  Categories
                </p>
                <div className="mt-2 space-y-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs text-gray-600 hover:text-black hover:bg-gray-50"
                    >
                      <span>{cat.name}</span>
                      <span className="font-mono text-[10px] text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal - Lazy Loaded */}
      {isSearchOpen && (
        <ToolSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
