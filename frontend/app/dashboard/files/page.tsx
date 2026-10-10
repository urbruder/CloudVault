'use client';

import React, { useState } from 'react';
import {
  FolderPlus,
  Upload,
  ChevronRight,
  FolderOpen,
  Folder,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FolderCard } from '@/components/files/FolderCard';
import { FileRow } from '@/components/files/FileRow';
import { FileCard } from '@/components/files/FileCard';
import { FileListHeader } from '@/components/files/FileListHeader';

export default function MyFilesPage() {
  const {
    files,
    folders,
    viewMode,
    selectedFileIds,
    activeFolderId,
    setActiveFolderId,
    setIsNewFolderModalOpen,
    setIsUploadModalOpen,
    searchQuery,
  } = useVault();

  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');

  // Determine current active folder
  const currentFolder = folders.find((f) => f.id === activeFolderId);

  // Filter files by active folder & search query
  const displayedFiles = files
    .filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.type.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeFolderId) {
        return matchesSearch && f.folderId === activeFolderId;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      return 0;
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Breadcrumb Navigator */}
        <div className="flex items-center gap-2 text-sm text-[#5F6368] dark:text-[#c4c7c5]">
          <button
            onClick={() => setActiveFolderId(null)}
            className={`font-semibold hover:text-[#4285F4] transition-colors ${
              !activeFolderId ? 'text-[#202124] dark:text-white' : ''
            }`}
          >
            My Files
          </button>
          {currentFolder && (
            <>
              <ChevronRight size={15} className="text-[#80868B]" />
              <span className="font-semibold text-[#202124] dark:text-white flex items-center gap-1.5 bg-[#F1F3F4] dark:bg-[#282a2c] px-2.5 py-1 rounded-lg">
                <FolderOpen size={15} className="text-[#4285F4]" />
                <span>{currentFolder.name}</span>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsNewFolderModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-white border border-[#DADCE0] dark:border-[#444746] hover:bg-[#F8FAFD] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all active:scale-98"
          >
            <FolderPlus size={16} className="text-[#5F6368]" />
            <span>+ New Folder</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#4285F4] text-white hover:bg-[#3367D6] text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-98"
          >
            <Upload size={16} />
            <span>+ Upload Files</span>
          </button>
        </div>
      </div>

      {/* Folders Showcase Row (when in root view) */}
      {!activeFolderId && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#202124] dark:text-white">
              Folders ({folders.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
          </div>
        </div>
      )}

      {/* Main Files Table / Grid */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <FileListHeader
          title={currentFolder ? `Files in ${currentFolder.name}` : 'All Objects'}
          totalCount={displayedFiles.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allFileIds={displayedFiles.map((f) => f.id)}
        />

        {displayedFiles.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-center mx-auto mb-3 text-[#80868B]">
              <Folder size={28} />
            </div>
            <p className="text-sm font-semibold text-[#202124] dark:text-white">
              No files in this directory
            </p>
            <p className="text-xs text-[#80868B] mt-1 max-w-xs mx-auto">
              Upload files or drag and drop items here to populate your CloudVault storage.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 px-4 py-2 rounded-full bg-[#4285F4] text-white text-xs font-semibold hover:bg-[#3367D6]"
            >
              Upload Files
            </button>
          </div>
        ) : viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8EAED] dark:border-[#36373a] text-[#80868B] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 w-10"></th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 hidden md:table-cell">Owner</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Last Modified</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED] dark:divide-[#36373a]/50">
                {displayedFiles.map((file) => (
                  <FileRow
                    key={file.id}
                    file={file}
                    isSelected={selectedFileIds.includes(file.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedFileIds.includes(file.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
