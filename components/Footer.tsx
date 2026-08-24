import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, getPopularTools } from '@/lib/tools-data';
import { ShieldCheck, Zap, Lock, Cpu } from 'lucide-react';

export default function Footer() {
  const popularTools = getPopularTools().slice(0, 8);

  return (
    <footer id="site-footer" className="mt-20 border-t border-gray-200 bg-white text-gray-600 font-sans">
      {/* Privacy and Technical Highlights */}
      <div className="border-b border-gray-100 bg-gray-50/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3 border-l-2 border-black pl-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Browser-Only Privacy</h4>
                <p className="mt-1 text-xs text-gray-500">100% client-side memory. Zero files or text transmitted.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-l-2 border-black pl-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Instant Speed</h4>
                <p className="mt-1 text-xs text-gray-500">Zero network queueing or server round-trip latency.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-l-2 border-black pl-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">No Accounts</h4>
                <p className="mt-1 text-xs text-gray-500">No logins, paywalls, cookies, or subscription tiers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-l-2 border-black pl-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Native WebAssembly</h4>
                <p className="mt-1 text-xs text-gray-500">High performance client engine in pure TypeScript.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Directory */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image
                src="/uploads/transparent-logo.png"
                alt="IDX.ZONE"
                width={140}
                height={36}
                className="h-9 w-auto max-w-full object-contain"
              />
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-gray-500">
              Production-ready browser-based tools for images, PDF, text, code, SEO, and more. Fast, private, and free.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-gray-400">
              <span>ZERO TRACKING COOKIES</span>
              <span>•</span>
              <span>STATELESS & SECURE</span>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">Categories</h3>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.id}`} className="text-gray-600 transition hover:text-black">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools Column */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">Popular Tools</h3>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              {popularTools.map((tool) => (
                <li key={tool.id}>
                  <Link href={`/tools/${tool.slug}`} className="text-gray-600 transition hover:text-black">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Site Info Column */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">Company & Legal</h3>
            <ul className="mt-3 space-y-2 text-xs font-medium">
              <li>
                <Link href="/about" className="text-gray-600 transition hover:text-black">
                  About IDX.zone
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 transition hover:text-black">
                  All 50+ Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 transition hover:text-black">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 transition hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 transition hover:text-black">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Status Strip */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-100 pt-8 sm:flex-row font-mono text-[10px] text-gray-400">
          <div className="flex gap-4 sm:gap-6">
            <span>SECURE LOCAL PROCESSING</span>
            <span>•</span>
            <span>ZERO SERVER UPLOADS</span>
          </div>
          <div className="mt-4 flex items-center gap-6 sm:mt-0">
            <span className="flex items-center gap-2 text-gray-600 font-bold">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              ALL UTILITIES ACTIVE
            </span>
            <span className="text-black font-bold">© {new Date().getFullYear()} IDX.ZONE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
