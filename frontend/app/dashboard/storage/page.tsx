'use client';

import React from 'react';
import Link from 'next/link';
import {
  HardDrive,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Film,
  Archive,
  Terminal,
  ChevronRight,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileRow } from '@/components/files/FileRow';

export function StoragePage() {
  const { storageSummary, files, selectedFileIds } = useVault();

  // Find largest files (> 50 MB)
  const largestFiles = [...files]
    .sort((a, b) => b.sizeBytes - a.sizeBytes)
    .slice(0, 5);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'documents':
        return <FileText size={20} className="text-[#4285F4]" />;
      case 'images':
        return <ImageIcon size={20} className="text-[#5846c8]" />;
      case 'videos':
        return <Film size={20} className="text-[#8B7CFF]" />;
      case 'archives':
        return <Archive size={20} className="text-[#188038]" />;
      default:
        return <Terminal size={20} className="text-[#727785]" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
          Storage Usage &amp; Analytics
        </h1>
        <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
          Detailed metrics and breakdown of your CloudVault dedicated storage allocation.
        </p>
      </div>

      {/* Main Metric Cards Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Capacity Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1e1f20] rounded-3xl p-6 sm:p-7 border border-[#DADCE0] dark:border-[#444746] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] dark:border-[#36373a]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center">
                <HardDrive size={18} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                  CloudVault Quota
                </h3>
                <p className="text-[11px] text-[#80868B]">Single-tenant dedicated pool</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#188038] text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Healthy</span>
            </span>
          </div>

          {/* Radial Donut Gauge */}
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  className="text-[#E9E7EB] dark:text-[#37393b]"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="10"
                />
                <circle
                  className="text-[#4285F4] transition-all duration-1000 ease-out"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="currentColor"
                  strokeDasharray="301.59"
                  strokeDashoffset="165.8"
                  strokeLinecap="round"
                  strokeWidth="10"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="font-heading text-4xl font-bold text-[#202124] dark:text-white">
                  {storageSummary.utilizationPercentage}%
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#80868B]">
                  Used
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="font-heading text-lg font-bold text-[#202124] dark:text-white">
                {storageSummary.usedFormatted}{' '}
                <span className="text-sm font-normal text-[#5F6368] dark:text-[#c4c7c5]">
                  of {storageSummary.totalFormatted}
                </span>
              </p>
              <p className="text-xs text-[#80868B] mt-0.5">
                {storageSummary.availableFormatted} free space remaining
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between text-xs text-[#5F6368] dark:text-[#c4c7c5]">
            <span>Files: {storageSummary.totalFiles}</span>
            <span>Folders: {storageSummary.totalFolders}</span>
          </div>
        </div>

        {/* Right: Category Distribution Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {storageSummary.categories.map((cat) => (
            <div
              key={cat.category}
              className={`p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] shadow-xs flex flex-col justify-between hover:shadow-md transition-all ${
                cat.category === 'other' ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  {getCategoryIcon(cat.category)}
                </div>
                <span className="text-xs font-bold" style={{ color: cat.color }}>
                  {cat.percentage}%
                </span>
              </div>

              <div className="mt-4">
                <h4 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                  {cat.label}
                </h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-heading font-bold text-lg text-[#202124] dark:text-white">
                    {cat.usedFormatted}
                  </span>
                  <span className="text-xs text-[#80868B]">• {cat.fileCount} files</span>
                </div>
                <p className="text-xs text-[#80868B] mt-1">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Cleanup Recommendations Section */}
      <section className="space-y-4">
        <div>
          <h2 className="font-heading font-semibold text-lg text-[#202124] dark:text-white">
            Smart Storage Recommendations
          </h2>
          <p className="text-xs text-[#80868B]">
            Review files that can be cleaned up or archived to preserve quota
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Large Files */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mb-3">
                <AlertCircle size={20} />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                Large Files
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] mt-1">
                Files exceeding 100 MB take up 1.56 GB of your vault.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#282a2c] text-[11px] font-semibold text-[#D93025]">
                <span>1.56 GB recoverable</span>
              </div>
            </div>

            <Link
              href="/dashboard/files"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] text-xs font-semibold text-[#202124] dark:text-white hover:bg-[#E8F0FE] hover:text-[#4285F4] transition-colors flex items-center justify-center gap-1"
            >
              <span>Review Large Files</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 2: Trash Bin */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F1F3F4] text-[#5F6368] flex items-center justify-center mb-3">
                <Trash2 size={20} />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                Trash Bin
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] mt-1">
                Items in trash can be permanently emptied to instantly free space.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#282a2c] text-[11px] font-semibold text-[#5846c8]">
                <span>140.4 MB in trash</span>
              </div>
            </div>

            <Link
              href="/dashboard/trash"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] text-xs font-semibold text-[#202124] dark:text-white hover:bg-[#FCE8E6] hover:text-[#D93025] transition-colors flex items-center justify-center gap-1"
            >
              <span>Empty Trash Bin</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 3: Version History Review */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center mb-3">
                <Clock size={20} />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                Historical Versions
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] mt-1">
                Older snapshot revisions consume storage across multi-version files.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#282a2c] text-[11px] font-semibold text-[#4285F4]">
                <span>28 archived revisions</span>
              </div>
            </div>

            <Link
              href="/dashboard/recent"
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] text-xs font-semibold text-[#202124] dark:text-white hover:bg-[#E8F0FE] hover:text-[#4285F4] transition-colors flex items-center justify-center gap-1"
            >
              <span>Inspect History</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Largest Objects Table */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
              Largest Files in Vault
            </h2>
            <p className="text-xs text-[#80868B]">Top storage consumers across all directories</p>
          </div>
        </div>

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
              {largestFiles.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  isSelected={selectedFileIds.includes(file.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StoragePage;
