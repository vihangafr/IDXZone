'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/CopyButton';
import { AlignLeft, Clock, BarChart2, Type, FileText, Check } from 'lucide-react';

/* ----------------------------------------------------
   1. Word Counter
---------------------------------------------------- */
export function WordCounterTool() {
  const [text, setText] = useState<string>(
    'Free online tools by IDX.zone are engineered for instant speed, privacy, and simplicity. All data is processed locally directly on your device with zero server uploads.'
  );

  const trimmed = text.trim();
  const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const sentenceCount = trimmed ? (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || [1]).length : 0;
  const paragraphCount = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingTimeMin = (wordCount / 200).toFixed(1);
  const speakingTimeMin = (wordCount / 130).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Words</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{wordCount.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Characters</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{charCountWithSpaces.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">No Spaces</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{charCountNoSpaces.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Sentences</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{sentenceCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Paragraphs</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{paragraphCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Reading Time</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{readingTimeMin}m</p>
        </div>
      </div>

      {/* Main Text Area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700">Type or paste text below:</label>
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={text} label="Copy Text" />
            <button
              onClick={() => setText('')}
              className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Start typing or paste your content here..."
          className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <span>Estimated Speaking Time: ~{speakingTimeMin} minutes (at 130 wpm)</span>
        <span>Average word length: {wordCount > 0 ? (charCountNoSpaces / wordCount).toFixed(1) : 0} characters</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   2. Character Counter
---------------------------------------------------- */
export function CharacterCounterTool() {
  const [text, setText] = useState<string>('Fast, lightweight utilities with instant feedback.');

  const totalChars = text.length;
  const noSpaceChars = text.replace(/\s/g, '').length;
  const spaces = (text.match(/\s/g) || []).length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const digits = (text.match(/[0-9]/g) || []).length;
  const byteSize = new Blob([text]).size;

  const socialLimits = [
    { name: 'X / Twitter Post', max: 280, current: totalChars },
    { name: 'Meta / Facebook Post', max: 63206, current: totalChars },
    { name: 'LinkedIn Post', max: 3000, current: totalChars },
    { name: 'SMS Single Message', max: 160, current: totalChars },
    { name: 'SEO Title Limit', max: 60, current: totalChars },
    { name: 'SEO Meta Description', max: 160, current: totalChars },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700">Enter text:</label>
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={text} />
            <button
              onClick={() => setText('')}
              className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste or write your text here..."
          className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 focus:outline-none"
        />
      </div>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Total Chars</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{totalChars}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Without Spaces</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{noSpaceChars}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Spaces</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{spaces}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Letters</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{letters}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Numbers</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{digits}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
          <p className="text-xs text-slate-500">Bytes (UTF-8)</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{byteSize} B</p>
        </div>
      </div>

      {/* Social Media & Platform Limits */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Platform Character Limits
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {socialLimits.map((limit, i) => {
            const pct = Math.min(100, Math.round((limit.current / limit.max) * 100));
            const isOver = limit.current > limit.max;
            return (
              <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{limit.name}</span>
                  <span className={`font-mono text-[11px] ${isOver ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                    {limit.current} / {limit.max}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all ${isOver ? 'bg-red-500' : pct > 90 ? 'bg-amber-500' : 'bg-slate-900'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   3. Case Converter
---------------------------------------------------- */
export function CaseConverterTool() {
  const [text, setText] = useState<string>('convert this text into multiple casing conventions easily');

  const toSentenceCase = (str: string) =>
    str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const toTitleCase = (str: string) =>
    str.toLowerCase().replace(/\b(\w)/g, (c) => c.toUpperCase());

  const toCamelCase = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase());

  const toPascalCase = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, (c) => c.toUpperCase());

  const toSnakeCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

  const toKebabCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const toConstantCase = (str: string) =>
    str
      .trim()
      .toUpperCase()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

  const cases = [
    { label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { label: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { label: 'Title Case', fn: toTitleCase },
    { label: 'Sentence case', fn: toSentenceCase },
    { label: 'camelCase', fn: toCamelCase },
    { label: 'PascalCase', fn: toPascalCase },
    { label: 'snake_case', fn: toSnakeCase },
    { label: 'kebab-case', fn: toKebabCase },
    { label: 'CONSTANT_CASE', fn: toConstantCase },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700">Input Text</label>
          <button
            onClick={() => setText('')}
            className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 focus:outline-none"
          placeholder="Type or paste text..."
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, idx) => {
          const transformed = text ? c.fn(text) : '';
          return (
            <div key={idx} className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">{c.label}</span>
                <CopyButton textToCopy={transformed} label="Copy" />
              </div>
              <p className="line-clamp-2 font-mono text-xs text-slate-800 bg-slate-50 p-2 rounded border border-slate-100 min-h-[38px]">
                {transformed || <span className="text-slate-400">Empty</span>}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   4. Remove Duplicate Lines
---------------------------------------------------- */
export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState<string>(
    'apple\nbanana\norange\napple\ngrape\nbanana\nwatermelon'
  );
  const [output, setOutput] = useState<string>('');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(true);
  const [trimLines, setTrimLines] = useState<boolean>(true);
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(true);

  const process = () => {
    let lines = input.split(/\r?\n/);
    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter((l) => l.length > 0);

    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }
    setOutput(result.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Original Text Lines</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 p-3 text-slate-800 focus:outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Deduplicated Output</label>
            {output && <CopyButton textToCopy={output} />}
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            placeholder="Click 'Remove Duplicate Lines' below..."
            className="w-full font-mono text-xs rounded-lg border border-slate-300 bg-slate-50 p-3 text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded accent-slate-900"
          />
          Case-sensitive comparison
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded accent-slate-900"
          />
          Trim whitespace
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="rounded accent-slate-900"
          />
          Remove empty lines
        </label>
      </div>

      <button
        onClick={process}
        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Remove Duplicate Lines
      </button>
    </div>
  );
}

/* ----------------------------------------------------
   5. Text Sorter
---------------------------------------------------- */
export function TextSorterTool() {
  const [text, setText] = useState<string>('Zebra\nApple\nMango\nBanana\nPeach\nCherry');
  const [output, setOutput] = useState<string>('');

  const sortLines = (mode: 'az' | 'za' | 'natural' | 'length' | 'shuffle') => {
    let lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (mode === 'az') {
      lines.sort((a, b) => a.localeCompare(b));
    } else if (mode === 'za') {
      lines.sort((a, b) => b.localeCompare(a));
    } else if (mode === 'natural') {
      lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    } else if (mode === 'length') {
      lines.sort((a, b) => a.length - b.length);
    } else if (mode === 'shuffle') {
      lines.sort(() => Math.random() - 0.5);
    }
    setOutput(lines.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Input Lines</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 p-3 text-slate-800"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Sorted Output</label>
            {output && <CopyButton textToCopy={output} />}
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            placeholder="Select a sort option below..."
            className="w-full font-mono text-xs rounded-lg border border-slate-300 bg-slate-50 p-3 text-slate-800"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => sortLines('az')}
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          Sort Alphabetical (A ➔ Z)
        </button>
        <button
          onClick={() => sortLines('za')}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Sort Reverse (Z ➔ A)
        </button>
        <button
          onClick={() => sortLines('natural')}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Natural Numeric (1, 2, 10)
        </button>
        <button
          onClick={() => sortLines('length')}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Sort by Length (Short ➔ Long)
        </button>
        <button
          onClick={() => sortLines('shuffle')}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Random Shuffle
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   6. Text Reverser
---------------------------------------------------- */
export function TextReverserTool() {
  const [text, setText] = useState<string>('Reverse this text string with multiple options');
  const [reversedChars, setReversedChars] = useState<string>('');
  const [reversedWords, setReversedWords] = useState<string>('');
  const [reversedLines, setReversedLines] = useState<string>('');

  const process = (val: string) => {
    setText(val);
    setReversedChars(Array.from(val).reverse().join(''));
    setReversedWords(
      val
        .split('\n')
        .map((l) => l.split(/\s+/).reverse().join(' '))
        .join('\n')
    );
    setReversedLines(val.split('\n').reverse().join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => process(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">Reverse Characters (Entire String Backwards)</span>
            <CopyButton textToCopy={reversedChars || Array.from(text).reverse().join('')} />
          </div>
          <p className="font-mono text-xs text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-100">
            {reversedChars || Array.from(text).reverse().join('')}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">Reverse Words Order</span>
            <CopyButton
              textToCopy={
                reversedWords ||
                text
                  .split('\n')
                  .map((l) => l.split(/\s+/).reverse().join(' '))
                  .join('\n')
              }
            />
          </div>
          <p className="font-mono text-xs text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-100">
            {reversedWords ||
              text
                .split('\n')
                .map((l) => l.split(/\s+/).reverse().join(' '))
                .join('\n')}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">Reverse Lines Order</span>
            <CopyButton textToCopy={reversedLines || text.split('\n').reverse().join('\n')} />
          </div>
          <p className="font-mono text-xs text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-100 whitespace-pre-line">
            {reversedLines || text.split('\n').reverse().join('\n')}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   7. Slug Generator
---------------------------------------------------- */
export function SlugGeneratorTool() {
  const [title, setTitle] = useState<string>('How to Build Lightning-Fast Websites in 2026!');
  const [separator, setSeparator] = useState<string>('-');
  const [lowercase, setLowercase] = useState<boolean>(true);

  const generateSlug = (str: string, sep: string, lower: boolean) => {
    let slug = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, sep);

    if (lower) slug = slug.toLowerCase();
    return slug;
  };

  const slug = generateSlug(title, separator, lowercase);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Title or Headline</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-700">Separator:</label>
          <div className="flex gap-2">
            {[
              { label: 'Hyphen (-)', val: '-' },
              { label: 'Underscore (_)', val: '_' },
              { label: 'Dot (.)', val: '.' },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => setSeparator(s.val)}
                className={`rounded border px-2.5 py-1 text-xs font-medium ${
                  separator === s.val
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded accent-slate-900"
          />
          Convert to lowercase
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Generated URL Slug</span>
          <CopyButton textToCopy={slug} label="Copy Slug" />
        </div>
        <p className="font-mono text-base font-semibold text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100 break-all">
          {slug}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   8. Lorem Ipsum Generator
---------------------------------------------------- */
export function LoremIpsumGeneratorTool() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);

  const LOREM_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.';

  const generate = () => {
    const sentences = LOREM_TEXT.match(/[^.!?]+[.!?]+/g) || [LOREM_TEXT];
    const words = LOREM_TEXT.replace(/[.,]/g, '').split(/\s+/);

    if (type === 'paragraphs') {
      const paras = [];
      for (let i = 0; i < count; i++) {
        paras.push(LOREM_TEXT);
      }
      return paras.join('\n\n');
    } else if (type === 'sentences') {
      const s = [];
      for (let i = 0; i < count; i++) {
        s.push(sentences[i % sentences.length].trim());
      }
      return s.join(' ');
    } else {
      const w = [];
      for (let i = 0; i < count; i++) {
        w.push(words[i % words.length]);
      }
      return w.join(' ') + '.';
    }
  };

  const output = generate();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-700">Generate:</label>
          <div className="flex gap-1.5">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium capitalize ${
                  type === t
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-700">Count:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 rounded border border-slate-300 px-2 py-1 text-xs"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700">Generated Dummy Text</span>
          <CopyButton textToCopy={output} label="Copy Text" />
        </div>
        <textarea
          readOnly
          value={output}
          rows={10}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 focus:outline-none"
        />
      </div>
    </div>
  );
}
