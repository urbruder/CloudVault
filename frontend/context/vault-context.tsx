'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CloudFile,
  Folder,
  StorageSummary,
  User,
  UploadItem,
  ShareLink,
  FileVersion,
} from '@/types';
import {
  initialFiles,
  initialFolders,
  initialStorageSummary,
  initialUser,
  initialUploadQueue,
} from '@/data/mock-data';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface VaultContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  storageSummary: StorageSummary;
  files: CloudFile[];
  folders: Folder[];
  trashFiles: CloudFile[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFolderId: string | null;
  setActiveFolderId: (folderId: string | null) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  selectedFileIds: string[];
  toggleSelectFile: (fileId: string) => void;
  selectAllFiles: (fileIds: string[]) => void;
  clearSelection: () => void;
  
  // Actions
  toggleStar: (fileId: string) => void;
  renameFile: (fileId: string, newName: string) => void;
  moveToTrash: (fileId: string) => void;
  restoreFromTrash: (fileId: string) => void;
  permanentDelete: (fileId: string) => void;
  emptyTrash: () => void;
  createShareLink: (fileId: string, expiresAt: string, accessType: 'view' | 'download' | 'edit') => ShareLink;
  revokeShareLink: (fileId: string) => void;
  restoreFileVersion: (fileId: string, versionNumber: number) => void;
  createFolder: (name: string, color?: string) => void;
  
  // Upload queue
  uploadQueue: UploadItem[];
  isUploadQueueOpen: boolean;
  isUploadQueueMinimized: boolean;
  setIsUploadQueueOpen: (open: boolean) => void;
  setIsUploadQueueMinimized: (min: boolean) => void;
  simulateUpload: (fileNames: string[]) => void;
  pauseUpload: (id: string) => void;
  resumeUpload: (id: string) => void;
  cancelUpload: (id: string) => void;
  
  // Dialogs & Modals
  previewFile: CloudFile | null;
  setPreviewFile: (file: CloudFile | null) => void;
  previewTab: 'properties' | 'versions';
  setPreviewTab: (tab: 'properties' | 'versions') => void;
  openPreview: (file: CloudFile, tab?: 'properties' | 'versions') => void;
  
  shareModalFile: CloudFile | null;
  setShareModalFile: (file: CloudFile | null) => void;
  renameModalFile: CloudFile | null;
  setRenameModalFile: (file: CloudFile | null) => void;
  deleteConfirmFile: CloudFile | null;
  setDeleteConfirmFile: (file: CloudFile | null) => void;
  isPermanentDelete: boolean;
  setIsPermanentDelete: (isPerm: boolean) => void;
  
  restoreConfirmVersion: { file: CloudFile; version: FileVersion } | null;
  setRestoreConfirmVersion: (data: { file: CloudFile; version: FileVersion } | null) => void;
  
  isNewFolderModalOpen: boolean;
  setIsNewFolderModalOpen: (open: boolean) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
  mobileActionFile: CloudFile | null;
  setMobileActionFile: (file: CloudFile | null) => void;
  
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [storageSummary, setStorageSummary] = useState<StorageSummary>(initialStorageSummary);
  const [allFiles, setAllFiles] = useState<CloudFile[]>(initialFiles);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  
  // Upload queue
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>(initialUploadQueue);
  const [isUploadQueueOpen, setIsUploadQueueOpen] = useState<boolean>(true);
  const [isUploadQueueMinimized, setIsUploadQueueMinimized] = useState<boolean>(false);
  
  // Modals state
  const [previewFile, setPreviewFile] = useState<CloudFile | null>(null);
  const [previewTab, setPreviewTab] = useState<'properties' | 'versions'>('properties');
  const [shareModalFile, setShareModalFile] = useState<CloudFile | null>(null);
  const [renameModalFile, setRenameModalFile] = useState<CloudFile | null>(null);
  const [deleteConfirmFile, setDeleteConfirmFile] = useState<CloudFile | null>(null);
  const [isPermanentDelete, setIsPermanentDelete] = useState<boolean>(false);
  const [restoreConfirmVersion, setRestoreConfirmVersion] = useState<{ file: CloudFile; version: FileVersion } | null>(null);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [mobileActionFile, setMobileActionFile] = useState<CloudFile | null>(null);
  
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const files = allFiles.filter((f) => !f.isDeleted);
  const trashFiles = allFiles.filter((f) => f.isDeleted);

  const toggleSelectFile = (fileId: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const selectAllFiles = (fileIds: string[]) => {
    setSelectedFileIds((prev) => {
      const allSelected = fileIds.every((id) => prev.includes(id));
      return allSelected ? [] : Array.from(new Set([...prev, ...fileIds]));
    });
  };

  const clearSelection = () => {
    setSelectedFileIds([]);
  };

  const toggleStar = (fileId: string) => {
    setAllFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          const nextStarred = !f.isStarred;
          showToast(
            nextStarred ? `Starred "${f.name}"` : `Removed "${f.name}" from starred`,
            'info'
          );
          return { ...f, isStarred: nextStarred };
        }
        return f;
      })
    );
  };

  const renameFile = (fileId: string, newName: string) => {
    if (!newName.trim()) return;
    setAllFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          const parts = newName.split('.');
          const ext = parts.length > 1 ? parts[parts.length - 1] : f.extension;
          return { ...f, name: newName.trim(), extension: ext };
        }
        return f;
      })
    );
    showToast(`Renamed to "${newName}"`, 'success');
  };

  const moveToTrash = (fileId: string) => {
    setAllFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, isDeleted: true, deletedAt: 'Just now' } : f
      )
    );
    setSelectedFileIds((prev) => prev.filter((id) => id !== fileId));
    showToast('File moved to trash', 'info');
  };

  const restoreFromTrash = (fileId: string) => {
    setAllFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, isDeleted: false, deletedAt: undefined } : f))
    );
    showToast('File restored to workspace', 'success');
  };

  const permanentDelete = (fileId: string) => {
    setAllFiles((prev) => prev.filter((f) => f.id !== fileId));
    showToast('Item permanently deleted', 'info');
  };

  const emptyTrash = () => {
    setAllFiles((prev) => prev.filter((f) => !f.isDeleted));
    showToast('Trash emptied permanently', 'info');
  };

  const createShareLink = (
    fileId: string,
    expiresAt: string,
    accessType: 'view' | 'download' | 'edit'
  ): ShareLink => {
    const file = allFiles.find((f) => f.id === fileId);
    const token = `vault-${Math.random().toString(36).substring(2, 8)}-share`;
    const newLink: ShareLink = {
      id: `sl_${Date.now()}`,
      token,
      fileId,
      fileName: file?.name || 'File',
      createdAt: 'Just now',
      expiresAt,
      accessType,
      downloadCount: 0,
      isRevoked: false,
      publicUrl: `/share/${token}`,
    };

    setAllFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, isShared: true, shareLink: newLink } : f
      )
    );

    showToast('Expiring share link generated', 'success');
    return newLink;
  };

  const revokeShareLink = (fileId: string) => {
    setAllFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              isShared: false,
              shareLink: f.shareLink ? { ...f.shareLink, isRevoked: true } : undefined,
            }
          : f
      )
    );
    showToast('Share link revoked successfully', 'info');
  };

  const restoreFileVersion = (fileId: string, versionNumber: number) => {
    setAllFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          const targetVer = f.versions.find((v) => v.versionNumber === versionNumber);
          if (!targetVer) return f;
          
          const newVersionNum = f.versions.length + 1;
          const restoredVersion: FileVersion = {
            id: `ver_${Date.now()}`,
            versionNumber: newVersionNum,
            uploadedAt: 'Just now',
            uploadedBy: user.name,
            sizeBytes: targetVer.sizeBytes,
            sizeFormatted: targetVer.sizeFormatted,
            summary: `Restored milestone from Version ${versionNumber}.`,
            isCurrent: true,
          };

          const updatedVersions: FileVersion[] = f.versions.map((v) => ({ ...v, isCurrent: false }));
          updatedVersions.unshift(restoredVersion);

          return {
            ...f,
            sizeBytes: targetVer.sizeBytes,
            sizeFormatted: targetVer.sizeFormatted,
            updatedAt: 'Just now',
            versions: updatedVersions,
          };
        }
        return f;
      })
    );

    // If currently previewed, update previewed file
    setPreviewFile((prev) => {
      if (prev && prev.id === fileId) {
        const updated = allFiles.find((f) => f.id === fileId);
        return updated || prev;
      }
      return prev;
    });

    showToast(`Restored Version ${versionNumber} as new revision`, 'success');
  };

  const createFolder = (name: string, color: string = '#4285F4') => {
    const newFld: Folder = {
      id: `fld_${Date.now()}`,
      name,
      color,
      fileCount: 0,
      updatedAt: 'Just now',
      owner: { id: user.id, name: user.name },
      isShared: false,
    };
    setFolders((prev) => [newFld, ...prev]);
    showToast(`Folder "${name}" created`, 'success');
  };

  const simulateUpload = (fileNames: string[]) => {
    setIsUploadQueueOpen(true);
    setIsUploadQueueMinimized(false);

    const newItems: UploadItem[] = fileNames.map((name, i) => {
      const parts = name.split('.');
      const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'other';
      let type: CloudFile['type'] = 'other';
      if (['pdf'].includes(ext)) type = 'pdf';
      else if (['doc', 'docx'].includes(ext)) type = 'docx';
      else if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) type = 'image';
      else if (['mp4', 'mov', 'webm'].includes(ext)) type = 'video';
      else if (['zip', 'tar', 'gz', 'dmg'].includes(ext)) type = 'archive';

      return {
        id: `up_${Date.now()}_${i}`,
        fileName: name,
        fileSize: 4.5 * 1024 * 1024,
        sizeFormatted: '4.5 MB',
        progress: 10,
        status: 'uploading',
        type,
      };
    });

    setUploadQueue((prev) => [...newItems, ...prev]);
    showToast(`Uploading ${fileNames.length} file(s)...`, 'info');

    // Simulate progress ticks
    let progress = 10;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadQueue((prev) =>
          prev.map((item) =>
            newItems.some((n) => n.id === item.id)
              ? { ...item, progress: 100, status: 'completed' }
              : item
          )
        );

        // Add newly uploaded files to mock files list
        const addedFiles: CloudFile[] = newItems.map((item) => ({
          id: `file_${Date.now()}_${item.id}`,
          name: item.fileName,
          extension: item.fileName.split('.').pop() || 'bin',
          type: item.type,
          sizeBytes: item.fileSize,
          sizeFormatted: item.sizeFormatted,
          owner: { id: user.id, name: user.name, isCurrentUser: true },
          folderPath: activeFolderId
            ? `Harsh's Vault / ${folders.find((f) => f.id === activeFolderId)?.name || 'Folder'}`
            : "Harsh's Vault",
          createdAt: 'Just now',
          updatedAt: 'Just now',
          isStarred: false,
          isShared: false,
          isDeleted: false,
          versions: [
            {
              id: `ver_init_${item.id}`,
              versionNumber: 1,
              uploadedAt: 'Just now',
              uploadedBy: user.name,
              sizeBytes: item.fileSize,
              sizeFormatted: item.sizeFormatted,
              summary: 'Initial upload via web interface.',
              isCurrent: true,
            },
          ],
          mimeType: 'application/octet-stream',
          description: 'Uploaded through CloudVault browser upload queue.',
        }));

        setAllFiles((prev) => [...addedFiles, ...prev]);
        showToast('Files uploaded successfully', 'success');
      } else {
        setUploadQueue((prev) =>
          prev.map((item) =>
            newItems.some((n) => n.id === item.id)
              ? { ...item, progress }
              : item
          )
        );
      }
    }, 800);
  };

  const pauseUpload = (id: string) => {
    setUploadQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'paused' } : item
      )
    );
  };

  const resumeUpload = (id: string) => {
    setUploadQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'uploading' } : item
      )
    );
  };

  const cancelUpload = (id: string) => {
    setUploadQueue((prev) => prev.filter((item) => item.id !== id));
    showToast('Upload canceled', 'info');
  };

  const openPreview = (file: CloudFile, tab: 'properties' | 'versions' = 'properties') => {
    setPreviewFile(file);
    setPreviewTab(tab);
  };

  return (
    <VaultContext.Provider
      value={{
        user,
        setUser,
        storageSummary,
        files,
        folders,
        trashFiles,
        searchQuery,
        setSearchQuery,
        activeFolderId,
        setActiveFolderId,
        viewMode,
        setViewMode,
        selectedFileIds,
        toggleSelectFile,
        selectAllFiles,
        clearSelection,
        toggleStar,
        renameFile,
        moveToTrash,
        restoreFromTrash,
        permanentDelete,
        emptyTrash,
        createShareLink,
        revokeShareLink,
        restoreFileVersion,
        createFolder,
        uploadQueue,
        isUploadQueueOpen,
        isUploadQueueMinimized,
        setIsUploadQueueOpen,
        setIsUploadQueueMinimized,
        simulateUpload,
        pauseUpload,
        resumeUpload,
        cancelUpload,
        previewFile,
        setPreviewFile,
        previewTab,
        setPreviewTab,
        openPreview,
        shareModalFile,
        setShareModalFile,
        renameModalFile,
        setRenameModalFile,
        deleteConfirmFile,
        setDeleteConfirmFile,
        isPermanentDelete,
        setIsPermanentDelete,
        restoreConfirmVersion,
        setRestoreConfirmVersion,
        isNewFolderModalOpen,
        setIsNewFolderModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        mobileActionFile,
        setMobileActionFile,
        toast,
        showToast,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
}
