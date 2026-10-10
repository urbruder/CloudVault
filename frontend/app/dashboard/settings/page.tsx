'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Settings,
  Bell,
  Sun,
  Moon,
  Laptop,
  Lock,
  LogOut,
  Save,
  CheckCircle,
} from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function SettingsPage() {
  const router = useRouter();
  const { user, setUser, showToast } = useVault();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [theme, setTheme] = useState(user.preferences.theme);
  const [defaultView, setDefaultView] = useState(user.preferences.defaultView);
  const [notifyOnShare, setNotifyOnShare] = useState(user.preferences.notifyOnShare);
  const [notifyOnUpload, setNotifyOnUpload] = useState(user.preferences.notifyOnUpload);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      preferences: {
        ...prev.preferences,
        theme,
        defaultView,
        notifyOnShare,
        notifyOnUpload,
      },
    }));
    showToast('Preferences saved successfully', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated successfully (Demo)', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#202124] dark:text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-[#5F6368] dark:text-[#c4c7c5] mt-0.5">
          Manage your CloudVault profile, interface appearance, and notifications.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-[#E8EAED] dark:border-[#36373a]">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] text-[#4285F4] flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
              Profile Information
            </h2>
            <p className="text-xs text-[#80868B]">Your personal display details and identity</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-heading text-xl font-bold shadow-sm">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm text-[#202124] dark:text-white">{name}</p>
              <p className="text-xs text-[#80868B]">{user.role}</p>
              <button
                type="button"
                onClick={() => showToast('Avatar change is disabled in demo mode', 'info')}
                className="text-xs text-[#4285F4] hover:underline mt-1 block font-medium"
              >
                Change Avatar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              />
            </div>
          </div>

          {/* Appearance Section */}
          <div className="pt-4 border-t border-[#E8EAED] dark:border-[#36373a] space-y-3">
            <label className="block text-xs font-semibold text-[#202124] dark:text-white">
              Interface Appearance
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Laptop },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setTheme(opt.id as any);
                      if (opt.id === 'dark') document.documentElement.classList.add('dark');
                      else document.documentElement.classList.remove('dark');
                    }}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 text-xs transition-all ${
                      isSelected
                        ? 'border-[#4285F4] bg-[#E8F0FE] dark:bg-[#004494]/30 text-[#4285F4] font-semibold'
                        : 'border-[#DADCE0] dark:border-[#444746] text-[#5F6368] hover:bg-[#F8FAFD]'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Default File View */}
          <div className="pt-4 border-t border-[#E8EAED] dark:border-[#36373a] space-y-3">
            <label className="block text-xs font-semibold text-[#202124] dark:text-white">
              Default File View
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              {['list', 'grid'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDefaultView(mode as any)}
                  className={`py-2 px-3 rounded-xl border text-xs capitalize text-center transition-all ${
                    defaultView === mode
                      ? 'border-[#4285F4] bg-[#E8F0FE] text-[#4285F4] font-semibold'
                      : 'border-[#DADCE0] dark:border-[#444746] text-[#5F6368] hover:bg-[#F8FAFD]'
                  }`}
                >
                  {mode} View
                </button>
              ))}
            </div>
          </div>

          {/* Notification toggles */}
          <div className="pt-4 border-t border-[#E8EAED] dark:border-[#36373a] space-y-3">
            <label className="block text-xs font-semibold text-[#202124] dark:text-white">
              Notifications
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyOnShare}
                  onChange={(e) => setNotifyOnShare(e.target.checked)}
                  className="rounded text-[#4285F4] accent-[#4285F4]"
                />
                <span className="text-[#202124] dark:text-white">
                  Notify me when a file is shared with me
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyOnUpload}
                  onChange={(e) => setNotifyOnUpload(e.target.checked)}
                  className="rounded text-[#4285F4] accent-[#4285F4]"
                />
                <span className="text-[#202124] dark:text-white">
                  Notify me when background uploads finish
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8EAED] dark:border-[#36373a] flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4285F4] text-white hover:bg-[#3367D6] text-xs font-semibold shadow-sm transition-all active:scale-98"
            >
              <Save size={15} />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Box */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-[#E8EAED] dark:border-[#36373a]">
          <div className="w-10 h-10 rounded-2xl bg-[#E4DFFF] text-[#5846c8] flex items-center justify-center">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-base text-[#202124] dark:text-white">
              Security &amp; Password
            </h2>
            <p className="text-xs text-[#80868B]">Update your credentials for vault protection</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newPassword || !confirmPassword}
              className="px-5 py-2.5 rounded-full bg-white dark:bg-[#1e1f20] text-[#202124] dark:text-white border border-[#DADCE0] dark:border-[#444746] hover:bg-[#F8FAFD] text-xs font-semibold transition-all disabled:opacity-40"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Sign Out Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1e1f20] border border-[#DADCE0] dark:border-[#444746] flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-sm text-[#202124] dark:text-white">
            End Session
          </h3>
          <p className="text-xs text-[#80868B]">Sign out of your active browser demo session</p>
        </div>
        <button
          onClick={() => {
            showToast('Signed out of session', 'info');
            router.push('/login');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#D93025] hover:bg-[#FCE8E6] transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
