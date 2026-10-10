'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileRow } from '@/components/files/FileRow';
import { FileCard } from '@/components/files/FileCard';
import { FileListHeader } from '@/components/files/FileListHeader';

export default function StarredPage() {
  const { files, viewMode, selectedFileIds, searchQuery } = useVault();
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');

  const starredFiles = files
    .filter((f) => f.isStarred)
    .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      return 0;
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
          Starred Files
        </h1>
        <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
          Important documents and shortcuts you marked for fast one-click access.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <FileListHeader
          title="Starred Objects"
          totalCount={starredFiles.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allFileIds={starredFiles.map((f) => f.id)}
        />

        {starredFiles.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF7E0] dark:bg-[#F9AB00]/20 flex items-center justify-center mx-auto mb-3 text-amber-500">
              <Star size={28} className="fill-amber-500" />
            </div>
            <p className="text-sm font-semibold text-[#202124] dark:text-white">
              No starred files yet
            </p>
            <p className="text-xs text-[#80868B] mt-1 max-w-xs mx-auto">
              Star items you want to keep handy by clicking the star icon in any list or file view.
            </p>
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
                {starredFiles.map((file) => (
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
            {starredFiles.map((file) => (
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
