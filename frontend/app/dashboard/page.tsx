'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderPlus,
  Upload,
  PieChart,
  CheckCircle2,
  Clock,
  Users,
  Star,
  HardDrive,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileRow } from '@/components/files/FileRow';
import { FileCard } from '@/components/files/FileCard';
import { FileListHeader } from '@/components/files/FileListHeader';

export default function DashboardOverviewPage() {
  const {
    user,
    storageSummary,
    files,
    viewMode,
    selectedFileIds,
    setIsNewFolderModalOpen,
    setIsUploadModalOpen,
    searchQuery,
  } = useVault();

  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');

  // Filter & sort recent files
  const filteredFiles = files
    .filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      return 0; // natural date sort
    });

  const recentFiles = filteredFiles.slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Greeting & Top Command Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
            Good morning, {user.name}
          </h1>
          <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
            Your files, organized and ready when you are.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsNewFolderModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-white border border-[#DADCE0] dark:border-[#444746] hover:bg-[#F8FAFD] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all active:scale-98"
          >
            <FolderPlus size={16} className="text-[#5F6368]" />
            <span>+ New Folder</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4285F4] text-white hover:bg-[#3367D6] text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-98"
          >
            <Upload size={16} />
            <span>+ Upload Files</span>
          </button>
        </div>
      </div>

      {/* Storage Overview & Telemetry Section */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl p-5 sm:p-7 border border-[#DADCE0] dark:border-[#444746] shadow-xs relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#E8F0FE]/40 dark:bg-[#004494]/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E8EAED] dark:border-[#36373a]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] flex items-center justify-center">
              <PieChart size={20} />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
                Storage Overview
              </h2>
              <p className="text-xs text-[#80868B]">
                CloudVault Object Storage Quota • Dedicated Allocation
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] dark:bg-[#188038]/20 text-[#188038] dark:text-[#96f8a1] text-xs font-semibold">
            <CheckCircle2 size={14} />
            <span>Healthy Capacity</span>
          </span>
        </div>

        {/* Gauge & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6">
          {/* Radial Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#F8FAFD] dark:bg-[#282a2c] p-6 rounded-2xl border border-[#E8EAED] dark:border-[#36373a]">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  className="text-[#E9E7EB] dark:text-[#37393b]"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="10"
                />
                {/* 45% circumference of 301.59 is 135.7 -> offset 165.8 */}
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
                <span className="font-heading text-3xl font-bold text-[#202124] dark:text-white">
                  {storageSummary.utilizationPercentage}%
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#80868B]">
                  Quota Used
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                {storageSummary.usedFormatted}
              </span>
              <span className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                {' '}
                of {storageSummary.totalFormatted} Used
              </span>
            </div>
          </div>

          {/* Secondary Telemetry */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#E8EAED] dark:border-[#36373a]">
                <div className="flex items-center gap-1.5 text-xs text-[#5F6368] dark:text-[#c4c7c5] mb-1">
                  <CheckCircle2 size={15} className="text-[#188038]" />
                  <span>Free Space</span>
                </div>
                <div className="font-heading font-semibold text-lg text-[#202124] dark:text-white">
                  {storageSummary.availableFormatted}
                </div>
                <div className="text-[11px] text-[#80868B] mt-0.5">55% available</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#E8EAED] dark:border-[#36373a]">
                <div className="flex items-center gap-1.5 text-xs text-[#5F6368] dark:text-[#c4c7c5] mb-1">
                  <HardDrive size={15} className="text-[#4285F4]" />
                  <span>Total Files</span>
                </div>
                <div className="font-heading font-semibold text-lg text-[#202124] dark:text-white">
                  {storageSummary.totalFiles.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#80868B] mt-0.5">
                  Across {storageSummary.totalFolders} folders
                </div>
              </div>
            </div>

            {/* Active Collaborations */}
            <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E4DFFF] dark:bg-[#5846c8]/30 text-[#5846c8] flex items-center justify-center">
                  <Users size={16} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#202124] dark:text-white">
                    Active Collaborations
                  </div>
                  <div className="text-[11px] text-[#80868B]">
                    Shared across project workspaces
                  </div>
                </div>
              </div>
              <span className="font-heading font-bold text-sm text-[#5846c8] dark:text-[#c7bfff]">
                84 Files
              </span>
            </div>
          </div>
        </div>

        {/* File Type Allocation Segmented Bar */}
        <div className="mt-6 pt-6 border-t border-[#E8EAED] dark:border-[#36373a]/60">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-semibold text-[#202124] dark:text-white">
              File Type Allocation
            </span>
            <span className="text-[11px] text-[#80868B]">
              Storage distribution across categories
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#E9E7EB] dark:bg-[#37393b] overflow-hidden flex cursor-pointer">
            {storageSummary.categories.map((cat) => (
              <div
                key={cat.category}
                style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                title={`${cat.label}: ${cat.usedFormatted} (${cat.percentage}%)`}
                className="h-full hover:brightness-110 transition-all"
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
            {storageSummary.categories.map((cat) => (
              <div
                key={cat.category}
                className="p-2.5 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#E8EAED] dark:border-[#36373a] flex items-center gap-2"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#202124] dark:text-white truncate">
                    {cat.label}
                  </p>
                  <p className="text-[11px] text-[#80868B]">{cat.usedFormatted}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Tiles */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="font-heading font-semibold text-lg text-[#202124] dark:text-white">
            Quick Access
          </h2>
          <span className="text-xs text-[#80868B]">Frequently accessed views</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/recent"
            className="group p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] hover:border-[#4285F4] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Clock size={20} />
              </div>
              <ArrowRight size={16} className="text-[#80868B] group-hover:text-[#4285F4] transition-colors" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-[#202124] dark:text-white block">
                Recent Files
              </span>
              <p className="text-xs text-[#80868B] mt-0.5">24 files accessed this week</p>
            </div>
          </Link>

          <Link
            href="/dashboard/shared"
            className="group p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] hover:border-[#5846c8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#E4DFFF] text-[#5846c8] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users size={20} />
              </div>
              <ArrowRight size={16} className="text-[#80868B] group-hover:text-[#5846c8] transition-colors" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-[#202124] dark:text-white block">
                Shared Files
              </span>
              <p className="text-xs text-[#80868B] mt-0.5">Collaborate with project teams</p>
            </div>
          </Link>

          <Link
            href="/dashboard/starred"
            className="group p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#FEF7E0] text-amber-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Star size={20} className="fill-amber-500" />
              </div>
              <ArrowRight size={16} className="text-[#80868B] group-hover:text-amber-500 transition-colors" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-[#202124] dark:text-white block">
                Starred Items
              </span>
              <p className="text-xs text-[#80868B] mt-0.5">Quickly marked priorities</p>
            </div>
          </Link>

          <Link
            href="/dashboard/storage"
            className="group p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] hover:border-[#188038] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#188038] flex items-center justify-center group-hover:scale-105 transition-transform">
                <HardDrive size={20} />
              </div>
              <ArrowRight size={16} className="text-[#80868B] group-hover:text-[#188038] transition-colors" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-[#202124] dark:text-white block">
                Storage Analytics
              </span>
              <p className="text-xs text-[#80868B] mt-0.5">8.2 GB remaining quota</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Files Table / Grid */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <FileListHeader
          title="Recent Objects"
          totalCount={recentFiles.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allFileIds={recentFiles.map((f) => f.id)}
        />

        {recentFiles.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#80868B]">
            No files match your search query.
          </div>
        ) : viewMode === 'list' ? (
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
                {recentFiles.map((file) => (
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
            {recentFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedFileIds.includes(file.id)}
              />
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-[#E8EAED] dark:border-[#36373a] flex justify-end">
          <Link
            href="/dashboard/files"
            className="text-xs font-semibold text-[#4285F4] hover:underline flex items-center gap-1"
          >
            <span>View All Files</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
