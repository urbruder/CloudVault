'use client';

import React, { useState } from 'react';
import { Share2, Copy, ShieldAlert, Check, Clock, Eye } from 'lucide-react';
import { useVault } from '@/context/vault-context';
import { FileIcon } from '@/components/files/FileIcon';

export default function SharedByMePage() {
  const { files, revokeShareLink, openPreview, showToast, searchQuery } = useVault();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Files where current user created a share link
  const sharedByMeFiles = files.filter(
    (f) =>
      f.isShared &&
      f.shareLink &&
      !f.shareLink.isRevoked &&
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (fileId: string, publicUrl: string) => {
    const fullUrl = `${window.location.origin}${publicUrl}`;
    navigator.clipboard?.writeText(fullUrl);
    setCopiedId(fileId);
    showToast('Share link copied to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
          Shared by Me
        </h1>
        <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
          Active expiring links and external access tokens generated from your CloudVault files.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
              Active Share Links
            </h2>
            <span className="text-xs font-medium bg-[#F1F3F4] dark:bg-[#282a2c] text-[#5F6368] dark:text-[#c4c7c5] px-2.5 py-0.5 rounded-full">
              {sharedByMeFiles.length} links active
            </span>
          </div>
        </div>

        {sharedByMeFiles.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFD] dark:bg-[#282a2c] flex items-center justify-center mx-auto mb-3 text-[#80868B]">
              <Share2 size={28} />
            </div>
            <p className="text-sm font-semibold text-[#202124] dark:text-white">
              No active share links
            </p>
            <p className="text-xs text-[#80868B] mt-1 max-w-xs mx-auto">
              Select any file in My Files and click Share to generate a secure expiring link.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E8EAED] dark:border-[#36373a] text-[#80868B] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Created</th>
                  <th className="py-3 px-4">Expiration</th>
                  <th className="py-3 px-4 hidden md:table-cell">Access Count</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED] dark:divide-[#36373a]/50">
                {sharedByMeFiles.map((file) => {
                  const link = file.shareLink!;

                  return (
                    <tr
                      key={file.id}
                      className="hover:bg-[#F8FAFD] dark:hover:bg-[#282a2c]/60 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F1F3F4] dark:bg-[#282a2c] flex items-center justify-center shrink-0">
                            <FileIcon type={file.type} size={18} />
                          </div>
                          <div className="min-w-0">
                            <button
                              onClick={() => openPreview(file)}
                              className="font-medium text-[#202124] dark:text-white truncate block hover:text-[#4285F4] text-left"
                            >
                              {file.name}
                            </button>
                            <span className="text-xs text-[#80868B]">{file.sizeFormatted}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#188038] text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" />
                          <span>Active</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-[#5F6368] dark:text-[#c4c7c5] hidden sm:table-cell">
                        {link.createdAt}
                      </td>

                      <td className="py-3.5 px-4 text-xs font-medium text-[#202124] dark:text-white">
                        <div className="flex items-center gap-1 text-[#4285F4]">
                          <Clock size={13} />
                          <span>{link.expiresAt}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-[#5F6368] dark:text-[#c4c7c5] hidden md:table-cell">
                        {link.downloadCount} accesses
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(file.id, link.publicUrl)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8F0FE] text-[#4285F4] hover:bg-[#d8e2ff] transition-colors text-xs font-semibold"
                          >
                            {copiedId === file.id ? <Check size={13} /> : <Copy size={13} />}
                            <span>{copiedId === file.id ? 'Copied' : 'Copy Link'}</span>
                          </button>

                          <button
                            onClick={() => revokeShareLink(file.id)}
                            className="p-1.5 rounded-lg text-[#D93025] hover:bg-[#FCE8E6] transition-colors"
                            title="Revoke Link"
                          >
                            <ShieldAlert size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
