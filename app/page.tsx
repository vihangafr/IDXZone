import React from 'react';
import Link from 'next/link';
import { ALL_TOOLS, CATEGORIES } from '@/lib/tools-data';
import CategoryIcon from '@/components/CategoryIcon';
import ShareButton from '@/components/ShareButton';
import ToolsExplorer from '@/components/ToolsExplorer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Hero Header Section */}
      <section className="border-b border-gray-100 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-mono text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>100% BROWSER PROCESSING • ZERO SERVERS</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] text-black">
                Simple, Fast,<br />Free Tools.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed">
                Production-ready utilities for images, PDF, text, and code. No tracking, no accounts, just pure browser-based speed.
              </p>
            </div>

            {/* Quick Stats Block & Share Button */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-gray-600">
              <div className="border border-gray-200 p-3 bg-gray-50/50 min-w-[120px]">
                <div className="text-xl font-bold text-black">{ALL_TOOLS.length}+</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Active Utilities</div>
              </div>
              <div className="border border-gray-200 p-3 bg-gray-50/50 min-w-[120px]">
                <div className="text-xl font-bold text-black">100%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Local Privacy</div>
              </div>
              <div className="w-full sm:w-auto">
                <ShareButton
                  id="hero-share-website-btn"
                  label="Share Website"
                  variant="primary"
                  className="w-full sm:w-auto h-[62px] px-5"
                />
              </div>
            </div>
          </div>

          {/* Interactive Tools Search and Grid (Client Hydrated Component) */}
          <ToolsExplorer />
        </div>
      </section>

      {/* Category Directory Section */}
      <section className="border-t border-gray-200 bg-gray-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Architecture</span>
              <h2 className="text-3xl font-bold tracking-tight text-black mt-1">Functional Suites</h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs text-gray-500 font-mono">
              Engineered for developer workflows, media processing, and document manipulation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat, idx) => {
              const count = ALL_TOOLS.filter((t) => t.category === cat.id).length;
              const indexStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="border border-gray-200 bg-white p-5 rounded-sm flex flex-col justify-between hover:border-black transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
                        <CategoryIcon name={cat.iconName} className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 group-hover:text-black">
                        {count} TOOLS
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-black">{cat.name}</h3>
                    <p className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">{cat.description}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between font-mono text-[10px] text-gray-400 group-hover:text-black">
                    <span>{indexStr} / SUITE</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modernist Privacy & Engine Callout */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-2 border-black p-8 sm:p-12 bg-white rounded-sm">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
              Zero-Cloud Philosophy
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-black">
              Pure Local Computing. No Uploads.
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
              Traditional web utilities upload your confidential files, code snippets, and client assets to remote cloud servers for processing. IDX.zone runs 100% inside your browser environment through JavaScript and WebAssembly. Your data never leaves your device.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-gray-100 pt-8 font-mono">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-black">100% In-Browser</h4>
                <p className="mt-1 text-xs text-gray-500 font-sans">
                  Standard Web APIs and WASM engines.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-black">Zero Latency</h4>
                <p className="mt-1 text-xs text-gray-500 font-sans">
                  No upload queueing or network waits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-black">Open & Free</h4>
                <p className="mt-1 text-xs text-gray-500 font-sans">
                  No subscriptions, logins, or usage caps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
