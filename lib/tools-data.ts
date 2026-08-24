export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  keywords: string[];
  popular?: boolean;
  howItWorks: string[];
  faqs: ToolFAQ[];
  relatedSlugs: string[];
}

export type ToolCategory =
  | 'image'
  | 'pdf'
  | 'text'
  | 'developer'
  | 'seo';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  iconName: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Compress, convert, resize, crop, and generate image assets directly in your browser.',
    iconName: 'Image',
  },
  {
    id: 'pdf',
    name: 'PDF & File Tools',
    description: 'Merge, split, rotate, convert, and format PDF documents and data files locally.',
    iconName: 'FileText',
  },
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Count words, format case, sort lines, generate dummy text, and clean text.',
    iconName: 'Type',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Format JSON, encode/decode Base64 and URLs, test regex, convert timestamps, and inspect diffs.',
    iconName: 'Code',
  },
  {
    id: 'seo',
    name: 'SEO & Website Tools',
    description: 'Generate meta tags, open graph cards, robots.txt, sitemaps, and check SERP previews.',
    iconName: 'Globe',
  },
];

export const TOOLS: ToolDefinition[] = [
  // IMAGE TOOLS
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'image',
    tagline: 'Compress JPG, PNG, and WebP images without losing visual quality.',
    description: 'Reduce image file sizes instantly in your browser with adjustable quality levels. No server uploads required.',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'shrink jpg', 'png compressor', 'webp compress'],
    popular: true,
    howItWorks: [
      'Select or drag-and-drop a JPG, PNG, or WebP image.',
      'Adjust the quality slider to find your desired balance between file size and clarity.',
      'Preview the compressed output and download the optimized image file immediately.',
    ],
    faqs: [
      {
        question: 'Are my images uploaded to any server?',
        answer: 'No. All compression is performed entirely on your device using client-side HTML5 Canvas technology.',
      },
      {
        question: 'What image formats are supported?',
        answer: 'You can compress JPEG, PNG, and WebP image files.',
      },
      {
        question: 'How much file size reduction can I expect?',
        answer: 'Depending on the original file and quality settings, reductions of 40% to 85% are typical with minimal perceptible quality loss.',
      },
    ],
    relatedSlugs: ['image-resizer', 'webp-converter', 'png-to-jpg', 'jpg-to-png'],
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'image',
    tagline: 'Resize images by pixels or percentage while maintaining aspect ratio.',
    description: 'Fast, precise image dimension resizing directly in your browser. Specify exact dimensions or scale proportionally.',
    keywords: ['image resizer', 'resize photo', 'change image dimensions', 'scale image', 'pixel resizer'],
    popular: true,
    howItWorks: [
      'Upload an image from your computer or phone.',
      'Enter the target width and height in pixels or select a percentage scale.',
      'Keep the aspect ratio locked or adjust dimensions freely, then download the resized image.',
    ],
    faqs: [
      {
        question: 'Can I preserve the original aspect ratio?',
        answer: 'Yes, lock the aspect ratio toggle so updating either width or height automatically recalculates the other.',
      },
      {
        question: 'Does resizing reduce image resolution?',
        answer: 'Downscaling reduces pixel dimensions and file size. Upscaling increases dimensions, though original detail cannot be synthesized.',
      },
    ],
    relatedSlugs: ['image-compressor', 'image-cropper', 'jpg-to-png', 'webp-converter'],
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    category: 'image',
    tagline: 'Convert JPEG and JPG images to lossless PNG format.',
    description: 'Transform JPG images into high quality PNG format with a single click. Safe, local, and instantaneous.',
    keywords: ['jpg to png', 'convert jpeg to png', 'jpeg converter', 'image to png'],
    popular: true,
    howItWorks: [
      'Upload your JPG or JPEG image.',
      'Click Convert to generate the PNG representation.',
      'Download your lossless PNG image file.',
    ],
    faqs: [
      {
        question: 'Why convert JPG to PNG?',
        answer: 'PNG uses lossless compression, making it ideal for graphics, diagrams, and preserving crisp edges without JPEG artifacts.',
      },
      {
        question: 'Is this conversion completely private?',
        answer: 'Yes, the conversion runs entirely in your browser using canvas rendering.',
      },
    ],
    relatedSlugs: ['png-to-jpg', 'webp-converter', 'image-compressor', 'image-to-base64'],
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    category: 'image',
    tagline: 'Convert PNG images to lightweight JPG format with custom background.',
    description: 'Convert transparent or solid PNG graphics into lightweight JPG files with custom background color fill.',
    keywords: ['png to jpg', 'convert png to jpeg', 'png to jpeg converter'],
    popular: true,
    howItWorks: [
      'Upload any PNG file.',
      'Select background color for transparent pixels (default is white) and set quality.',
      'Download your converted JPG image.',
    ],
    faqs: [
      {
        question: 'What happens to transparent backgrounds in PNG?',
        answer: 'JPG does not support transparency. Our tool fills transparent areas with clean white (or your chosen background color) before saving.',
      },
    ],
    relatedSlugs: ['jpg-to-png', 'webp-converter', 'image-compressor', 'image-resizer'],
  },
  {
    id: 'webp-converter',
    slug: 'webp-converter',
    name: 'WebP Converter',
    category: 'image',
    tagline: 'Convert images to and from modern WebP format.',
    description: 'Convert JPG, PNG, and GIF files to lightweight WebP format for fast web delivery, or convert WebP to JPG/PNG.',
    keywords: ['webp converter', 'convert to webp', 'webp to png', 'webp to jpg', 'image webp'],
    popular: false,
    howItWorks: [
      'Choose your source image (JPG, PNG, or WebP).',
      'Select your desired target format (WebP, PNG, or JPG).',
      'Click convert and download the resulting file.',
    ],
    faqs: [
      {
        question: 'What are the benefits of WebP?',
        answer: 'WebP offers 25-35% smaller file sizes than comparable JPGs and PNGs while retaining visual fidelity and transparency support.',
      },
    ],
    relatedSlugs: ['image-compressor', 'jpg-to-png', 'png-to-jpg', 'favicon-generator'],
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    name: 'Image Cropper',
    category: 'image',
    tagline: 'Crop images to standard aspect ratios or custom dimensions.',
    description: 'Interactive client-side image cropping with standard presets (1:1 Square, 16:9 Landscape, 4:3, 9:16 Story) or freeform selection.',
    keywords: ['image cropper', 'crop photo', 'square crop', 'aspect ratio crop', 'photo trimmer'],
    popular: false,
    howItWorks: [
      'Upload an image.',
      'Choose an aspect ratio preset or adjust the crop box coordinates and dimensions.',
      'Preview the cropped section and click Download Cropped Image.',
    ],
    faqs: [
      {
        question: 'Can I crop for social media profiles?',
        answer: 'Yes, use the 1:1 preset for avatar photos, 16:9 for banners, or 9:16 for stories and reels.',
      },
    ],
    relatedSlugs: ['image-resizer', 'image-compressor', 'favicon-generator'],
  },
  {
    id: 'image-to-base64',
    slug: 'image-to-base64',
    name: 'Image to Base64',
    category: 'image',
    tagline: 'Convert image files into Base64 strings or CSS Data URIs.',
    description: 'Generate clean Data URI and Base64 encoded strings from JPG, PNG, WebP, and SVG images for direct embedding.',
    keywords: ['image to base64', 'base64 image encoder', 'image data uri', 'embed image css'],
    popular: false,
    howItWorks: [
      'Select an image file from your device.',
      'The file is encoded into Base64 instantly.',
      'Copy the raw Base64 string, Data URI, HTML <img> tag, or CSS background-image snippet.',
    ],
    faqs: [
      {
        question: 'When should I use Base64 images?',
        answer: 'Base64 images are great for small icons, offline HTML pages, email templates, and avoiding extra HTTP network round-trips.',
      },
    ],
    relatedSlugs: ['base64-to-image', 'base64-encoder', 'favicon-generator'],
  },
  {
    id: 'base64-to-image',
    slug: 'base64-to-image',
    name: 'Base64 to Image',
    category: 'image',
    tagline: 'Decode Base64 strings into downloadable image files.',
    description: 'Paste any Base64 encoded string or Data URI to preview and download the decoded image as a file.',
    keywords: ['base64 to image', 'decode base64 image', 'base64 photo viewer', 'data uri to image'],
    popular: false,
    howItWorks: [
      'Paste your Base64 string or Data URI into the input box.',
      'View the real-time decoded image preview.',
      'Download the image directly as a PNG or JPG file.',
    ],
    faqs: [
      {
        question: 'Does it accept strings without the "data:image/..." prefix?',
        answer: 'Yes, raw Base64 payloads are automatically detected and formatted.',
      },
    ],
    relatedSlugs: ['image-to-base64', 'base64-decoder', 'jpg-to-png'],
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    name: 'Favicon Generator',
    category: 'image',
    tagline: 'Generate standard website favicon packages from any logo or image.',
    description: 'Create multi-size favicon bundles (16x16, 32x32, 48x48, 180x180 Apple Touch Icon) with HTML link tags.',
    keywords: ['favicon generator', 'make favicon', 'ico generator', 'apple touch icon', 'website icon creator'],
    popular: true,
    howItWorks: [
      'Upload your square or rectangular logo/image.',
      'The tool automatically centers and resizes it to standard web favicon dimensions.',
      'Download individual sizes or copy the ready-to-paste HTML header code.',
    ],
    faqs: [
      {
        question: 'What sizes are generated?',
        answer: 'Standard sizes include 16x16 (browser tab), 32x32 (bookmarks), 48x48 (desktop shortcuts), and 180x180 (iOS Apple Touch Icon).',
      },
    ],
    relatedSlugs: ['image-resizer', 'png-to-jpg', 'meta-tag-generator'],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'image',
    tagline: 'Generate crisp, customizable QR codes for URLs, text, and Wi-Fi.',
    description: 'Instant QR code creator with color customization, high resolution download, and clean vector/PNG export.',
    keywords: ['qr code generator', 'create qr code', 'free qr code', 'custom qr code', 'download qr code'],
    popular: true,
    howItWorks: [
      'Type or paste your URL, text, email, or Wi-Fi configuration.',
      'Customize colors, error correction level, and size.',
      'Download the crisp QR code as a high-resolution PNG image.',
    ],
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No. These are static QR codes that encode your exact data directly. They work permanently without redirection.',
      },
      {
        question: 'Is there a scan limit?',
        answer: 'There are zero limits because no middleman server is involved.',
      },
    ],
    relatedSlugs: ['image-to-base64', 'url-encoder', 'meta-tag-generator'],
  },

  // PDF & FILE TOOLS
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG Converter',
    category: 'pdf',
    tagline: 'Extract and convert PDF pages into high-resolution JPG images.',
    description: 'Convert each page of a PDF document into high clarity JPG pictures directly in the browser.',
    keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpeg', 'extract pdf pages as images'],
    popular: true,
    howItWorks: [
      'Upload your PDF file.',
      'Select individual pages or extract all pages.',
      'Download the converted JPG files to your device.',
    ],
    faqs: [
      {
        question: 'Is my confidential PDF uploaded anywhere?',
        answer: 'No. Rendering happens entirely in your local browser sandbox.',
      },
    ],
    relatedSlugs: ['jpg-to-pdf', 'pdf-merger', 'pdf-splitter', 'pdf-compressor'],
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    category: 'pdf',
    tagline: 'Combine JPG, PNG, and WebP images into a clean PDF document.',
    description: 'Convert one or multiple image files into a single, well-formatted multi-page PDF document.',
    keywords: ['jpg to pdf', 'images to pdf', 'convert photo to pdf', 'combine pictures into pdf'],
    popular: true,
    howItWorks: [
      'Upload one or more JPG, PNG, or WebP images.',
      'Reorder pages as desired and select orientation (Portrait, Landscape, or Auto).',
      'Click Generate PDF and download your document.',
    ],
    faqs: [
      {
        question: 'Can I reorder the images before creating the PDF?',
        answer: 'Yes, you can easily shift images up or down to set the exact page sequence.',
      },
    ],
    relatedSlugs: ['pdf-to-jpg', 'pdf-merger', 'image-compressor'],
  },
  {
    id: 'pdf-compressor',
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    category: 'pdf',
    tagline: 'Reduce PDF document file size for easy emailing and uploading.',
    description: 'Optimize and compress PDF documents in the browser. Strip unnecessary metadata and compress embedded assets.',
    keywords: ['pdf compressor', 'compress pdf', 'reduce pdf size', 'shrink pdf file'],
    popular: true,
    howItWorks: [
      'Choose a PDF document from your device.',
      'Select your compression optimization mode.',
      'Download your reduced-size PDF document.',
    ],
    faqs: [
      {
        question: 'Will text in my PDF remain sharp?',
        answer: 'Yes, vector text, shapes, and font glyphs remain perfectly sharp.',
      },
    ],
    relatedSlugs: ['pdf-merger', 'pdf-splitter', 'pdf-to-jpg', 'jpg-to-pdf'],
  },
  {
    id: 'pdf-merger',
    slug: 'pdf-merger',
    name: 'PDF Merger',
    category: 'pdf',
    tagline: 'Combine multiple PDF documents into a single unified file.',
    description: 'Merge two or more PDF files into a single PDF document in the exact order you specify.',
    keywords: ['pdf merger', 'merge pdf', 'combine pdf files', 'join pdfs together'],
    popular: true,
    howItWorks: [
      'Upload two or more PDF documents.',
      'Drag or move documents to adjust the merged page sequence.',
      'Click Merge PDFs and save the combined document.',
    ],
    faqs: [
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'You can merge as many documents as your local device memory comfortably handles without server restrictions.',
      },
    ],
    relatedSlugs: ['pdf-splitter', 'pdf-rotator', 'jpg-to-pdf', 'pdf-compressor'],
  },
  {
    id: 'pdf-splitter',
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    category: 'pdf',
    tagline: 'Split PDF files by page ranges or extract specific pages.',
    description: 'Extract single pages or custom page ranges (e.g. 1-3, 5, 8-10) into a new standalone PDF.',
    keywords: ['pdf splitter', 'split pdf', 'extract pdf pages', 'separate pdf pages'],
    popular: false,
    howItWorks: [
      'Upload the PDF file you wish to split.',
      'Specify the page range (for example: "1, 3-5, 8") or select individual pages.',
      'Download the newly extracted PDF document.',
    ],
    faqs: [
      {
        question: 'Can I extract multiple disjoint ranges into one file?',
        answer: 'Yes, enter comma-separated numbers and ranges such as "1, 3-4, 7-10".',
      },
    ],
    relatedSlugs: ['pdf-merger', 'pdf-rotator', 'pdf-to-jpg'],
  },
  {
    id: 'pdf-rotator',
    slug: 'pdf-rotator',
    name: 'PDF Rotator',
    category: 'pdf',
    tagline: 'Rotate PDF pages 90, 180, or 270 degrees permanently.',
    description: 'Fix upside-down or sideways scanned PDF pages by rotating specific pages or all pages at once.',
    keywords: ['rotate pdf', 'pdf rotator', 'turn pdf pages', 'fix sideways pdf'],
    popular: false,
    howItWorks: [
      'Upload your PDF file.',
      'Choose rotation angle (90° clockwise, 180°, or 270° clockwise) and apply to all or specific pages.',
      'Download the permanently rotated PDF file.',
    ],
    faqs: [
      {
        question: 'Does this permanently alter the PDF file rotation?',
        answer: 'Yes, the saved PDF will open upright in any PDF viewer on all devices.',
      },
    ],
    relatedSlugs: ['pdf-merger', 'pdf-splitter', 'pdf-to-jpg'],
  },
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    category: 'pdf',
    tagline: 'Convert CSV table data into formatted JSON arrays and objects.',
    description: 'Parse CSV files or pasted comma/tab-delimited text into clean, structured JSON with type parsing.',
    keywords: ['csv to json', 'convert csv to json', 'csv parser', 'table to json'],
    popular: false,
    howItWorks: [
      'Upload a CSV file or paste raw tabular text.',
      'Select delimiter (auto-detect, comma, semicolon, tab).',
      'Copy the formatted JSON or download as a .json file.',
    ],
    faqs: [
      {
        question: 'Does it automatically convert numbers and booleans?',
        answer: 'Yes, you can toggle smart type parsing to convert "123" to numbers and "true" to booleans.',
      },
    ],
    relatedSlugs: ['json-to-csv', 'json-formatter', 'json-validator'],
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    category: 'pdf',
    tagline: 'Convert JSON data arrays into spreadsheet-ready CSV files.',
    description: 'Flatten arrays of JSON objects into clean CSV tables for Excel, Google Sheets, and databases.',
    keywords: ['json to csv', 'convert json to csv', 'json to excel', 'export json to spreadsheet'],
    popular: false,
    howItWorks: [
      'Paste your JSON array or upload a .json file.',
      'Preview the parsed table columns and rows.',
      'Download your formatted .csv spreadsheet file.',
    ],
    faqs: [
      {
        question: 'What JSON formats are supported?',
        answer: 'Arrays of objects (e.g. `[{"id": 1, "name": "Alice"}]`) or key-value object structures.',
      },
    ],
    relatedSlugs: ['csv-to-json', 'json-formatter', 'json-minifier'],
  },

  // TEXT TOOLS
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text',
    tagline: 'Count words, characters, sentences, paragraphs, and reading time.',
    description: 'Real-time text statistics calculator including word count, character count (with/without spaces), reading time, and speaking time.',
    keywords: ['word counter', 'character counter', 'count words online', 'reading time calculator', 'essay word count'],
    popular: true,
    howItWorks: [
      'Type or paste your text into the editor.',
      'View instantaneous statistics on words, characters, sentences, paragraphs, and estimated reading duration.',
      'Easily copy or clear text with one click.',
    ],
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is computed using an average standard reading rate of 200 words per minute.',
      },
      {
        question: 'Is my text stored anywhere?',
        answer: 'Never. All analysis is strictly local to your browser session.',
      },
    ],
    relatedSlugs: ['character-counter', 'case-converter', 'keyword-density-checker', 'lorem-ipsum-generator'],
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'text',
    tagline: 'Calculate exact character counts, space counts, and byte sizes.',
    description: 'Precise character counter designed for social media limits (X/Twitter, LinkedIn, Meta), SMS lengths, and byte verification.',
    keywords: ['character counter', 'letter counter', 'twitter character count', 'sms length checker', 'byte size calculator'],
    popular: false,
    howItWorks: [
      'Paste or write your text in the box.',
      'Inspect detailed metrics: total characters, characters excluding spaces, letters, numbers, spaces, and UTF-8 byte weight.',
      'Check against popular social media length limits.',
    ],
    faqs: [
      {
        question: 'Why does byte size differ from character count?',
        answer: 'Standard ASCII characters take 1 byte in UTF-8, while emojis and special international characters take 2 to 4 bytes.',
      },
    ],
    relatedSlugs: ['word-counter', 'case-converter', 'meta-tag-generator'],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    tagline: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, and snake_case.',
    description: 'Transform text case styles with one click: Sentence case, UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and PascalCase.',
    keywords: ['case converter', 'text case changer', 'uppercase to lowercase', 'title case generator', 'camelcase converter'],
    popular: true,
    howItWorks: [
      'Enter or paste your text.',
      'Click any case transformation button (e.g. UPPERCASE, Title Case, camelCase, kebab-case).',
      'Copy the converted text to your clipboard.',
    ],
    faqs: [
      {
        question: 'Which casing formats are supported?',
        answer: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE.',
      },
    ],
    relatedSlugs: ['slug-generator', 'word-counter', 'text-sorter'],
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'text',
    tagline: 'Deduplicate text lists and clean repeating lines instantly.',
    description: 'Quickly remove identical duplicate lines from lists, data dumps, and text files with case-sensitivity and whitespace options.',
    keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines filter', 'clean text lines'],
    popular: false,
    howItWorks: [
      'Paste your multi-line list.',
      'Configure options (Case-sensitive matching, Trim surrounding whitespace, Remove empty lines).',
      'Copy or download the cleaned unique list.',
    ],
    faqs: [
      {
        question: 'Can I preserve original line order?',
        answer: 'Yes, the first occurrence of each unique line is preserved in its original relative position.',
      },
    ],
    relatedSlugs: ['text-sorter', 'text-reverser', 'case-converter'],
  },
  {
    id: 'text-sorter',
    slug: 'text-sorter',
    name: 'Text Sorter',
    category: 'text',
    tagline: 'Sort lists alphabetically, by length, or naturally.',
    description: 'Sort lines of text in alphabetical (A-Z or Z-A), natural numerical, line length, or random shuffle order.',
    keywords: ['text sorter', 'alphabetize list', 'sort lines', 'sort text a-z', 'list organizer'],
    popular: false,
    howItWorks: [
      'Paste your lines into the input area.',
      'Select your sorting method: Alphabetical (A-Z / Z-A), Numerical Natural, Line Length, or Shuffle.',
      'Copy the organized list.',
    ],
    faqs: [
      {
        question: 'What is natural numerical sorting?',
        answer: 'Natural sorting orders "Item 2" before "Item 10", unlike standard ASCII alphabetical sorting.',
      },
    ],
    relatedSlugs: ['remove-duplicate-lines', 'text-reverser', 'case-converter'],
  },
  {
    id: 'text-reverser',
    slug: 'text-reverser',
    name: 'Text Reverser',
    category: 'text',
    tagline: 'Reverse whole text, words, or individual lines.',
    description: 'Flip text backwards, reverse word ordering, reverse line sequences, or create mirrored text.',
    keywords: ['text reverser', 'reverse text', 'backwards text generator', 'reverse words', 'flip text'],
    popular: false,
    howItWorks: [
      'Type or paste your text.',
      'Choose reverse mode: Reverse Characters, Reverse Words, or Reverse Line Order.',
      'Copy the reversed outcome.',
    ],
    faqs: [
      {
        question: 'Does it support emojis and unicode?',
        answer: 'Yes, surrogate pairs and multi-byte emojis are handled cleanly without character corruption.',
      },
    ],
    relatedSlugs: ['text-sorter', 'remove-duplicate-lines', 'case-converter'],
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    name: 'Slug Generator',
    category: 'text',
    tagline: 'Generate clean, URL-safe slugs from article titles and text.',
    description: 'Convert headlines and strings into URL-friendly permalinks with custom separators and special character stripping.',
    keywords: ['slug generator', 'url slug creator', 'permalink generator', 'title to slug', 'seo friendly url'],
    popular: false,
    howItWorks: [
      'Enter any title or headline.',
      'Select separator style (hyphen "-", underscore "_", or dot ".").',
      'Copy your clean, lowercase URL slug.',
    ],
    faqs: [
      {
        question: 'Are accented and foreign characters converted?',
        answer: 'Yes, international characters (e.g. é, ü, ñ) are transliterated to standard ASCII equivalents.',
      },
    ],
    relatedSlugs: ['case-converter', 'meta-tag-generator', 'url-slug-generator'],
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    category: 'text',
    tagline: 'Generate standard dummy placeholder text by paragraphs, sentences, or words.',
    description: 'Fast, classic Latin placeholder text generator for web mockups, typography layouts, and UI prototypes.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text', 'lipsum generator', 'filler text'],
    popular: false,
    howItWorks: [
      'Choose whether to generate Paragraphs, Sentences, or Words.',
      'Specify the quantity and toggle "Start with Lorem ipsum dolor sit amet...".',
      'Copy the generated placeholder text with one click.',
    ],
    faqs: [
      {
        question: 'Is this the authentic standard Cicero text?',
        answer: 'Yes, it follows the classical passage derived from Cicero\'s 45 BC treatise "de Finibus Bonorum et Malorum".',
      },
    ],
    relatedSlugs: ['word-counter', 'character-counter', 'markdown-previewer'],
  },

  // DEVELOPER TOOLS
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer',
    tagline: 'Format, beautify, and inspect JSON with custom indentation.',
    description: 'Clean up unformatted JSON payloads with 2-space, 4-space, or tab indentation and instant syntax highlighting.',
    keywords: ['json formatter', 'beautify json', 'json pretty print', 'format json online', 'json cleaner'],
    popular: true,
    howItWorks: [
      'Paste your raw JSON into the input editor.',
      'Click Format JSON to beautify and validate the syntax.',
      'Copy the clean JSON or download as a .json file.',
    ],
    faqs: [
      {
        question: 'Does it highlight syntax errors if the JSON is invalid?',
        answer: 'Yes, if invalid, the exact line and character error position will be indicated.',
      },
    ],
    relatedSlugs: ['json-validator', 'json-minifier', 'csv-to-json', 'json-to-csv'],
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    name: 'JSON Validator',
    category: 'developer',
    tagline: 'Validate JSON syntax and pinpoint formatting errors.',
    description: 'Check JSON compliance against RFC standards with line-by-line error messages and structure verification.',
    keywords: ['json validator', 'validate json', 'json lint', 'check json syntax', 'find json error'],
    popular: false,
    howItWorks: [
      'Paste your JSON data into the validator.',
      'The tool automatically evaluates the payload structure.',
      'Receive instant confirmation or descriptive error diagnostics.',
    ],
    faqs: [
      {
        question: 'What types of JSON errors are caught?',
        answer: 'Trailing commas, unquoted keys, single quotes, unclosed brackets/braces, and invalid escape characters.',
      },
    ],
    relatedSlugs: ['json-formatter', 'json-minifier', 'diff-checker'],
  },
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    name: 'JSON Minifier',
    category: 'developer',
    tagline: 'Compress and minify JSON into a compact single-line string.',
    description: 'Remove whitespace, indentation, and newlines from JSON data to minimize payload bandwidth.',
    keywords: ['json minifier', 'compress json', 'minify json', 'shrink json', 'compact json'],
    popular: false,
    howItWorks: [
      'Paste your formatted JSON code.',
      'Click Minify JSON.',
      'Copy the compact single-line string and see total bytes saved.',
    ],
    faqs: [
      {
        question: 'Does minifying JSON change its data or meaning?',
        answer: 'No, minification only strips unneeded whitespace between tokens without modifying keys or values.',
      },
    ],
    relatedSlugs: ['json-formatter', 'json-validator', 'base64-encoder'],
  },
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    category: 'developer',
    tagline: 'Encode plain text or UTF-8 strings into Base64 format.',
    description: 'Encode text strings, API tokens, and credentials into standard RFC 4648 Base64 representation.',
    keywords: ['base64 encoder', 'encode base64', 'text to base64', 'base64 string converter'],
    popular: true,
    howItWorks: [
      'Type or paste your plaintext string.',
      'Click Encode (or watch real-time encoding).',
      'Copy the resulting Base64 output.',
    ],
    faqs: [
      {
        question: 'Does it support special international characters?',
        answer: 'Yes, full UTF-8 encoding is supported to ensure non-ASCII characters and emojis encode without error.',
      },
    ],
    relatedSlugs: ['base64-decoder', 'url-encoder', 'image-to-base64'],
  },
  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    name: 'Base64 Decoder',
    category: 'developer',
    tagline: 'Decode Base64 strings back to readable UTF-8 text.',
    description: 'Decode Base64 encoded strings back to human-readable plaintext with automatic padding correction.',
    keywords: ['base64 decoder', 'decode base64', 'base64 to text', 'base64 string reader'],
    popular: true,
    howItWorks: [
      'Paste your Base64 encoded string.',
      'Click Decode.',
      'Copy or inspect the resulting decoded plaintext.',
    ],
    faqs: [
      {
        question: 'What happens if a Base64 string is missing padding ("=")?',
        answer: 'Our decoder automatically handles missing padding characters and decodes safely.',
      },
    ],
    relatedSlugs: ['base64-encoder', 'url-decoder', 'base64-to-image'],
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    name: 'URL Encoder',
    category: 'developer',
    tagline: 'Encode strings and query parameters for safe use in URLs.',
    description: 'Percent-encode reserved characters and symbols in query strings, URIs, and URL parameters.',
    keywords: ['url encoder', 'encode uri component', 'percent encoder', 'query string encoder', 'url encode online'],
    popular: false,
    howItWorks: [
      'Enter the text or URL parameter string to encode.',
      'Choose standard encodeURIComponent or full encodeURI mode.',
      'Copy the percent-encoded URL string.',
    ],
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURIComponent encodes all special characters including "/", "?", and "&", which is essential for query parameter values.',
      },
    ],
    relatedSlugs: ['url-decoder', 'base64-encoder', 'slug-generator'],
  },
  {
    id: 'url-decoder',
    slug: 'url-decoder',
    name: 'URL Decoder',
    category: 'developer',
    tagline: 'Decode percent-encoded URL strings back into readable text.',
    description: 'Convert percent-encoded URI strings (%20, %2F, %3F, etc.) back into standard readable text.',
    keywords: ['url decoder', 'decode uri component', 'percent decoder', 'query string decoder', 'url decode online'],
    popular: false,
    howItWorks: [
      'Paste your percent-encoded URL string.',
      'Click Decode URL.',
      'Copy the clean decoded text.',
    ],
    faqs: [
      {
        question: 'Does it handle plus signs "+" as spaces?',
        answer: 'Yes, form-encoded plus signs are converted to standard spaces when requested.',
      },
    ],
    relatedSlugs: ['url-encoder', 'base64-decoder', 'slug-generator'],
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'developer',
    tagline: 'Generate cryptographically secure v4 UUIDs in bulk.',
    description: 'Generate version 4 UUIDs (Universally Unique Identifiers) instantly with custom hyphens, uppercase, and bulk batching.',
    keywords: ['uuid generator', 'guid generator', 'v4 uuid', 'generate random uuid', 'unique id generator'],
    popular: true,
    howItWorks: [
      'Select how many UUIDs you need (1 to 100).',
      'Choose formatting options (hyphens, uppercase, braces).',
      'Copy individual UUIDs or the whole list to clipboard.',
    ],
    faqs: [
      {
        question: 'Are these UUIDs cryptographically random?',
        answer: 'Yes, they are generated using the browser\'s built-in `crypto.getRandomValues()` API for true cryptographic randomness.',
      },
    ],
    relatedSlugs: ['timestamp-converter', 'json-formatter', 'base64-encoder'],
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'developer',
    tagline: 'Test regular expressions in real-time with match highlighting.',
    description: 'Interactive regular expression testing workbench with flag toggles (g, i, m, s), capture group breakdown, and match highlighting.',
    keywords: ['regex tester', 'regular expression tester', 'regex match', 'test regex online', 'regex validator'],
    popular: true,
    howItWorks: [
      'Enter your regular expression pattern and select flags (Global, Case-insensitive, Multiline).',
      'Type or paste your test text in the subject box.',
      'View highlighted matches, indices, and capture group values instantly.',
    ],
    faqs: [
      {
        question: 'Which regex dialect is used?',
        answer: 'Standard ECMAScript / JavaScript regular expression syntax natively supported by your browser.',
      },
    ],
    relatedSlugs: ['text-sorter', 'remove-duplicate-lines', 'diff-checker'],
  },
  {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'developer',
    tagline: 'Convert Unix epoch timestamps to human dates and vice versa.',
    description: 'Convert Unix timestamps in seconds or milliseconds to human-readable UTC and local date formats, and convert dates to timestamps.',
    keywords: ['timestamp converter', 'unix timestamp to date', 'epoch converter', 'date to timestamp', 'epoch time'],
    popular: false,
    howItWorks: [
      'Enter a Unix timestamp (seconds or milliseconds) or pick a date/time from the picker.',
      'View converted formats: UTC, Local Time, ISO 8601, Relative Time ("x minutes ago").',
      'Copy the desired representation.',
    ],
    faqs: [
      {
        question: 'How do I know if my timestamp is in seconds or milliseconds?',
        answer: '10-digit timestamps are usually seconds (e.g. 1740000000) while 13-digit numbers represent milliseconds.',
      },
    ],
    relatedSlugs: ['uuid-generator', 'json-formatter', 'color-converter'],
  },
  {
    id: 'html-formatter',
    slug: 'html-formatter',
    name: 'HTML Formatter',
    category: 'developer',
    tagline: 'Format and indent HTML code with clean tag hierarchy.',
    description: 'Beautify messy HTML markup with consistent tag indentation, attribute alignment, and clean structure.',
    keywords: ['html formatter', 'beautify html', 'html pretty print', 'clean html code', 'format html online'],
    popular: false,
    howItWorks: [
      'Paste your raw HTML markup.',
      'Choose indentation size (2 spaces, 4 spaces).',
      'Copy the cleanly formatted HTML.',
    ],
    faqs: [
      {
        question: 'Does it format inline scripts and styles?',
        answer: 'Yes, basic tag hierarchy is preserved and nested tags are indented neatly.',
      },
    ],
    relatedSlugs: ['css-formatter', 'javascript-formatter', 'markdown-previewer'],
  },
  {
    id: 'css-formatter',
    slug: 'css-formatter',
    name: 'CSS Formatter',
    category: 'developer',
    tagline: 'Beautify and format CSS stylesheets with clean rules.',
    description: 'Format unorganized CSS rules, selectors, and declarations into readable, well-spaced stylesheets.',
    keywords: ['css formatter', 'beautify css', 'css pretty print', 'format css stylesheet', 'clean css'],
    popular: false,
    howItWorks: [
      'Paste your raw CSS code.',
      'Click Format CSS.',
      'Copy the organized stylesheet output.',
    ],
    faqs: [
      {
        question: 'Does it support nested CSS selectors?',
        answer: 'Yes, standard CSS and media queries are formatted with proper indentation blocks.',
      },
    ],
    relatedSlugs: ['html-formatter', 'color-converter', 'json-formatter'],
  },
  {
    id: 'javascript-formatter',
    slug: 'javascript-formatter',
    name: 'JavaScript Formatter',
    category: 'developer',
    tagline: 'Format and indent JavaScript and TypeScript code snippets.',
    description: 'Beautify raw JavaScript code blocks with clean brackets, indentation, and semicolon structuring.',
    keywords: ['javascript formatter', 'beautify javascript', 'js pretty print', 'format js code', 'clean javascript'],
    popular: false,
    howItWorks: [
      'Paste your JavaScript or TypeScript snippet.',
      'Click Format JS.',
      'Copy the beautified script.',
    ],
    faqs: [
      {
        question: 'Is my source code uploaded anywhere?',
        answer: 'No, all code formatting occurs locally inside your browser.',
      },
    ],
    relatedSlugs: ['json-formatter', 'html-formatter', 'diff-checker'],
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    category: 'developer',
    tagline: 'Format and beautify SQL queries with uppercase keywords.',
    description: 'Transform complex SQL queries into cleanly indented statements with capitalized keywords (SELECT, FROM, WHERE, JOIN).',
    keywords: ['sql formatter', 'beautify sql', 'format sql query', 'sql pretty print', 'uppercase sql keywords'],
    popular: false,
    howItWorks: [
      'Paste your SQL query (Postgres, MySQL, SQLite, Oracle, SQL Server).',
      'Click Format SQL.',
      'Copy the clean, indented query.',
    ],
    faqs: [
      {
        question: 'Which SQL dialects are supported?',
        answer: 'Standard ANSI SQL syntax as well as PostgreSQL, MySQL, SQLite, and SQL Server queries.',
      },
    ],
    relatedSlugs: ['json-formatter', 'csv-to-json', 'diff-checker'],
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    name: 'Color Converter',
    category: 'developer',
    tagline: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK.',
    description: 'Interactive color picker and converter. Instantly copy HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK values.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hex to hsl', 'color picker', 'cmyk converter'],
    popular: false,
    howItWorks: [
      'Select a color using the visual picker or type a HEX, RGB, or HSL value.',
      'View real-time conversions in HEX, RGB, HSL, HSV, and CMYK.',
      'Click any format to copy its CSS string to clipboard.',
    ],
    faqs: [
      {
        question: 'Does it support opacity / alpha channels?',
        answer: 'Yes, you can adjust the alpha slider to generate RGBA and HSLA codes.',
      },
    ],
    relatedSlugs: ['css-formatter', 'favicon-generator', 'image-to-base64'],
  },
  {
    id: 'markdown-previewer',
    slug: 'markdown-previewer',
    name: 'Markdown Previewer',
    category: 'developer',
    tagline: 'Live preview Markdown with instant HTML rendering and export.',
    description: 'Interactive side-by-side Markdown editor and live HTML renderer with clean formatting and HTML export.',
    keywords: ['markdown previewer', 'markdown editor', 'markdown to html', 'live markdown preview', 'md viewer'],
    popular: false,
    howItWorks: [
      'Type or paste Markdown in the left editor pane.',
      'See live formatted output rendered on the right side.',
      'Copy the compiled HTML markup or raw Markdown with one click.',
    ],
    faqs: [
      {
        question: 'Which Markdown elements are supported?',
        answer: 'Headings, bold/italic, lists, blockquotes, code blocks, tables, links, and horizontal rules.',
      },
    ],
    relatedSlugs: ['html-formatter', 'word-counter', 'diff-checker'],
  },
  {
    id: 'diff-checker',
    slug: 'diff-checker',
    name: 'Diff Checker',
    category: 'developer',
    tagline: 'Compare two text snippets or code blocks to find differences.',
    description: 'Side-by-side and line-by-line diff comparison tool showing additions, deletions, and modifications clearly.',
    keywords: ['diff checker', 'text compare', 'compare two texts', 'code diff', 'find text differences'],
    popular: true,
    howItWorks: [
      'Paste your original text in the left pane and modified text in the right pane.',
      'Click Compare Diff.',
      'View highlighted differences line by line.',
    ],
    faqs: [
      {
        question: 'Are comparisons case-sensitive?',
        answer: 'Yes, text is compared with exact character fidelity.',
      },
    ],
    relatedSlugs: ['json-validator', 'text-sorter', 'remove-duplicate-lines'],
  },

  // SEO & WEBSITE TOOLS
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'seo',
    tagline: 'Generate essential SEO meta tags, Open Graph, and Twitter Cards.',
    description: 'Create ready-to-paste HTML meta tags for title, description, robots, Open Graph, and Twitter Card social sharing.',
    keywords: ['meta tag generator', 'seo meta tags', 'open graph generator', 'twitter card generator', 'html meta tags'],
    popular: true,
    howItWorks: [
      'Fill in your website title, description, canonical URL, and preview image URL.',
      'Select indexing options (index/noindex, follow/nofollow).',
      'Copy the generated HTML snippet directly into your website\'s <head> tag.',
    ],
    faqs: [
      {
        question: 'What is the recommended title and description length?',
        answer: 'Titles should be 50-60 characters, and meta descriptions should be between 140-160 characters for optimal search display.',
      },
    ],
    relatedSlugs: ['open-graph-generator', 'serp-preview', 'robots-txt-generator', 'sitemap-generator'],
  },
  {
    id: 'robots-txt-generator',
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo',
    tagline: 'Create a customized robots.txt file to guide search engine crawlers.',
    description: 'Configure crawler directives for Googlebot, Bingbot, and other web crawlers with custom Allow, Disallow, and Sitemap rules.',
    keywords: ['robots txt generator', 'create robots txt', 'robots file creator', 'seo crawler rules', 'googlebot directives'],
    popular: false,
    howItWorks: [
      'Choose standard crawl access rules (Allow all, Disallow specific folders).',
      'Add your sitemap URL.',
      'Copy or download the generated robots.txt file for your site root.',
    ],
    faqs: [
      {
        question: 'Where should the robots.txt file be placed?',
        answer: 'In the root directory of your website domain (e.g. `https://example.com/robots.txt`).',
      },
    ],
    relatedSlugs: ['sitemap-generator', 'meta-tag-generator', 'serp-preview'],
  },
  {
    id: 'sitemap-generator',
    slug: 'sitemap-generator',
    name: 'Sitemap Generator',
    category: 'seo',
    tagline: 'Generate an XML sitemap from a list of website URLs.',
    description: 'Convert a list of page URLs into a valid sitemap.xml file with change frequency, priority, and lastmod timestamps.',
    keywords: ['sitemap generator', 'xml sitemap creator', 'create sitemap xml', 'google sitemap generator'],
    popular: false,
    howItWorks: [
      'Paste your list of full URLs (one per line).',
      'Set change frequency (e.g. daily, weekly) and default priority.',
      'Download your valid sitemap.xml file ready for Google Search Console.',
    ],
    faqs: [
      {
        question: 'How do I submit the sitemap to search engines?',
        answer: 'Place sitemap.xml in your site root and submit the URL in Google Search Console and Bing Webmaster Tools.',
      },
    ],
    relatedSlugs: ['robots-txt-generator', 'meta-tag-generator', 'website-seo-checker'],
  },
  {
    id: 'open-graph-generator',
    slug: 'open-graph-generator',
    name: 'Open Graph Generator',
    category: 'seo',
    tagline: 'Create Open Graph and social media preview tags.',
    description: 'Generate complete og:title, og:description, og:image, and og:type tags for rich previews on Facebook, LinkedIn, Discord, and Slack.',
    keywords: ['open graph generator', 'og meta tags', 'facebook card generator', 'social share preview meta'],
    popular: false,
    howItWorks: [
      'Enter page title, description, website URL, and social banner image URL.',
      'Preview how the card will look when shared on social networks.',
      'Copy the generated Open Graph meta tags.',
    ],
    faqs: [
      {
        question: 'What is the ideal Open Graph image dimension?',
        answer: '1200 x 630 pixels with an aspect ratio of 1.91:1 provides the cleanest rendering across Facebook, LinkedIn, and X.',
      },
    ],
    relatedSlugs: ['meta-tag-generator', 'serp-preview', 'favicon-generator'],
  },
  {
    id: 'serp-preview',
    slug: 'serp-preview',
    name: 'SERP Preview Tool',
    category: 'seo',
    tagline: 'Simulate Google search engine result snippet previews.',
    description: 'Preview how your page title, URL, and meta description will look on Google desktop and mobile search result pages.',
    keywords: ['serp preview', 'google search preview', 'meta description preview', 'seo snippet simulator'],
    popular: true,
    howItWorks: [
      'Enter your page title, meta description, and target URL.',
      'Watch the real-time Google search snippet render in desktop and mobile viewports.',
      'Adjust length indicators to prevent truncation ellipses ("...").',
    ],
    faqs: [
      {
        question: 'When does Google truncate title tags?',
        answer: 'Google typically cuts off desktop titles exceeding approximately 580-600 pixels width (roughly 55-60 characters).',
      },
    ],
    relatedSlugs: ['meta-tag-generator', 'keyword-density-checker', 'url-slug-generator'],
  },
  {
    id: 'keyword-density-checker',
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    category: 'seo',
    tagline: 'Analyze single and multi-word keyword frequency and percentage.',
    description: 'Inspect keyword frequencies and percentage densities for 1-word, 2-word, and 3-word phrases in any content.',
    keywords: ['keyword density checker', 'keyword frequency analyzer', 'seo text analysis', 'word frequency counter'],
    popular: false,
    howItWorks: [
      'Paste your article text or webpage copy.',
      'View a sorted frequency table showing 1-word, 2-word, and 3-word keyword counts and percentage densities.',
      'Check if target keywords fall within the recommended 1% - 2.5% density range.',
    ],
    faqs: [
      {
        question: 'What is an optimal keyword density?',
        answer: 'A natural density of 1% to 2.5% for primary terms helps avoid keyword stuffing penalties while signaling topical relevance.',
      },
    ],
    relatedSlugs: ['word-counter', 'serp-preview', 'website-seo-checker'],
  },
  {
    id: 'url-slug-generator',
    slug: 'url-slug-generator',
    name: 'URL Slug Generator',
    category: 'seo',
    tagline: 'Create optimized SEO-friendly URL slugs for web pages.',
    description: 'Convert article titles and product names into clean, keyword-rich, URL-safe permalinks stripped of stop words.',
    keywords: ['url slug generator', 'seo permalink creator', 'url cleaner', 'seo friendly url generator'],
    popular: false,
    howItWorks: [
      'Paste a title or phrase.',
      'Toggle "Remove common stop words" (a, an, the, of, in) for shorter, higher-density slugs.',
      'Copy the optimized URL slug.',
    ],
    faqs: [
      {
        question: 'Why remove stop words from URLs?',
        answer: 'Shorter slugs with high keyword density are easier to read, remember, share, and index.',
      },
    ],
    relatedSlugs: ['slug-generator', 'case-converter', 'meta-tag-generator'],
  },
  {
    id: 'http-status-checker',
    slug: 'http-status-checker',
    name: 'HTTP Status Code Reference & Tester',
    category: 'seo',
    tagline: 'Look up and test HTTP status codes and headers.',
    description: 'Fast reference directory of all 1xx, 2xx, 3xx, 4xx, and 5xx HTTP status codes with SEO implications and quick lookup.',
    keywords: ['http status checker', 'http status codes', '301 redirect code', '404 not found meaning', '500 internal server error'],
    popular: false,
    howItWorks: [
      'Search or filter by status code (e.g. 200, 301, 302, 404, 410, 500, 503).',
      'Read the clear explanation, technical definition, and SEO impact for each code.',
      'Copy status descriptions directly into developer notes.',
    ],
    faqs: [
      {
        question: 'What is the SEO difference between 301 and 302 redirects?',
        answer: 'A 301 is a permanent redirect that passes SEO ranking equity (link juice), while a 302 is temporary and does not transfer canonical equity.',
      },
    ],
    relatedSlugs: ['website-seo-checker', 'robots-txt-generator', 'meta-tag-generator'],
  },
  {
    id: 'website-seo-checker',
    slug: 'website-seo-checker',
    name: 'Website SEO Checker',
    category: 'seo',
    tagline: 'Analyze HTML source code for on-page SEO best practices.',
    description: 'Paste HTML source or webpage markup to audit title tags, meta descriptions, headings (H1-H6), image alt attributes, and link targets.',
    keywords: ['website seo checker', 'on page seo audit', 'html seo analyzer', 'check title tag', 'image alt tag checker'],
    popular: true,
    howItWorks: [
      'Paste the HTML source code of your webpage.',
      'The tool scans for H1 presence, title length, meta description, image alt attributes, canonical tag, and open graph tags.',
      'Review the actionable pass/warning/fail checklist.',
    ],
    faqs: [
      {
        question: 'Can I paste HTML from "View Page Source"?',
        answer: 'Yes, simply right click on any webpage, select View Page Source, and paste it directly into the audit box.',
      },
    ],
    relatedSlugs: ['meta-tag-generator', 'serp-preview', 'keyword-density-checker'],
  },
];

export const ALL_TOOLS = TOOLS;

export function getCategoryById(id: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.popular);
}

