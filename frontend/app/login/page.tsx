'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cloud, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('harsh@cloudvault.internal');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#131314] flex flex-col justify-between p-4 sm:p-6 text-[#202124] dark:text-[#e3e3e3]">
      {/* Top Bar */}
      <header className="flex items-center justify-between max-w-6xl w-full mx-auto py-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#4285F4] flex items-center justify-center text-white shadow-sm">
            <Cloud size={20} />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-[#202124] dark:text-white">
            CloudVault
          </span>
        </Link>

        <Link
          href="/signup"
          className="text-xs font-semibold text-[#4285F4] hover:underline"
        >
          Create an Account
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] shadow-xl p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold text-[#202124] dark:text-white">
              Sign In to CloudVault
            </h1>
            <p className="text-xs text-[#80868B] mt-1">
              Enter your credentials to access your secure object storage
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Work Email
              </label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-[#80868B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="text-[11px] text-[#4285F4] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-[#80868B]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#80868B] hover:text-[#202124] dark:hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {forgotSent && (
              <p className="text-[11px] text-[#188038] bg-[#E6F4EA] p-2 rounded-xl">
                Password reset instructions sent to your email (Demo).
              </p>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#4285F4] accent-[#4285F4]"
                />
                <span className="text-[#5F6368] dark:text-[#c4c7c5]">Remember this browser</span>
              </label>
            </div>

            {/* Demo Helper Pill */}
            <div className="p-3 bg-[#E8F0FE] dark:bg-[#004494]/20 rounded-2xl border border-[#4285F4]/30 text-[11px] text-[#4285F4]">
              <span className="font-semibold block mb-0.5">Demo Environment</span>
              Click Sign In to immediately enter the prototype workspace with mock data.
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{loading ? 'Entering CloudVault...' : 'Sign In to Workspace'}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E8EAED] dark:border-[#36373a] text-center text-xs text-[#5F6368] dark:text-[#c4c7c5]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#4285F4] font-semibold hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#80868B] py-2">
        CloudVault • All your files. One secure space.
      </footer>
    </div>
  );
}
