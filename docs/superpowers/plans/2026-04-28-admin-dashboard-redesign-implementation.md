# Admin Dashboard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all authenticated pages into one cohesive business-oriented dashboard shell while keeping all existing auth/data behaviors unchanged.

**Architecture:** Introduce shared admin layout components (`sidebar`, `topbar`, `surface cards`, `status pills`) and migrate each authenticated page (`manage_inventory`, `manage_checklist`, `inventory`, `checklist`, `history`) onto the same structure with minimal logic edits.

**Tech Stack:** React 18 + TypeScript, Tailwind CSS, existing page logic/components, TanStack Table (already added for history).

---

## File Structure

- Create: `src/layouts/AdminDashboardLayout.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/components/admin/AdminTopbar.tsx`
- Create: `src/components/admin/AdminSurfaceCard.tsx`
- Create: `src/components/admin/AdminStatPill.tsx`
- Create: `src/components/admin/adminNavItems.ts`
- Modify: `src/modules/AdminNav/index.tsx` (adapter or deprecate)
- Modify: `src/pages/ManageInventoryList/index.tsx`
- Modify: `src/pages/ManageChecklist/index.tsx`
- Modify: `src/pages/Inventory/index.tsx`
- Modify: `src/pages/Checklist/index.tsx`
- Modify: `src/pages/History/index.tsx`
- Modify: `src/index.css` (only if needed for shared layout polish)
- Modify: `README.md`

### Task 1: Build Shared Admin Shell Components

**Files:**
- Create: `src/components/admin/adminNavItems.ts`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/components/admin/AdminTopbar.tsx`
- Create: `src/components/admin/AdminSurfaceCard.tsx`
- Create: `src/components/admin/AdminStatPill.tsx`
- Create: `src/layouts/AdminDashboardLayout.tsx`

- [ ] **Step 1: Write failing compile check**
```tsx
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
```

- [ ] **Step 2: Verify fail**
Run: `npm run build`
Expected: module not found errors.

- [ ] **Step 3: Implement components**
```tsx
// AdminDashboardLayout.tsx (shape)
// - sidebar + topbar + main content
// - responsive grid
```

```tsx
// adminNavItems.ts
export const adminNavItems = [
  { key: 'manage_inventory', label: 'Manage Inventory', href: '/manage_inventory' },
  { key: 'manage_checklist', label: 'Manage Checklist', href: '/manage_checklist' },
  { key: 'inventory', label: 'Inventory', href: '/inventory' },
  { key: 'checklist', label: 'Checklist', href: '/checklist' },
  { key: 'history', label: 'Traffic History', href: '/history' },
];
```

- [ ] **Step 4: Verify pass**
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**
```bash
git add src/components/admin src/layouts/AdminDashboardLayout.tsx
git commit -m "feat: add shared admin dashboard shell components"
```

### Task 2: Migrate Manage Inventory + Manage Checklist Pages

**Files:**
- Modify: `src/pages/ManageInventoryList/index.tsx`
- Modify: `src/pages/ManageChecklist/index.tsx`

- [ ] **Step 1: Add failing usage (temporary imports to new layout)**

- [ ] **Step 2: Verify fail if needed**
Run: `npm run build`
Expected: type/prop issues before full migration.

- [ ] **Step 3: Implement migration**
- Wrap each page in `AdminDashboardLayout`.
- Replace old `SectionHeader` block with:
  - topbar title/subtitle
  - `AdminStatPill` strip
  - `AdminSurfaceCard` for code editor + actions + errors
- Preserve submit/preview/modal behavior exactly.

- [ ] **Step 4: Verify pass**
Run: `npm run build`
Expected: pass.

- [ ] **Step 5: Commit**
```bash
git add src/pages/ManageInventoryList/index.tsx src/pages/ManageChecklist/index.tsx
git commit -m "refactor: migrate management pages to shared admin dashboard shell"
```

### Task 3: Migrate Inventory + Checklist Operational Pages

**Files:**
- Modify: `src/pages/Inventory/index.tsx`
- Modify: `src/pages/Checklist/index.tsx`

- [ ] **Step 1: Write fail checkpoint**
Run: `npm run build`
Expected: baseline pass before edits.

- [ ] **Step 2: Implement migration**
- Wrap both pages in `AdminDashboardLayout`.
- Move save action to top action slot and keep existing save button behavior.
- Place content grids/sections inside `AdminSurfaceCard` blocks.
- Keep debounce/save logic untouched.

- [ ] **Step 3: Verify pass**
Run: `npm run build`
Expected: pass.

- [ ] **Step 4: Verify auth-protected render still works**
Run: `npm run dev`
Expected: login required and pages load when authenticated.

- [ ] **Step 5: Commit**
```bash
git add src/pages/Inventory/index.tsx src/pages/Checklist/index.tsx
git commit -m "refactor: migrate operational pages to shared admin dashboard shell"
```

### Task 4: Migrate Traffic History Page To Shared Shell

**Files:**
- Modify: `src/pages/History/index.tsx`

- [ ] **Step 1: Fail checkpoint**
Run: `npm run build`
Expected: baseline pass before edits.

- [ ] **Step 2: Implement migration**
- Keep TanStack table pagination logic untouched.
- Replace page wrapper/header with `AdminDashboardLayout`.
- Keep title as “Traffic History”.
- Keep table + pagination styling consistent with new shell cards.

- [ ] **Step 3: Verify pass**
Run: `npm run build`
Expected: pass.

- [ ] **Step 4: Smoke-check pagination**
Run app and verify next/previous/page size continue to work.

- [ ] **Step 5: Commit**
```bash
git add src/pages/History/index.tsx
git commit -m "refactor: align traffic history page with admin dashboard shell"
```

### Task 5: Clean Up Legacy Nav + Docs

**Files:**
- Modify: `src/modules/AdminNav/index.tsx`
- Modify: `README.md`

- [ ] **Step 1: Decide nav compatibility path**
- Either keep `AdminNav` as adapter to new nav config or retire it if fully unused.

- [ ] **Step 2: Implement**
- Remove dead styling code.
- Update README admin/auth sections with new layout architecture.

- [ ] **Step 3: Verify pass**
Run: `npm run build`
Expected: pass.

Run: `npm run lint`
Expected: existing known lint config issue may persist; confirm no new TypeScript/build regressions.

- [ ] **Step 4: Optional deploy check**
Deploy to dev and visually confirm unified shell across all authenticated routes.

- [ ] **Step 5: Commit**
```bash
git add src/modules/AdminNav/index.tsx README.md
git commit -m "chore: finalize admin dashboard redesign cleanup and docs"
```

## Verification Checklist (End-to-End)

- [ ] `npm run build` passes.
- [ ] Authenticated routes all share unified shell:
  - `/manage_inventory`
  - `/manage_checklist`
  - `/inventory`
  - `/checklist`
  - `/history`
- [ ] Login/auth behavior unchanged.
- [ ] Existing API calls/payloads unchanged.
- [ ] Traffic History pagination still works.

## Self-Review

1. Spec coverage:
- Covers all authenticated pages and shared shell.
- Preserves behavior while redesigning structure/style.

2. Placeholder scan:
- No TODO/TBD in task execution steps.

3. Consistency:
- Navigation labels/route keys and shell usage consistent across all pages.
