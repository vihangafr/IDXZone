'use client';

import React, { useState, useMemo } from 'react';
import CopyButton from '@/components/CopyButton';
import { RefreshCw } from 'lucide-react';

/* ----------------------------------------------------
   1. JSON Formatter
---------------------------------------------------- */
export function JsonFormatterTool() {
  const [input, setInput] = useState<string>(
    '{"name":"IDX.zone","type":"utility-collection","features":["free","fast","private"],"stats":{"tools":50,"databaseRequired":false}}'
  );
  const [indent, setIndent] = useState<number>(2);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: '' };
    } catch (err: any) {
      return { output: '', error: err.message || 'Invalid JSON format.' };
    }
  }, [input, indent]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-700">Indentation:</label>
          {[2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setIndent(s)}
              className={`rounded border px-2.5 py-1 text-xs font-medium ${
                indent === s ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {s} Spaces
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {output && <CopyButton textToCopy={output} label="Copy Formatted JSON" />}
          <button
            onClick={() => setInput('')}
            className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Raw JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900 focus:outline-none"
            placeholder="Paste unformatted JSON here..."
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Formatted Output</label>
          <textarea
            readOnly
            value={output}
            rows={14}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <strong>Syntax Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   2. JSON Validator
---------------------------------------------------- */
export function JsonValidatorTool() {
  const [input, setInput] = useState<string>('{\n  "site": "IDX.zone",\n  "status": "valid"\n}');

  const result = useMemo(() => {
    if (!input.trim()) return null;
    try {
      JSON.parse(input);
      return { valid: true, message: 'Valid JSON! No syntax errors found.' };
    } catch (err: any) {
      return { valid: false, message: err.message || 'Invalid JSON syntax.' };
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700">Paste JSON to validate:</label>
          <button
            onClick={() => setInput('')}
            className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          className="w-full font-mono text-xs rounded-xl border border-slate-300 p-4 text-slate-900 focus:outline-none"
          placeholder="Paste JSON..."
        />
      </div>

      {result && (
        <div
          className={`rounded-xl border p-4 text-sm font-medium ${
            result.valid
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {result.valid ? '✓ ' : '✗ '} {result.message}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   3. JSON Minifier
---------------------------------------------------- */
export function JsonMinifierTool() {
  const [input, setInput] = useState<string>(
    '{\n  "name": "IDX.zone",\n  "version": 1,\n  "tags": [\n    "fast",\n    "free"\n  ]\n}'
  );

  const { minified, bytesSaved, error } = useMemo(() => {
    if (!input.trim()) return { minified: '', bytesSaved: 0, error: '' };
    try {
      const parsed = JSON.parse(input);
      const res = JSON.stringify(parsed);
      return {
        minified: res,
        bytesSaved: Math.max(0, input.length - res.length),
        error: '',
      };
    } catch (err: any) {
      return { minified: '', bytesSaved: 0, error: err.message || 'Invalid JSON.' };
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Formatted JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Minified JSON</label>
            {minified && <CopyButton textToCopy={minified} label="Copy Minified" />}
          </div>
          <textarea
            readOnly
            value={minified}
            rows={10}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
          />
        </div>
      </div>

      {minified && !error && (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
          <span>Original size: {input.length} characters</span>
          <span className="font-semibold text-emerald-700">
            Minified size: {minified.length} chars ({bytesSaved} chars saved)
          </span>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ----------------------------------------------------
   4. Base64 Encoder
---------------------------------------------------- */
export function Base64EncoderTool() {
  const [text, setText] = useState<string>('Hello from IDX.zone! Fast online developer utilities.');

  const encoded = useMemo(() => {
    if (!text) return '';
    try {
      const bytes = new TextEncoder().encode(text);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      return btoa(binString);
    } catch {
      return '';
    }
  }, [text]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Plaintext to Encode</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700">Base64 Encoded Result</label>
          {encoded && <CopyButton textToCopy={encoded} />}
        </div>
        <textarea
          readOnly
          value={encoded}
          rows={6}
          className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   5. Base64 Decoder
---------------------------------------------------- */
export function Base64DecoderTool() {
  const [base64, setBase64] = useState<string>('SGVsbG8gZnJvbSBJRFguem9uZSENCkZhc3Qgb25saW5lIGRldmVsb3BlciB1dGlsaXRpZXMu');

  const { decoded, error } = useMemo(() => {
    if (!base64.trim()) return { decoded: '', error: '' };
    try {
      const cleanStr = base64.trim().replace(/\s/g, '');
      const binString = atob(cleanStr);
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      const decodedText = new TextDecoder().decode(bytes);
      return { decoded: decodedText, error: '' };
    } catch {
      return { decoded: '', error: 'Invalid Base64 string.' };
    }
  }, [base64]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Base64 String to Decode</label>
        <textarea
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          rows={6}
          className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900 focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700">Decoded Plaintext</label>
          {decoded && <CopyButton textToCopy={decoded} />}
        </div>
        <textarea
          readOnly
          value={decoded}
          rows={6}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-sm text-slate-900"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ----------------------------------------------------
   6. URL Encoder
---------------------------------------------------- */
export function UrlEncoderTool() {
  const [input, setInput] = useState<string>('https://idx.zone/search?query=fast tools&category=developer#top');
  const [mode, setMode] = useState<'component' | 'full'>('component');

  const output = useMemo(() => {
    if (!input) return '';
    return mode === 'component' ? encodeURIComponent(input) : encodeURI(input);
  }, [input, mode]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-slate-700">Encoding Mode:</label>
        <button
          onClick={() => setMode('component')}
          className={`rounded border px-3 py-1 text-xs font-medium ${
            mode === 'component' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          encodeURIComponent (All special chars)
        </button>
        <button
          onClick={() => setMode('full')}
          className={`rounded border px-3 py-1 text-xs font-medium ${
            mode === 'full' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          encodeURI (Preserve protocol & domain)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Raw Text / URL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-slate-300 p-3.5 text-xs text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Encoded URL</label>
            {output && <CopyButton textToCopy={output} />}
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   7. URL Decoder
---------------------------------------------------- */
export function UrlDecoderTool() {
  const [input, setInput] = useState<string>('https%3A%2F%2Fidx.zone%2Fsearch%3Fquery%3Dfast%20tools%26category%3Ddeveloper%23top');
  const [plusAsSpace, setPlusAsSpace] = useState<boolean>(true);

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: '' };
    try {
      let str = input;
      if (plusAsSpace) str = str.replace(/\+/g, ' ');
      return { output: decodeURIComponent(str), error: '' };
    } catch {
      return { output: '', error: 'Malformed URI sequence.' };
    }
  }, [input, plusAsSpace]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="plus-space"
          checked={plusAsSpace}
          onChange={(e) => setPlusAsSpace(e.target.checked)}
          className="rounded accent-slate-900"
        />
        <label htmlFor="plus-space" className="text-xs font-medium text-slate-700">
          Treat plus sign (&quot;+&quot;) as space
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Percent-Encoded URL String</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Decoded Text</label>
            {output && <CopyButton textToCopy={output} />}
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-xs text-slate-900"
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ----------------------------------------------------
   8. UUID Generator
---------------------------------------------------- */
export function UuidGeneratorTool() {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [noHyphens, setNoHyphens] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);

  const generateUuidV4 = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const uuids = useMemo(() => {
    // seed triggers regenerate
    const _ = seed;
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let u = generateUuidV4();
      if (noHyphens) u = u.replace(/-/g, '');
      if (uppercase) u = u.toUpperCase();
      list.push(u);
    }
    return list;
  }, [count, uppercase, noHyphens, seed]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700">Quantity:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-16 rounded border border-slate-300 px-2 py-1 text-xs"
            />
          </div>

          <label className="flex items-center gap-1.5 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded accent-slate-900"
            />
            Uppercase
          </label>

          <label className="flex items-center gap-1.5 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={noHyphens}
              onChange={(e) => setNoHyphens(e.target.checked)}
              className="rounded accent-slate-900"
            />
            No hyphens
          </label>
        </div>

        <button
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Regenerate
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Generated UUIDs ({uuids.length})
          </span>
          <CopyButton textToCopy={uuids.join('\n')} label="Copy All UUIDs" />
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          {uuids.map((u, i) => (
            <div key={i} className="flex items-center justify-between rounded bg-slate-50 px-3 py-2 text-slate-800">
              <span>{u}</span>
              <CopyButton textToCopy={u} label="Copy" className="px-2 py-0.5 text-[11px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   9. Regex Tester
---------------------------------------------------- */
export function RegexTesterTool() {
  const [pattern, setPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState<string>('gm');
  const [text, setText] = useState<string>(
    'Contact support@idx.zone or developer-team@example.com for any inquiries. Invalid: user@.com'
  );

  const { matches, error } = useMemo(() => {
    if (!pattern || !text) return { matches: [], error: '' };
    try {
      const reg = new RegExp(pattern, flags);
      const m = text.match(reg);
      return { matches: m ? Array.from(m) : [], error: '' };
    } catch (err: any) {
      return { matches: [], error: err.message || 'Invalid regular expression.' };
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="sm:col-span-3">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Regular Expression Pattern</label>
          <div className="flex items-center rounded-lg border border-slate-300 px-3 bg-white">
            <span className="font-mono text-slate-400">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-2 py-2 font-mono text-xs text-slate-900 focus:outline-none"
              placeholder="e.g. \d+"
            />
            <span className="font-mono text-slate-400">/</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Flags (g, i, m, s)</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 font-mono text-xs text-slate-900"
            placeholder="e.g. gmi"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Test Subject Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-slate-300 p-3.5 text-xs text-slate-900"
        />
      </div>

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800">Matches Found: {matches.length}</span>
            {matches.length > 0 && <CopyButton textToCopy={matches.join('\n')} label="Copy Matches" />}
          </div>
          {matches.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matches.map((m, i) => (
                <span
                  key={i}
                  className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-800"
                >
                  {m}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No matches found with current pattern.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   10. Timestamp Converter
---------------------------------------------------- */
export function TimestampConverterTool() {
  const [timestamp, setTimestamp] = useState<string>('1767225600');
  const [dateInput, setDateInput] = useState<string>('2026-01-01T12:00');

  const parsedDate = useMemo(() => {
    if (!isNaN(Number(timestamp))) {
      return new Date(Number(timestamp) * (timestamp.length === 13 ? 1 : 1000));
    }
    return new Date();
  }, [timestamp]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Unix Timestamp to Date</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Epoch Timestamp (Seconds or Milliseconds)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 font-mono text-sm text-slate-900"
              />
              <button
                onClick={() => setTimestamp(Math.floor(Date.now() / 1000).toString())}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Now
              </button>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs">
            <div>
              <span className="text-slate-500">UTC Date:</span>
              <p className="font-mono font-semibold text-slate-900">{parsedDate.toUTCString()}</p>
            </div>
            <div>
              <span className="text-slate-500">Local Date:</span>
              <p className="font-mono font-semibold text-slate-900">{parsedDate.toString()}</p>
            </div>
            <div>
              <span className="text-slate-500">ISO 8601:</span>
              <p className="font-mono font-semibold text-slate-900">{parsedDate.toISOString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Date to Unix Timestamp</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Date & Time</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900"
            />
          </div>

          <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-500">Unix Seconds:</span>
                <p className="font-mono font-bold text-slate-900">
                  {Math.floor(new Date(dateInput).getTime() / 1000)}
                </p>
              </div>
              <CopyButton textToCopy={Math.floor(new Date(dateInput).getTime() / 1000).toString()} />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div>
                <span className="text-slate-500">Unix Milliseconds:</span>
                <p className="font-mono font-bold text-slate-900">{new Date(dateInput).getTime()}</p>
              </div>
              <CopyButton textToCopy={new Date(dateInput).getTime().toString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   11. HTML Formatter
---------------------------------------------------- */
export function HtmlFormatterTool() {
  const [html, setHtml] = useState<string>(
    '<div class="card"><header><h1>Hello World</h1></header><main><p>Clean HTML code.</p></main></div>'
  );

  const formatted = useMemo(() => {
    if (!html.trim()) return '';
    let out = '';
    let indent = 0;
    const tab = '  ';
    html.split(/>\s*</).forEach((element) => {
      if (element.match(/^\/\w/)) {
        indent -= 1;
      }
      out += tab.repeat(Math.max(0, indent)) + '<' + element + '>\r\n';
      if (
        element.match(/^<?\w[^>]*[^\/]$/) &&
        !element.startsWith('input') &&
        !element.startsWith('img') &&
        !element.startsWith('br') &&
        !element.startsWith('hr')
      ) {
        indent += 1;
      }
    });
    return out.substring(1, out.length - 3);
  }, [html]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unformatted HTML</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Formatted HTML</label>
            {formatted && <CopyButton textToCopy={formatted} />}
          </div>
          <textarea
            readOnly
            value={formatted}
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   12. CSS Formatter
---------------------------------------------------- */
export function CssFormatterTool() {
  const [css, setCss] = useState<string>(
    'body{margin:0;padding:0;background:#ffffff}.card{border:1px solid #e2e8f0;border-radius:8px;padding:16px}'
  );

  const formatted = useMemo(() => {
    if (!css.trim()) return '';
    return css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }, [css]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Raw CSS</label>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Formatted CSS</label>
            {formatted && <CopyButton textToCopy={formatted} />}
          </div>
          <textarea
            readOnly
            value={formatted}
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   13. JavaScript Formatter
---------------------------------------------------- */
export function JavascriptFormatterTool() {
  const [jsCode, setJsCode] = useState<string>(
    'function calculateTotal(items){return items.reduce((acc,curr)=>acc+curr.price,0);}'
  );

  const formatted = useMemo(() => {
    if (!jsCode.trim()) return '';
    return jsCode
      .replace(/\{/g, ' {\n  ')
      .replace(/\}/g, '\n}')
      .replace(/;\s*/g, ';\n  ');
  }, [jsCode]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Raw JS Code</label>
          <textarea
            value={jsCode}
            onChange={(e) => setJsCode(e.target.value)}
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Formatted JavaScript</label>
            {formatted && <CopyButton textToCopy={formatted} />}
          </div>
          <textarea
            readOnly
            value={formatted}
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   14. SQL Formatter
---------------------------------------------------- */
export function SqlFormatterTool() {
  const [sql, setSql] = useState<string>(
    'select users.id, users.name, count(orders.id) as total_orders from users left join orders on users.id = orders.user_id where users.active = true group by users.id order by total_orders desc limit 10;'
  );

  const formatted = useMemo(() => {
    if (!sql.trim()) return '';
    const keywords = [
      'SELECT',
      'FROM',
      'WHERE',
      'LEFT JOIN',
      'RIGHT JOIN',
      'INNER JOIN',
      'JOIN',
      'GROUP BY',
      'ORDER BY',
      'HAVING',
      'LIMIT',
      'INSERT INTO',
      'VALUES',
      'UPDATE',
      'SET',
      'DELETE FROM',
      'UNION ALL',
      'UNION',
      'ON',
      'AND',
      'OR',
    ];

    let result = sql;
    keywords.forEach((kw) => {
      const reg = new RegExp(`\\b${kw}\\b`, 'gi');
      result = result.replace(reg, kw);
    });

    const majorKeywords = [
      'SELECT',
      'FROM',
      'WHERE',
      'LEFT JOIN',
      'RIGHT JOIN',
      'INNER JOIN',
      'JOIN',
      'GROUP BY',
      'ORDER BY',
      'HAVING',
      'LIMIT',
    ];
    majorKeywords.forEach((kw) => {
      const reg = new RegExp(`\\s+(${kw})\\s+`, 'g');
      result = result.replace(reg, '\n$1 ');
    });

    return result.trim();
  }, [sql]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Raw SQL Query</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={10}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Formatted & Capitalized SQL</label>
            {formatted && <CopyButton textToCopy={formatted} />}
          </div>
          <textarea
            readOnly
            value={formatted}
            rows={10}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   15. Color Converter
---------------------------------------------------- */
export function ColorConverterTool() {
  const [hex, setHex] = useState<string>('#3b82f6');
  const [r, setR] = useState<number>(59);
  const [g, setG] = useState<number>(130);
  const [b, setB] = useState<number>(246);

  const hexToRgb = (h: string) => {
    const clean = h.replace('#', '');
    if (clean.length === 6) {
      const num = parseInt(clean, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    }
    return null;
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    const rgb = hexToRgb(val);
    if (rgb) {
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
    }
  };

  const hsl = useMemo(() => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }, [r, g, b]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div
          className="h-28 w-28 rounded-xl border border-slate-200 shadow-inner"
          style={{ backgroundColor: hex }}
        />

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Visual Color Picker</label>
            <input
              type="color"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="mt-1 h-10 w-24 cursor-pointer rounded border border-slate-300 p-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">HEX</span>
            <CopyButton textToCopy={hex} />
          </div>
          <p className="font-mono text-sm font-semibold text-slate-900">{hex}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">RGB</span>
            <CopyButton textToCopy={`rgb(${r}, ${g}, ${b})`} />
          </div>
          <p className="font-mono text-sm font-semibold text-slate-900">
            rgb({r}, {g}, {b})
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">HSL</span>
            <CopyButton textToCopy={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          </div>
          <p className="font-mono text-sm font-semibold text-slate-900">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   16. Markdown Previewer
---------------------------------------------------- */
export function MarkdownPreviewerTool() {
  const [markdown, setMarkdown] = useState<string>(
    '# Free Online Tools\n\nWelcome to **IDX.zone**.\n\n- Fast execution\n- 100% Client-side\n- No login required\n\n```javascript\nconsole.log("Privacy first!");\n```'
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={14}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3.5 text-slate-900 focus:outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Live Render Preview</label>
            <CopyButton textToCopy={markdown} label="Copy Markdown" />
          </div>
          <div className="min-h-[280px] rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-800 text-sm overflow-auto">
            <pre className="whitespace-pre-wrap font-sans">{markdown}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   17. Diff Checker
---------------------------------------------------- */
export function DiffCheckerTool() {
  const [originalText, setOriginalText] = useState<string>(
    'const status = "pending";\nconst timeout = 3000;\nconst retries = 3;'
  );
  const [changedText, setChangedText] = useState<string>(
    'const status = "completed";\nconst timeout = 5000;\nconst retries = 3;\nconst debug = true;'
  );

  const diffLines = useMemo(() => {
    const orig = originalText.split(/\r?\n/);
    const mod = changedText.split(/\r?\n/);
    const lines: { type: 'same' | 'added' | 'removed'; text: string }[] = [];

    const maxLen = Math.max(orig.length, mod.length);
    for (let i = 0; i < maxLen; i++) {
      const o = orig[i];
      const m = mod[i];
      if (o === m) {
        lines.push({ type: 'same', text: o });
      } else {
        if (o !== undefined) lines.push({ type: 'removed', text: o });
        if (m !== undefined) lines.push({ type: 'added', text: m });
      }
    }
    return lines;
  }, [originalText, changedText]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Original Text</label>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows={8}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3 text-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Modified Text</label>
          <textarea
            value={changedText}
            onChange={(e) => setChangedText(e.target.value)}
            rows={8}
            className="w-full font-mono text-xs rounded-xl border border-slate-300 p-3 text-slate-900"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Diff Comparison</h3>
        <div className="space-y-1 font-mono text-xs">
          {diffLines.map((line, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 rounded px-3 py-1 ${
                line.type === 'added'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : line.type === 'removed'
                  ? 'bg-red-50 text-red-800 line-through'
                  : 'text-slate-700'
              }`}
            >
              <span className="w-4 font-bold">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
              <span>{line.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
