'use client';

import React from 'react';
import {
  UploadCloud,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  Pause,
  Play,
  Hourglass,
  FolderOpen,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileIcon } from '@/components/files/FileIcon';

export function UploadQueueWidget() {
  const {
    uploadQueue,
    isUploadQueueOpen,
    isUploadQueueMinimized,
    setIsUploadQueueOpen,
    setIsUploadQueueMinimized,
    pauseUpload,
    resumeUpload,
    cancelUpload,
    showToast,
  } = useVault();

  if (!isUploadQueueOpen || uploadQueue.length === 0) return null;

  const completedCount = uploadQueue.filter((i) => i.status === 'completed').length;

  return (
    <aside
      className="fixed right-4 md:right-6 bottom-20 md:bottom-6 w-[calc(100vw-32px)] sm:w-96 bg-white dark:bg-[#1e1f20] rounded-2xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden z-40 transition-all duration-200 animate-in slide-in-from-bottom-4"
      aria-label="Upload Queue Widget"
    >
      {/* Header */}
      <div
        onClick={() => setIsUploadQueueMinimized(!isUploadQueueMinimized)}
        className="px-4 py-3 bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-between cursor-pointer border-b border-[#E8EAED] dark:border-[#36373a] select-none hover:bg-[#F1F3F4] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] flex items-center justify-center">
            <UploadCloud size={16} />
          </div>
          <div>
            <span className="font-semibold text-xs text-[#202124] dark:text-white">
              Uploads ({uploadQueue.length})
            </span>
            <span className="text-[11px] text-[#5F6368] dark:text-[#c4c7c5] ml-1.5 font-normal">
              • {completedCount} finished
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsUploadQueueMinimized(!isUploadQueueMinimized);
            }}
            className="p-1 rounded-full text-[#5F6368] hover:text-[#202124] dark:hover:text-white hover:bg-black/5"
            aria-label={isUploadQueueMinimized ? 'Expand queue' : 'Minimize queue'}
          >
            {isUploadQueueMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsUploadQueueOpen(false);
            }}
            className="p-1 rounded-full text-[#5F6368] hover:text-[#D93025] hover:bg-black/5"
            aria-label="Close upload queue"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Body List */}
      {!isUploadQueueMinimized && (
        <div className="max-h-72 overflow-y-auto p-3 space-y-2.5 divide-y divide-[#E8EAED] dark:divide-[#36373a]/50">
          {uploadQueue.map((item) => (
            <div key={item.id} className="pt-2 first:pt-0">
              <div className="flex items-center justify-between gap-2.5 mb-1.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#F1F3F4] dark:bg-[#282a2c] flex items-center justify-center shrink-0">
                    {item.status === 'completed' ? (
                      <CheckCircle size={17} className="text-[#188038]" />
                    ) : item.status === 'queued' ? (
                      <Hourglass size={16} className="text-[#80868B]" />
                    ) : (
                      <FileIcon type={item.type} size={16} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#202124] dark:text-white truncate">
                      {item.fileName}
                    </p>
                    <p className="text-[11px] text-[#5F6368] dark:text-[#c4c7c5]">
                      {item.status === 'completed' && (
                        <span className="text-[#188038] font-medium">
                          {item.sizeFormatted} • Upload complete
                        </span>
                      )}
                      {item.status === 'uploading' && (
                        <span>
                          {item.sizeFormatted} • {item.progress}%
                        </span>
                      )}
                      {item.status === 'paused' && (
                        <span className="text-amber-500 font-medium">Paused ({item.progress}%)</span>
                      )}
                      {item.status === 'queued' && (
                        <span>{item.sizeFormatted} • Queued</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {item.status === 'uploading' && (
                    <button
                      onClick={() => pauseUpload(item.id)}
                      className="p-1 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]"
                      title="Pause upload"
                    >
                      <Pause size={14} />
                    </button>
                  )}
                  {item.status === 'paused' && (
                    <button
                      onClick={() => resumeUpload(item.id)}
                      className="p-1 rounded-full text-[#4285F4] hover:bg-[#E8F0FE]"
                      title="Resume upload"
                    >
                      <Play size={14} />
                    </button>
                  )}
                  {item.status === 'completed' && (
                    <button
                      onClick={() => showToast(`Located "${item.fileName}" in folder`, 'info')}
                      className="p-1 rounded-full text-[#5F6368] hover:text-[#4285F4]"
                      title="Locate file"
                    >
                      <FolderOpen size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => cancelUpload(item.id)}
                    className="p-1 rounded-full text-[#80868B] hover:text-[#D93025] hover:bg-[#FCE8E6]"
                    title="Remove item"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              {item.status !== 'completed' && (
                <div className="w-full bg-[#E9E7EB] dark:bg-[#37393b] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.status === 'paused' ? 'bg-amber-400' : 'bg-[#4285F4]'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
