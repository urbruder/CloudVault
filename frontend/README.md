# CloudVault — Frontend Client

> **Tagline:** All your files. One secure space.  
> **Purpose:** Responsive, modern cloud file-management user interface for a distributed object-storage service. Built from Google Stitch UI designs through the Stitch MCP.

---

## Technology Stack

- **Framework:** Next.js 16.4.0 (App Router, Turbopack)
- **UI Runtime:** React 19.3.0
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 4 with custom design tokens in `@layer base`
- **Iconography:** Lucide React (`lucide-react`)
- **Fonts:** `Inter` (body/UI tabular glyphs) and `Space Grotesk` (headings/telemetry metrics) via `next/font/google`
- **Utility:** `clsx`, `tailwind-merge`

---

## Prerequisites & Installation

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+ or pnpm

### Installation
From the `frontend/` directory:
```bash
npm install
```

### Development Server
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Verification
Run TypeScript strict type checking:
```bash
npx tsc --noEmit
```

### Production Build
Verify static prerendering and bundle production compilation:
```bash
npm run build
```

---

## Route Inventory

| Route | Page Name | Status & Layout |
| :--- | :--- | :--- |
| `/` | Public Landing Page | Hero, 3D cloud illustration, features, interactive dashboard preview |
| `/login` | Sign In | Work email, password show/hide, remember me, forgot password, demo mode |
| `/signup` | Create Account | Name, email, password strength meter, terms checkbox, demo creation |
| `/share/[token]` | Public Shared File | Verified file preview, expiration countdown, integrity checksum, download |
| `/dashboard` | Overview Dashboard | Bento cards, 45% radial gauge, quick access tiles, recent objects |
| `/dashboard/files` | My Files Workspace | Directory breadcrumbs, folder cards, search/filter, list/grid toggle |
| `/dashboard/recent` | Recent Files | Chronological groupings (Today, Yesterday, Earlier This Month) |
| `/dashboard/shared` | Shared with Me | External and collaborator shared documents, author tags, download |
| `/dashboard/shared-by-me` | Shared by Me | Active share links, token expiration dates, copy link, revoke link |
| `/dashboard/starred` | Starred Items | Priority-flagged files, quick unstar, grid/list view |
| `/dashboard/trash` | Trash Bin | Deleted items, 30-day retention warning, restore, empty trash |
| `/dashboard/storage` | Storage Usage & Analytics | 15 GB quota donut gauge, 5 category breakdown, smart cleanup recommendations |
| `/dashboard/settings` | Account Settings | Profile info, theme mode (light/dark/system), default view, password |

---

## Reusable Overlay Components & Dialogs

- **Floating Upload Queue Widget (`UploadQueueWidget`):** Persistent bottom-right panel displaying active simulated uploads with per-file progress bars (e.g. 72%), pause, resume, cancel, and minimize controls.
- **File Preview & Properties Modal (`FilePreviewModal`):** Split-pane inspector matching Stitch screen `5bda6fd490574926a1f354101d4bd58b`. Includes zoomable document viewer, page controls, download/share triggers, and tabs for "Properties" and "Versions".
- **Version History Drawer:** Chronological timeline showing active milestone (v3) with size deltas (+400 KB), author notes, and version restore triggers.
- **Share Modal (`ShareModal`):** Generates expiring public URLs (`/share/[token]`) with 24-hour, 7-day, 30-day, or permanent expiry, and instant link revocation.
- **Rename Modal (`RenameModal`):** Instant client-side renaming with extension protection.
- **Deletion Confirm Modal (`DeleteConfirmModal`):** Clear warnings distinguishing reversible trash movement from permanent deletion.
- **Restore Confirmation Modal (`RestoreModal`):** Promotes earlier snapshot revisions as new version milestones.
- **New Folder Modal (`NewFolderModal`):** Folder creation with customizable color badges.
- **Upload Dropzone (`UploadModal`):** Drag-and-drop file target with client simulation.

---

## Dependencies & Justification

| Dependency | Purpose |
| :--- | :--- |
| `next: 16.4.0` | Primary framework providing App Router, Partial Prerendering, and static optimization. |
| `react: 19.3.0` | React core library. |
| `react-dom: 19.3.0` | React DOM bindings. |
| `lucide-react` | Cohesive outline iconography for file types, actions, storage gauges, and navigation. |
| `clsx` & `tailwind-merge` | Safe conditional class composition and theme token overrides. |
| `tailwindcss: ^4` | High-performance CSS utility system using CSS-first variable design tokens. |

*Note: No backend SDKs (AWS SDK, Prisma, Redis, PostgreSQL, Axios) are included. The frontend operates with clean client mock boundaries.*

---

## Mock Data Architecture & Simulation Boundaries

All data structures are strongly typed under `frontend/types/index.ts` and initialized in `frontend/data/mock-data.ts`. The reactive application state is provided globally through `frontend/context/vault-context.tsx`.

### Storage Quota Values
- **Total Quota:** 15 GB (CloudVault dedicated single-tenant pool)
- **Used:** 6.8 GB (~45% utilization)
- **Available:** 8.2 GB (55% free space)
- **Breakdown:**
  - Documents: 2.8 GB (~640 files)
  - Images & Media: 2.1 GB (~512 files)
  - Videos: 1.2 GB (~42 files)
  - Compressed Archives: 520 MB (~18 files)
  - Other & Config: 180 MB (~216 files)

### Simulated Behaviors
- **Search & Filter:** Instant client-side filtering matching filenames and file extensions.
- **Sorting:** Interactive sorting by Name (A–Z), Date Modified, and File Size.
- **Upload Simulation:** Files added via browse or dropzone tick realistically every 800ms through `queued` → `uploading (10%...100%)` → `completed` and dynamically append to the active workspace.
- **Share Links:** Creates realistic tokenized URLs (`/share/vault-xxx-share`) with simulated expiration and revocation states.
- **Version Restoration:** Rolling back a version creates a new incremented milestone snapshot (v4) preserved in state.
- **Trash & Deletion:** Items moved to trash update both `files` and `trashFiles` lists in real time.

---

## Future Backend Integration Guide

When connecting the real Express / PostgreSQL / S3 backend:
1. Replace `VaultProvider` state updates with TanStack Query (`@tanstack/react-query`) or SWR hooks calling your Express REST endpoints.
2. Replace `simulateUpload` with multipart presigned S3 URL uploads (`POST /api/upload/initiate` -> `PUT <presigned_url>` -> `POST /api/upload/complete`).
3. Replace `createShareLink` with `POST /api/files/:id/share` returning signed JWT download tokens.
4. Replace `initialUser` with session data retrieved from an HTTP-only authentication cookie or OAuth token.
