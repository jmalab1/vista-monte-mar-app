# Map Location Selector Redesign Design

Date: 2026-04-28
Project: `vista-monte-mar-app`
Scope: Full redesign of map location selector flow and UI

## Goal

Replace current list-plus-map selector with a guided 2-step flow that improves clarity, speed, and consistency across desktop and mobile.

## Success Criteria

- Users can complete selection with minimal confusion in two steps:
  - Step 1: choose category
  - Step 2: choose place
- Route updates automatically after place selection.
- Desktop and mobile follow same interaction model with responsive layout adaptation.
- Keyboard navigation is supported for place selection.
- Failures in route loading are handled without blocking continued browsing.

## Current-State Summary

- `MapAndTable` currently renders mini cards + map side by side.
- Selection state is basic: one active place and coordinates.
- No explicit step model, no sticky summary, and limited guidance.

## Proposed Experience

### Information Architecture

1. Category selection
2. Place selection within selected category
3. Automatic route update on place selection

Persistent summary bar shows:

- Category
- Place
- Route metadata (distance/time when available)
- External action: open in Google Maps

### Layout

Desktop:

- Two-column layout (approx 40/60)
- Left: wizard panel
- Right: map stage

Mobile:

- Single-column stacked layout
- Wizard first, map second
- Sticky compact summary with jump-to-map action

### Visual Direction

Style direction: Coastal utility.

- Soft sand and slate neutrals
- Ocean accent for interactive highlights
- Strong active-state ring for selected card
- Subtle 150-180ms transitions between step states

No major typography system replacement; strengthen hierarchy with weight, spacing, and labeling.

## Component Design

### New Components

### `LocationWizard`

Responsibility:

- Step state orchestration
- Selected category/place state
- Step completion indicators

Inputs:

- Categories
- Places dataset
- Callbacks for selection updates

Outputs:

- Current step
- Selected category
- Selected place

### `CategoryChips`

Responsibility:

- Render category options for step 1
- Visual active/hover/focus states
- Emit category selection event

### `PlaceOptionCard`

Responsibility:

- Render place details for step 2
- Show active state and key metadata
- Keyboard and pointer selection behavior

### `RouteSummaryBar`

Responsibility:

- Persist high-value context while browsing
- Render quick actions and route status

### Updated Components

### `MapAndTable`

New role:

- Main orchestrator for wizard + map integration
- Data filtering by category
- Passes selected destination and callbacks to map

### `MapboxMap`

Enhancements:

- Accept route metadata callback (`onRouteReady`)
- Optional visual legend/chrome toggles
- Preserve and show last valid route on transient errors

## State and Data Flow

1. User selects category in `CategoryChips`.
2. `LocationWizard` updates selected category and computes filtered places.
3. First available place in filtered list becomes default active place.
4. User selects place from `PlaceOptionCard`.
5. `MapAndTable` updates destination coordinates and active place.
6. `MapboxMap` recalculates route and returns route metadata.
7. `RouteSummaryBar` updates with latest known route details.

## Interaction and Accessibility

- Keyboard support in place list:
  - Up/down arrow to move focus
  - Enter/Space to select place
- Visible focus indicators on all interactive controls
- Selected state announced via semantic attributes (`aria-selected`)
- Touch targets sized for mobile usability

## Error Handling

- Route calculation failure:
  - Keep previous valid route visible
  - Show non-blocking toast/status message
  - Keep selector usable for alternate place attempts
- Empty category result:
  - Show clear empty-state message
  - Allow fast category change

## Performance

- Avoid unnecessary rerenders by memoizing filtered place lists.
- Keep map remounts minimal; update route state instead of full map recreation when possible.
- Use lightweight transitions and avoid heavy animation on map updates.

## Testing Plan

Functional:

- Step progression and completion badges
- Category filter correctness
- Place selection updates map and summary
- Auto-route behavior on place change

Responsive:

- Desktop (>=1280)
- Tablet (~768)
- Mobile (~390)

Accessibility:

- Keyboard-only path through step 2 place selection
- Focus visibility and tab order

Failure modes:

- Simulated route failure and recovery path
- Empty category scenario

Regression:

- Existing map rendering and marker behavior
- Existing detail linking/open-map action behavior

## Rollout Plan

1. Implement component scaffolding and orchestration state.
2. Add responsive layout and summary bar.
3. Integrate route metadata callbacks.
4. Add accessibility and keyboard handling.
5. Run manual validation across breakpoints and error states.

## Risks and Mitigations

- Risk: Route plugin API constraints limit metadata availability.
  - Mitigation: degrade gracefully and show partial summary values.
- Risk: Mobile vertical space pressure.
  - Mitigation: collapse non-critical detail and keep map jump action visible.
- Risk: Overly complex transition behavior.
  - Mitigation: keep animation minimal and optional.
