import React from 'react';
import Link from 'next/link';
import { ToolDefinition, getToolBySlug, CATEGORIES } from '@/lib/tools-data';
import { ChevronRight, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

interface ToolLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  const categoryInfo = CATEGORIES.find((c) => c.id === tool.category);
  const relatedTools = tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));

  const toolShareData = {
    title: `${tool.name} — Free Browser Tool`,
    text: tool.tagline || tool.description,
    url: `/tools/${tool.slug}`,
    category: categoryInfo?.name || tool.category,
    isTool: true,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-gray-400">
        <Link href="/" className="transition hover:text-black">
          Index
        </Link>
        <span className="text-gray-300">/</span>
        <Link href={`/categories/${tool.category}`} className="transition hover:text-black">
          {categoryInfo?.name || tool.category}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-bold text-black">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="mb-8 border-b border-gray-100 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center bg-black px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white">
              {categoryInfo?.name || tool.category}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-mono text-gray-700">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span>CLIENT-SIDE ENGINE</span>
            </span>
          </div>

          {/* Single Dedicated Tool Share Button */}
          <ShareButton
            data={toolShareData}
            label={`Share ${tool.name}`}
            variant="secondary"
            id={`share-tool-${tool.slug}`}
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black leading-tight">
          {tool.name}
        </h1>
        <p className="mt-2 text-base text-gray-500 max-w-3xl leading-relaxed">
          {tool.tagline}
        </p>
      </div>

      {/* Privacy Notice Banner */}
      <div className="mb-8 flex items-center justify-between border-l-2 border-black bg-gray-50 px-4 py-3 text-xs text-gray-600">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-black" />
          <span>
            <strong className="text-black font-semibold">Zero Server Storage:</strong> All computation and file conversion runs 100% locally in your browser memory.
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-gray-400 uppercase tracking-widest">
          SANDBOXED
        </span>
      </div>

      {/* Main Tool Interactive Box */}
      <div id="tool-interface-container" className="mb-16 border border-gray-200 bg-white p-4 sm:p-6 md:p-8 rounded-sm">
        {children}
      </div>

      {/* How it Works Section */}
      {tool.howItWorks && tool.howItWorks.length > 0 && (
        <section className="mb-16 border border-gray-200 bg-gray-50/40 p-6 sm:p-8 rounded-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider text-black font-mono">
              Operating Manual
            </h2>
            <span className="text-[10px] font-mono text-gray-400 uppercase">3-STEP WORKFLOW</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {tool.howItWorks.map((step, index) => (
              <div key={index} className="border border-gray-200 bg-white p-5 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 bg-black text-white font-mono text-xs font-bold flex items-center justify-center mb-3">
                    0{index + 1}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Description & Technical Specifications */}
      <section className="mb-16 border-t border-gray-100 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-black font-mono uppercase tracking-wider">
            About This Tool
          </h2>
          <span className="text-[10px] font-mono text-gray-400 uppercase">INFORMATION</span>
        </div>
        <div className="space-y-4 text-xs leading-relaxed text-gray-600 font-sans">
          <p>{tool.description}</p>
          <p>
            This tool processes your input locally in your web browser. Your files, texts, and data never leave your device, ensuring total privacy and instant results with zero wait times.
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mb-16 border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-black font-mono uppercase tracking-wider">
              Frequently Asked Questions
            </h2>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <div className="divide-y divide-gray-100 border border-gray-200 bg-white rounded-sm">
            {tool.faqs.map((faq, index) => (
              <div key={index} className="p-5 sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-black font-mono">{faq.question}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 font-sans">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mb-8 border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-black font-mono uppercase tracking-wider">
              Complementary Tools
            </h2>
            <Link href="/tools" className="text-xs font-mono text-gray-400 hover:text-black uppercase">
              All Tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((relTool, idx) => (
              <Link
                key={relTool.id}
                href={`/tools/${relTool.slug}`}
                className="group border border-gray-200 bg-white p-4 rounded-sm flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-100 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase text-gray-700">
                      {relTool.category}
                    </span>
                    <ArrowRight className="h-3 w-3 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-black" />
                  </div>
                  <h3 className="text-xs font-bold text-black group-hover:text-black">
                    {relTool.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] text-gray-400 leading-normal">
                    {relTool.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-50 flex items-center justify-between font-mono text-[9px] text-gray-400 group-hover:text-black">
                  <span>0{idx + 1} / LINK</span>
                  <span>OPEN →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
