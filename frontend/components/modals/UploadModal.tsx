'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, File, AlertCircle } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function UploadModal() {
  const { isUploadModalOpen, setIsUploadModalOpen, simulateUpload } = useVault();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const names = Array.from(e.dataTransfer.files).map((f) => f.name);
      setSelectedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setSelectedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleStartUpload = () => {
    const filesToUpload =
      selectedFiles.length > 0
        ? selectedFiles
        : ['Production_Deployment_Plan.pdf', 'Q4_Financial_Sync.xlsx'];
    simulateUpload(filesToUpload);
    setSelectedFiles([]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] w-full max-w-lg rounded-3xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center">
              <UploadCloud size={18} />
            </div>
            <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
              Upload Files to CloudVault
            </h3>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />

          {/* Drag & Drop Target */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              dragActive
                ? 'border-[#4285F4] bg-[#E8F0FE]/50 dark:bg-[#004494]/20'
                : 'border-[#DADCE0] dark:border-[#444746] hover:border-[#4285F4] bg-[#F8FAFD] dark:bg-[#282a2c]'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1e1f20] shadow-sm flex items-center justify-center text-[#4285F4]">
              <UploadCloud size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#202124] dark:text-white">
                Drag and drop files here, or{' '}
                <span className="text-[#4285F4] hover:underline">browse</span>
              </p>
              <p className="text-xs text-[#80868B] mt-1">
                Supports documents, images, video, archives up to 15 GB total quota
              </p>
            </div>
          </div>

          {/* Selected queue preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              <span className="text-xs font-semibold text-[#5F6368] dark:text-[#c4c7c5]">
                Ready to upload ({selectedFiles.length}):
              </span>
              {selectedFiles.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#F1F3F4] dark:bg-[#282a2c] text-xs text-[#202124] dark:text-white"
                >
                  <div className="flex items-center gap-2 truncate">
                    <File size={14} className="text-[#4285F4]" />
                    <span className="truncate">{name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i));
                    }}
                    className="p-0.5 text-[#80868B] hover:text-[#D93025]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Demo disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746] text-[11px] text-[#5F6368] dark:text-[#c4c7c5]">
            <AlertCircle size={15} className="shrink-0 text-[#4285F4] mt-0.5" />
            <p>
              Frontend demo mode: Simulated progress is rendered in the upload queue widget and adds new files to your local state.
            </p>
          </div>

          {/* Footer Controls */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
            >
              Cancel
            </button>
            <button
              onClick={handleStartUpload}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#4285F4] text-white hover:bg-[#3367D6] transition-colors shadow-sm"
            >
              {selectedFiles.length > 0
                ? `Upload ${selectedFiles.length} file(s)`
                : 'Upload Demo Sample Files'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
