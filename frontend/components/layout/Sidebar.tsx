'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Plus,
  Upload,
  FolderPlus,
  Cloud,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function Sidebar() {
  const pathname = usePathname();
  const { storageSummary, setIsUploadModalOpen, setIsNewFolderModalOpen } = useVault();
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
  const newMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (newMenuRef.current && !newMenuRef.current.contains(event.target as Node)) {
        setIsNewMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-[248px] bg-[#F8FAFD] dark:bg-[#131314] z-30 flex-col justify-between border-r border-[#E8EAED] dark:border-[#36373a] px-3 py-4 transition-colors">
      <div className="flex flex-col gap-4">
        {/* "+ New / Upload" Button with Dropdown */}
        <div className="relative" ref={newMenuRef}>
          <button
            onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
            className="w-full flex items-center justify-center gap-2.5 bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-white px-5 py-3 rounded-full shadow-sm hover:shadow-md border border-[#DADCE0] dark:border-[#444746] hover:border-[#4285F4] transition-all group font-medium text-sm active:scale-98"
          >
            <div className="w-5 h-5 rounded-full bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] flex items-center justify-center transition-transform group-hover:rotate-90">
              <Plus size={16} strokeWidth={2.5} />
            </div>
            <span>New / Upload</span>
          </button>

          {isNewMenuOpen && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-[#1e1f20] rounded-2xl shadow-xl border border-[#DADCE0] dark:border-[#444746] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setIsNewMenuOpen(false);
                  setIsUploadModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
              >
                <Upload size={16} className="text-[#4285F4]" />
                <span>Upload Files</span>
              </button>
              <button
                onClick={() => {
                  setIsNewMenuOpen(false);
                  setIsNewFolderModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
              >
                <FolderPlus size={16} className="text-[#5846c8]" />
                <span>New Folder</span>
              </button>
            </div>
          )}
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex flex-col gap-0.5">
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
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-full transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] dark:text-[#adc6ff] font-semibold shadow-xs'
                    : 'text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] hover:text-[#202124] dark:hover:text-white'
                }`}
              >
                <Icon
                  size={19}
                  className={isActive ? 'text-[#4285F4] dark:text-[#adc6ff]' : 'text-[#5F6368] dark:text-[#8e918f]'}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Storage Progress Widget at Bottom */}
      <div className="pt-3">
        <Link
          href="/dashboard/storage"
          className="block bg-white dark:bg-[#1e1f20] p-3.5 rounded-2xl border border-[#DADCE0] dark:border-[#444746] hover:border-[#4285F4] shadow-xs hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#202124] dark:text-white mb-2">
            <span className="flex items-center gap-1.5 text-[#4285F4]">
              <Cloud size={15} />
              <span>Storage</span>
            </span>
            <span className="text-[#5F6368] dark:text-[#c4c7c5]">
              {storageSummary.utilizationPercentage}%
            </span>
          </div>

          <div className="w-full bg-[#E9E7EB] dark:bg-[#37393b] h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-[#4285F4] h-full rounded-full transition-all duration-500"
              style={{ width: `${storageSummary.utilizationPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#5F6368] dark:text-[#c4c7c5]">
            <span>{storageSummary.usedFormatted} of {storageSummary.totalFormatted}</span>
            <span className="text-[#4285F4] font-medium group-hover:underline">Details</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
