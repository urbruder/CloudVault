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

interface FileRowProps {
  file: CloudFile;
  isSelected: boolean;
  isTrashView?: boolean;
}

export function FileRow({ file, isSelected, isTrashView = false }: FileRowProps) {
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

  const handleDownload = () => {
    showToast(`Downloading "${file.name}"...`, 'info');
  };

  return (
    <tr
      className={`transition-colors text-sm group ${
        isSelected
          ? 'bg-[#E8F0FE]/60 dark:bg-[#004494]/25'
          : 'hover:bg-[#F8FAFD] dark:hover:bg-[#282a2c]/60'
      }`}
    >
      {/* Checkbox */}
      <td className="py-3 px-4 w-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelectFile(file.id)}
          className="w-4 h-4 rounded text-[#4285F4] accent-[#4285F4] cursor-pointer"
          aria-label={`Select ${file.name}`}
        />
      </td>

      {/* Name and Type Icon */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F1F3F4] dark:bg-[#282a2c] flex items-center justify-center shrink-0">
            <FileIcon type={file.type} size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => !isTrashView && openPreview(file)}
                className="text-left font-medium text-[#202124] dark:text-white truncate hover:text-[#4285F4] dark:hover:text-[#adc6ff] transition-colors"
              >
                {file.name}
              </button>
              {!isTrashView && (
                <button
                  onClick={() => setRenameModalFile(file)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-[#80868B] hover:text-[#202124] transition-opacity"
                  title="Rename"
                >
                  <Edit2 size={12} />
                </button>
              )}
            </div>
            <span className="text-xs text-[#80868B] truncate">
              {file.versions?.length > 1
                ? `v${file.versions.length} • `
                : ''}
              {file.folderPath}
            </span>
          </div>
        </div>
      </td>

      {/* Owner */}
      <td className="py-3 px-4 hidden md:table-cell text-xs">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium ${
            file.owner.isCurrentUser
              ? 'bg-[#E8F0FE] text-[#4285F4] dark:bg-[#004494]/30'
              : 'bg-[#F1F3F4] dark:bg-[#37393b] text-[#5F6368] dark:text-[#c4c7c5]'
          }`}
        >
          {file.owner.isCurrentUser ? 'You' : file.owner.name}
        </span>
      </td>

      {/* Last Modified */}
      <td className="py-3 px-4 text-xs text-[#5F6368] dark:text-[#c4c7c5] hidden sm:table-cell">
        {file.updatedAt}
      </td>

      {/* File Size */}
      <td className="py-3 px-4 text-xs font-medium text-[#202124] dark:text-white whitespace-nowrap">
        {file.sizeFormatted}
      </td>

      {/* Actions */}
      <td className="py-3 px-4 text-right">
        {isTrashView ? (
          <div className="inline-flex items-center gap-1">
            <button
              onClick={() => restoreFromTrash(file.id)}
              className="px-2.5 py-1 text-xs font-medium bg-[#E6F4EA] text-[#188038] hover:bg-[#188038] hover:text-white rounded-lg transition-colors"
            >
              Restore
            </button>
            <button
              onClick={() => {
                setDeleteConfirmFile(file);
                setIsPermanentDelete(true);
              }}
              className="p-1 text-[#D93025] hover:bg-[#FCE8E6] rounded-lg transition-colors"
              title="Delete Permanently"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1 text-[#5F6368] dark:text-[#c4c7c5]">
            <button
              onClick={() => toggleStar(file.id)}
              className={`p-1.5 rounded-full hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors ${
                file.isStarred ? 'text-amber-400 fill-amber-400' : 'hover:text-[#4285F4]'
              }`}
              title={file.isStarred ? 'Unstar' : 'Star'}
            >
              <Star size={17} className={file.isStarred ? 'fill-amber-400' : ''} />
            </button>

            <button
              onClick={() => setShareModalFile(file)}
              className="p-1.5 rounded-full hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] hover:text-[#4285F4] transition-colors hidden sm:inline-flex"
              title="Share file"
            >
              <Share2 size={17} />
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 rounded-full hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] hover:text-[#202124] dark:hover:text-white transition-colors hidden sm:inline-flex"
              title="Download"
            >
              <Download size={17} />
            </button>

            {/* Context Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 rounded-full hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] hover:text-[#202124] dark:hover:text-white transition-colors"
                title="More options"
              >
                <MoreVertical size={17} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-[#1e1f20] rounded-xl shadow-xl border border-[#DADCE0] dark:border-[#444746] py-1.5 text-left text-xs z-30 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openPreview(file);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Eye size={15} className="text-[#80868B]" />
                    <span>Preview File</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setRenameModalFile(file);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Edit2 size={15} className="text-[#80868B]" />
                    <span>Rename</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShareModalFile(file);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Share2 size={15} className="text-[#80868B]" />
                    <span>Share Link</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleDownload();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Download size={15} className="text-[#80868B]" />
                    <span>Download</span>
                  </button>

                  <div className="h-px bg-[#E8EAED] dark:bg-[#36373a] my-1" />

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openPreview(file, 'properties');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <Info size={15} className="text-[#80868B]" />
                    <span>File Details</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openPreview(file, 'versions');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
                  >
                    <div className="flex items-center gap-2.5">
                      <History size={15} className="text-[#80868B]" />
                      <span>Version History</span>
                    </div>
                    <span className="text-[10px] font-medium bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] px-1.5 py-0.5 rounded">
                      v{file.versions?.length || 1}
                    </span>
                  </button>

                  <div className="h-px bg-[#E8EAED] dark:bg-[#36373a] my-1" />

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setDeleteConfirmFile(file);
                      setIsPermanentDelete(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#D93025] hover:bg-[#FCE8E6] dark:hover:bg-[#93000a]/20"
                  >
                    <Trash2 size={15} />
                    <span>Move to Trash</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
