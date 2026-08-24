'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/CopyButton';
import { Download, Globe, Search, ShieldCheck, Check, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

/* ----------------------------------------------------
   1. Meta Tag Generator
---------------------------------------------------- */
export function MetaTagGeneratorTool() {
  const [title, setTitle] = useState<string>('IDX.zone - Free Fast Online Tools');
  const [description, setDescription] = useState<string>(
    'Free online tools for image, PDF, text, developer, and SEO tasks. 100% client-side with zero file uploads.'
  );
  const [url, setUrl] = useState<string>('https://idx.zone');
  const [imageUrl, setImageUrl] = useState<string>('https://idx.zone/og-image.png');
  const [author, setAuthor] = useState<string>('IDX.zone Team');
  const [robots, setRobots] = useState<string>('index, follow');

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="robots" content="${robots}">
<meta name="author" content="${author}">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Site Title ({title.length}/60 chars)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Canonical URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Meta Description ({description.length}/160 chars)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Social Preview Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Robots Directives</label>
          <select
            value={robots}
            onChange={(e) => setRobots(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900"
          >
            <option value="index, follow">index, follow (Default - Allow indexing & links)</option>
            <option value="noindex, follow">noindex, follow (Do not index, follow links)</option>
            <option value="index, nofollow">index, nofollow (Index page, do not follow links)</option>
            <option value="noindex, nofollow">noindex, nofollow (Private - Block completely)</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Generated Meta Tags</span>
          <CopyButton textToCopy={metaHtml} label="Copy HTML Tags" />
        </div>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-200">
          {metaHtml}
        </pre>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   2. Robots.txt Generator
---------------------------------------------------- */
export function RobotsTxtGeneratorTool() {
  const [userAgent, setUserAgent] = useState<string>('*');
  const [allow, setAllow] = useState<string>('/');
  const [disallow, setDisallow] = useState<string>('/admin/\n/private/\n/api/');
  const [sitemapUrl, setSitemapUrl] = useState<string>('https://idx.zone/sitemap.xml');

  const lines = disallow
    .split('\n')
    .filter((l) => l.trim().length > 0)
    .map((l) => `Disallow: ${l.trim()}`)
    .join('\n');

  const robotsTxt = `User-agent: ${userAgent}
Allow: ${allow}
${lines}

Sitemap: ${sitemapUrl}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">User Agent</label>
          <input
            type="text"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono"
            placeholder="*"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Sitemap URL</label>
          <input
            type="text"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Disallowed Paths (one per line)
          </label>
          <textarea
            value={disallow}
            onChange={(e) => setDisallow(e.target.value)}
            rows={3}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 p-2.5"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Generated robots.txt</span>
          <div className="flex gap-2">
            <CopyButton textToCopy={robotsTxt} label="Copy File" />
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(robotsTxt)}`}
              download="robots.txt"
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5" />
              Download robots.txt
            </a>
          </div>
        </div>
        <pre className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-200">
          {robotsTxt}
        </pre>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   3. Sitemap Generator
---------------------------------------------------- */
export function SitemapGeneratorTool() {
  const [urlsText, setUrlsText] = useState<string>(
    'https://idx.zone\nhttps://idx.zone/tools\nhttps://idx.zone/categories\nhttps://idx.zone/tools/image-compressor\nhttps://idx.zone/tools/json-formatter'
  );
  const [freq, setFreq] = useState<string>('weekly');
  const [priority, setPriority] = useState<string>('0.8');

  const urls = urlsText.split(/\r?\n/).filter((u) => u.trim().startsWith('http'));
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.trim()}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Enter Website URLs (one per line, starting with http/https)
        </label>
        <textarea
          value={urlsText}
          onChange={(e) => setUrlsText(e.target.value)}
          rows={6}
          className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Change Frequency</label>
          <select
            value={freq}
            onChange={(e) => setFreq(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs"
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Default Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs"
          >
            <option value="1.0">1.0 (Highest)</option>
            <option value="0.8">0.8 (Standard)</option>
            <option value="0.5">0.5 (Medium)</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Generated XML Sitemap ({urls.length} URLs)
          </span>
          <div className="flex gap-2">
            <CopyButton textToCopy={xml} label="Copy XML" />
            <a
              href={`data:text/xml;charset=utf-8,${encodeURIComponent(xml)}`}
              download="sitemap.xml"
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5" />
              Download sitemap.xml
            </a>
          </div>
        </div>
        <pre className="max-h-80 overflow-y-auto rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-200">
          {xml}
        </pre>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   4. Open Graph Generator
---------------------------------------------------- */
export function OpenGraphGeneratorTool() {
  const [ogTitle, setOgTitle] = useState<string>('IDX.zone | Free Online Utilities');
  const [ogDesc, setOgDesc] = useState<string>(
    'Access fast, private, browser-based online tools for developers, designers, and webmasters.'
  );
  const [ogSite, setOgSite] = useState<string>('IDX.zone');
  const [ogUrl, setOgUrl] = useState<string>('https://idx.zone');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">OG Title</label>
          <input
            type="text"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Site Name</label>
          <input
            type="text"
            value={ogSite}
            onChange={(e) => setOgSite(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">OG Description</label>
          <textarea
            value={ogDesc}
            onChange={(e) => setOgDesc(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs"
          />
        </div>
      </div>

      {/* Live Social Card Preview */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Social Share Preview</h3>
        <div className="max-w-md overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
          <div className="flex h-44 w-full items-center justify-center bg-slate-900 text-white font-bold text-lg">
            IDX.zone Preview Banner
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">{ogSite}</span>
            <h4 className="mt-1 text-sm font-bold text-slate-900 line-clamp-1">{ogTitle}</h4>
            <p className="mt-1 text-xs text-slate-600 line-clamp-2">{ogDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   5. SERP Preview
---------------------------------------------------- */
export function SerpPreviewTool() {
  const [title, setTitle] = useState<string>('Free Fast Online Tools | IDX.zone');
  const [desc, setDesc] = useState<string>(
    'Discover 50+ free, client-side tools for images, PDFs, text, developer code, and SEO tasks. Instant speed, complete privacy.'
  );
  const [url, setUrl] = useState<string>('https://idx.zone/tools');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">Page Title ({title.length}/60 chars)</label>
            <span className={`text-xs ${title.length > 60 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
              {title.length > 60 ? 'May be truncated on Google' : 'Optimal length'}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">Meta Description ({desc.length}/160 chars)</label>
            <span className={`text-xs ${desc.length > 160 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
              {desc.length > 160 ? 'May be truncated on Google' : 'Optimal length'}
            </span>
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Page URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Preview Viewport</label>
          <div className="flex gap-2">
            <button
              onClick={() => setDevice('desktop')}
              className={`rounded-lg border px-4 py-2 text-xs font-semibold ${
                device === 'desktop' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
              }`}
            >
              Desktop Google Search
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`rounded-lg border px-4 py-2 text-xs font-semibold ${
                device === 'mobile' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
              }`}
            >
              Mobile Viewport
            </button>
          </div>
        </div>
      </div>

      {/* Google Result Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Google Search Result Preview</h3>
        <div className={`space-y-1 ${device === 'mobile' ? 'max-w-sm border-l-2 border-slate-200 pl-4' : 'max-w-xl'}`}>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
              IDX
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-900">IDX.zone</span>
              <span className="text-[11px] text-slate-500 truncate max-w-xs">{url}</span>
            </div>
          </div>
          <h4 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
            {title}
          </h4>
          <p className="text-sm text-[#4d5156] leading-normal line-clamp-2">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   6. Keyword Density Checker
---------------------------------------------------- */
export function KeywordDensityCheckerTool() {
  const [text, setText] = useState<string>(
    'Free online tools provide instant speed and utility. These online tools run directly in the browser. Users prefer fast online tools with high privacy and zero tracking.'
  );

  const calculateDensity = () => {
    const words = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const total = words.length;
    if (total === 0) return [];

    const counts: Record<string, number> = {};
    words.forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const densities = calculateDensity();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Text to Analyze</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Top Keyword Densities</h3>
        <div className="divide-y divide-slate-100 font-mono text-xs">
          {densities.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <span className="font-semibold text-slate-800">{item.word}</span>
              <div className="flex items-center gap-4">
                <span className="text-slate-500">{item.count} occurrences</span>
                <span className="font-bold text-slate-900">{item.density}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   7. URL Slug Generator
---------------------------------------------------- */
export function UrlSlugGeneratorTool() {
  const [title, setTitle] = useState<string>('Best 10 Free Online Tools for Fast Web Development in 2026');
  const [removeStopWords, setRemoveStopWords] = useState<boolean>(true);

  const stopWords = new Set(['a', 'an', 'the', 'for', 'in', 'on', 'at', 'to', 'of', 'and', 'with', 'by']);

  const generate = () => {
    let words = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    if (removeStopWords) {
      words = words.filter((w) => !stopWords.has(w));
    }
    return words.join('-');
  };

  const slug = generate();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Headline or Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900"
        />
      </div>

      <label className="flex items-center gap-2 text-xs text-slate-700">
        <input
          type="checkbox"
          checked={removeStopWords}
          onChange={(e) => setRemoveStopWords(e.target.checked)}
          className="rounded accent-slate-900"
        />
        Strip common stop words (a, the, in, for, of, to) for higher SEO density
      </label>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">SEO Optimized Permalink</span>
          <CopyButton textToCopy={slug} label="Copy Slug" />
        </div>
        <p className="font-mono text-base font-semibold text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">
          {slug}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   8. HTTP Status Checker
---------------------------------------------------- */
export function HttpStatusCheckerTool() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const codes = [
    { code: 200, name: 'OK', type: '2xx', seo: 'Standard success response. Search engines index and render normally.' },
    { code: 301, name: 'Moved Permanently', type: '3xx', seo: 'Permanent 301 redirect passes ~99% SEO link equity to new URL.' },
    { code: 302, name: 'Found (Temporary Redirect)', type: '3xx', seo: 'Temporary redirect. Original URL retains ranking signals in index.' },
    { code: 304, name: 'Not Modified', type: '3xx', seo: 'Informs search crawlers the cached version has not changed.' },
    { code: 400, name: 'Bad Request', type: '4xx', seo: 'Invalid syntax. Prevents bot indexing.' },
    { code: 401, name: 'Unauthorized', type: '4xx', seo: 'Authentication required. Crawlers will not index protected page.' },
    { code: 403, name: 'Forbidden', type: '4xx', seo: 'Server refusal. Crawlers will drop URL from search index.' },
    { code: 404, name: 'Not Found', type: '4xx', seo: 'Page does not exist. Drops URL from index after repeated crawls.' },
    { code: 410, name: 'Gone', type: '4xx', seo: 'Explicitly permanently removed. Google drops index faster than 404.' },
    { code: 500, name: 'Internal Server Error', type: '5xx', seo: 'Server crash. Frequent 500 errors lead to lower search ranking.' },
    { code: 503, name: 'Service Unavailable', type: '5xx', seo: 'Temporary maintenance. Tells bots to retry later without deindexing.' },
  ];

  const filtered = codes.filter((c) => {
    if (filter !== 'all' && c.type !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.code.toString().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.seo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter status code (e.g. 301, 404, redirect)..."
          className="w-full sm:w-72 rounded-lg border border-slate-300 px-3 py-2 text-xs"
        />

        <div className="flex gap-1.5">
          {['all', '2xx', '3xx', '4xx', '5xx'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded border px-2.5 py-1 text-xs font-semibold uppercase ${
                filter === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {filtered.map((item) => (
          <div key={item.code} className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span
                className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                  item.code >= 200 && item.code < 300
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.code >= 300 && item.code < 400
                    ? 'bg-blue-100 text-blue-800'
                    : item.code >= 400 && item.code < 500
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.code}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              <strong>SEO Impact:</strong> {item.seo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   9. Website SEO Checker
---------------------------------------------------- */
export function WebsiteSeoCheckerTool() {
  const [htmlInput, setHtmlInput] = useState<string>(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Fast Online Tools - IDX.zone</title>
  <meta name="description" content="Free collection of online utility tools for developers and creators.">
  <link rel="canonical" href="https://idx.zone">
</head>
<body>
  <h1>Free Fast Online Tools</h1>
  <p>Welcome to our site.</p>
  <img src="/logo.png" alt="IDX.zone Logo">
</body>
</html>`
  );

  const [audit, setAudit] = useState<{
    title: { ok: boolean; val: string; note: string };
    desc: { ok: boolean; val: string; note: string };
    h1: { ok: boolean; val: string; note: string };
    canonical: { ok: boolean; val: string; note: string };
  } | null>(null);

  const runAudit = () => {
    const titleMatch = htmlInput.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = htmlInput.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const h1Match = htmlInput.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const canonicalMatch = htmlInput.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);

    const titleText = titleMatch ? titleMatch[1] : '';
    const descText = descMatch ? descMatch[1] : '';
    const h1Text = h1Match ? h1Match[1] : '';
    const canonicalUrl = canonicalMatch ? canonicalMatch[1] : '';

    setAudit({
      title: {
        ok: titleText.length >= 10 && titleText.length <= 70,
        val: titleText || 'Missing',
        note: `${titleText.length} characters (Recommended: 30-60 characters)`,
      },
      desc: {
        ok: descText.length >= 50 && descText.length <= 160,
        val: descText || 'Missing',
        note: `${descText.length} characters (Recommended: 120-160 characters)`,
      },
      h1: {
        ok: Boolean(h1Text),
        val: h1Text || 'Missing',
        note: h1Text ? 'Primary heading found' : 'H1 tag missing in body',
      },
      canonical: {
        ok: Boolean(canonicalUrl),
        val: canonicalUrl || 'Missing',
        note: canonicalUrl ? 'Canonical URL defined' : 'No rel="canonical" tag found',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Paste HTML Source Code to Audit</label>
        <textarea
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          rows={8}
          className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
        />
      </div>

      <button
        onClick={runAudit}
        className="rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
      >
        Audit On-Page HTML SEO
      </button>

      {audit && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Audit Results</h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Page Title</span>
                {audit.title.ok ? (
                  <span className="text-xs font-semibold text-emerald-700">✓ Pass</span>
                ) : (
                  <span className="text-xs font-semibold text-amber-600">⚠ Review</span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-600 font-mono truncate">{audit.title.val}</p>
              <p className="mt-1 text-[11px] text-slate-400">{audit.title.note}</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Meta Description</span>
                {audit.desc.ok ? (
                  <span className="text-xs font-semibold text-emerald-700">✓ Pass</span>
                ) : (
                  <span className="text-xs font-semibold text-amber-600">⚠ Review</span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-600 font-mono truncate">{audit.desc.val}</p>
              <p className="mt-1 text-[11px] text-slate-400">{audit.desc.note}</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">H1 Headline</span>
                {audit.h1.ok ? (
                  <span className="text-xs font-semibold text-emerald-700">✓ Pass</span>
                ) : (
                  <span className="text-xs font-semibold text-red-600">✗ Missing</span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-600 font-mono truncate">{audit.h1.val}</p>
              <p className="mt-1 text-[11px] text-slate-400">{audit.h1.note}</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Canonical Tag</span>
                {audit.canonical.ok ? (
                  <span className="text-xs font-semibold text-emerald-700">✓ Pass</span>
                ) : (
                  <span className="text-xs font-semibold text-red-600">✗ Missing</span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-600 font-mono truncate">{audit.canonical.val}</p>
              <p className="mt-1 text-[11px] text-slate-400">{audit.canonical.note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
