# Auth UX Contract

## Visual Direction
- Business-oriented, dashboard-adjacent, confidence-building tone.
- Split layout: left content panel (value/assurance), right auth form card.
- Neutral, professional palette (slate/stone + brand accent), no playful styling.

## Required Login Behaviors
- Keep POST /api/login contract unchanged.
- Keep token persistence behavior unchanged.
- Keep toast messaging semantics unchanged.
- Keep redirect behavior unchanged when already authenticated.

## Form UX Requirements
- Clear heading/subheading and concise supporting copy.
- Visible validation states for required fields.
- Disabled submit + loading state during submit.
- Error feedback remains user-friendly and specific.

## Future-ready Auth Pages
- Layout must be reusable for:
  - Forgot password
  - Reset password
  - Success/confirmation states
