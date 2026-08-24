'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
  onFilesSelected: (files: File[]) => void;
  selectedFiles?: File[];
  onClear?: () => void;
}

export default function FileUploader({
  accept,
  multiple = false,
  maxSizeMB = 50,
  label = 'Choose a file or drag & drop here',
  helperText = 'Files are processed locally inside your browser. Never uploaded.',
  onFilesSelected,
  selectedFiles = [],
  onClear,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(multiple ? filesArray : [filesArray[0]]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(multiple ? filesArray : [filesArray[0]]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? 'border-slate-800 bg-slate-100/80 scale-[0.99]'
            : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xs border border-slate-200/80 text-slate-700">
          <UploadCloud className="h-5 w-5" />
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50">
            Browse {multiple ? 'Files' : 'File'}
          </span>
          <span className="text-[11px] text-slate-400">Max size: {maxSizeMB}MB</span>
        </div>
      </div>

      {/* Selected Files Preview List */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Selected ({selectedFiles.length})</span>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="text-red-500 hover:text-red-700 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1.5 rounded-lg border border-slate-200 bg-white p-2">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <File className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="truncate font-medium">{file.name}</span>
                </div>
                <span className="shrink-0 text-slate-400">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
