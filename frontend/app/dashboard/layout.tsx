'use client';

import React from 'react';
import { VaultProvider } from '@/context/vault-context';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { UploadQueueWidget } from '@/components/upload/UploadQueueWidget';
import { FilePreviewModal } from '@/components/modals/FilePreviewModal';
import { ShareModal } from '@/components/modals/ShareModal';
import { RenameModal } from '@/components/modals/RenameModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { RestoreModal } from '@/components/modals/RestoreModal';
import { NewFolderModal } from '@/components/modals/NewFolderModal';
import { UploadModal } from '@/components/modals/UploadModal';
import { Toast } from '@/components/ui/Toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VaultProvider>
      <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#131314] text-[#202124] dark:text-[#e3e3e3] antialiased flex flex-col transition-colors">
        {/* Fixed Header */}
        <Header />

        {/* Desktop Sidebar & Mobile Drawer */}
        <Sidebar />
        <MobileDrawer />

        {/* Main Content Area */}
        <div className="md:pl-[248px] pt-16 min-h-screen flex flex-col pb-20 md:pb-6">
          <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation />

        {/* Floating Upload Queue & Modals */}
        <UploadQueueWidget />
        <FilePreviewModal />
        <ShareModal />
        <RenameModal />
        <DeleteConfirmModal />
        <RestoreModal />
        <NewFolderModal />
        <UploadModal />
        <Toast />
      </div>
    </VaultProvider>
  );
}
