'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Folder, MoreVertical, Edit2, Trash2, FolderOpen } from 'lucide-react';
import { Folder as FolderType } from '@/types';
import { useVault } from '@/context/vault-context';

interface FolderCardProps {
  folder: FolderType;
}

export function FolderCard({ folder }: FolderCardProps) {
  const { setActiveFolderId, showToast } = useVault();
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
      onClick={() => setActiveFolderId(folder.id)}
      className="bg-white dark:bg-[#1e1f20] rounded-2xl p-4 border border-[#DADCE0] dark:border-[#444746] hover:border-[#4285F4] dark:hover:border-[#4285F4] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer select-none"
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] flex items-center justify-center group-hover:scale-105 transition-transform">
          <Folder size={22} className="fill-[#4285F4]/20 stroke-[#4285F4]" />
        </div>

        <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full text-[#80868B] hover:text-[#202124] dark:hover:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
            title="Folder options"
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-[#1e1f20] rounded-xl shadow-xl border border-[#DADCE0] dark:border-[#444746] py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveFolderId(folder.id);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
              >
                <FolderOpen size={14} className="text-[#4285F4]" />
                <span>Open Folder</span>
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  showToast(`Renaming "${folder.name}"`, 'info');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
              >
                <Edit2 size={14} className="text-[#80868B]" />
                <span>Rename</span>
              </button>
              <div className="h-px bg-[#E8EAED] dark:bg-[#36373a] my-1" />
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  showToast(`Cannot delete default folder "${folder.name}"`, 'error');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#D93025] hover:bg-[#FCE8E6] dark:hover:bg-[#93000a]/20"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-sm text-[#202124] dark:text-white truncate group-hover:text-[#4285F4] transition-colors">
          {folder.name}
        </h4>
        <div className="flex items-center justify-between text-xs text-[#80868B] mt-1">
          <span>{folder.fileCount} files</span>
          <span>{folder.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
