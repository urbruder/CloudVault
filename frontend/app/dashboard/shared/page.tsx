'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileRow } from '@/components/files/FileRow';
import { FileCard } from '@/components/files/FileCard';
import { FileListHeader } from '@/components/files/FileListHeader';

export default function SharedWithMePage() {
  const { files, viewMode, selectedFileIds, searchQuery } = useVault();
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');

  // Files where owner is not current user or explicitly shared with me
  const sharedWithMeFiles = files
    .filter((f) => !f.owner.isCurrentUser || f.name.includes('Presentation') || f.name.includes('Agreement'))
    .filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      return 0;
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
          Shared with Me
        </h1>
        <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
          Files and assets that team members and external partners have shared with you.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <FileListHeader
          title="Shared Objects"
          totalCount={sharedWithMeFiles.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allFileIds={sharedWithMeFiles.map((f) => f.id)}
        />

        {sharedWithMeFiles.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-center mx-auto mb-3 text-[#80868B]">
              <Users size={28} />
            </div>
            <p className="text-sm font-semibold text-[#202124] dark:text-white">
              No shared files found
            </p>
            <p className="text-xs text-[#80868B] mt-1 max-w-xs mx-auto">
              When teammates share files with you, they will appear in this workspace.
            </p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8EAED] dark:border-[#36373a] text-[#80868B] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 w-10"></th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 hidden md:table-cell">Shared By</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Date Shared</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED] dark:divide-[#36373a]/50">
                {sharedWithMeFiles.map((file) => (
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
            {sharedWithMeFiles.map((file) => (
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
