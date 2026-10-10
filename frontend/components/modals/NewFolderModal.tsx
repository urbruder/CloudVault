'use client';

import React, { useState } from 'react';
import { FolderPlus, X } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function NewFolderModal() {
  const { isNewFolderModalOpen, setIsNewFolderModalOpen, createFolder } = useVault();
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#4285F4');

  if (!isNewFolderModalOpen) return null;

  const colors = [
    { name: 'Blue', hex: '#4285F4' },
    { name: 'Purple', hex: '#5846C8' },
    { name: 'Green', hex: '#188038' },
    { name: 'Amber', hex: '#F9AB00' },
    { name: 'Slate', hex: '#727785' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      createFolder(folderName.trim(), selectedColor);
      setFolderName('');
      setIsNewFolderModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] w-full max-w-md rounded-3xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center">
              <FolderPlus size={16} />
            </div>
            <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
              Create New Folder
            </h3>
          </div>
          <button
            onClick={() => setIsNewFolderModalOpen(false)}
            className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="e.g. Q4 Deliverables, System Assets"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-sm text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-2">
              Folder Color
            </label>
            <div className="flex items-center gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                    selectedColor === c.hex ? 'scale-115 ring-2 ring-offset-2 ring-[#4285F4]' : ''
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewFolderModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!folderName.trim()}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#4285F4] text-white hover:bg-[#3367D6] disabled:opacity-50 transition-colors"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
