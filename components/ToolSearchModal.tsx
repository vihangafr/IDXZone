'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { TOOLS, CATEGORIES, ToolDefinition } from '@/lib/tools-data';

interface ToolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ToolSearchModal({ isOpen, onClose }: ToolSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery('');
    setSelectedCategory('all');
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          const btn = document.getElementById('search-open-btn');
          btn?.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    if (!matchesCat) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs font-sans"
      onClick={handleClose}
    >
      <div
        id="search-modal-card"
        className="w-full max-w-2xl overflow-hidden rounded-sm border-2 border-black bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-200 px-4">
          <span className="font-mono text-xs text-gray-400">⌘</span>
          <input
            ref={inputRef}
            type="text"
            id="search-tools-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 50+ free tools (e.g. image compress, json, pdf)..."
            className="h-14 w-full bg-transparent px-3 text-xs text-black placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 p-1 text-gray-400 hover:text-black font-mono text-xs"
            >
              ✕
            </button>
          )}
          <button
            onClick={handleClose}
            className="border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-mono font-bold text-gray-500 hover:bg-black hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-gray-100 bg-gray-50/70 px-4 py-2 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-sm transition ${
              selectedCategory === 'all'
                ? 'bg-black text-white font-bold'
                : 'text-gray-600 hover:bg-gray-200/60'
            }`}
          >
            All ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-sm transition ${
                selectedCategory === cat.id
                  ? 'bg-black text-white font-bold'
                  : 'text-gray-600 hover:bg-gray-200/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xs font-mono text-gray-700">No tools found for &quot;{query}&quot;</p>
              <p className="mt-1 text-[11px] text-gray-400">Try searching for &quot;resize&quot;, &quot;format&quot;, &quot;encode&quot;, or &quot;pdf&quot;.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTools.map((tool: ToolDefinition, idx: number) => {
                const indexStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-sm px-3 py-2.5 transition hover:bg-gray-50 border border-transparent hover:border-gray-200"
                  >
                    <div className="pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-black group-hover:text-black">
                          {tool.name}
                        </span>
                        <span className="bg-gray-100 px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold text-gray-600">
                          {tool.category}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-400">{tool.tagline}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2.5 font-mono text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span>100% IN-BROWSER WORKSPACE</span>
          </div>
          <span>{filteredTools.length} UTILITIES</span>
        </div>
      </div>
    </div>
  );
}
