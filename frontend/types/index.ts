export type FileType =
  | 'pdf'
  | 'docx'
  | 'image'
  | 'video'
  | 'archive'
  | 'code'
  | 'audio'
  | 'other';

export interface FileVersion {
  id: string;
  versionNumber: number;
  uploadedAt: string;
  uploadedBy: string;
  sizeBytes: number;
  sizeFormatted: string;
  summary: string;
  downloadUrl?: string;
  isCurrent?: boolean;
}

export interface ShareLink {
  id: string;
  token: string;
  fileId: string;
  fileName: string;
  createdAt: string;
  expiresAt: string; // e.g. "24 hours", "7 days", "30 days", "Never"
  accessType: 'view' | 'download' | 'edit';
  downloadCount: number;
  isRevoked: boolean;
  publicUrl: string;
}

export interface CloudFile {
  id: string;
  name: string;
  extension: string;
  type: FileType;
  sizeBytes: number;
  sizeFormatted: string;
  owner: {
    id: string;
    name: string;
    avatarUrl?: string;
    isCurrentUser?: boolean;
  };
  folderId?: string; // undefined if root
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  isStarred: boolean;
  isShared: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  sharedWith?: Array<{
    id: string;
    name: string;
    email: string;
    role: 'viewer' | 'editor';
    avatarUrl?: string;
  }>;
  shareLink?: ShareLink;
  versions: FileVersion[];
  mimeType: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  tags?: string[];
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  color?: string;
  fileCount: number;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
  };
  isShared?: boolean;
}

export interface UploadItem {
  id: string;
  fileName: string;
  fileSize: number;
  sizeFormatted: string;
  progress: number; // 0 to 100
  status: 'uploading' | 'completed' | 'paused' | 'failed' | 'queued';
  type: FileType;
  errorMessage?: string;
}

export interface StorageCategoryBreakdown {
  category: string;
  label: string;
  usedBytes: number;
  usedFormatted: string;
  percentage: number;
  fileCount: number;
  color: string;
  description: string;
}

export interface StorageSummary {
  totalBytes: number;
  totalFormatted: string; // "15 GB"
  usedBytes: number;
  usedFormatted: string; // "6.8 GB"
  availableBytes: number;
  availableFormatted: string; // "8.2 GB"
  utilizationPercentage: number; // 45.3% -> ~45%
  totalFiles: number;
  totalFolders: number;
  categories: StorageCategoryBreakdown[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  storageQuota: number;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    defaultView: 'grid' | 'list';
    notifyOnShare: boolean;
    notifyOnUpload: boolean;
  };
}
