'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  User as UserIcon,
  Settings,
  LogOut,
  X,
  Cloud,
  ShieldCheck,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function Header() {
  const router = useRouter();
  const { user, searchQuery, setSearchQuery, setIsMobileDrawerOpen, showToast } = useVault();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    showToast(isDark ? 'Switched to Light mode' : 'Switched to Dark mode', 'info');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-[#1e1f20]/90 backdrop-blur-md z-40 border-b border-[#E8EAED] dark:border-[#36373a] transition-colors">
      <div className="h-16 w-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3 w-auto md:w-[240px] shrink-0">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden p-2 rounded-lg text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#4285F4] flex items-center justify-center text-white shadow-sm shadow-[#4285F4]/30 group-hover:scale-105 transition-transform">
              <Cloud size={20} className="fill-white/20 stroke-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-semibold tracking-tight text-[#202124] dark:text-white leading-tight">
                CloudVault
              </span>
              <span className="hidden sm:inline text-[10px] uppercase font-semibold text-[#80868B] tracking-wider leading-none">
                Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-[#F1F3F4] dark:bg-[#282a2c] rounded-full px-4 h-11 transition-all focus-within:bg-white dark:focus-within:bg-[#1e1f20] focus-within:ring-2 focus-within:ring-[#4285F4] focus-within:shadow-md">
            <Search size={18} className="text-[#80868B] shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files, folders, and tags in CloudVault..."
              className="w-full bg-transparent border-0 outline-none text-sm text-[#202124] dark:text-white placeholder:text-[#80868B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[#80868B] hover:text-[#202124] dark:hover:text-white hover:bg-black/5 mr-1"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#DADCE0] dark:border-[#444746] text-[#80868B]">
              <SlidersHorizontal size={14} className="hover:text-[#4285F4] cursor-pointer" />
              <kbd className="text-[11px] font-mono bg-[#E8EAED] dark:bg-[#37393b] text-[#5F6368] dark:text-[#c4c7c5] px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Quick Controls & Profile */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Help Info */}
          <button
            onClick={() =>
              showToast(
                'CloudVault Prototype: All data is stored locally in client state.',
                'info'
              )
            }
            className="hidden sm:flex p-2 rounded-full text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
            title="Prototype Information"
            aria-label="Help & Information"
          >
            <HelpCircle size={19} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4285F4]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e1f20] rounded-2xl shadow-xl border border-[#DADCE0] dark:border-[#444746] p-3 text-sm z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8EAED] dark:border-[#36373a]">
                  <span className="font-semibold text-[#202124] dark:text-white">Notifications</span>
                  <span className="text-xs text-[#4285F4] font-medium cursor-pointer">Mark all read</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] hover:bg-[#E8F0FE] dark:hover:bg-[#37393b] transition-colors">
                    <p className="text-xs font-medium text-[#202124] dark:text-white">
                      Elena Rostova shared a file with you
                    </p>
                    <p className="text-[11px] text-[#80868B] mt-0.5">Keynote_Presentation.mp4 • 2h ago</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8FAFD] dark:bg-[#282a2c] hover:bg-[#E8F0FE] dark:hover:bg-[#37393b] transition-colors">
                    <p className="text-xs font-medium text-[#202124] dark:text-white">
                      Storage Quota Alert
                    </p>
                    <p className="text-[11px] text-[#80868B] mt-0.5">Currently using 6.8 GB of 15 GB (45%)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-[#5F6368] dark:text-[#c4c7c5] hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
          </button>

          {/* User Profile Pill & Dropdown */}
          <div className="relative pl-1.5" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors group"
              aria-label="User account menu"
            >
              <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                {user.name.charAt(0)}
              </div>
              <span className="hidden lg:inline text-xs font-medium text-[#202124] dark:text-white">
                {user.name}
              </span>
              <ChevronDown size={14} className="text-[#80868B] group-hover:text-[#202124] dark:group-hover:text-white" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1e1f20] rounded-2xl shadow-xl border border-[#DADCE0] dark:border-[#444746] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3 border-b border-[#E8EAED] dark:border-[#36373a]">
                  <div className="font-semibold text-sm text-[#202124] dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-[#80868B] truncate">{user.email}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] text-[11px] font-medium">
                    <ShieldCheck size={12} />
                    <span>{user.role}</span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
                  >
                    <Settings size={15} className="text-[#80868B]" />
                    <span>Account Settings</span>
                  </Link>
                  <Link
                    href="/dashboard/storage"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#202124] dark:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#282a2c] transition-colors"
                  >
                    <Cloud size={15} className="text-[#80868B]" />
                    <span>Storage Usage (45%)</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-[#E8EAED] dark:border-[#36373a]">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      showToast('Signed out of demo session', 'info');
                      router.push('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#D93025] hover:bg-[#FCE8E6] dark:hover:bg-[#93000a]/20 transition-colors"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
