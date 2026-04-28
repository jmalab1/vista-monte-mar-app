# Business-Oriented Auth Pages (Untitled UI-Inspired) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all auth-related pages into a business-oriented experience, aligned with Untitled UI React dashboard/authentication patterns, while preserving existing auth behavior and API contracts.

**Architecture:** Keep existing React Router + AuthContext flows and backend endpoints (`/api/login`, `/api/verify-token`) unchanged. Replace presentation layer with a reusable auth layout system inspired by Untitled UI dashboard/auth page structure (split layout, polished form card, business copy, trust/status panel).

**Tech Stack:** React 18 + TypeScript, Tailwind CSS, existing app components/context, Untitled UI React component patterns (manually adapted to current stack).

---

## Scope + Assumptions

- Current auth route in app: `/login`.
- Current auth UX surfaces:
  - Login page (`src/pages/Login/index.tsx`)
  - Login form component (`src/components/Authentication/index.tsx`)
- "All auth pages" in current codebase means login today, plus extension-ready structure for future `forgot-password` / `reset-password` pages.
- Untitled UI component code may require manual adaptation (their examples are built around React Aria + Tailwind v4; this codebase is Tailwind v3-style utilities and existing local components).

## File Structure And Responsibilities

- Create: `src/layouts/AuthBusinessLayout.tsx`
- Create: `src/components/auth/AuthPanel.tsx`
- Create: `src/components/auth/AuthFormCard.tsx`
- Create: `src/components/auth/AuthField.tsx`
- Create: `src/components/auth/AuthSubmitButton.tsx`
- Modify: `src/components/Authentication/index.tsx`
- Modify: `src/pages/Login/index.tsx`
- Create: `src/pages/ForgotPassword/index.tsx` (placeholder route-ready page)
- Modify: `src/App.tsx` (optional route add if enabled now)
- Modify: `src/context/AuthContext.tsx` (only if needed for cleaner login UX, no API contract changes)
- Modify: `src/index.css` (only for minimal auth-page utility tokens if required)
- Modify: `README.md` (brief auth UI notes)

Design boundaries:
- `AuthBusinessLayout` handles page shell/visual framing only.
- `Authentication` keeps business logic (submit, token handling, toasts).
- New auth UI components stay presentational and reusable.

### Task 1: Capture Untitled UI Pattern Targets And UX Contract

**Files:**
- Create: `docs/auth/auth-ux-contract.md`
- Test: manual acceptance checklist

- [ ] **Step 1: Write the failing test (contract missing)**

```bash
rg -n "Auth UX Contract|Untitled UI" docs/auth/auth-ux-contract.md
```

Expected: no file/match yet.

- [ ] **Step 2: Run test to verify it fails**

Run: `test -f docs/auth/auth-ux-contract.md && echo exists || echo missing`
Expected: `missing`.

- [ ] **Step 3: Write minimal implementation**

```md
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `rg -n "Auth UX Contract|Required Login Behaviors|Future-ready Auth Pages" docs/auth/auth-ux-contract.md`
Expected: matches found.

- [ ] **Step 5: Commit**

```bash
git add docs/auth/auth-ux-contract.md
git commit -m "docs: define business auth UX contract inspired by Untitled UI"
```

### Task 2: Build Reusable Business Auth Layout Components

**Files:**
- Create: `src/layouts/AuthBusinessLayout.tsx`
- Create: `src/components/auth/AuthPanel.tsx`
- Create: `src/components/auth/AuthFormCard.tsx`
- Create: `src/components/auth/AuthField.tsx`
- Create: `src/components/auth/AuthSubmitButton.tsx`

- [ ] **Step 1: Write the failing test (component imports missing)**

```tsx
// src/pages/Login/index.tsx
import AuthBusinessLayout from '../../layouts/AuthBusinessLayout';
```

Expected before implementation: TS module not found.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL with missing module errors.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/layouts/AuthBusinessLayout.tsx
import { ReactNode } from 'react';
import AuthPanel from '../components/auth/AuthPanel';
import AuthFormCard from '../components/auth/AuthFormCard';

type Props = {
  title: string;
  subtitle: string;
  panelTitle: string;
  panelBullets: string[];
  children: ReactNode;
};

const AuthBusinessLayout = ({
  title,
  subtitle,
  panelTitle,
  panelBullets,
  children,
}: Props) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <AuthPanel title={panelTitle} bullets={panelBullets} />
        <AuthFormCard title={title} subtitle={subtitle}>
          {children}
        </AuthFormCard>
      </div>
    </div>
  );
};

export default AuthBusinessLayout;
```

```tsx
// src/components/auth/AuthPanel.tsx
type Props = { title: string; bullets: string[] };

const AuthPanel = ({ title, bullets }: Props) => (
  <aside className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Admin Access</p>
    <h2 className="mt-3 text-2xl font-semibold text-slate-900">{title}</h2>
    <ul className="mt-6 space-y-3 text-sm text-slate-600">
      {bullets.map((item) => (
        <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">{item}</li>
      ))}
    </ul>
  </aside>
);

export default AuthPanel;
```

```tsx
// src/components/auth/AuthFormCard.tsx
import { ReactNode } from 'react';

type Props = { title: string; subtitle: string; children: ReactNode };

const AuthFormCard = ({ title, subtitle, children }: Props) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
    <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
    <div className="mt-6">{children}</div>
  </section>
);

export default AuthFormCard;
```

```tsx
// src/components/auth/AuthField.tsx
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

const AuthField = ({ label, id, ...props }: Props) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
    <input
      id={id}
      {...props}
      className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
    />
  </div>
);

export default AuthField;
```

```tsx
// src/components/auth/AuthSubmitButton.tsx
type Props = { loading: boolean; label: string };

const AuthSubmitButton = ({ loading, label }: Props) => (
  <button
    type="submit"
    disabled={loading}
    className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
  >
    {loading ? 'Signing in...' : label}
  </button>
);

export default AuthSubmitButton;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS (new components compile).

- [ ] **Step 5: Commit**

```bash
git add src/layouts/AuthBusinessLayout.tsx src/components/auth
 git commit -m "feat: add reusable business-oriented auth layout components"
```

### Task 3: Refactor Login Page To Business-Oriented Experience

**Files:**
- Modify: `src/components/Authentication/index.tsx`
- Modify: `src/pages/Login/index.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// login test expectation (manual contract)
// - heading contains "Sign in to Admin Console"
// - submit button disabled while loading
// - no full page reload after login
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS compile, but manual UX checks fail vs contract.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/Authentication/index.tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import AuthField from '../auth/AuthField';
import AuthSubmitButton from '../auth/AuthSubmitButton';

const AuthComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(username, password);
      showToast('Login successful.', 'success');
    } catch {
      showToast('Login failed. Please check your credentials and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <AuthField id="username" name="username" label="Username" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <AuthField id="password" name="password" type="password" label="Password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <AuthSubmitButton loading={isSubmitting} label="Sign in" />
    </form>
  );
};

export default AuthComponent;
```

```tsx
// src/pages/Login/index.tsx
import { useNavigate } from 'react-router-dom';
import React from 'react';
import AuthComponent from '../../components/Authentication';
import { useAuth } from '../../context/AuthContext';
import AuthBusinessLayout from '../../layouts/AuthBusinessLayout';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/manage_inventory');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <AuthBusinessLayout
      title="Sign in to Admin Console"
      subtitle="Access operations, checklist workflows, and traffic insights."
      panelTitle="Property Operations Portal"
      panelBullets={[
        'Manage inventory and checklist updates with audit visibility.',
        'Review traffic history and operational activity in one place.',
        'Secure access with token-based session verification.',
      ]}
    >
      <AuthComponent />
    </AuthBusinessLayout>
  );
};

export default Login;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

Run: `npm run dev`
Expected: Login renders business-oriented split layout; successful login redirects to `/manage_inventory` without hard refresh.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Login/index.tsx src/components/Authentication/index.tsx src/layouts/AuthBusinessLayout.tsx src/components/auth
 git commit -m "feat: redesign login into business-oriented auth experience"
```

### Task 4: Add Future-Ready Auth Routes Using Same Layout

**Files:**
- Create: `src/pages/ForgotPassword/index.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the failing test**

```bash
rg -n "forgot-password" src/App.tsx src/pages/ForgotPassword/index.tsx
```

Expected: no route/page yet.

- [ ] **Step 2: Run test to verify it fails**

Run: `test -f src/pages/ForgotPassword/index.tsx && echo exists || echo missing`
Expected: `missing`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/pages/ForgotPassword/index.tsx
import AuthBusinessLayout from '../../layouts/AuthBusinessLayout';

const ForgotPassword = () => {
  return (
    <AuthBusinessLayout
      title="Reset access"
      subtitle="Enter your account email and we will send reset instructions."
      panelTitle="Credential Recovery"
      panelBullets={[
        'Recovery links are time-limited for security.',
        'Use your authorized operations account email.',
      ]}
    >
      <p className="text-sm text-slate-600">Coming soon: forgot-password flow.</p>
    </AuthBusinessLayout>
  );
};

export default ForgotPassword;
```

```tsx
// src/App.tsx
<Route path="/forgot-password" element={<ForgotPassword />} />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `rg -n "forgot-password" src/App.tsx src/pages/ForgotPassword/index.tsx`
Expected: matches found.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/ForgotPassword/index.tsx
 git commit -m "feat: scaffold business-styled forgot-password page route"
```

### Task 5: Polish Content, Accessibility, And Documentation

**Files:**
- Modify: `src/components/Authentication/index.tsx`
- Modify: `README.md`

- [ ] **Step 1: Write the failing test**

```bash
rg -n "aria-|autocomplete|Sign in to Admin Console|Auth" src/components/Authentication/index.tsx README.md
```

Expected: missing some contract text/docs before polish.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: PASS compile, but checklist not fully documented.

- [ ] **Step 3: Write minimal implementation**

```md
## Auth UI

- `/login` uses business-oriented auth layout inspired by Untitled UI dashboard/auth patterns.
- Auth logic remains unchanged (`/api/login`, `/api/verify-token`).
- Reusable auth layout components live under `src/components/auth` and `src/layouts`.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS.

Run: `npm run lint`
Expected: PASS (or record pre-existing lint issues separately).

- [ ] **Step 5: Commit**

```bash
git add src/components/Authentication/index.tsx README.md
 git commit -m "docs: finalize business-oriented auth UX and usage notes"
```

## Rollout Notes

- Deploy frontend after backend already supports current login API (already true).
- Browser hard-refresh recommended once deployed to avoid cached JS on auth route.
- Validate on mobile and desktop, especially split layout collapse behavior.

## Legal/License Note

- If using Untitled UI PRO code directly, confirm team license coverage before copying proprietary snippets.
- If using only open-source/free components and styling inspiration, keep attribution/internal notes per team policy.

## Self-Review Checklist Results

1. Spec coverage:
- Covers converting auth experience to business-oriented style.
- Anchors design direction to Untitled UI dashboard/auth patterns.
- Preserves existing auth contracts and app behavior.

2. Placeholder scan:
- No TODO/TBD placeholders in execution steps.
- Every task includes concrete files and verification commands.

3. Type consistency:
- Auth behavior references remain consistent (`/api/login`, `/api/verify-token`, `isAuthenticated`, `login`).
