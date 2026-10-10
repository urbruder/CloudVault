'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Info,
  History,
  RotateCcw,
  CheckCircle,
  TrendingUp,
  Folder,
  Lock,
  ChevronLeft,
  ChevronRight,
  Copy,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileIcon } from '@/components/files/FileIcon';
import { FileVersion } from '@/types';

export function FilePreviewModal() {
  const {
    previewFile,
    setPreviewFile,
    previewTab,
    setPreviewTab,
    setShareModalFile,
    setRestoreConfirmVersion,
    showToast,
  } = useVault();

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  if (!previewFile) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 60));
  const handleResetZoom = () => setZoomLevel(100);

  const handleDownload = () => {
    showToast(`Downloading "${previewFile.name}"...`, 'info');
  };

  const handleCopyUri = () => {
    navigator.clipboard?.writeText(`vault://files/${previewFile.id}`);
    showToast('Vault resource URI copied to clipboard', 'success');
  };

  const handleRestoreVersionClick = (version: FileVersion) => {
    setRestoreConfirmVersion({ file: previewFile, version });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 ${
        isFullScreen ? 'p-0!' : ''
      }`}
    >
      <div
        className={`bg-white dark:bg-[#1e1f20] w-full max-w-7xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#DADCE0] dark:border-[#444746] ${
          isFullScreen ? 'h-full! max-w-full! rounded-none!' : ''
        }`}
      >
        {/* Modal Top Bar */}
        <div className="h-16 px-4 md:px-6 bg-[#F8FAFD] dark:bg-[#282a2c] border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1e1f20] shadow-xs flex items-center justify-center shrink-0">
              <FileIcon type={previewFile.type} size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading font-semibold text-sm md:text-base text-[#202124] dark:text-white truncate">
                {previewFile.name}
              </h3>
              <p className="text-xs text-[#80868B] truncate">
                {previewFile.sizeFormatted} • Modified {previewFile.updatedAt}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setShareModalFile(previewFile);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] hover:bg-[#d8e2ff] transition-colors text-xs font-semibold"
            >
              <Share2 size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1F3F4] dark:bg-[#37393b] text-[#202124] dark:text-white hover:bg-[#E9E7EB] transition-colors text-xs font-semibold"
            >
              <Download size={15} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#37393b] transition-colors hidden md:inline-flex"
              title={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            <div className="h-6 w-px bg-[#DADCE0] dark:bg-[#444746] mx-1" />

            <button
              onClick={() => setPreviewFile(null)}
              className="p-2 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] dark:hover:bg-[#37393b] transition-colors"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Main Area: 2 Columns */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Column 1: Document View Canvas */}
          <div className="flex-1 bg-[#F1F3F4] dark:bg-[#131314] relative flex flex-col justify-between overflow-hidden">
            {/* Canvas floating toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#1e1f20]/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#DADCE0] dark:border-[#444746] flex items-center gap-2 z-10 text-xs">
              <button
                onClick={handleZoomOut}
                className="p-1 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-black/5"
                title="Zoom out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="font-mono text-[11px] w-12 text-center text-[#202124] dark:text-white">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-black/5"
                title="Zoom in"
              >
                <ZoomIn size={15} />
              </button>
              <div className="h-3 w-px bg-[#DADCE0] dark:bg-[#444746]" />
              <button
                onClick={handleResetZoom}
                className="text-[11px] text-[#4285F4] hover:underline px-1 font-medium"
              >
                Fit
              </button>
            </div>

            {/* Document Preview Sheet Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
                className="transition-transform duration-150"
              >
                {previewFile.type === 'pdf' ? (
                  <div className="w-[580px] min-h-[720px] bg-white rounded-xl shadow-xl p-8 sm:p-10 border border-[#DADCE0] text-[#202124] flex flex-col justify-between select-text">
                    <div>
                      <div className="border-b border-[#E8EAED] pb-4 mb-6 flex justify-between items-start">
                        <div>
                          <span className="text-[11px] font-bold text-[#4285F4] uppercase tracking-wider">
                            CloudVault Secure Document
                          </span>
                          <h2 className="text-xl font-heading font-bold text-[#202124] mt-1">
                            {previewFile.name.replace(/\.[^/.]+$/, '')}
                          </h2>
                          <p className="text-xs text-[#80868B] mt-0.5">
                            Reference: PRD-2025-V{previewFile.versions?.length || 1} • Confidential
                          </p>
                        </div>
                        <span className="text-[11px] bg-[#F1F3F4] text-[#5F6368] px-2 py-0.5 rounded font-medium">
                          Page {currentPage} of 4
                        </span>
                      </div>

                      <div className="space-y-5 text-xs leading-relaxed text-[#3c4043]">
                        <div>
                          <h4 className="font-heading font-semibold text-sm text-[#202124] mb-1.5">
                            1. Executive Overview
                          </h4>
                          <p>
                            This proposal presents the architecture, data lifecycle management, and
                            operational governance for the CloudVault high-throughput file platform.
                            Designed to streamline file collaboration with end-to-end versioning,
                            predictive capacity metrics, and multi-tenant access controls.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-heading font-semibold text-sm text-[#202124] mb-1.5">
                            2. Key Platform Objectives
                          </h4>
                          <ul className="list-disc pl-5 space-y-1.5 text-[#5F6368]">
                            <li>
                              <strong className="text-[#202124]">High Reliability:</strong> Redundant
                              immutable snapshot tracking and zero-downtime version milestones.
                            </li>
                            <li>
                              <strong className="text-[#202124]">Seamless Collaboration:</strong> Instant
                              expiring share links, access revocation, and multi-user preview generation.
                            </li>
                            <li>
                              <strong className="text-[#202124]">Sub-Second Search:</strong> Instant
                              client-side query matching with responsive folder tree traversal.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-heading font-semibold text-sm text-[#202124] mb-1.5">
                            3. Deliverables &amp; Roadmap
                          </h4>
                          <p>
                            Rollout comprises intuitive file management, upload queue tracking with
                            real-time feedback, and granular storage analytics without unnecessary
                            infrastructure complexity.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#E8EAED] flex items-center justify-between text-[11px] text-[#80868B]">
                      <span>CloudVault Enterprise Platform</span>
                      <span>Classification: Internal Secure</span>
                    </div>
                  </div>
                ) : previewFile.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewFile.previewUrl}
                    alt={previewFile.name}
                    className="max-h-[640px] max-w-full rounded-2xl shadow-xl border border-[#DADCE0] object-contain"
                  />
                ) : (
                  <div className="w-[460px] p-8 bg-white dark:bg-[#1e1f20] rounded-2xl shadow-xl border border-[#DADCE0] dark:border-[#444746] text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F0FE] text-[#4285F4] mx-auto flex items-center justify-center mb-4">
                      <FileIcon type={previewFile.type} size={32} />
                    </div>
                    <h3 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
                      {previewFile.name}
                    </h3>
                    <p className="text-xs text-[#80868B] mt-1 max-w-xs mx-auto">
                      {previewFile.description || 'Preview placeholder for selected file format.'}
                    </p>
                    <button
                      onClick={handleDownload}
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4285F4] text-white text-xs font-semibold shadow-sm hover:bg-[#3367D6]"
                    >
                      <Download size={15} />
                      <span>Download File ({previewFile.sizeFormatted})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom page controls for PDF */}
            {previewFile.type === 'pdf' && (
              <div className="p-3 bg-white/80 dark:bg-[#1e1f20]/80 backdrop-blur-xs border-t border-[#E8EAED] dark:border-[#36373a] flex items-center justify-center gap-3 text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-1 rounded-full hover:bg-black/5 disabled:opacity-30"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <span>
                  Page {currentPage} of 4
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
                  disabled={currentPage >= 4}
                  className="p-1 rounded-full hover:bg-black/5 disabled:opacity-30"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Column 2: Right Properties & Version History Panel */}
          <div className="w-full lg:w-[380px] bg-white dark:bg-[#1e1f20] border-t lg:border-t-0 lg:border-l border-[#DADCE0] dark:border-[#444746] flex flex-col shrink-0 overflow-y-auto">
            {/* Tab buttons */}
            <div className="p-3 bg-[#F8FAFD] dark:bg-[#282a2c] border-b border-[#E8EAED] dark:border-[#36373a] flex gap-1.5">
              <button
                onClick={() => setPreviewTab('properties')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  previewTab === 'properties'
                    ? 'bg-white dark:bg-[#1e1f20] text-[#4285F4] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124]'
                }`}
              >
                <Info size={15} />
                <span>Properties</span>
              </button>

              <button
                onClick={() => setPreviewTab('versions')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  previewTab === 'versions'
                    ? 'bg-white dark:bg-[#1e1f20] text-[#4285F4] shadow-xs'
                    : 'text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124]'
                }`}
              >
                <History size={15} />
                <span>Versions ({previewFile.versions?.length || 1})</span>
              </button>
            </div>

            {/* TAB 1: PROPERTIES */}
            {previewTab === 'properties' && (
              <div className="p-5 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                      File Metadata
                    </h4>
                    <button
                      onClick={handleCopyUri}
                      className="p-1 rounded-lg text-[#4285F4] hover:bg-[#E8F0FE] transition-colors"
                      title="Copy resource URI"
                    >
                      <Copy size={15} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs bg-[#F8FAFD] dark:bg-[#282a2c] p-4 rounded-2xl border border-[#DADCE0] dark:border-[#444746]">
                    <div>
                      <span className="text-[#80868B] block mb-0.5">File Name</span>
                      <span className="font-medium text-[#202124] dark:text-white break-all">
                        {previewFile.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[#80868B] block mb-0.5">Size</span>
                        <span className="font-medium text-[#202124] dark:text-white">
                          {previewFile.sizeFormatted}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#80868B] block mb-0.5">Type</span>
                        <span className="font-medium text-[#202124] dark:text-white uppercase">
                          {previewFile.extension}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#80868B] block mb-0.5">Location</span>
                      <span className="font-medium text-[#202124] dark:text-white flex items-center gap-1">
                        <Folder size={14} className="text-[#4285F4]" />
                        <span className="truncate">{previewFile.folderPath}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[#80868B] block mb-0.5">Created</span>
                        <span className="font-medium text-[#202124] dark:text-white">
                          {previewFile.createdAt}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#80868B] block mb-0.5">Modified</span>
                        <span className="font-medium text-[#202124] dark:text-white">
                          {previewFile.updatedAt}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#80868B] block mb-0.5">Owner</span>
                      <span className="font-medium text-[#202124] dark:text-white">
                        {previewFile.owner.name} ({previewFile.owner.isCurrentUser ? 'You' : 'Collaborator'})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sharing & Governance Card */}
                <div className="bg-[#F8FAFD] dark:bg-[#282a2c] p-4 rounded-2xl border border-[#DADCE0] dark:border-[#444746] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-xs text-[#202124] dark:text-white">
                      <Lock size={15} className="text-[#4285F4]" />
                      <span>Sharing &amp; Governance</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] text-[10px] font-semibold">
                      {previewFile.isShared ? 'Shared Link Active' : 'Restricted'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                    {previewFile.isShared
                      ? 'Anyone with the active expiring link can view or download this file.'
                      : 'Only project collaborators have access to view or download this file.'}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-7 h-7 rounded-full bg-[#4285F4] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                        H
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#5846c8] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                        E
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#E9E7EB] text-[#5F6368] text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        +1
                      </div>
                    </div>

                    <button
                      onClick={() => setShareModalFile(previewFile)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1e1f20] hover:bg-[#E8F0FE] text-[#4285F4] text-xs font-semibold border border-[#DADCE0] dark:border-[#444746] transition-colors"
                    >
                      Manage Sharing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VERSION HISTORY */}
            {previewTab === 'versions' && (
              <div className="p-5 space-y-4">
                {/* Header banner */}
                <div className="bg-[#F8FAFD] dark:bg-[#282a2c] p-4 rounded-2xl border border-[#DADCE0] dark:border-[#444746]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#202124] dark:text-white mb-1">
                    <span>Version Records</span>
                    <span className="text-[#4285F4]">
                      {previewFile.versions?.length || 1} Total Snapshots
                    </span>
                  </div>
                  <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                    CloudVault preserves immutable snapshots with non-destructive versioning. Restoring
                    creates a new revision milestone.
                  </p>

                  {/* Delta Increase */}
                  {previewFile.versions && previewFile.versions.length > 1 && (
                    <div className="mt-3 bg-white dark:bg-[#1e1f20] p-2.5 rounded-xl border border-[#DADCE0] dark:border-[#444746] flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center shrink-0">
                        <TrendingUp size={15} />
                      </div>
                      <div>
                        <span className="text-[11px] text-[#80868B] block">Delta Growth (v2 → v3)</span>
                        <span className="text-xs font-semibold text-[#202124] dark:text-white">
                          +400 KB revised
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Versions Timeline */}
                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8EAED] dark:before:bg-[#36373a]">
                  {previewFile.versions && previewFile.versions.length > 0 ? (
                    previewFile.versions.map((ver, idx) => {
                      const isCurrent = ver.isCurrent || idx === 0;

                      return (
                        <div key={ver.id || ver.versionNumber} className="relative pl-7 space-y-1">
                          {/* Dot indicator */}
                          <div
                            className={`absolute left-1.5 top-2.5 -translate-x-1/2 w-3 h-3 rounded-full ring-4 ${
                              isCurrent
                                ? 'bg-[#4285F4] ring-[#E8F0FE] dark:ring-[#004494]/30'
                                : 'bg-[#80868B] ring-white dark:ring-[#1e1f20]'
                            }`}
                          />

                          <div
                            className={`p-3.5 rounded-2xl border transition-all ${
                              isCurrent
                                ? 'bg-[#E8F0FE]/40 dark:bg-[#004494]/15 border-[#4285F4]/30'
                                : 'bg-[#F8FAFD] dark:bg-[#282a2c] border-[#DADCE0] dark:border-[#444746]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-xs font-bold ${
                                    isCurrent ? 'text-[#4285F4]' : 'text-[#202124] dark:text-white'
                                  }`}
                                >
                                  Version {ver.versionNumber}
                                </span>
                                {isCurrent && (
                                  <span className="text-[10px] font-semibold bg-[#4285F4] text-white px-1.5 py-0.2 rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5]">
                                {ver.sizeFormatted}
                              </span>
                            </div>

                            <p className="text-[11px] text-[#80868B]">
                              Uploaded {ver.uploadedAt} by <strong className="text-[#202124] dark:text-white font-medium">{ver.uploadedBy}</strong>
                            </p>

                            {ver.summary && (
                              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] mt-1.5 bg-white/80 dark:bg-[#1e1f20]/80 p-2 rounded-xl italic">
                                “{ver.summary}”
                              </p>
                            )}

                            <div className="mt-2.5 pt-2 border-t border-[#E8EAED] dark:border-[#36373a] flex items-center justify-end gap-2">
                              <button
                                onClick={handleDownload}
                                className="px-2.5 py-1 text-[11px] font-medium text-[#5F6368] hover:text-[#202124] hover:bg-black/5 rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Download size={13} />
                                <span>Download</span>
                              </button>

                              {!isCurrent && (
                                <button
                                  onClick={() => handleRestoreVersionClick(ver)}
                                  className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-[#1e1f20] text-[#4285F4] hover:bg-[#4285F4] hover:text-white border border-[#4285F4]/30 rounded-lg transition-all shadow-2xs flex items-center gap-1"
                                >
                                  <RotateCcw size={13} />
                                  <span>Restore This Version</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="pl-7 text-xs text-[#80868B]">
                      No previous versions recorded for this file.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
