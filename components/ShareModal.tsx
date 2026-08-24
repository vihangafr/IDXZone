'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  Share2,
  Copy,
  Check,
  X,
  Mail,
  MessageCircle,
  ExternalLink,
  QrCode,
  Globe,
  Wrench,
} from 'lucide-react';

export interface ShareData {
  title: string;
  text?: string;
  url?: string;
  category?: string;
  isTool?: boolean;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
}

export default function ShareModal({ isOpen, onClose, data }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Compute share URL synchronously during render
  const shareUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      if (data.url) {
        if (data.url.startsWith('http')) {
          return data.url;
        }
        return `${window.location.origin}${data.url}`;
      }
      return window.location.href;
    }
    return data.url || 'https://idx.zone';
  }, [data.url]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.text || 'Check out this free, private browser utility on IDX.ZONE',
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(data.title);
  const encodedText = encodeURIComponent(
    data.text ? `${data.text} via IDX.ZONE` : 'Fast, free, and private browser-based utilities on IDX.ZONE'
  );

  const shareOptions = [
    {
      id: 'share-x-twitter',
      name: 'X (Twitter)',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:border-black hover:bg-black hover:text-white',
    },
    {
      id: 'share-whatsapp',
      name: 'WhatsApp',
      icon: <MessageCircle className="h-4 w-4" />,
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      color: 'hover:border-emerald-600 hover:bg-emerald-600 hover:text-white',
    },
    {
      id: 'share-linkedin',
      name: 'LinkedIn',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:border-blue-700 hover:bg-blue-700 hover:text-white',
    },
    {
      id: 'share-reddit',
      name: 'Reddit',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:border-orange-600 hover:bg-orange-600 hover:text-white',
    },
    {
      id: 'share-facebook',
      name: 'Facebook',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:border-blue-600 hover:bg-blue-600 hover:text-white',
    },
    {
      id: 'share-email',
      name: 'Email',
      icon: <Mail className="h-4 w-4" />,
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      color: 'hover:border-gray-800 hover:bg-gray-800 hover:text-white',
    },
  ];

  return (
    <div
      id="share-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        id="share-modal-container"
        className="w-full max-w-lg border border-gray-200 bg-white shadow-2xl rounded-sm p-6 sm:p-7 relative font-sans animate-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          type="button"
          id="share-modal-close-btn"
          onClick={onClose}
          aria-label="Close share dialog"
          className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors rounded-sm"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center bg-black text-white rounded-sm shrink-0">
            {data.isTool ? <Wrench className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
              {data.isTool ? 'Share Utility' : 'Spread The Word'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-black tracking-tight leading-snug">
              {data.title}
            </h3>
          </div>
        </div>

        {data.text && (
          <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-2">
            {data.text}
          </p>
        )}

        {/* Copy Link Input Bar */}
        <div className="mb-6">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1.5">
            Direct Link
          </label>
          <div className="flex items-center border border-gray-200 bg-gray-50 p-1 rounded-sm focus-within:border-black transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-2.5 py-1 text-xs font-mono text-gray-700 select-all focus:outline-none truncate"
            />
            <button
              type="button"
              id="share-modal-copy-btn"
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors rounded-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share To Platforms Grid */}
        <div className="mb-6">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2.5">
            Share Via
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {shareOptions.map((opt) => (
              <a
                key={opt.id}
                id={opt.id}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium transition-all rounded-sm group ${opt.color}`}
              >
                <div className="shrink-0">{opt.icon}</div>
                <span className="text-[10px] truncate max-w-full">{opt.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Actions: Native Share (if supported) & QR Code toggle */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' ? (
            <button
              type="button"
              id="share-native-device-btn"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-black font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Device Share Menu</span>
            </button>
          ) : (
            <span className="text-[10px] font-mono text-gray-400">
              100% PRIVATE • ZERO TRACKING
            </span>
          )}

          <button
            type="button"
            id="share-toggle-qr-btn"
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-black font-mono text-[11px] uppercase tracking-wider transition-colors"
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>{showQr ? 'Hide QR' : 'Show QR Code'}</span>
          </button>
        </div>

        {/* QR Code view */}
        {showQr && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-sm">
            <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-xs">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                  shareUrl
                )}&bgcolor=ffffff&color=000000&margin=0`}
                alt="QR Code"
                width={144}
                height={144}
                unoptimized
                className="w-36 h-36"
              />
            </div>
            <p className="mt-2 text-[10px] font-mono text-gray-400 text-center uppercase tracking-wider">
              Scan with phone camera to open instantly
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
