'use client';

import React from 'react';
import { RotateCcw, X, Info } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function RestoreModal() {
  const {
    restoreConfirmVersion,
    setRestoreConfirmVersion,
    restoreFileVersion,
  } = useVault();

  if (!restoreConfirmVersion) return null;

  const { file, version } = restoreConfirmVersion;

  const handleConfirm = () => {
    restoreFileVersion(file.id, version.versionNumber);
    setRestoreConfirmVersion(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] w-full max-w-md rounded-3xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center">
              <RotateCcw size={16} />
            </div>
            <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
              Restore Version {version.versionNumber}
            </h3>
          </div>
          <button
            onClick={() => setRestoreConfirmVersion(null)}
            className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746] space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#80868B]">Target File:</span>
              <span className="font-semibold text-[#202124] dark:text-white truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#80868B]">Revision Milestone:</span>
              <span className="font-semibold text-[#4285F4]">
                Version {version.versionNumber} ({version.sizeFormatted})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#80868B]">Created:</span>
              <span className="text-[#5F6368] dark:text-[#c4c7c5]">
                {version.uploadedAt} by {version.uploadedBy}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#E8F0FE] dark:bg-[#004494]/20 text-xs text-[#4285F4]">
            <Info size={16} className="shrink-0 mt-0.5" />
            <p>
              Restoring this snapshot will promote it to the active version by creating a new revision milestone. Previous history remains intact.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setRestoreConfirmVersion(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#4285F4] text-white hover:bg-[#3367D6] transition-colors shadow-sm"
            >
              Restore Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
