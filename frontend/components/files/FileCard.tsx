'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Star,
  Share2,
  Download,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  History,
  Info,
} from 'lucide-react';
import { CloudFile } from '@/types';
import { useVault } from '@/context/vault-context';
import { FileIcon } from './FileIcon';

interface FileCardProps {
  file: CloudFile;
  isSelected: boolean;
  isTrashView?: boolean;
}

export function FileCard({ file, isSelected, isTrashView = false }: FileCardProps) {
  const {
    toggleSelectFile,
    toggleStar,
    openPreview,
    setShareModalFile,
    setRenameModalFile,
    setDeleteConfirmFile,
    setIsPermanentDelete,
    restoreFromTrash,
    showToast,
  } = useVault();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`bg-white dark:bg-[#1e1f20] rounded-2xl p-4 border transition-all duration-200 group flex flex-col justify-between select-none relative ${
        isSelected
          ? 'border-[#4285F4] bg-[#F4F8FF] dark:bg-[#004494]/20 shadow-md ring-2 ring-[#4285F4]/30'
          : 'border-[#DADCE0] dark:border-[#444746] hover:border-[#4285F4] shadow-xs hover:shadow-md'
      }`}
    >
      {/* Top Bar: Checkbox + Star + Context Menu */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelectFile(file.id)}
            className="w-4 h-4 rounded text-[#4285F4] accent-[#4285F4] cursor-pointer"
            aria-label={`Select ${file.name}`}
          />
          {!isTrashView && (
            <button
              onClick={() => toggleStar(file.id)}
              className={`p-1 rounded-full hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors ${
                file.isStarred ? 'text-amber-400 fill-amber-400' : 'text-[#80868B] hover:text-[#4285F4]'
              }`}
            >
              <Star size={16} className={file.isStarred ? 'fill-amber-400' : ''} />
            </button>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full text-[#80868B] hover:text-[#202124] dark:hover:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1e1f20] rounded-xl shadow-xl border border-[#DADCE0] dark:border-[#444746] py-1 text-xs z-30 animate-in fade-in zoom-in-95 duration-100">
              {isTrashView ? (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      restoreFromTrash(file.id);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#188038] hover:bg-[#E6F4EA]"
                  >
                    <span>Restore File</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setDeleteConfirmFile(file);
                      setIsPermanentDelete(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#D93025] hover:bg-[#FCE8E6]"
                  >
                    <span>Delete Forever</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openPreview(file);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Eye size={14} className="text-[#80868B]" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setRenameModalFile(file);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Edit2 size={14} className="text-[#80868B]" />
                    <span>Rename</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShareModalFile(file);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Share2 size={14} className="text-[#80868B]" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      showToast(`Downloading "${file.name}"...`, 'info');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Download size={14} className="text-[#80868B]" />
                    <span>Download</span>
                  </button>
                  <div className="h-px bg-[#E8EAED] dark:bg-[#36373a] my-1" />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openPreview(file, 'properties');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Info size={14} className="text-[#80868B]" />
                    <span>Details & Versions</span>
                  </button>
                  <div className="h-px bg-[#E8EAED] dark:bg-[#36373a] my-1" />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setDeleteConfirmFile(file);
                      setIsPermanentDelete(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#D93025] hover:bg-[#FCE8E6]"
                  >
                    <Trash2 size={14} />
                    <span>Move to Trash</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Central Visual / Preview Box */}
      <div
        onClick={() => !isTrashView && openPreview(file)}
        className="w-full h-32 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-center p-3 cursor-pointer hover:bg-[#E8F0FE]/40 transition-colors border border-[#E8EAED] dark:border-[#36373a] overflow-hidden"
      >
        {file.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={file.previewUrl}
            alt={file.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1e1f20] shadow-xs flex items-center justify-center">
              <FileIcon type={file.type} size={28} />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#80868B]">
              .{file.extension}
            </span>
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="mt-3">
        <button
          onClick={() => !isTrashView && openPreview(file)}
          className="w-full text-left font-medium text-xs text-[#202124] dark:text-white truncate group-hover:text-[#4285F4] transition-colors"
        >
          {file.name}
        </button>
        <div className="flex items-center justify-between text-[11px] text-[#80868B] mt-1">
          <span>{file.sizeFormatted}</span>
          <span>{file.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
