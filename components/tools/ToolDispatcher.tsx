'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LoadingToolFallback = () => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent mb-3" />
    <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">Loading workspace...</span>
  </div>
);

// Image Tools
const ImageCompressorTool = dynamic(() => import('./ImageTools').then((m) => m.ImageCompressorTool), { loading: LoadingToolFallback, ssr: false });
const ImageResizerTool = dynamic(() => import('./ImageTools').then((m) => m.ImageResizerTool), { loading: LoadingToolFallback, ssr: false });
const JpgToPngTool = dynamic(() => import('./ImageTools').then((m) => m.JpgToPngTool), { loading: LoadingToolFallback, ssr: false });
const PngToJpgTool = dynamic(() => import('./ImageTools').then((m) => m.PngToJpgTool), { loading: LoadingToolFallback, ssr: false });
const WebpConverterTool = dynamic(() => import('./ImageTools').then((m) => m.WebpConverterTool), { loading: LoadingToolFallback, ssr: false });
const ImageCropperTool = dynamic(() => import('./ImageTools').then((m) => m.ImageCropperTool), { loading: LoadingToolFallback, ssr: false });
const ImageToBase64Tool = dynamic(() => import('./ImageTools').then((m) => m.ImageToBase64Tool), { loading: LoadingToolFallback, ssr: false });
const Base64ToImageTool = dynamic(() => import('./ImageTools').then((m) => m.Base64ToImageTool), { loading: LoadingToolFallback, ssr: false });
const FaviconGeneratorTool = dynamic(() => import('./ImageTools').then((m) => m.FaviconGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const QrCodeGeneratorTool = dynamic(() => import('./ImageTools').then((m) => m.QrCodeGeneratorTool), { loading: LoadingToolFallback, ssr: false });

// PDF & Data Tools
const JpgToPdfTool = dynamic(() => import('./PdfTools').then((m) => m.JpgToPdfTool), { loading: LoadingToolFallback, ssr: false });
const MergePdfTool = dynamic(() => import('./PdfTools').then((m) => m.MergePdfTool), { loading: LoadingToolFallback, ssr: false });
const SplitPdfTool = dynamic(() => import('./PdfTools').then((m) => m.SplitPdfTool), { loading: LoadingToolFallback, ssr: false });
const RotatePdfTool = dynamic(() => import('./PdfTools').then((m) => m.RotatePdfTool), { loading: LoadingToolFallback, ssr: false });
const PdfCompressorTool = dynamic(() => import('./PdfTools').then((m) => m.PdfCompressorTool), { loading: LoadingToolFallback, ssr: false });
const PdfToJpgTool = dynamic(() => import('./PdfTools').then((m) => m.PdfToJpgTool), { loading: LoadingToolFallback, ssr: false });
const CsvToJsonTool = dynamic(() => import('./PdfTools').then((m) => m.CsvToJsonTool), { loading: LoadingToolFallback, ssr: false });
const JsonToCsvTool = dynamic(() => import('./PdfTools').then((m) => m.JsonToCsvTool), { loading: LoadingToolFallback, ssr: false });

// Text Tools
const WordCounterTool = dynamic(() => import('./TextTools').then((m) => m.WordCounterTool), { loading: LoadingToolFallback, ssr: false });
const CharacterCounterTool = dynamic(() => import('./TextTools').then((m) => m.CharacterCounterTool), { loading: LoadingToolFallback, ssr: false });
const CaseConverterTool = dynamic(() => import('./TextTools').then((m) => m.CaseConverterTool), { loading: LoadingToolFallback, ssr: false });
const RemoveDuplicateLinesTool = dynamic(() => import('./TextTools').then((m) => m.RemoveDuplicateLinesTool), { loading: LoadingToolFallback, ssr: false });
const TextSorterTool = dynamic(() => import('./TextTools').then((m) => m.TextSorterTool), { loading: LoadingToolFallback, ssr: false });
const TextReverserTool = dynamic(() => import('./TextTools').then((m) => m.TextReverserTool), { loading: LoadingToolFallback, ssr: false });
const SlugGeneratorTool = dynamic(() => import('./TextTools').then((m) => m.SlugGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const LoremIpsumGeneratorTool = dynamic(() => import('./TextTools').then((m) => m.LoremIpsumGeneratorTool), { loading: LoadingToolFallback, ssr: false });

// Developer Tools
const JsonFormatterTool = dynamic(() => import('./DeveloperTools').then((m) => m.JsonFormatterTool), { loading: LoadingToolFallback, ssr: false });
const JsonValidatorTool = dynamic(() => import('./DeveloperTools').then((m) => m.JsonValidatorTool), { loading: LoadingToolFallback, ssr: false });
const JsonMinifierTool = dynamic(() => import('./DeveloperTools').then((m) => m.JsonMinifierTool), { loading: LoadingToolFallback, ssr: false });
const Base64EncoderTool = dynamic(() => import('./DeveloperTools').then((m) => m.Base64EncoderTool), { loading: LoadingToolFallback, ssr: false });
const Base64DecoderTool = dynamic(() => import('./DeveloperTools').then((m) => m.Base64DecoderTool), { loading: LoadingToolFallback, ssr: false });
const UrlEncoderTool = dynamic(() => import('./DeveloperTools').then((m) => m.UrlEncoderTool), { loading: LoadingToolFallback, ssr: false });
const UrlDecoderTool = dynamic(() => import('./DeveloperTools').then((m) => m.UrlDecoderTool), { loading: LoadingToolFallback, ssr: false });
const UuidGeneratorTool = dynamic(() => import('./DeveloperTools').then((m) => m.UuidGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const RegexTesterTool = dynamic(() => import('./DeveloperTools').then((m) => m.RegexTesterTool), { loading: LoadingToolFallback, ssr: false });
const TimestampConverterTool = dynamic(() => import('./DeveloperTools').then((m) => m.TimestampConverterTool), { loading: LoadingToolFallback, ssr: false });
const HtmlFormatterTool = dynamic(() => import('./DeveloperTools').then((m) => m.HtmlFormatterTool), { loading: LoadingToolFallback, ssr: false });
const CssFormatterTool = dynamic(() => import('./DeveloperTools').then((m) => m.CssFormatterTool), { loading: LoadingToolFallback, ssr: false });
const JavascriptFormatterTool = dynamic(() => import('./DeveloperTools').then((m) => m.JavascriptFormatterTool), { loading: LoadingToolFallback, ssr: false });
const SqlFormatterTool = dynamic(() => import('./DeveloperTools').then((m) => m.SqlFormatterTool), { loading: LoadingToolFallback, ssr: false });
const ColorConverterTool = dynamic(() => import('./DeveloperTools').then((m) => m.ColorConverterTool), { loading: LoadingToolFallback, ssr: false });
const MarkdownPreviewerTool = dynamic(() => import('./DeveloperTools').then((m) => m.MarkdownPreviewerTool), { loading: LoadingToolFallback, ssr: false });
const DiffCheckerTool = dynamic(() => import('./DeveloperTools').then((m) => m.DiffCheckerTool), { loading: LoadingToolFallback, ssr: false });

// SEO Tools
const MetaTagGeneratorTool = dynamic(() => import('./SeoTools').then((m) => m.MetaTagGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const RobotsTxtGeneratorTool = dynamic(() => import('./SeoTools').then((m) => m.RobotsTxtGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const SitemapGeneratorTool = dynamic(() => import('./SeoTools').then((m) => m.SitemapGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const OpenGraphGeneratorTool = dynamic(() => import('./SeoTools').then((m) => m.OpenGraphGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const SerpPreviewTool = dynamic(() => import('./SeoTools').then((m) => m.SerpPreviewTool), { loading: LoadingToolFallback, ssr: false });
const KeywordDensityCheckerTool = dynamic(() => import('./SeoTools').then((m) => m.KeywordDensityCheckerTool), { loading: LoadingToolFallback, ssr: false });
const UrlSlugGeneratorTool = dynamic(() => import('./SeoTools').then((m) => m.UrlSlugGeneratorTool), { loading: LoadingToolFallback, ssr: false });
const HttpStatusCheckerTool = dynamic(() => import('./SeoTools').then((m) => m.HttpStatusCheckerTool), { loading: LoadingToolFallback, ssr: false });
const WebsiteSeoCheckerTool = dynamic(() => import('./SeoTools').then((m) => m.WebsiteSeoCheckerTool), { loading: LoadingToolFallback, ssr: false });

const toolComponents: Record<string, React.ComponentType> = {
  // Image Tools
  'image-compressor': ImageCompressorTool,
  'image-resizer': ImageResizerTool,
  'jpg-to-png': JpgToPngTool,
  'png-to-jpg': PngToJpgTool,
  'webp-converter': WebpConverterTool,
  'image-cropper': ImageCropperTool,
  'image-to-base64': ImageToBase64Tool,
  'base64-to-image': Base64ToImageTool,
  'favicon-generator': FaviconGeneratorTool,
  'qr-code-generator': QrCodeGeneratorTool,

  // PDF & Data Tools
  'jpg-to-pdf': JpgToPdfTool,
  'merge-pdf': MergePdfTool,
  'split-pdf': SplitPdfTool,
  'rotate-pdf': RotatePdfTool,
  'pdf-compressor': PdfCompressorTool,
  'pdf-to-jpg': PdfToJpgTool,
  'csv-to-json': CsvToJsonTool,
  'json-to-csv': JsonToCsvTool,

  // Text Tools
  'word-counter': WordCounterTool,
  'character-counter': CharacterCounterTool,
  'case-converter': CaseConverterTool,
  'remove-duplicate-lines': RemoveDuplicateLinesTool,
  'text-sorter': TextSorterTool,
  'text-reverser': TextReverserTool,
  'slug-generator': SlugGeneratorTool,
  'lorem-ipsum-generator': LoremIpsumGeneratorTool,

  // Developer Tools
  'json-formatter': JsonFormatterTool,
  'json-validator': JsonValidatorTool,
  'json-minifier': JsonMinifierTool,
  'base64-encoder': Base64EncoderTool,
  'base64-decoder': Base64DecoderTool,
  'url-encoder': UrlEncoderTool,
  'url-decoder': UrlDecoderTool,
  'uuid-generator': UuidGeneratorTool,
  'regex-tester': RegexTesterTool,
  'timestamp-converter': TimestampConverterTool,
  'html-formatter': HtmlFormatterTool,
  'css-formatter': CssFormatterTool,
  'javascript-formatter': JavascriptFormatterTool,
  'sql-formatter': SqlFormatterTool,
  'color-converter': ColorConverterTool,
  'markdown-previewer': MarkdownPreviewerTool,
  'diff-checker': DiffCheckerTool,

  // SEO Tools
  'meta-tag-generator': MetaTagGeneratorTool,
  'robots-txt-generator': RobotsTxtGeneratorTool,
  'sitemap-generator': SitemapGeneratorTool,
  'open-graph-generator': OpenGraphGeneratorTool,
  'serp-preview': SerpPreviewTool,
  'keyword-density-checker': KeywordDensityCheckerTool,
  'url-slug-generator': UrlSlugGeneratorTool,
  'http-status-checker': HttpStatusCheckerTool,
  'website-seo-checker': WebsiteSeoCheckerTool,
};

export default function ToolDispatcher({ slug }: { slug: string }) {
  const Component = toolComponents[slug];

  if (!Component) {
    return (
      <div className="rounded-sm border border-gray-200 bg-white p-8 text-center">
        <h3 className="text-base font-bold text-black font-mono">Tool Not Found</h3>
        <p className="mt-2 text-xs text-gray-500 font-sans">
          The requested tool could not be loaded or is currently unavailable.
        </p>
      </div>
    );
  }

  return <Component />;
}
