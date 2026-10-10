'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit2 } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function RenameModal() {
  const { renameModalFile, setRenameModalFile, renameFile } = useVault();
  const [name, setName] = useState('');

  useEffect(() => {
    if (renameModalFile) {
      setName(renameModalFile.name);
    }
  }, [renameModalFile]);

  if (!renameModalFile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      renameFile(renameModalFile.id, name.trim());
      setRenameModalFile(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] w-full max-w-md rounded-3xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] flex items-center justify-center">
              <Edit2 size={16} />
            </div>
            <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
              Rename File
            </h3>
          </div>
          <button
            onClick={() => setRenameModalFile(null)}
            className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
              File Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-sm text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setRenameModalFile(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#4285F4] text-white hover:bg-[#3367D6] disabled:opacity-50 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
