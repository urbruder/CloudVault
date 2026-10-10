'use client';

import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useVault } from '@/context/vault-context';

export function Toast() {
  const { toast } = useVault();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#202124] text-white shadow-xl text-xs font-medium border border-white/10">
        {toast.type === 'success' && <CheckCircle2 size={16} className="text-[#96f8a1]" />}
        {toast.type === 'info' && <Info size={16} className="text-[#adc6ff]" />}
        {toast.type === 'error' && <AlertCircle size={16} className="text-[#ffdad6]" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
