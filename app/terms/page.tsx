import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - IDX.ZONE',
  description: 'Terms and conditions for using IDX.ZONE online tools and utilities.',
  alternates: {
    canonical: 'https://idx.zone/terms',
  },
  openGraph: {
    title: 'Terms of Service - IDX.ZONE',
    description: 'Terms and conditions for using IDX.ZONE online tools and utilities.',
    url: 'https://idx.zone/terms',
    siteName: 'IDX.ZONE',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - IDX.ZONE',
    description: 'Terms and conditions for using IDX.ZONE online tools and utilities.',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="border-b border-gray-100 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mt-1">Terms of Service</h1>
        <p className="mt-2 text-xs text-gray-400 font-mono">REVISED: JANUARY 2026</p>
      </div>

      <div className="mt-8 space-y-8 text-xs text-gray-600 leading-relaxed">
        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using IDX.zone, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">2. Use of Services</h2>
          <p>
            IDX.zone grants you a non-exclusive, non-transferable, revocable license to use our web tools for personal or commercial purposes free of charge. You agree not to misuse our website or attempt to interfere with the proper working of our services.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">3. Disclaimer of Warranties</h2>
          <p>
            The services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. IDX.zone makes no representations or warranties of any kind, express or implied, regarding the operation or availability of the website or the accuracy of its tools.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">4. Limitation of Liability</h2>
          <p>
            In no event shall IDX.zone, its creators, or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted directly on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
