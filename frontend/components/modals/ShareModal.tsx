'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Link2, ShieldAlert, Clock, AlertTriangle } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function ShareModal() {
  const { shareModalFile, setShareModalFile, createShareLink, revokeShareLink, showToast } =
    useVault();

  const [expiresAt, setExpiresAt] = useState<string>('7 days');
  const [accessType, setAccessType] = useState<'view' | 'download' | 'edit'>('download');
  const [copied, setCopied] = useState<boolean>(false);
  const [isConfirmingRevoke, setIsConfirmingRevoke] = useState<boolean>(false);

  if (!shareModalFile) return null;

  const currentLink = shareModalFile.shareLink;
  const hasActiveLink = shareModalFile.isShared && currentLink && !currentLink.isRevoked;

  const handleGenerateLink = () => {
    createShareLink(shareModalFile.id, expiresAt, accessType);
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${currentLink?.publicUrl || `/share/demo-${shareModalFile.id}`}`;
    navigator.clipboard?.writeText(fullUrl);
    setCopied(true);
    showToast('Share link copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRevoke = () => {
    revokeShareLink(shareModalFile.id);
    setIsConfirmingRevoke(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] w-full max-w-lg rounded-3xl shadow-2xl border border-[#DADCE0] dark:border-[#444746] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8EAED] dark:border-[#36373a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] flex items-center justify-center">
              <Link2 size={18} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
                Share Link
              </h3>
              <p className="text-xs text-[#80868B] truncate max-w-[260px]">
                {shareModalFile.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShareModalFile(null)}
            className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {hasActiveLink ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-2xl border border-[#DADCE0] dark:border-[#444746] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#188038] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#188038]" />
                    Active Share Link
                  </span>
                  <span className="text-[#80868B] flex items-center gap-1">
                    <Clock size={13} />
                    Expires in {currentLink.expiresAt}
                  </span>
                </div>

                {/* Link Box */}
                <div className="flex items-center gap-2 bg-white dark:bg-[#1e1f20] p-2 pl-3 rounded-xl border border-[#DADCE0] dark:border-[#444746]">
                  <span className="text-xs text-[#5F6368] dark:text-[#c4c7c5] truncate font-mono flex-1">
                    {typeof window !== 'undefined' ? window.location.origin : ''}
                    {currentLink.publicUrl}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4285F4] text-white text-xs font-semibold hover:bg-[#3367D6] transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex justify-between items-center text-[11px] text-[#80868B] pt-1">
                  <span>Permissions: {currentLink.accessType === 'download' ? 'Can view & download' : 'View only'}</span>
                  <span>{currentLink.downloadCount} accesses</span>
                </div>
              </div>

              {/* Revoke confirmation or action */}
              {isConfirmingRevoke ? (
                <div className="p-3.5 bg-[#FCE8E6] rounded-2xl border border-[#D93025]/30 space-y-2.5 animate-in fade-in">
                  <div className="flex items-start gap-2 text-xs text-[#D93025]">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <p>
                      Revoking this link will immediately deactivate public access for anyone holding
                      this URL.
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsConfirmingRevoke(false)}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-[#5F6368] hover:bg-black/5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRevoke}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#D93025] text-white hover:bg-red-700"
                    >
                      Confirm Revocation
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsConfirmingRevoke(true)}
                  className="w-full py-2.5 rounded-xl border border-[#DADCE0] dark:border-[#444746] text-[#D93025] hover:bg-[#FCE8E6] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert size={15} />
                  <span>Revoke Expiring Link</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#5F6368] dark:text-[#c4c7c5]">
                Generate a secure, expiring URL to share this file outside your team workspace.
              </p>

              {/* Expiration Selector */}
              <div>
                <label className="block text-xs font-medium text-[#202124] dark:text-white mb-1.5">
                  Link Expiration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['24 hours', '7 days', '30 days', 'Never'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setExpiresAt(opt)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        expiresAt === opt
                          ? 'bg-[#E8F0FE] dark:bg-[#004494]/30 border-[#4285F4] text-[#4285F4] font-semibold'
                          : 'border-[#DADCE0] dark:border-[#444746] text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F8FAFD]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Access permission */}
              <div>
                <label className="block text-xs font-medium text-[#202124] dark:text-white mb-1.5">
                  Permissions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAccessType('download')}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      accessType === 'download'
                        ? 'bg-[#E8F0FE] dark:bg-[#004494]/30 border-[#4285F4] text-[#4285F4] font-semibold'
                        : 'border-[#DADCE0] dark:border-[#444746] text-[#5F6368] hover:bg-[#F8FAFD]'
                    }`}
                  >
                    <span className="block font-semibold">Can Download</span>
                    <span className="text-[11px] opacity-80">Permits saving local copy</span>
                  </button>
                  <button
                    onClick={() => setAccessType('view')}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      accessType === 'view'
                        ? 'bg-[#E8F0FE] dark:bg-[#004494]/30 border-[#4285F4] text-[#4285F4] font-semibold'
                        : 'border-[#DADCE0] dark:border-[#444746] text-[#5F6368] hover:bg-[#F8FAFD]'
                    }`}
                  >
                    <span className="block font-semibold">View Only</span>
                    <span className="text-[11px] opacity-80">Browser preview only</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleGenerateLink}
                className="w-full mt-2 py-3 rounded-full bg-[#4285F4] text-white text-xs font-semibold hover:bg-[#3367D6] transition-all shadow-md active:scale-98"
              >
                Create Expiring Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
