'use client';

import React, { useState } from 'react';
import { Trash2, AlertTriangle, RotateCcw } from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileRow } from '@/components/files/FileRow';

export function TrashPage() {
  const { trashFiles, emptyTrash, selectedFileIds } = useVault();
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
            Trash Bin
          </h1>
          <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
            Deleted files are safely kept here for 30 days before being permanently purged.
          </p>
        </div>

        {trashFiles.length > 0 && (
          <button
            onClick={() => setShowEmptyConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FCE8E6] dark:bg-[#93000a]/20 text-[#D93025] hover:bg-red-200 dark:hover:bg-[#93000a]/40 text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            <Trash2 size={16} />
            <span>Empty Trash Bin</span>
          </button>
        )}
      </div>

      {/* Confirmation Banner for Emptying Trash */}
      {showEmptyConfirm && (
        <div className="p-4 bg-[#FCE8E6] rounded-2xl border border-[#D93025]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3 text-xs text-[#D93025]">
            <AlertTriangle size={20} className="shrink-0" />
            <div>
              <p className="font-bold">Permanently erase all {trashFiles.length} items in trash?</p>
              <p>This action is irreversible. Files cannot be recovered afterwards.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowEmptyConfirm(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#5F6368] hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                emptyTrash();
                setShowEmptyConfirm(false);
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#D93025] text-white hover:bg-red-700"
            >
              Confirm Empty Trash
            </button>
          </div>
        </div>
      )}

      {/* Trash Items Table */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
              Trash Items
            </h2>
            <span className="text-xs font-medium bg-[#F1F3F4] dark:bg-[#282a2c] text-[#5F6368] dark:text-[#c4c7c5] px-2.5 py-0.5 rounded-full">
              {trashFiles.length} items
            </span>
          </div>
        </div>

        {trashFiles.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-center mx-auto mb-3 text-[#80868B]">
              <Trash2 size={28} />
            </div>
            <p className="text-sm font-semibold text-[#202124] dark:text-white">
              Trash is empty
            </p>
            <p className="text-xs text-[#80868B] mt-1 max-w-xs mx-auto">
              Items you remove will be kept here before permanent deletion.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8EAED] dark:border-[#36373a] text-[#80868B] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 w-10"></th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 hidden md:table-cell">Owner</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Deleted</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED] dark:divide-[#36373a]/50">
                {trashFiles.map((file) => (
                  <FileRow
                    key={file.id}
                    file={file}
                    isSelected={selectedFileIds.includes(file.id)}
                    isTrashView
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrashPage;
