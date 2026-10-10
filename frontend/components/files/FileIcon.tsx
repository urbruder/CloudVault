'use client';

import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  Film,
  Image as ImageIcon,
  File,
  Folder as FolderIcon,
  FolderOpen,
} from 'lucide-react';
import { FileType } from '@/types';

interface FileIconProps {
  type: FileType | 'folder';
  size?: number;
  className?: string;
  isOpen?: boolean;
}

export function FileIcon({ type, size = 20, className = '', isOpen = false }: FileIconProps) {
  switch (type) {
    case 'folder':
      return isOpen ? (
        <FolderOpen size={size} className={`text-blue-500 ${className}`} />
      ) : (
        <FolderIcon size={size} className={`text-blue-500 fill-blue-500/20 ${className}`} />
      );
    case 'pdf':
      return <FileText size={size} className={`text-red-500 ${className}`} />;
    case 'docx':
      return <FileText size={size} className={`text-blue-600 ${className}`} />;
    case 'image':
      return <ImageIcon size={size} className={`text-purple-500 ${className}`} />;
    case 'video':
      return <Film size={size} className={`text-indigo-500 ${className}`} />;
    case 'archive':
      return <FileArchive size={size} className={`text-amber-500 ${className}`} />;
    case 'code':
      return <FileCode size={size} className={`text-emerald-500 ${className}`} />;
    default:
      return <File size={size} className={`text-gray-500 ${className}`} />;
  }
}
