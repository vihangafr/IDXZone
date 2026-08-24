import React from 'react';
import {
  Image as ImageIcon,
  FileText,
  Type,
  Code,
  Globe,
  Folder,
  Wrench,
  LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export function CategoryIcon({ name, className = 'h-4 w-4', ...props }: CategoryIconProps) {
  switch (name) {
    case 'Image':
      return <ImageIcon className={className} {...props} />;
    case 'FileText':
      return <FileText className={className} {...props} />;
    case 'Type':
      return <Type className={className} {...props} />;
    case 'Code':
      return <Code className={className} {...props} />;
    case 'Globe':
      return <Globe className={className} {...props} />;
    case 'Folder':
      return <Folder className={className} {...props} />;
    default:
      return <Wrench className={className} {...props} />;
  }
}

export default CategoryIcon;
