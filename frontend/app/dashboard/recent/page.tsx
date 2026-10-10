'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileRow } from '@/components/files/FileRow';
import { FileCard } from '@/components/files/FileCard';
import { FileListHeader } from '@/components/files/FileListHeader';

export default function RecentPage() {
  const { files, viewMode, selectedFileIds, searchQuery } = useVault();
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group files into Today, Yesterday, Earlier
  const todayFiles = filteredFiles.filter((f) => f.updatedAt.toLowerCase().includes('today'));
  const yesterdayFiles = filteredFiles.filter((f) => f.updatedAt.toLowerCase().includes('yesterday'));
  const earlierFiles = filteredFiles.filter(
    (f) =>
      !f.updatedAt.toLowerCase().includes('today') &&
      !f.updatedAt.toLowerCase().includes('yesterday')
  );

  const sections = [
    { title: 'Today', items: todayFiles },
    { title: 'Yesterday', items: yesterdayFiles },
    { title: 'Earlier This Month', items: earlierFiles },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
          Recent Files
        </h1>
        <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
          Access documents, media, and assets you recently modified or viewed.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <FileListHeader
          title="All Recent Items"
          totalCount={filteredFiles.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allFileIds={filteredFiles.map((f) => f.id)}
        />

        {sections.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-center mx-auto mb-3 text-[#80868B]">
              <Clock size={28} />
            </div>
            <p className="text-sm font-semibold text-[#202124] dark:text-white">
              No recent files found
            </p>
            <p className="text-xs text-[#80868B] mt-1">
              Files you view or upload will appear grouped chronologically here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((sec) => (
              <div key={sec.title} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#80868B] uppercase tracking-wider">
                    {sec.title}
                  </h3>
                  <div className="flex-1 h-px bg-[#E8EAED] dark:bg-[#36373a]" />
                </div>

                {viewMode === 'list' ? (
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
                        {sec.items.map((file) => (
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
                    {sec.items.map((file) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        isSelected={selectedFileIds.includes(file.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
