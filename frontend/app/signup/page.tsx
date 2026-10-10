'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cloud, Eye, EyeOff, Lock, Mail, User, ArrowRight, Check } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simple password strength calculator
  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let s = 0;
    if (pass.length >= 8) s += 1;
    if (/[A-Z]/.test(pass)) s += 1;
    if (/[0-9]/.test(pass)) s += 1;
    if (/[^A-Za-z0-9]/.test(pass)) s += 1;
    return s;
  };

  const strength = getStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!acceptedTerms) {
      setError('Please accept terms of service');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#131314] flex flex-col justify-between p-4 sm:p-6 text-[#202124] dark:text-[#e3e3e3]">
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
          href="/login"
          className="text-xs font-semibold text-[#4285F4] hover:underline"
        >
          Sign In Instead
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white dark:bg-[#1e1f20] rounded-3xl border border-[#DADCE0] dark:border-[#444746] shadow-xl p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold text-[#202124] dark:text-white">
              Create Your CloudVault
            </h1>
            <p className="text-xs text-[#80868B] mt-1">
              Start with 15 GB of dedicated object storage
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="p-2.5 text-xs text-[#D93025] bg-[#FCE8E6] rounded-xl font-medium">
                {error}
              </p>
            )}

            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3.5 text-[#80868B]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Harsh Verma"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
              </div>
            </div>

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
                  placeholder="harsh@cloudvault.internal"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-[#80868B]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#80868B] hover:text-[#202124]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1 w-full bg-[#E9E7EB] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength <= 1
                          ? 'w-1/4 bg-[#D93025]'
                          : strength === 2
                          ? 'w-2/4 bg-[#F9AB00]'
                          : strength === 3
                          ? 'w-3/4 bg-[#4285F4]'
                          : 'w-full bg-[#188038]'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-[#80868B]">
                    {strength <= 1
                      ? 'Weak'
                      : strength === 2
                      ? 'Fair'
                      : strength === 3
                      ? 'Good'
                      : 'Strong password'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5F6368] dark:text-[#c4c7c5] mb-1.5">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-[#80868B]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFD] dark:bg-[#282a2c] rounded-xl border border-[#DADCE0] dark:border-[#444746] text-xs text-[#202124] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#4285F4] accent-[#4285F4]"
                />
                <span className="text-[#5F6368] dark:text-[#c4c7c5] leading-snug">
                  I acknowledge CloudVault prototype usage terms and data policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E8EAED] dark:border-[#36373a] text-center text-xs text-[#5F6368] dark:text-[#c4c7c5]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#4285F4] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-[#80868B] py-2">
        CloudVault • All your files. One secure space.
      </footer>
    </div>
  );
}
