import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CATEGORIES, getToolsByCategory, getCategoryById } from '@/lib/tools-data';
import { ShieldCheck } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catId } = await params;
  const category = getCategoryById(catId);

  if (!category) {
    return {
      title: 'Category Not Found - IDX.ZONE',
    };
  }

  const title = `${category.name} - Free Fast Online Utilities | IDX.ZONE`;
  const description = category.description;
  const canonical = `https://idx.zone/categories/${category.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'IDX.ZONE',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catId } = await params;
  const category = getCategoryById(catId);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-gray-400">
        <Link href="/" className="transition hover:text-black">
          Index
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/categories" className="transition hover:text-black">
          Suites
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-bold text-black">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-2 py-0.5 font-bold">
              SUITE
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {tools.length} ACTIVE UTILITIES
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mt-1">{category.name}</h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed">{category.description}</p>
        </div>

        <div className="border-l-2 border-black bg-gray-50 px-4 py-2 text-xs text-gray-600 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-black font-bold">100% IN-BROWSER WORKSPACE</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool, idx) => {
          const IconComponent = (LucideIcons as any)[category.iconName] || LucideIcons.Wrench;
          const indexStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

          const badgeStyle =
            tool.category === 'image'
              ? 'bg-black text-white'
              : tool.category === 'pdf'
              ? 'bg-gray-100 text-black border border-gray-200'
              : tool.category === 'developer'
              ? 'border border-black text-black'
              : tool.category === 'text'
              ? 'bg-black text-white'
              : 'bg-gray-50 border border-dashed border-gray-400 text-black';

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="border border-gray-200 p-6 rounded-sm flex flex-col justify-between hover:border-black transition-colors cursor-pointer group bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-8 h-8 flex items-center justify-center ${badgeStyle}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  {tool.popular && (
                    <span className="font-mono text-[10px] uppercase font-bold text-gray-400 group-hover:text-black">
                      FEATURED
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-sm text-black group-hover:text-black transition-colors">
                  {tool.name}
                </h2>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-300 group-hover:text-black transition-colors uppercase">
                  {indexStr} / {tool.category}
                </span>
                <span className="text-xs font-mono text-gray-300 group-hover:text-black transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
