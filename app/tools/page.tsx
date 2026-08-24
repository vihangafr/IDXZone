'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_TOOLS, CATEGORIES } from '@/lib/tools-data';
import { Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function ToolsDirectoryPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        !query.trim() ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        (tool.keywords && tool.keywords.some((t) => t.toLowerCase().includes(query.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [query, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <div className="mb-10 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Complete Registry</span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mt-1">Utility Catalog</h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-md">
            Full directory of {ALL_TOOLS.length} browser-native, zero-cloud tools.
          </p>
        </div>
        <div className="font-mono text-xs text-gray-500">
          <span className="font-bold text-black">{filteredTools.length}</span> tools listed
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Chips */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm border ${
              selectedCategory === 'all'
                ? 'bg-black text-white border-black font-bold'
                : 'bg-white text-gray-600 border-gray-200 hover:border-black'
            }`}
          >
            All ({ALL_TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = ALL_TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm border ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 font-mono text-xs">
            ⌘
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter catalog..."
            className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 pl-8 pr-8 text-xs text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool, idx) => {
            const catInfo = CATEGORIES.find((c) => c.id === tool.category);
            const iconName = catInfo?.iconName || 'Wrench';
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Wrench;

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

            const indexStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

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
      ) : (
        <div className="border border-dashed border-gray-300 p-12 text-center rounded-sm">
          <p className="text-sm font-mono text-gray-500">No tools matching &quot;{query}&quot; found in this filter.</p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-mono font-bold uppercase underline text-black hover:text-gray-600"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
