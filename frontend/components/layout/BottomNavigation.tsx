'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, Plus, Users, HardDrive } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function BottomNavigation() {
  const pathname = usePathname();
  const { setIsUploadModalOpen } = useVault();

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'Files', href: '/dashboard/files', icon: Folder },
    { label: 'Shared', href: '/dashboard/shared', icon: Users },
    { label: 'Storage', href: '/dashboard/storage', icon: HardDrive },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-[#1e1f20]/95 backdrop-blur-md border-t border-[#E8EAED] dark:border-[#36373a] z-40 px-3 flex items-center justify-around pb-safe">
      {/* 2 left items */}
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              isActive
                ? 'text-[#4285F4] dark:text-[#adc6ff] font-semibold'
                : 'text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124]'
            }`}
          >
            <Icon size={20} />
            <span className="text-[11px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}

      {/* Center FAB upload button */}
      <div className="flex flex-col items-center justify-center px-1">
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="w-12 h-12 -mt-5 rounded-full bg-[#4285F4] text-white flex items-center justify-center shadow-lg shadow-[#4285F4]/35 active:scale-95 transition-transform"
          aria-label="Upload files"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* 2 right items */}
      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        const isActive = pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              isActive
                ? 'text-[#4285F4] dark:text-[#adc6ff] font-semibold'
                : 'text-[#5F6368] dark:text-[#c4c7c5] hover:text-[#202124]'
            }`}
          >
            <Icon size={20} />
            <span className="text-[11px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
