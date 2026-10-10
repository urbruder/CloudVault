'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cloud,
  ArrowRight,
  ShieldCheck,
  FolderOpen,
  Share2,
  History,
  UploadCloud,
  HardDrive,
  FileText,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#131314] text-[#202124] dark:text-[#e3e3e3] flex flex-col justify-between selection:bg-[#E8F0FE] selection:text-[#4285F4]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1e1f20]/80 backdrop-blur-md border-b border-[#E8EAED] dark:border-[#36373a] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#4285F4] flex items-center justify-center text-white shadow-sm shadow-[#4285F4]/30 group-hover:scale-105 transition-transform">
              <Cloud size={20} className="fill-white/20 stroke-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-[#202124] dark:text-white">
              CloudVault
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5F6368] dark:text-[#c4c7c5]">
            <a href="#features" className="hover:text-[#4285F4] transition-colors">
              Features
            </a>
            <a href="#storage" className="hover:text-[#4285F4] transition-colors">
              Storage Model
            </a>
            <a href="#preview" className="hover:text-[#4285F4] transition-colors">
              Interactive Preview
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124] dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Open Workspace
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle atmospheric gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E8F0FE]/70 dark:bg-[#004494]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] shadow-xs text-xs font-semibold text-[#4285F4] animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
            <span>Dedicated Cloud Object Storage</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#202124] dark:text-white max-w-4xl mx-auto leading-tight">
            All your files.{' '}
            <span className="text-[#4285F4] block sm:inline">One secure space.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5F6368] dark:text-[#c4c7c5] max-w-2xl mx-auto leading-relaxed">
            Fast, responsive cloud file management for teams. Browse folders, manage uploads with
            per-file progress, share with expiring links, and track immutable version history without
            complexity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 group"
            >
              <span>Explore Demo Workspace</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white dark:bg-[#1e1f20] hover:bg-[#F8FAFD] text-[#202124] dark:text-white font-semibold text-sm border border-[#DADCE0] dark:border-[#444746] shadow-xs transition-all text-center"
            >
              Sign In with Demo Account
            </Link>
          </div>

          {/* Interactive Floating Preview Mockup */}
          <div id="preview" className="pt-12 sm:pt-16 max-w-5xl mx-auto">
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#DADCE0] to-[#E8EAED] dark:from-[#444746] dark:to-[#282a2c] shadow-2xl">
              <div className="bg-white dark:bg-[#1e1f20] rounded-[22px] p-4 sm:p-6 text-left overflow-hidden border border-[#DADCE0] dark:border-[#444746]">
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8EAED] dark:border-[#36373a]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D93025]" />
                    <div className="w-3 h-3 rounded-full bg-[#F9AB00]" />
                    <div className="w-3 h-3 rounded-full bg-[#188038]" />
                    <span className="text-xs font-mono text-[#80868B] ml-2">cloudvault.internal</span>
                  </div>
                  <span className="text-xs bg-[#E8F0FE] text-[#4285F4] font-semibold px-2.5 py-0.5 rounded-full">
                    Active Storage: 6.8 GB of 15 GB (45%)
                  </span>
                </div>

                {/* Mock Bento Preview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#4285F4] mb-2">
                      <FolderOpen size={16} />
                      <span>Production Assets</span>
                    </div>
                    <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                      14 objects • Updated 2h ago
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-[#202124] dark:text-white">
                      <FileText size={14} className="text-red-500" />
                      <span className="truncate">Project_Proposal.pdf (v3)</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#5846c8] mb-2">
                      <Share2 size={16} />
                      <span>Expiring Share Links</span>
                    </div>
                    <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                      3 active external links with revocation
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] bg-white dark:bg-[#1e1f20] px-2.5 py-1 rounded-lg border border-[#DADCE0] dark:border-[#444746]">
                      <span className="font-mono text-[#4285F4]">prop-7729-safe</span>
                      <span className="text-[#188038] font-bold">Active</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#188038] mb-2">
                      <UploadCloud size={16} />
                      <span>Background Queue</span>
                    </div>
                    <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                      Per-file progress and pause/cancel
                    </p>
                    <div className="mt-3 w-full bg-[#E9E7EB] dark:bg-[#37393b] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#4285F4] h-full w-[72%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-24 bg-white dark:bg-[#1e1f20] border-y border-[#E8EAED] dark:border-[#36373a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#202124] dark:text-white">
              Built for Everyday File Workflows
            </h2>
            <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5]">
              Clean, ergonomic file interactions designed around clarity, predictability, and control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center">
                <FolderOpen size={24} />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
                Folder Browsing &amp; Grid/List Views
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] leading-relaxed">
                Seamlessly traverse directories with breadcrumb navigation. Switch effortlessly between
                high-density metadata table views and thumbnail card grids.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E4DFFF] text-[#5846c8] flex items-center justify-center">
                <Share2 size={24} />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
                Time-Limited Expiring Links
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] leading-relaxed">
                Generate share links with automatic 24-hour, 7-day, or 30-day expiration. Instantly
                revoke links anytime to immediately terminate outside access.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF7E0] text-amber-500 flex items-center justify-center">
                <History size={24} />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
                Non-Destructive Version History
              </h3>
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5] leading-relaxed">
                Every file update maintains immutable historical snapshots. Inspect delta growth and
                restore earlier revisions as new milestones without losing history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Model Section */}
      <section id="storage" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E8F0FE]/50 dark:bg-[#004494]/15 rounded-3xl p-8 sm:p-12 border border-[#4285F4]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#1e1f20] text-xs font-semibold text-[#4285F4]">
                <HardDrive size={14} />
                <span>Transparent Allocation</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#202124] dark:text-white">
                15 GB Dedicated Quota
              </h2>
              <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] leading-relaxed">
                CloudVault gives every user a clear, unbloated 15 GB storage allocation. Category
                breakdowns group Documents, Images, Videos, Archives, and Config files with smart
                cleanup tips. No hidden upsells or subscription prompts.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/storage"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>View Storage Telemetry</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-80 bg-white dark:bg-[#1e1f20] p-6 rounded-2xl border border-[#DADCE0] dark:border-[#444746] shadow-lg space-y-4 text-center">
              <div className="text-3xl font-heading font-bold text-[#202124] dark:text-white">
                6.8 GB <span className="text-sm font-normal text-[#80868B]">of 15 GB</span>
              </div>
              <div className="w-full bg-[#E9E7EB] dark:bg-[#37393b] h-3 rounded-full overflow-hidden">
                <div className="bg-[#4285F4] h-full w-[45%] rounded-full" />
              </div>
              <p className="text-xs text-[#188038] font-semibold">
                ✓ 8.2 GB free space available (55%)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1e1f20] border-t border-[#E8EAED] dark:border-[#36373a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#80868B]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#4285F4] flex items-center justify-center text-white">
              <Cloud size={14} />
            </div>
            <span className="font-heading font-semibold text-[#202124] dark:text-white">
              CloudVault
            </span>
            <span>— All your files. One secure space.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-[#4285F4]">
              Dashboard
            </Link>
            <Link href="/login" className="hover:text-[#4285F4]">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-[#4285F4]">
              Sign Up
            </Link>
            <Link href="/dashboard/storage" className="hover:text-[#4285F4]">
              Storage
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
