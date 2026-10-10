'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Folder,
  Clock,
  Users,
  Share2,
  Star,
  Trash2,
  HardDrive,
  Settings,
  X,
  Cloud,
  LogOut,
  Upload,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function MobileDrawer() {
  const pathname = usePathname();
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    storageSummary,
    user,
    setIsUploadModalOpen,
  } = useVault();

  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [pathname, setIsMobileDrawerOpen]);

  if (!isMobileDrawerOpen) return null;

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Home },
    { label: 'My Files', href: '/dashboard/files', icon: Folder },
    { label: 'Recent', href: '/dashboard/recent', icon: Clock },
    { label: 'Shared with Me', href: '/dashboard/shared', icon: Users },
    { label: 'Shared by Me', href: '/dashboard/shared-by-me', icon: Share2 },
    { label: 'Starred', href: '/dashboard/starred', icon: Star },
    { label: 'Trash', href: '/dashboard/trash', icon: Trash2 },
    { label: 'Storage', href: '/dashboard/storage', icon: HardDrive },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white dark:bg-[#1e1f20] shadow-2xl flex flex-col justify-between p-4 z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-3 border-b border-[#E8EAED] dark:border-[#36373a]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#4285F4] flex items-center justify-center text-white">
                <Cloud size={18} />
              </div>
              <span className="font-heading font-semibold text-lg text-[#202124] dark:text-white">
                CloudVault
              </span>
            </div>
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="p-1.5 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Upload CTA */}
          <button
            onClick={() => {
              setIsMobileDrawerOpen(false);
              setIsUploadModalOpen(true);
            }}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-[#4285F4] text-white py-2.5 px-4 rounded-xl font-medium text-sm shadow-sm active:scale-98"
          >
            <Upload size={16} />
            <span>Upload Files</span>
          </button>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] font-semibold'
                      : 'text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Storage and User Profile */}
        <div className="pt-3 border-t border-[#E8EAED] dark:border-[#36373a] space-y-3">
          <div className="bg-[#F8FAFD] dark:bg-[#282a2c] p-3 rounded-xl border border-[#DADCE0] dark:border-[#444746]">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-[#202124] dark:text-white">CloudVault Quota</span>
              <span className="text-[#4285F4] font-bold">{storageSummary.utilizationPercentage}%</span>
            </div>
            <div className="w-full bg-[#E9E7EB] dark:bg-[#37393b] h-1.5 rounded-full overflow-hidden mb-1.5">
              <div
                className="bg-[#4285F4] h-full rounded-full"
                style={{ width: `${storageSummary.utilizationPercentage}%` }}
              />
            </div>
            <div className="text-[11px] text-[#5F6368] dark:text-[#c4c7c5]">
              {storageSummary.usedFormatted} of {storageSummary.totalFormatted} used
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#202124] dark:text-white">{user.name}</p>
                <p className="text-[11px] text-[#80868B] truncate max-w-[120px]">{user.email}</p>
              </div>
            </div>
            <Link
              href="/login"
              className="p-2 text-[#D93025] hover:bg-[#FCE8E6] rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
