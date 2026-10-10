'use client';

import React from 'react';
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Download,
  Trash2,
  X,
  Share2,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';

interface FileListHeaderProps {
  title: string;
  totalCount: number;
  sortBy: 'name' | 'date' | 'size';
  setSortBy: (sort: 'name' | 'date' | 'size') => void;
  allFileIds?: string[];
}

export function FileListHeader({
  title,
  totalCount,
  sortBy,
  setSortBy,
  allFileIds = [],
}: FileListHeaderProps) {
  const {
    viewMode,
    setViewMode,
    selectedFileIds,
    selectAllFiles,
    clearSelection,
    moveToTrash,
    showToast,
  } = useVault();

  const isBulkSelected = selectedFileIds.length > 0;
  const isAllSelected =
    allFileIds.length > 0 && allFileIds.every((id) => selectedFileIds.includes(id));

  const handleBulkDownload = () => {
    showToast(`Downloading ${selectedFileIds.length} files as ZIP archive...`, 'info');
  };

  const handleBulkDelete = () => {
    selectedFileIds.forEach((id) => moveToTrash(id));
    clearSelection();
    showToast(`Moved ${selectedFileIds.length} files to trash`, 'info');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 select-none">
      {/* Title & Count or Bulk Bar */}
      {isBulkSelected ? (
        <div className="flex items-center gap-3 bg-[#E8F0FE] dark:bg-[#004494]/30 px-3.5 py-1.5 rounded-xl border border-[#4285F4]/30 animate-in fade-in">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={() => selectAllFiles(allFileIds)}
            className="w-4 h-4 rounded text-[#4285F4] accent-[#4285F4] cursor-pointer"
          />
          <span className="text-xs font-semibold text-[#4285F4] dark:text-[#adc6ff]">
            {selectedFileIds.length} selected
          </span>
          <div className="h-4 w-px bg-[#4285F4]/30" />
          <button
            onClick={handleBulkDownload}
            className="flex items-center gap-1.5 text-xs text-[#202124] dark:text-white hover:text-[#4285F4] font-medium"
          >
            <Download size={14} />
            <span>Download</span>
          </button>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 text-xs text-[#D93025] hover:opacity-80 font-medium"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
          <button
            onClick={clearSelection}
            className="p-1 text-[#5F6368] hover:text-[#202124] ml-auto"
            title="Deselect all"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
            {title}
          </h2>
          <span className="text-xs font-medium bg-[#F1F3F4] dark:bg-[#282a2c] text-[#5F6368] dark:text-[#c4c7c5] px-2.5 py-0.5 rounded-full">
            {totalCount} {totalCount === 1 ? 'object' : 'objects'}
          </span>
        </div>
      )}

      {/* Sorting & Grid/List Switcher */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {/* Sort selector */}
        <div className="flex items-center gap-1 text-xs text-[#5F6368] dark:text-[#c4c7c5] bg-white dark:bg-[#1e1f20] px-2.5 py-1.5 rounded-xl border border-[#DADCE0] dark:border-[#444746]">
          <ArrowUpDown size={13} className="text-[#80868B]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border-0 outline-none text-xs text-[#202124] dark:text-white cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="size">Sort by Size</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#F1F3F4] dark:bg-[#282a2c] p-1 rounded-xl">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white dark:bg-[#1e1f20] text-[#4285F4] shadow-xs'
                : 'text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124]'
            }`}
            title="List view"
            aria-label="List view"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-[#1e1f20] text-[#4285F4] shadow-xs'
                : 'text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124]'
            }`}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
