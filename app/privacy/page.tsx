import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - IDX.ZONE',
  description: 'Our privacy commitment: zero server uploads, 100% browser-based processing, no user tracking.',
  alternates: {
    canonical: 'https://idx.zone/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - IDX.ZONE',
    description: 'Zero server uploads, 100% browser-based processing, no user tracking.',
    url: 'https://idx.zone/privacy',
    siteName: 'IDX.ZONE',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - IDX.ZONE',
    description: 'Zero server uploads, 100% browser-based processing, no user tracking.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="border-b border-gray-100 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Security & Ethics</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mt-1">Privacy Policy</h1>
        <p className="mt-2 text-xs text-gray-400 font-mono">REVISED: JANUARY 2026</p>
      </div>

      <div className="mt-6 border-l-2 border-black bg-gray-50 p-4 font-mono text-xs text-gray-700 leading-relaxed">
        <strong className="text-black font-bold uppercase tracking-wider block mb-1">Architecture Promise:</strong>
        IDX.zone processes all files, images, PDFs, text, and data locally in your web browser. We do not store, copy, or transmit your private content to any server.
      </div>

      <div className="mt-8 space-y-8 text-xs text-gray-600 leading-relaxed">
        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">1. Client-Side Data Processing</h2>
          <p>
            All file processing operations—including image compression, image format conversion, PDF manipulation, text formatting, and cryptography calculations—are executed entirely in your browser using JavaScript and HTML5 APIs. At no point are your files uploaded to IDX.zone servers.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">2. No Account or Registration Required</h2>
          <p>
            You can use any tool on IDX.zone without providing an email address, name, phone number, or payment details. We do not collect or store personal user accounts.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">3. Cookies and Local Storage</h2>
          <p>
            IDX.zone may use browser local storage solely to retain your client-side UI preferences (such as recent tool searches or theme preferences). No tracking cookies are used to profile your identity.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">4. Third-Party Services</h2>
          <p>
            Our static site is hosted on cloud infrastructure (such as Vercel) which may collect standard technical access logs (such as IP addresses and browser user-agents) purely for security, DDoS protection, and site availability.
          </p>
        </section>

        <section className="border border-gray-200 p-6 rounded-sm bg-white">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-black mb-2">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, you can reach out via email at <code className="bg-gray-100 px-1 py-0.5 font-mono text-black font-bold">privacy@idx.zone</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
