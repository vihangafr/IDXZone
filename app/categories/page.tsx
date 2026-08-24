import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CATEGORIES, ALL_TOOLS } from '@/lib/tools-data';
import CategoryIcon from '@/components/CategoryIcon';

export const metadata: Metadata = {
  title: 'Tool Categories - Free Fast Online Utilities | IDX.ZONE',
  description: 'Explore tools by category: Image tools, PDF utilities, Text editors, Developer utilities, and SEO audit tools.',
  alternates: {
    canonical: 'https://idx.zone/categories',
  },
  openGraph: {
    title: 'Tool Categories - Free Fast Online Utilities | IDX.ZONE',
    description: 'Explore tools by category: Image tools, PDF utilities, Text editors, Developer utilities, and SEO audit tools.',
    url: 'https://idx.zone/categories',
    siteName: 'IDX.ZONE',
    type: 'website',
  },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="mb-10 border-b border-gray-100 pb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Architecture</span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mt-1">Functional Suites</h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-md">
          Organized suites for media transformation, developer workflows, document processing, and optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat, idx) => {
          const toolsInCat = ALL_TOOLS.filter((t) => t.category === cat.id);
          const indexStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <div
              key={cat.id}
              className="flex flex-col justify-between border border-gray-200 bg-white p-6 rounded-sm hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 bg-black text-white flex items-center justify-center">
                    <CategoryIcon name={cat.iconName} className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-gray-400">
                    {toolsInCat.length} TOOLS
                  </span>
                </div>

                <h2 className="text-base font-bold text-black font-sans">{cat.name}</h2>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed font-sans">{cat.description}</p>

                <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
                  {toolsInCat.slice(0, 5).map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="block text-xs font-mono text-gray-600 hover:text-black transition-colors truncate"
                    >
                      → {t.name}
                    </Link>
                  ))}
                  {toolsInCat.length > 5 && (
                    <p className="text-[10px] font-mono text-gray-400 pt-1">
                      +{toolsInCat.length - 5} more tools in suite
                    </p>
                  )}
                </div>
              </div>

              <Link
                href={`/categories/${cat.id}`}
                className="mt-6 flex items-center justify-between border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <span>OPEN SUITE {indexStr}</span>
                <span>→</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
