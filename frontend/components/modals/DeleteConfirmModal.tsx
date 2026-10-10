'use client';

import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function DeleteConfirmModal() {
  const {
    deleteConfirmFile,
    setDeleteConfirmFile,
    isPermanentDelete,
    moveToTrash,
    permanentDelete,
  } = useVault();

  if (!deleteConfirmFile) return null;

  const handleConfirm = () => {
    if (isPermanentDelete) {
      permanentDelete(deleteConfirmFile.id);
    } else {
      moveToTrash(deleteConfirmFile.id);
    }
    setDeleteConfirmFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] w-full max-w-md rounded-3xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FCE8E6] text-[#D93025] flex items-center justify-center">
              <Trash2 size={16} />
            </div>
            <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
              {isPermanentDelete ? 'Permanently Delete File' : 'Move to Trash'}
            </h3>
          </div>
          <button
            onClick={() => setDeleteConfirmFile(null)}
            className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746]">
            <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-[#202124] dark:text-white mb-0.5">
                {deleteConfirmFile.name}
              </p>
              <p className="text-[#5F6368] dark:text-[#c4c7c5]">
                {isPermanentDelete
                  ? 'This action cannot be undone. The object snapshot and all associated version records will be deleted forever.'
                  : 'Items in trash are kept for 30 days before being automatically purged. You can restore it anytime.'}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setDeleteConfirmFile(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#D93025] text-white hover:bg-red-700 transition-colors shadow-sm"
            >
              {isPermanentDelete ? 'Delete Forever' : 'Move to Trash'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
