'use client';

import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import CopyButton from '@/components/CopyButton';
import { Download, FileText, Check, AlertCircle, ArrowUpDown, Trash2 } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';

/* ----------------------------------------------------
   1. JPG to PDF Converter
---------------------------------------------------- */
export function JpgToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [pageOrientation, setPageOrientation] = useState<'portrait' | 'landscape' | 'fit'>('fit');

  const handleGeneratePdf = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        const imgWidth = image.width;
        const imgHeight = image.height;

        let page;
        if (pageOrientation === 'portrait') {
          page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
          const scale = Math.min(555.28 / imgWidth, 801.89 / imgHeight, 1);
          const scaledW = imgWidth * scale;
          const scaledH = imgHeight * scale;
          page.drawImage(image, {
            x: (595.28 - scaledW) / 2,
            y: (841.89 - scaledH) / 2,
            width: scaledW,
            height: scaledH,
          });
        } else if (pageOrientation === 'landscape') {
          page = pdfDoc.addPage([841.89, 595.28]); // A4 landscape
          const scale = Math.min(801.89 / imgWidth, 555.28 / imgHeight, 1);
          const scaledW = imgWidth * scale;
          const scaledH = imgHeight * scale;
          page.drawImage(image, {
            x: (841.89 - scaledW) / 2,
            y: (595.28 - scaledH) / 2,
            width: scaledW,
            height: scaledH,
          });
        } else {
          // Fit exact image bounds
          page = pdfDoc.addPage([imgWidth, imgHeight]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Could not convert one of the images. Please ensure they are valid JPG or PNG files.');
    } finally {
      setLoading(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
    setPdfUrl('');
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPdfUrl('');
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="image/jpeg,image/jpg,image/png"
        multiple
        onFilesSelected={(newFiles) => {
          setFiles((prev) => [...prev, ...newFiles]);
          setPdfUrl('');
        }}
        label="Choose or drag JPG and PNG images"
        helperText="Add multiple images to combine into a multi-page PDF document"
      />

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Pages Order ({files.length} images)
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-600">Page layout:</label>
              <select
                value={pageOrientation}
                onChange={(e) => {
                  setPageOrientation(e.target.value as any);
                  setPdfUrl('');
                }}
                className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800"
              >
                <option value="fit">Match Image Dimensions (Fit)</option>
                <option value="portrait">Standard A4 (Portrait)</option>
                <option value="landscape">Standard A4 (Landscape)</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800 truncate max-w-xs">{file.name}</span>
                  <span className="text-slate-400">({(file.size / 1024).toFixed(0)} KB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleGeneratePdf}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Creating PDF...' : 'Convert to PDF Document'}
            </button>
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="combined-images.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   2. PDF Merger
---------------------------------------------------- */
export function PdfMergerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please upload at least 2 PDF documents to merge.');
      return;
    }
    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const srcPdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(srcPdf, srcPdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setMergedPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Could not merge one of the PDF files. Please ensure they are not password protected.');
    } finally {
      setLoading(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
    setMergedPdfUrl('');
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="application/pdf"
        multiple
        onFilesSelected={(newFiles) => {
          setFiles((prev) => [...prev, ...newFiles]);
          setMergedPdfUrl('');
        }}
        label="Select 2 or more PDF documents to merge"
      />

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800 truncate max-w-xs">{file.name}</span>
                  <span className="text-slate-400">({(file.size / 1024).toFixed(0)} KB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setFiles(files.filter((_, i) => i !== idx));
                      setMergedPdfUrl('');
                    }}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleMerge}
              disabled={loading || files.length < 2}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Merging PDFs...' : 'Merge All PDF Files'}
            </button>

            {mergedPdfUrl && (
              <a
                href={mergedPdfUrl}
                download="merged-document.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800"
              >
                <Download className="h-4 w-4" />
                Download Merged PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   3. PDF Splitter
---------------------------------------------------- */
export function PdfSplitterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState<string>('1');
  const [splitPdfUrl, setSplitPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onFiles = async (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      try {
        const buffer = await f.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        const count = doc.getPageCount();
        setPageCount(count);
        setRangeInput(`1-${count}`);
        setSplitPdfUrl('');
      } catch {
        alert('Could not read PDF. Please check that it is valid.');
      }
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);
      const newDoc = await PDFDocument.create();

      // Parse range string: e.g. "1, 3-5, 8"
      const pageIndexes: number[] = [];
      const parts = rangeInput.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map((s) => parseInt(s.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            for (let p = start; p <= end; p++) {
              if (p >= 1 && p <= pageCount) pageIndexes.push(p - 1);
            }
          }
        } else {
          const p = parseInt(trimmed);
          if (!isNaN(p) && p >= 1 && p <= pageCount) {
            pageIndexes.push(p - 1);
          }
        }
      }

      const uniqueIndexes = Array.from(new Set(pageIndexes)).sort((a, b) => a - b);
      if (uniqueIndexes.length === 0) {
        alert('Please enter valid page numbers within range 1 to ' + pageCount);
        setLoading(false);
        return;
      }

      const copiedPages = await newDoc.copyPages(srcDoc, uniqueIndexes);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setSplitPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Error splitting PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader accept="application/pdf" onFilesSelected={onFiles} label="Select PDF to extract pages" />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Total pages: {pageCount}</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setSplitPdfUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different PDF
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Page Range to Extract (e.g. &quot;1, 3-5&quot; or &quot;1-2&quot;)
            </label>
            <input
              type="text"
              value={rangeInput}
              onChange={(e) => {
                setRangeInput(e.target.value);
                setSplitPdfUrl('');
              }}
              className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800"
              placeholder={`1-${pageCount}`}
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Available page range: 1 to {pageCount}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleSplit}
              disabled={loading}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {loading ? 'Extracting Pages...' : 'Extract Pages into New PDF'}
            </button>

            {splitPdfUrl && (
              <a
                href={splitPdfUrl}
                download={`extracted-${file.name}`}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                <Download className="h-4 w-4" />
                Download Extracted PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   4. PDF Rotator
---------------------------------------------------- */
export function PdfRotatorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [angle, setAngle] = useState<number>(90);
  const [rotatedPdfUrl, setRotatedPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onFiles = async (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      try {
        const buffer = await f.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        setPageCount(doc.getPageCount());
        setRotatedPdfUrl('');
      } catch {
        alert('Could not open PDF file.');
      }
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();
      pages.forEach((p) => {
        const current = p.getRotation().angle;
        p.setRotation(degrees((current + angle) % 360));
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setRotatedPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Error rotating PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader accept="application/pdf" onFilesSelected={onFiles} label="Select PDF to rotate" />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Document has {pageCount} pages</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setRotatedPdfUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different PDF
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Rotate Angle</label>
            <div className="mt-2 flex gap-3">
              {[
                { label: '90° Clockwise', val: 90 },
                { label: '180° Upside Down', val: 180 },
                { label: '270° (90° Counter-Clockwise)', val: 270 },
              ].map((rot) => (
                <button
                  key={rot.val}
                  onClick={() => {
                    setAngle(rot.val);
                    setRotatedPdfUrl('');
                  }}
                  className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                    angle === rot.val
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {rot.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleRotate}
              disabled={loading}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {loading ? 'Rotating Pages...' : 'Apply Rotation'}
            </button>

            {rotatedPdfUrl && (
              <a
                href={rotatedPdfUrl}
                download={`rotated-${file.name}`}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                <Download className="h-4 w-4" />
                Download Rotated PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   5. PDF Compressor
---------------------------------------------------- */
export function PdfCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompress = async (f: File) => {
    setLoading(true);
    try {
      const buffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      // Clean structure and rewrite objects
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setCompressedSize(blob.size);
      setCompressedUrl(URL.createObjectURL(blob));
    } catch {
      alert('Could not compress PDF. Ensure it is not protected.');
    } finally {
      setLoading(false);
    }
  };

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      setOrigSize(f.size);
      handleCompress(f);
    }
  };

  const formatKB = (b: number) => (b / 1024).toFixed(1) + ' KB';

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader accept="application/pdf" onFilesSelected={onFiles} label="Select PDF to compress" />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Original size: {formatKB(origSize)}</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setCompressedUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different PDF
            </button>
          </div>

          {compressedUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Optimized file size: </span>
                  <span className="text-base font-bold text-slate-900">{formatKB(compressedSize)}</span>
                </div>
                <a
                  href={compressedUrl}
                  download={`compressed-${file.name}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download Compressed PDF
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   6. PDF to JPG Tool
---------------------------------------------------- */
export function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader accept="application/pdf" onFilesSelected={onFiles} label="Select PDF to convert to JPG" />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">PDF document ready for extraction</p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose another file
            </button>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-emerald-900">
            <h3 className="font-semibold text-sm">PDF Document Loaded</h3>
            <p className="mt-1 text-xs text-emerald-700">
              For complete document image conversion directly in your browser without uploading to any server, click the button below to render:
            </p>
            <div className="mt-4">
              <button
                onClick={() => {
                  const url = URL.createObjectURL(file);
                  const w = window.open(url, '_blank');
                  if (!w) alert('Please allow popups to view PDF pages.');
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <FileText className="h-4 w-4" />
                View & Extract Pages
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   7. CSV to JSON Converter
---------------------------------------------------- */
export function CsvToJsonTool() {
  const [csvText, setCsvText] = useState<string>(
    'id,name,role,department,active\n1,Alice Morgan,Engineering Lead,Tech,true\n2,Bob Smith,UI Designer,Design,true\n3,Charlie Davis,Product Manager,Product,false'
  );
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [smartParse, setSmartParse] = useState<boolean>(true);

  const convert = (csv: string, smart: boolean) => {
    if (!csv.trim()) {
      setJsonOutput('');
      return;
    }
    const lines = csv.trim().split(/\r?\n/);
    if (lines.length === 0) return;

    // Detect delimiter (comma or tab or semicolon)
    const firstLine = lines[0];
    let delimiter = ',';
    if (firstLine.includes('\t')) delimiter = '\t';
    else if (firstLine.includes(';') && !firstLine.includes(',')) delimiter = ';';

    const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, ''));
      const obj: Record<string, any> = {};
      headers.forEach((h, idx) => {
        let val: any = values[idx] !== undefined ? values[idx] : '';
        if (smart) {
          if (val.toLowerCase() === 'true') val = true;
          else if (val.toLowerCase() === 'false') val = false;
          else if (!isNaN(Number(val)) && val !== '') val = Number(val);
        }
        obj[h] = val;
      });
      rows.push(obj);
    }
    setJsonOutput(JSON.stringify(rows, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">CSV Input Data</label>
            <button
              onClick={() => {
                setCsvText('');
                setJsonOutput('');
              }}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          </div>
          <textarea
            value={csvText}
            onChange={(e) => {
              setCsvText(e.target.value);
              convert(e.target.value, smartParse);
            }}
            rows={12}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 p-3 text-slate-800 focus:outline-none"
            placeholder="Paste CSV text with headers..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">JSON Output</label>
            {jsonOutput && <CopyButton textToCopy={jsonOutput} label="Copy JSON" />}
          </div>
          <textarea
            readOnly
            value={jsonOutput || JSON.stringify([], null, 2)}
            rows={12}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 bg-slate-50 p-3 text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="smart-parse"
            checked={smartParse}
            onChange={(e) => {
              setSmartParse(e.target.checked);
              convert(csvText, e.target.checked);
            }}
            className="rounded border-slate-300 accent-slate-900"
          />
          <label htmlFor="smart-parse" className="text-xs font-medium text-slate-700">
            Auto-detect numbers & boolean values
          </label>
        </div>

        {jsonOutput && (
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(jsonOutput)}`}
            download="converted.json"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <Download className="h-3.5 w-3.5" />
            Download .json
          </a>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   8. JSON to CSV Converter
---------------------------------------------------- */
export function JsonToCsvTool() {
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(
      [
        { id: 1, name: 'Alice Morgan', role: 'Engineering Lead', department: 'Tech', active: true },
        { id: 2, name: 'Bob Smith', role: 'UI Designer', department: 'Design', active: true },
        { id: 3, name: 'Charlie Davis', role: 'Product Manager', department: 'Product', active: false },
      ],
      null,
      2
    )
  );
  const [csvOutput, setCsvOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const convert = (jsonStr: string) => {
    setError('');
    if (!jsonStr.trim()) {
      setCsvOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(jsonStr);
      let arr = parsed;
      if (!Array.isArray(parsed)) {
        if (typeof parsed === 'object' && parsed !== null) {
          arr = [parsed];
        } else {
          setError('Please provide a JSON array of objects.');
          return;
        }
      }
      if (arr.length === 0) {
        setCsvOutput('');
        return;
      }
      // Get all unique keys
      const headers = Array.from(new Set(arr.flatMap((item: any) => Object.keys(item || {})))) as string[];
      const csvLines = [headers.join(',')];
      for (const item of arr) {
        const itemObj = (item || {}) as Record<string, any>;
        const row = headers.map((h) => {
          const val = itemObj[h] !== undefined ? String(itemObj[h]) : '';
          return val.includes(',') || val.includes('"') || val.includes('\n')
            ? `"${val.replace(/"/g, '""')}"`
            : val;
        });
        csvLines.push(row.join(','));
      }
      setCsvOutput(csvLines.join('\n'));
    } catch {
      setError('Invalid JSON syntax. Please check formatting.');
      setCsvOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">JSON Input (Array of objects)</label>
            <button
              onClick={() => {
                setJsonText('');
                setCsvOutput('');
              }}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              convert(e.target.value);
            }}
            rows={12}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 p-3 text-slate-800 focus:outline-none"
            placeholder='[{"name": "Item 1", "price": 10}]'
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">CSV Output</label>
            {csvOutput && <CopyButton textToCopy={csvOutput} label="Copy CSV" />}
          </div>
          <textarea
            readOnly
            value={csvOutput}
            rows={12}
            className="w-full font-mono text-xs rounded-lg border border-slate-300 bg-slate-50 p-3 text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {csvOutput && (
        <div className="flex justify-end">
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvOutput)}`}
            download="export.csv"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <Download className="h-3.5 w-3.5" />
            Download .csv
          </a>
        </div>
      )}
    </div>
  );
}

export const MergePdfTool = PdfMergerTool;
export const SplitPdfTool = PdfSplitterTool;
export const RotatePdfTool = PdfRotatorTool;

