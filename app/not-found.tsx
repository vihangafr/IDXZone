import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-24 text-center font-sans">
      <div className="max-w-md border border-gray-200 p-8 rounded-sm bg-white shadow-2xs">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Error 404
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          The requested utility tool or page does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-black text-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Back to IDX.ZONE
          </Link>
          <Link
            href="/tools"
            className="w-full sm:w-auto border border-gray-300 text-black px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:border-black transition-colors"
          >
            All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
