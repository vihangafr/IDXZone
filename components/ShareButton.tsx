'use client';

import React, { useState } from 'react';
import { Share2, Check, Sparkles } from 'lucide-react';
import ShareModal, { ShareData } from './ShareModal';

interface ShareButtonProps {
  data?: ShareData;
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'compact';
  className?: string;
  id?: string;
}

export default function ShareButton({
  data,
  label = 'Share',
  variant = 'secondary',
  className = '',
  id,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultData: ShareData = {
    title: 'IDX.ZONE — Simple, Fast, Free Tools',
    text: 'Zero server uploads. 100% private and client-side browser utilities for images, PDF, text, and code.',
    url: typeof window !== 'undefined' ? window.location.href : 'https://idx.zone',
    isTool: false,
  };

  const activeData = data || defaultData;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  // Base styling variants
  let buttonClasses = '';
  switch (variant) {
    case 'primary':
      buttonClasses =
        'inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-sm shadow-xs';
      break;
    case 'compact':
      buttonClasses =
        'inline-flex items-center gap-1.5 border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-mono font-medium text-gray-700 hover:border-black hover:text-black transition-colors rounded-sm';
      break;
    case 'icon':
      buttonClasses =
        'flex h-9 w-9 items-center justify-center border border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black transition-colors rounded-sm';
      break;
    case 'ghost':
      buttonClasses =
        'inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black transition-colors';
      break;
    case 'secondary':
    default:
      buttonClasses =
        'inline-flex items-center justify-center gap-2 border border-gray-200 bg-gray-50/80 px-3.5 py-1.5 text-xs font-mono font-medium text-gray-700 hover:border-black hover:bg-white hover:text-black transition-colors rounded-sm';
      break;
  }

  return (
    <>
      <button
        type="button"
        id={id || `share-btn-${activeData.isTool ? 'tool' : 'site'}`}
        onClick={handleClick}
        className={`${buttonClasses} ${className}`}
        aria-label={label}
        title={label}
      >
        <Share2 className="h-3.5 w-3.5 shrink-0" />
        {variant !== 'icon' && <span>{label}</span>}
      </button>

      <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={activeData} />
    </>
  );
}
