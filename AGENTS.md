# AGENTS.md - Development Guidelines for Estacio

## Project Overview

Estacio is a Next.js 16 POS (Point of Sale) application for a barbershop, built with TypeScript, Tailwind CSS, and shadcn/ui (Base UI). It includes AI agent integration via Mastra for WhatsApp webhooks.

## Build & Development Commands

```bash
# Development server
npm run dev          # Start Next.js dev server on port 3000

# Build
npm run build        # Production build
npm run start        # Start production server

# Linting & Formatting
npm run lint         # Run Biome linter (biome check)
npm run format       # Format code with Biome (biome format --write)
```

**Note:** This project does not currently have a test framework configured. Tests are not run.

### VS Code Extensions Recommended
- Biome (biomejs.biome)
- Tailwind CSS (Tailwind Labs)
- TypeScript (Microsoft)

## Code Style Guidelines

### TypeScript
- Strict mode enabled in tsconfig.json
- Always define return types for functions when not obvious
- Use `type` for object shapes, interfaces for extendable types
- Prefer explicit typing over `any`

```typescript
// Good
interface User {
  id: string;
  name: string;
}

type PaymentMethod = "Efectivo" | "Tarjeta" | "Yape";

// Good - explicit types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Import Organization

Order imports by groups (blank line between groups):
1. External libraries (React, Next.js, etc.)
2. @phosphor-icons/react (icons)
3. @/ path aliases (local modules)
4. Relative imports (./components)

```typescript
import { useState, useMemo } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { RootLayout } from "@/components/root-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockTransactions } from "@/lib/mock";
import "./styles.css";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `CardHeader`)
- **Functions/variables**: camelCase (e.g., `handleSubmit`, `isValid`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for config (e.g., `PAGE_SIZE`, `MAX_RETRIES`)
- **Files**: kebab-case for utilities, PascalCase for components (e.g., `utils.ts`, `Button.tsx`)
- **Interfaces/Types**: PascalCase with descriptive names (e.g., `Transaction`, `ServicioForm`)
- **Spanish naming** is used for business logic (e.g., `mockEmpleados`, `servicioId`)

### Component Structure

Follow this pattern for UI components:

```typescript
"use client";

import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  variant?: "default" | "outline";
}

function Component({ className, variant = "default" }: ComponentProps) {
  return (
    <div className={cn("base-styles", variant === "outline" && "outline-styles", className)}>
      {/* content */}
    </div>
  );
}

export { Component };
```

### React Patterns

- Use `"use client"` directive for client components
- Destructure props with defaults
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to child components
- Prefer functional components with hooks

```typescript
// Good
const [value, setValue] = useState<string>("");

const handleChange = useCallback((newValue: string) => {
  setValue(newValue);
}, []);

const computedValue = useMemo(() => {
  return items.filter(item => item.active).length;
}, [items]);
```

### Error Handling

- Use try/catch for async operations
- Return appropriate HTTP responses in API routes
- Use Zod for runtime validation

```typescript
// API route error handling
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // process request
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### Tailwind CSS

- Use Tailwind for all styling
- Follow the project's color scheme (use semantic tokens like `bg-primary`, `text-muted-foreground`)
- Support dark mode with `dark:` prefix
- Use `cn()` utility for conditional classes

```typescript
<div className={cn(
  "flex items-center gap-2",
  isActive && "bg-primary text-primary-foreground",
  className
)} />
```

### Database & API

- Use Zod schemas for request/response validation
- Use libsql with Mastra for data persistence
- API routes go in `src/app/api/`
- Webhook handlers in `src/app/api/webhooks/`

### Git Conventions

- Use conventional commit messages: `feat:`, `fix:`, `refactor:`, `docs:`
- Create feature branches from `main`
- Run `npm run lint` and `npm run format` before committing

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── webhooks/      # Webhook handlers
│   ├── employees/
│   ├── products/
│   ├── reports/
│   ├── services/
│   └── page.tsx           # Main dashboard
├── components/
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, mock data
└── mastra/                # AI agents, tools, workflows
```

## Key Dependencies

- **Framework**: Next.js 16
- **UI**: @base-ui/react + Tailwind CSS
- **Icons**: @phosphor-icons/react
- **AI**: @mastra/core, @mastra/memory
- **Validation**: Zod v4
- **Linting**: Biome 2.2.0

## Environment Variables

Required variables (check `.env.example` or implementation):
- `WHATSAPP_VERIFY_TOKEN` - WhatsApp webhook verification
- `WHATSAPP_ACCESS_TOKEN` - WhatsApp API access
- `OPENAI_API_KEY` - For AI agents (if using OpenAI)

Never commit secrets to the repository.
