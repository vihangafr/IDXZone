'use client';

import React from 'react';
import {
  ImageCompressorTool,
  ImageResizerTool,
  JpgToPngTool,
  PngToJpgTool,
  WebpConverterTool,
  ImageCropperTool,
  ImageToBase64Tool,
  Base64ToImageTool,
  FaviconGeneratorTool,
  QrCodeGeneratorTool,
} from './ImageTools';

import {
  JpgToPdfTool,
  MergePdfTool,
  SplitPdfTool,
  RotatePdfTool,
  PdfCompressorTool,
  PdfToJpgTool,
  CsvToJsonTool,
  JsonToCsvTool,
} from './PdfTools';

import {
  WordCounterTool,
  CharacterCounterTool,
  CaseConverterTool,
  RemoveDuplicateLinesTool,
  TextSorterTool,
  TextReverserTool,
  SlugGeneratorTool,
  LoremIpsumGeneratorTool,
} from './TextTools';

import {
  JsonFormatterTool,
  JsonValidatorTool,
  JsonMinifierTool,
  Base64EncoderTool,
  Base64DecoderTool,
  UrlEncoderTool,
  UrlDecoderTool,
  UuidGeneratorTool,
  RegexTesterTool,
  TimestampConverterTool,
  HtmlFormatterTool,
  CssFormatterTool,
  JavascriptFormatterTool,
  SqlFormatterTool,
  ColorConverterTool,
  MarkdownPreviewerTool,
  DiffCheckerTool,
} from './DeveloperTools';

import {
  MetaTagGeneratorTool,
  RobotsTxtGeneratorTool,
  SitemapGeneratorTool,
  OpenGraphGeneratorTool,
  SerpPreviewTool,
  KeywordDensityCheckerTool,
  UrlSlugGeneratorTool,
  HttpStatusCheckerTool,
  WebsiteSeoCheckerTool,
} from './SeoTools';

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
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h3 className="text-lg font-bold text-slate-900">Tool Not Found</h3>
        <p className="mt-2 text-sm text-slate-500">
          The requested tool could not be loaded or is currently unavailable.
        </p>
      </div>
    );
  }

  return <Component />;
}
