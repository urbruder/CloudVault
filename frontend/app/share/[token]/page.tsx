'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Cloud,
  Download,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
} from 'lucide-react';

function PublicSharedFileContent() {
  const params = useParams();
  const token = (params?.token as string) || '';

  const [downloaded, setDownloaded] = useState(false);
  const [isExpired] = useState(token?.includes('expired'));

  // Realistic mock data for the public shared item
  const sharedItem = {
    fileName: 'Project_Proposal_Technical_Architecture.pdf',
    fileSize: '4.2 MB',
    fileType: 'PDF Document',
    sharedBy: 'Harsh (Engineering Lead)',
    expiresIn: '6 days remaining',
    createdDate: 'Oct 10, 2025',
    checksum: 'sha256:4a8b...19c2',
  };

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#131314] text-[#202124] dark:text-[#e3e3e3] flex flex-col justify-between">
      {/* Top Header */}
      <header className="h-16 px-6 border-b border-[#E8EAED] dark:border-[#36373a] bg-white dark:bg-[#1e1f20] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#4285F4] flex items-center justify-center text-white shadow-sm">
            <Cloud size={18} />
          </div>
          <span className="font-heading font-semibold text-lg text-[#202124] dark:text-white">
            CloudVault
          </span>
        </Link>

        <Link
          href="/login"
          className="text-xs font-semibold text-[#4285F4] hover:underline"
        >
          Sign in to CloudVault
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] shadow-xl p-6 sm:p-8 animate-in fade-in duration-200">
          {isExpired ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto">
                <AlertCircle size={28} />
              </div>
              <h2 className="font-heading text-xl font-bold text-[#202124] dark:text-white">
                This Share Link Has Expired
              </h2>
              <p className="text-xs text-[#80868B] max-w-sm mx-auto">
                The link creator set an expiration policy that has now passed. Request a new link from
                the file owner.
              </p>
              <Link
                href="/"
                className="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#4285F4] text-white text-xs font-semibold hover:bg-[#3367D6]"
              >
                Go to CloudVault Home
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Icon & Badge Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center shadow-xs">
                    <FileText size={26} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#202124] dark:text-white truncate max-w-[280px] sm:max-w-md">
                      {sharedItem.fileName}
                    </h2>
                    <p className="text-xs text-[#80868B]">
                      {sharedItem.fileType} • {sharedItem.fileSize}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] text-[#188038] text-xs font-semibold">
                  <ShieldCheck size={14} />
                  <span>Verified Link</span>
                </span>
              </div>

              {/* Shared Metadata Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] border border-[#DADCE0] dark:border-[#444746] space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#80868B]">Shared by:</span>
                  <span className="font-semibold text-[#202124] dark:text-white">
                    {sharedItem.sharedBy}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#80868B]">Access expiration:</span>
                  <span className="text-[#4285F4] font-medium flex items-center gap-1">
                    <Clock size={13} />
                    <span>{sharedItem.expiresIn}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#80868B]">Integrity check:</span>
                  <span className="font-mono text-[11px] text-[#5F6368] dark:text-[#c4c7c5]">
                    {sharedItem.checksum}
                  </span>
                </div>
              </div>

              {/* Document Mock Preview Snippet */}
              <div className="p-4 rounded-2xl border border-[#E8EAED] dark:border-[#36373a] bg-white dark:bg-[#1e1f20] text-xs text-[#5F6368] space-y-1.5">
                <p className="font-semibold text-[#202124] dark:text-white text-xs uppercase tracking-wider text-[11px]">
                  Document Abstract
                </p>
                <p className="line-clamp-2 italic">
                  “Executive proposal outlining the operational roadmap and modular infrastructure plan
                  for CloudVault multi-tenant storage...”
                </p>
              </div>

              {/* Download CTA */}
              <div className="pt-2">
                <button
                  onClick={handleDownload}
                  className="w-full py-3.5 px-6 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Download size={18} />
                  <span>
                    {downloaded ? 'Downloading Document...' : `Download File (${sharedItem.fileSize})`}
                  </span>
                </button>
                {downloaded && (
                  <p className="text-center text-xs text-[#188038] mt-2 font-medium">
                    ✓ Download initiated securely via CloudVault direct stream.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#80868B] border-t border-[#E8EAED] dark:border-[#36373a]">
        Powered by CloudVault • All your files. One secure space.
      </footer>
    </div>
  );
}

export default function PublicSharedFilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFD] dark:bg-[#131314] text-xs text-[#80868B]">
          Loading shared file...
        </div>
      }
    >
      <PublicSharedFileContent />
    </Suspense>
  );
}
