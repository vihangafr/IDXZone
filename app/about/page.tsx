import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Lock, ServerOff, Cpu, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About IDX.ZONE - Fast, Private, Client-Side Online Utilities',
  description: 'Learn why IDX.ZONE was built: fast web utilities that process 100% of your data locally in your browser with zero server uploads.',
  alternates: {
    canonical: 'https://idx.zone/about',
  },
  openGraph: {
    title: 'About IDX.ZONE - Fast, Private, Client-Side Online Utilities',
    description: 'Fast web utilities that process 100% of your data locally in your browser with zero server uploads.',
    url: 'https://idx.zone/about',
    siteName: 'IDX.ZONE',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About IDX.ZONE',
    description: 'Fast web utilities that process 100% of your data locally in your browser with zero server uploads.',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="border-b border-gray-100 pb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Overview</span>
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mt-1">About IDX.ZONE</h1>
        <p className="mt-3 text-sm text-gray-500 max-w-2xl leading-relaxed">
          A modern suite of free, lightweight online utility tools built for speed, simplicity, and absolute privacy.
        </p>
      </div>

      <div className="mt-8 space-y-10 text-xs text-gray-600 leading-relaxed">
        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-3">Core Philosophy</h2>
          <p>
            Many online tools require account signups, subscriptions, or send sensitive data to remote servers for basic tasks like resizing an image or formatting JSON.
          </p>
          <p className="mt-3">
            <strong className="text-black">IDX.ZONE runs 100% in your browser.</strong> Every tool is engineered to execute client-side using standard Web APIs. No files or strings leave your device.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-4">Core Principles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border border-gray-200 bg-white p-5 rounded-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-black text-white mb-3">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-black text-xs uppercase font-mono tracking-wider">Browser-Only Privacy</h3>
              <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
                Your files, images, PDFs, and text snippets never leave your device. Zero server storage or telemetry.
              </p>
            </div>

            <div className="border border-gray-200 bg-white p-5 rounded-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-black text-white mb-3">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-black text-xs uppercase font-mono tracking-wider">Instant Execution</h3>
              <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
                Without network latency or upload bottlenecks, file operations happen instantaneously using your local hardware.
              </p>
            </div>

            <div className="border border-gray-200 bg-white p-5 rounded-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-black text-white mb-3">
                <ServerOff className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-black text-xs uppercase font-mono tracking-wider">Zero Accounts or Paywalls</h3>
              <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
                Every single tool is unlimited and completely free. No accounts, credit cards, or subscription tiers.
              </p>
            </div>

            <div className="border border-gray-200 bg-white p-5 rounded-sm">
              <div className="w-8 h-8 flex items-center justify-center bg-black text-white mb-3">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-black text-xs uppercase font-mono tracking-wider">Deterministic Tools</h3>
              <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
                Standardized, fast, and repeatable tools built on verified web standards.
              </p>
            </div>
          </div>
        </section>

        <section className="border border-gray-200 bg-gray-50 p-6 rounded-sm">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black">Ready to get started?</h2>
          <p className="mt-1 text-xs text-gray-500">
            Explore our collection of over 50 tools designed to make your daily workflow faster.
          </p>
          <Link
            href="/tools"
            className="mt-4 inline-flex items-center gap-2 bg-black px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-gray-800 transition-colors"
          >
            <span>Browse All Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
