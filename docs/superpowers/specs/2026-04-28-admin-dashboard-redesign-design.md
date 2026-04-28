# Admin Dashboard Redesign Design Spec

## Goal
Redesign all authenticated/admin pages into a single business-oriented dashboard experience, using Untitled UI-inspired structure and component patterns, while preserving all existing backend/API behavior.

In scope routes:
- `/manage_inventory`
- `/manage_checklist`
- `/inventory`
- `/checklist`
- `/history`

Out of scope:
- Backend contract changes
- New auth flows beyond existing routes
- Data model changes

---

## Current State
Authenticated pages currently share `AdminNav` and basic `SectionHeader` wrappers, but each page has ad-hoc spacing, card styles, and inconsistent hierarchy. The result is functional but not cohesive as a business dashboard.

Key constraints:
- Existing page logic (fetch/save/debounce/preview) is stable and must stay intact.
- Existing auth gating (`isAuthenticated` + redirect to `/login`) must stay intact.
- Existing API endpoints must remain unchanged.

---

## UX Direction
A cohesive operations-console experience inspired by Untitled UI dashboard patterns:
- Stable shell with left sidebar and top context bar
- Strong information hierarchy: page title, summary metrics, primary actions, content section
- Consistent card language (radius, borders, subdued shadows, neutral enterprise palette)
- Readable dense data surfaces (tables/editors/forms) with predictable spacing

Tone:
- Professional, operational, and trust-building
- Clear copy over decorative language

---

## Information Architecture

### Shared Shell
Create a reusable shell for all authenticated pages:
- Sidebar: product/admin identity + nav links + current page highlight
- Top bar: page title, subtitle, and optional actions
- Main content: responsive content container with section cards

### Page Zones
Each admin page follows the same structure:
1. Context header (title/subtitle)
2. Status strip (record counts / save status / last action hint)
3. Primary workspace (editor/forms/table/cards)
4. Secondary tools (preview modal trigger, pagination, grouped sections)

---

## Component Architecture

### New Layout Components
1. `src/layouts/AdminDashboardLayout.tsx`
- Responsibility: global authenticated shell wrapper.
- Props:
  - `pageKey`
  - `title`
  - `subtitle`
  - `actions?`
  - `children`

2. `src/components/admin/AdminSidebar.tsx`
- Responsibility: branded left nav and active-state links.
- Replaces visual role of current `AdminNav` on desktop.

3. `src/components/admin/AdminTopbar.tsx`
- Responsibility: page heading and optional action slot.

4. `src/components/admin/AdminSurfaceCard.tsx`
- Responsibility: consistent content card container for all page blocks.

5. `src/components/admin/AdminStatPill.tsx`
- Responsibility: compact metric/status chips.

### Existing Components to Reuse
- `CodeEditor`
- `FormCard`
- `Modal`
- `ButtonItem` (or wrapped equivalent for consistent variants)

### Existing Components to Refactor
- `src/modules/AdminNav/index.tsx`
- either:
  - keep as lightweight data map consumed by `AdminSidebar`, or
  - replace with a config export (`adminNavItems`) and remove old UI wrapper.

---

## Page-by-Page Design Mapping

### `/manage_inventory`
Current: editor + submit/preview + modal.
New:
- Header: “Inventory Listing Configuration”
- Status pills: “JSON mode”, “Preview available”, validation/error state
- Main card: code editor in larger surface
- Action bar: primary save, secondary preview
- Error text moved into styled inline alert region

### `/manage_checklist`
Current: editor + submit/preview + grouped modal preview.
New:
- Same structural frame as manage inventory for consistency
- Header: “Checklist Listing Configuration”
- Grouping preview stays, but modal style upgraded to dashboard surface

### `/inventory`
Current: save button + dense grid of cards.
New:
- Header: “Live Inventory Operations”
- Status pills: autosave/debounce state, item section count
- Save action in top action slot and duplicated in workspace footer on mobile
- Grid cards wrapped in surface sections by category where applicable

### `/checklist`
Current: save button + grouped sections.
New:
- Header: “Live Checklist Operations”
- Group headings elevated with section separators and counts
- Standardized card spacing and action placement

### `/history` (already improved)
Current: upgraded table + pagination.
New:
- Move into shared shell for consistency with all other pages
- Keep TanStack pagination and styling, align with new global card/tokens
- Maintain title “Traffic History”

---

## Responsive Behavior
- Desktop (`lg+`): fixed-width sidebar + fluid content panel.
- Tablet: compact sidebar/header spacing; content cards still single-column.
- Mobile: sidebar becomes top nav strip or collapsible menu; actions wrap below title.

No horizontal overflow except intentional table/editor surfaces.

---

## Accessibility
- Ensure semantic headings (`h1` per page).
- Sidebar links remain keyboard accessible with clear focus styles.
- Buttons keep disabled states and visible labels during loading.
- Preserve current form labels and required attributes.

---

## Data and Behavior Compatibility
No behavior changes allowed for:
- Authentication checks and redirects
- API request payloads
- Save/debounce timings
- Toast success/error semantics
- Modal preview content logic

Only visual/structural refactor.

---

## Risks and Mitigations
1. Risk: UI refactor accidentally alters business logic.
- Mitigation: isolate layout/components first, then wrap existing logic pages with minimal logic edits.

2. Risk: inconsistent spacing/theme if pages are partially migrated.
- Mitigation: migrate all five authenticated pages in one implementation pass.

3. Risk: responsive regressions on editor/table pages.
- Mitigation: explicit mobile/tablet QA pass for code editor and history table.

---

## Acceptance Criteria
1. All five authenticated routes render inside a unified dashboard shell.
2. Visual language is consistent across pages (sidebar/topbar/cards/buttons/chips).
3. Existing API interactions behave exactly as before.
4. Traffic History remains paginated and titled “Traffic History”.
5. `npm run build` succeeds.
6. Manual check confirms login -> authenticated pages flow unchanged.

---

## Implementation Boundary
This spec is intentionally design-focused. Next step is a task-level implementation plan covering file-by-file edits, verification commands, and rollout steps.
