'use client';

import React, { useState, useRef, useEffect } from 'react';
import FileUploader from '@/components/FileUploader';
import CopyButton from '@/components/CopyButton';
import { Download, RefreshCw, Sliders, Image as ImageIcon, Check, Crop, Layers } from 'lucide-react';
import QRCode from 'qrcode';

/* ----------------------------------------------------
   1. Image Compressor
---------------------------------------------------- */
export function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');

  const handleCompress = (selectedFile: File, q: number, fmt: 'image/jpeg' | 'image/webp' | 'image/png') => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        if (fmt === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setCompressedUrl(url);
            }
            setLoading(false);
          },
          fmt,
          q
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      setOriginalSize(f.size);
      handleCompress(f, quality, format);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  };

  const savingsPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/jpeg,image/png,image/webp"
          onFilesSelected={onFiles}
          label="Select JPG, PNG, or WebP to compress"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-slate-500">Original size: {formatBytes(originalSize)}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setCompressedUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different image
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Quality Level: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => {
                  const q = parseFloat(e.target.value);
                  setQuality(q);
                  if (file) handleCompress(file, q, format);
                }}
                className="mt-2 w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Smaller size (10%)</span>
                <span>Balanced (80%)</span>
                <span>Max quality (100%)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Output Format</label>
              <select
                value={format}
                onChange={(e) => {
                  const f = e.target.value as any;
                  setFormat(f);
                  if (file) handleCompress(file, quality, f);
                }}
                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
              >
                <option value="image/jpeg">JPG / JPEG (Best for photos)</option>
                <option value="image/webp">WebP (Modern, highly efficient)</option>
                <option value="image/png">PNG (Lossless)</option>
              </select>
            </div>
          </div>

          {/* Results Comparison */}
          {compressedUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs text-slate-500">Compressed size: </span>
                  <span className="text-base font-bold text-slate-900">{formatBytes(compressedSize)}</span>
                  {savingsPercent > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      -{savingsPercent}% saved
                    </span>
                  )}
                </div>
                <a
                  href={compressedUrl}
                  download={`compressed-${file.name.replace(/\.[^/.]+$/, '')}.${format === 'image/webp' ? 'webp' : format === 'image/png' ? 'png' : 'jpg'}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download Compressed Image
                </a>
              </div>

              {/* Preview */}
              <div className="mt-4 flex justify-center bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                <img
                  src={compressedUrl}
                  alt="Compressed preview"
                  className="max-h-80 max-w-full rounded object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   2. Image Resizer
---------------------------------------------------- */
export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          imgRef.current = img;
          setOrigWidth(img.width);
          setOrigHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
          generateResized(img, img.width, img.height);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(f);
    }
  };

  const generateResized = (img: HTMLImageElement, w: number, h: number) => {
    if (w <= 0 || h <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);
    setResizedUrl(canvas.toDataURL('image/png'));
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspectRatio && origWidth > 0) {
      const ratio = origHeight / origWidth;
      const newH = Math.round(val * ratio);
      setHeight(newH);
      if (imgRef.current) generateResized(imgRef.current, val, newH);
    } else {
      if (imgRef.current) generateResized(imgRef.current, val, height);
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspectRatio && origHeight > 0) {
      const ratio = origWidth / origHeight;
      const newW = Math.round(val * ratio);
      setWidth(newW);
      if (imgRef.current) generateResized(imgRef.current, newW, val);
    } else {
      if (imgRef.current) generateResized(imgRef.current, width, val);
    }
  };

  const applyScalePercent = (pct: number) => {
    const newW = Math.round((origWidth * pct) / 100);
    const newH = Math.round((origHeight * pct) / 100);
    setWidth(newW);
    setHeight(newH);
    if (imgRef.current) generateResized(imgRef.current, newW, newH);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/*"
          onFilesSelected={onFiles}
          label="Select image to resize"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Original dimensions: {origWidth} × {origHeight} px</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setResizedUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different image
            </button>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs font-semibold text-slate-700">Quick Scale Presets:</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {[25, 50, 75, 100, 150, 200].map((pct) => (
                <button
                  key={pct}
                  onClick={() => applyScalePercent(pct)}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Width (pixels)</label>
              <input
                type="number"
                min="1"
                max="10000"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Height (pixels)</label>
              <input
                type="number"
                min="1"
                max="10000"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lock-aspect"
              checked={lockAspectRatio}
              onChange={(e) => setLockAspectRatio(e.target.checked)}
              className="rounded border-slate-300 accent-slate-900"
            />
            <label htmlFor="lock-aspect" className="text-xs font-medium text-slate-700">
              Lock aspect ratio (proportional scaling)
            </label>
          </div>

          {/* Download Box */}
          {resizedUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-semibold text-slate-900">
                  Target size: {width} × {height} px
                </span>
                <a
                  href={resizedUrl}
                  download={`resized-${width}x${height}-${file.name}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download Resized Image
                </a>
              </div>
              <div className="mt-4 flex justify-center bg-slate-50 p-4 rounded-lg">
                <img
                  src={resizedUrl}
                  alt="Resized preview"
                  className="max-h-72 max-w-full rounded object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   3. JPG to PNG Converter
---------------------------------------------------- */
export function JpgToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string>('');

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          setPngUrl(canvas.toDataURL('image/png'));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(f);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/jpeg,image/jpg"
          onFilesSelected={onFiles}
          label="Choose JPG / JPEG image to convert to PNG"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Format: JPG ➔ Lossless PNG</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setPngUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Convert another image
            </button>
          </div>

          {pngUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-emerald-700">✓ Converted to PNG successfully</span>
                <a
                  href={pngUrl}
                  download={`${file.name.replace(/\.[^/.]+$/, '')}.png`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </a>
              </div>
              <div className="mt-4 flex justify-center bg-slate-50 p-4 rounded-lg">
                <img src={pngUrl} alt="PNG output" className="max-h-72 max-w-full rounded object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   4. PNG to JPG Converter
---------------------------------------------------- */
export function PngToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [quality, setQuality] = useState<number>(0.92);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const generateJpg = (img: HTMLImageElement, color: string, q: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    setJpgUrl(canvas.toDataURL('image/jpeg', q));
  };

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          imgRef.current = img;
          generateJpg(img, bgColor, quality);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(f);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/png"
          onFilesSelected={onFiles}
          label="Choose PNG image to convert to JPG"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Format: PNG ➔ JPG</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setJpgUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different file
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Background Color (for transparent areas)
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => {
                    setBgColor(e.target.value);
                    if (imgRef.current) generateJpg(imgRef.current, e.target.value, quality);
                  }}
                  className="h-8 w-12 cursor-pointer rounded border border-slate-300 p-0.5"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => {
                    setBgColor(e.target.value);
                    if (imgRef.current) generateJpg(imgRef.current, e.target.value, quality);
                  }}
                  className="w-24 rounded border border-slate-300 px-2 py-1 text-xs text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                JPG Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => {
                  const q = parseFloat(e.target.value);
                  setQuality(q);
                  if (imgRef.current) generateJpg(imgRef.current, bgColor, q);
                }}
                className="mt-2 w-full accent-slate-900"
              />
            </div>
          </div>

          {jpgUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-emerald-700">✓ Converted to JPG</span>
                <a
                  href={jpgUrl}
                  download={`${file.name.replace(/\.[^/.]+$/, '')}.jpg`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download JPG
                </a>
              </div>
              <div className="mt-4 flex justify-center bg-slate-50 p-4 rounded-lg">
                <img src={jpgUrl} alt="JPG output" className="max-h-72 max-w-full rounded object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   5. WebP Converter
---------------------------------------------------- */
export function WebpConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'image/webp' | 'image/png' | 'image/jpeg'>('image/webp');
  const [outputUrl, setOutputUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);

  const convert = (img: HTMLImageElement, fmt: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (fmt === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    setOutputUrl(canvas.toDataURL(fmt, 0.9));
  };

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          imgRef.current = img;
          convert(img, targetFormat);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(f);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/*"
          onFilesSelected={onFiles}
          label="Select JPG, PNG, or WebP to convert"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">Source: {file.type || 'Image'}</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setOutputUrl('');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different file
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Convert to Format</label>
            <div className="mt-2 flex gap-3">
              {(['image/webp', 'image/png', 'image/jpeg'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setTargetFormat(fmt);
                    if (imgRef.current) convert(imgRef.current, fmt);
                  }}
                  className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                    targetFormat === fmt
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {fmt === 'image/webp' ? 'WebP (Modern & Compact)' : fmt === 'image/png' ? 'PNG (Lossless)' : 'JPG (Standard)'}
                </button>
              ))}
            </div>
          </div>

          {outputUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-emerald-700">✓ Ready to download</span>
                <a
                  href={outputUrl}
                  download={`${file.name.replace(/\.[^/.]+$/, '')}.${targetFormat === 'image/webp' ? 'webp' : targetFormat === 'image/png' ? 'png' : 'jpg'}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download Converted File
                </a>
              </div>
              <div className="mt-4 flex justify-center bg-slate-50 p-4 rounded-lg">
                <img src={outputUrl} alt="WebP output" className="max-h-72 max-w-full rounded object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   6. Image Cropper
---------------------------------------------------- */
export function ImageCropperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [aspect, setAspect] = useState<string>('free');
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropW, setCropW] = useState<number>(100);
  const [cropH, setCropH] = useState<number>(100);
  const [imageDims, setImageDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [croppedUrl, setCroppedUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);

  const applyCrop = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    setCroppedUrl(canvas.toDataURL('image/png'));
  };

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          imgRef.current = img;
          setImageDims({ width: img.width, height: img.height });
          setCropX(0);
          setCropY(0);
          setCropW(img.width);
          setCropH(img.height);
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          setCroppedUrl(canvas.toDataURL('image/png'));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(f);
    }
  };

  const setPresetRatio = (ratioStr: string) => {
    setAspect(ratioStr);
    if (!imgRef.current) return;
    const img = imgRef.current;
    let newW = img.width;
    let newH = img.height;

    if (ratioStr === '1:1') {
      const minDim = Math.min(img.width, img.height);
      newW = minDim;
      newH = minDim;
    } else if (ratioStr === '16:9') {
      newW = img.width;
      newH = Math.min(img.height, Math.round((img.width * 9) / 16));
    } else if (ratioStr === '4:3') {
      newW = img.width;
      newH = Math.min(img.height, Math.round((img.width * 3) / 4));
    } else if (ratioStr === '9:16') {
      newH = img.height;
      newW = Math.min(img.width, Math.round((img.height * 9) / 16));
    }
    const newX = Math.floor((img.width - newW) / 2);
    const newY = Math.floor((img.height - newH) / 2);

    setCropX(newX);
    setCropY(newY);
    setCropW(newW);
    setCropH(newH);

    const canvas = document.createElement('canvas');
    canvas.width = newW;
    canvas.height = newH;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, newX, newY, newW, newH, 0, 0, newW, newH);
    setCroppedUrl(canvas.toDataURL('image/png'));
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader accept="image/*" onFilesSelected={onFiles} label="Select image to crop" />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-50 p-4 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-500">
                Original dimensions: {imageDims.width} × {imageDims.height} px
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setCroppedUrl('');
                setImageDims({ width: 0, height: 0 });
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Choose different image
            </button>
          </div>

          {/* Aspect Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700">Aspect Ratio Presets</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { label: 'Freeform', val: 'free' },
                { label: '1:1 Square (Avatar)', val: '1:1' },
                { label: '16:9 Landscape (Banner)', val: '16:9' },
                { label: '4:3 Standard', val: '4:3' },
                { label: '9:16 Portrait (Story)', val: '9:16' },
              ].map((p) => (
                <button
                  key={p.val}
                  onClick={() => setPresetRatio(p.val)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium ${
                    aspect === p.val
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Coordinate Inputs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Start X (px)</label>
              <input
                type="number"
                min="0"
                max={imageDims.width || 1000}
                value={cropX}
                onChange={(e) => setCropX(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Start Y (px)</label>
              <input
                type="number"
                min="0"
                max={imageDims.height || 1000}
                value={cropY}
                onChange={(e) => setCropY(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Width (px)</label>
              <input
                type="number"
                min="10"
                max={imageDims.width || 1000}
                value={cropW}
                onChange={(e) => setCropW(Math.max(10, parseInt(e.target.value) || 10))}
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">Height (px)</label>
              <input
                type="number"
                min="10"
                max={imageDims.height || 1000}
                value={cropH}
                onChange={(e) => setCropH(Math.max(10, parseInt(e.target.value) || 10))}
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
              />
            </div>
          </div>

          <button
            onClick={applyCrop}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Apply Custom Crop Box
          </button>

          {croppedUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-900">
                  Cropped: {cropW} × {cropH} px
                </span>
                <a
                  href={croppedUrl}
                  download={`cropped-${file.name}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download Cropped Image
                </a>
              </div>
              <div className="mt-4 flex justify-center bg-slate-50 p-4 rounded-lg">
                <img src={croppedUrl} alt="Cropped preview" className="max-h-72 max-w-full rounded object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   7. Image to Base64
---------------------------------------------------- */
export function ImageToBase64Tool() {
  const [dataUri, setDataUri] = useState<string>('');
  const [rawBase64, setRawBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFileName(f.name);
      setFileSize(f.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        const uri = e.target?.result as string;
        setDataUri(uri);
        const parts = uri.split(',');
        setRawBase64(parts[1] || '');
      };
      reader.readAsDataURL(f);
    }
  };

  return (
    <div className="space-y-6">
      <FileUploader
        accept="image/*"
        onFilesSelected={onFiles}
        label="Select image to convert to Base64"
      />

      {dataUri && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-800">{fileName}</span>
            <span className="text-slate-500">Base64 string length: {rawBase64.length.toLocaleString()} chars</span>
          </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Data URI (Ready for HTML img src)</label>
                <CopyButton textToCopy={dataUri} label="Copy Data URI" />
              </div>
              <textarea
                readOnly
                value={dataUri}
                rows={3}
                className="w-full font-mono text-xs rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:outline-none"
              />
            </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">HTML Image Tag</label>
              <CopyButton textToCopy={`<img src="${dataUri}" alt="${fileName}" />`} label="Copy HTML" />
            </div>
            <input
              readOnly
              value={`<img src="${dataUri}" alt="${fileName}" />`}
              className="w-full font-mono text-xs rounded-md border border-slate-300 bg-slate-50 p-2 text-slate-800"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">CSS Background Snippet</label>
              <CopyButton textToCopy={`background-image: url("${dataUri}");`} label="Copy CSS" />
            </div>
            <input
              readOnly
              value={`background-image: url("${dataUri}");`}
              className="w-full font-mono text-xs rounded-md border border-slate-300 bg-slate-50 p-2 text-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   8. Base64 to Image
---------------------------------------------------- */
export function Base64ToImageTool() {
  const [inputStr, setInputStr] = useState<string>('');
  const [formattedUri, setFormattedUri] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConvert = () => {
    setError('');
    const str = inputStr.trim();
    if (!str) {
      setError('Please paste a Base64 string.');
      return;
    }
    let uri = str;
    if (!str.startsWith('data:image/')) {
      uri = `data:image/png;base64,${str}`;
    }
    const testImg = new Image();
    testImg.onload = () => {
      setFormattedUri(uri);
    };
    testImg.onerror = () => {
      setError('Invalid Base64 image string. Please check the content.');
      setFormattedUri('');
    };
    testImg.src = uri;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Paste Base64 Encoded String or Data URI
        </label>
        <textarea
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          placeholder="Paste data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA... or raw base64"
          rows={5}
          className="w-full font-mono text-xs rounded-md border border-slate-300 p-3 text-slate-800 focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConvert}
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          Decode to Image
        </button>
        <button
          onClick={() => {
            setInputStr('');
            setFormattedUri('');
            setError('');
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {formattedUri && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-sm font-semibold text-emerald-700">✓ Image decoded successfully</span>
            <a
              href={formattedUri}
              download="decoded-image.png"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              Download Decoded PNG
            </a>
          </div>
          <div className="mt-4 flex justify-center bg-slate-50 p-4 rounded-lg">
            <img src={formattedUri} alt="Decoded preview" className="max-h-72 max-w-full rounded object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   9. Favicon Generator
---------------------------------------------------- */
export function FaviconGeneratorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [icons, setIcons] = useState<{ size: number; url: string; label: string }[]>([]);

  const onFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const sizes = [
            { size: 16, label: '16×16 (Standard Tab Favicon)' },
            { size: 32, label: '32×32 (Browser Bookmark Icon)' },
            { size: 48, label: '48×48 (Windows Desktop Shortcut)' },
            { size: 180, label: '180×180 (Apple Touch Icon)' },
            { size: 512, label: '512×512 (PWA App Icon)' },
          ];
          const generated = sizes.map(({ size, label }) => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, size, size);
            return {
              size,
              label,
              url: canvas.toDataURL('image/png'),
            };
          });
          setIcons(generated);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(f);
    }
  };

  const htmlCode = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/*"
          onFilesSelected={onFiles}
          label="Upload your square logo or picture"
          helperText="We will generate standard 16x16, 32x32, 48x48, 180x180 icons"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 border border-slate-200">
            <span className="text-sm font-semibold text-slate-800">{file.name}</span>
            <button
              onClick={() => {
                setFile(null);
                setIcons([]);
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Upload another image
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {icons.map((icon) => (
              <div key={icon.size} className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 p-2">
                  <img
                    src={icon.url}
                    alt={icon.label}
                    style={{ width: `${Math.min(icon.size, 64)}px`, height: `${Math.min(icon.size, 64)}px` }}
                    className="object-contain"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-slate-800">{icon.size} × {icon.size} px</p>
                  <p className="text-[11px] text-slate-500">{icon.label}</p>
                </div>
                <a
                  href={icon.url}
                  download={`favicon-${icon.size}x${icon.size}.png`}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-3 w-3" />
                  Download
                </a>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">HTML Header Snippet</label>
              <CopyButton textToCopy={htmlCode} label="Copy HTML Code" />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-slate-200">
              {htmlCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   10. QR Code Generator
---------------------------------------------------- */
export function QrCodeGeneratorTool() {
  const [text, setText] = useState<string>('https://idx.zone');
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [qrSize, setQrSize] = useState<number>(300);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    if (text.trim()) {
      QRCode.toDataURL(text, {
        width: qrSize,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      })
        .then((url) => {
          if (active) setQrDataUrl(url);
        })
        .catch((err) => console.error(err));
    } else {
      const timer = setTimeout(() => {
        if (active) setQrDataUrl('');
      }, 0);
      return () => {
        active = false;
        clearTimeout(timer);
      };
    }
    return () => {
      active = false;
    };
  }, [text, fgColor, bgColor, qrSize]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            QR Code Content (URL, Text, or Wi-Fi)
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Type URL, text, email, or contact information..."
            className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Foreground Color</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-300 p-0.5"
              />
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-24 rounded border border-slate-300 px-2 py-1 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Background Color</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-300 p-0.5"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-24 rounded border border-slate-300 px-2 py-1 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700">
            Resolution: {qrSize} × {qrSize} px
          </label>
          <input
            type="range"
            min="150"
            max="800"
            step="50"
            value={qrSize}
            onChange={(e) => setQrSize(parseInt(e.target.value))}
            className="mt-1.5 w-full accent-slate-900"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/50 p-6 text-center">
        {qrDataUrl ? (
          <div className="space-y-4">
            <div className="inline-block rounded-xl bg-white p-4 shadow-sm border border-slate-200">
              <img src={qrDataUrl} alt="Generated QR Code" className="h-56 w-56 object-contain" />
            </div>
            <div>
              <a
                href={qrDataUrl}
                download="qrcode.png"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-800"
              >
                <Download className="h-4 w-4" />
                Download PNG QR Code
              </a>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Enter text to preview QR code</p>
        )}
      </div>
    </div>
  );
}
