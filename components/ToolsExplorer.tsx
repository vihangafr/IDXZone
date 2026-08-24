'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_TOOLS, CATEGORIES, ToolDefinition } from '@/lib/tools-data';
import CategoryIcon from '@/components/CategoryIcon';

interface ToolsExplorerProps {
  initialCategory?: string;
}

export default function ToolsExplorer({ initialCategory = 'all' }: ToolsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    return ALL_TOOLS.filter((tool) => {
      const matchCat = activeCategory === 'all' || tool.category === activeCategory;
      if (!matchCat) return false;
      if (!trimmedQuery) return true;

      return (
        tool.name.toLowerCase().includes(trimmedQuery) ||
        tool.description.toLowerCase().includes(trimmedQuery) ||
        (tool.keywords && tool.keywords.some((t) => t.toLowerCase().includes(trimmedQuery)))
      );
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      {/* Search & Category Filter Controls */}
      <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 font-mono text-xs">
            ⌘
          </div>
          <input
            type="text"
            id="homepage-tool-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools (e.g. image compress, json, pdf)..."
            className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 pl-8 pr-8 text-xs text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 hover:text-black"
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm border ${
              activeCategory === 'all'
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
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm border ${
                  activeCategory === cat.id
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Section */}
      <section className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">
              {searchQuery
                ? `Search Results (${filteredTools.length})`
                : activeCategory === 'all'
                ? 'All Tools & Utilities'
                : `${CATEGORIES.find((c) => c.id === activeCategory)?.name} (${filteredTools.length})`}
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 hover:text-black flex items-center gap-1 group"
          >
            <span>Directory</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool, idx) => {
              const catInfo = CATEGORIES.find((c) => c.id === tool.category);
              const iconName = catInfo?.iconName || 'Wrench';

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
                        <CategoryIcon name={iconName} className="h-4 w-4" />
                      </div>
                      {tool.popular && (
                        <span className="font-mono text-[10px] uppercase font-bold text-gray-400 group-hover:text-black">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-black group-hover:text-black transition-colors">
                      {tool.name}
                    </h3>
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
            <p className="text-sm font-mono text-gray-500">No tools matching &quot;{searchQuery}&quot; found.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs font-mono font-bold uppercase underline text-black hover:text-gray-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
