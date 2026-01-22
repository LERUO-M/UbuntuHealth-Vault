# UbuntuHealth Vault - Frontend Design System

## 🎨 Overview

The UbuntuHealth Vault frontend uses a modern design system built with:
- **shadcn/ui** - High-quality, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **HSL Color System** - Dynamic theming with CSS variables

## 🌈 Color System

### Primary Colors

```css
/* Primary (Teal) - Main brand color */
--primary: 173 80% 40%;
--primary-foreground: 0 0% 100%;

/* Secondary (Amber) - Accent color */
--secondary: 43 96% 56%;
--secondary-foreground: 26 83% 14%;

/* Accent (Gold) - Highlights */
--accent: 48 96% 53%;
--accent-foreground: 26 83% 14%;
```

### Semantic Colors

```css
/* Success */
--success: 142 76% 36%;
--success-foreground: 0 0% 100%;

/* Warning */
--warning: 38 92% 50%;
--warning-foreground: 26 83% 14%;

/* Info */
--info: 199 89% 48%;
--info-foreground: 0 0% 100%;

/* Destructive */
--destructive: 0 84% 60%;
--destructive-foreground: 0 0% 100%;
```

### Neutral Colors

```css
--background: 0 0% 100%;
--foreground: 222 47% 11%;
--card: 0 0% 100%;
--card-foreground: 222 47% 11%;
--popover: 0 0% 100%;
--popover-foreground: 222 47% 11%;
--muted: 210 40% 96%;
--muted-foreground: 215 16% 47%;
--border: 214 32% 91%;
--input: 214 32% 91%;
--ring: 173 80% 40%;
```

## 📝 Typography

### Font Families

```css
/* Body Text */
font-family: 'Inter', sans-serif;

/* Headings (use .font-display class) */
font-family: 'Plus Jakarta Sans', sans-serif;

/* Fallback */
font-family: 'Ubuntu', sans-serif;
```

### Font Sizes

- **Hero**: `text-5xl` (48px) to `text-6xl` (60px)
- **H1**: `text-4xl` (36px)
- **H2**: `text-3xl` (30px)
- **H3**: `text-2xl` (24px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

## 🧩 Components

### Button Component

Located at: `src/components/ui/button.jsx`

**Variants:**
- `default` - Primary teal button
- `destructive` - Red for dangerous actions
- `outline` - Bordered button
- `secondary` - Amber accent button
- `ghost` - Transparent button
- `link` - Text link style
- `hero` - Large primary CTA with gradient
- `heroSecondary` - Large secondary CTA
- `portal` - Portal-specific styling
- `success` - Green success button

**Sizes:**
- `sm` - Small (h-9, px-3)
- `default` - Medium (h-10, px-4)
- `lg` - Large (h-11, px-8)
- `xl` - Extra large (h-14, px-10)
- `icon` - Square icon button (h-10, w-10)

**Usage:**
```jsx
import { Button } from "@/components/ui/button"

<Button variant="hero" size="lg">
  Get Started
</Button>
```

### Card Component

Located at: `src/components/ui/card.jsx`

**Sub-components:**
- `Card` - Container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content
- `CardFooter` - Footer section

**Usage:**
```jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

## 🏗️ Page Sections

### HeroSection
**File:** `src/components/HeroSection.jsx`

Modern hero section with:
- Gradient text effects
- Network visualization integration
- Stats display (Active Nodes, Records Secured, Uptime)
- Dual CTAs (Patient Portal & Healthcare Provider)
- Floating info cards (POPIA Compliance, Community Network)
- Decorative background elements

### NetworkVisualization
**File:** `src/components/NetworkVisualization.jsx`

Interactive SVG network visualization showing:
- Active nodes across South African locations
- Animated connections between nodes
- Data flow animations
- Legend and stats overlay
- Locations: Soweto, Alexandra, Sandton, Johannesburg, Pretoria, Cape Town, Durban

### WorkflowSection
**File:** `src/components/WorkflowSection.jsx`

Step-by-step workflow visualization with:
- 4 main steps (Connect, Upload, Control, Access)
- Icon-based visual representation
- Animated transitions on scroll
- Clear, concise descriptions

### PortalsSection
**File:** `src/components/PortalsSection.jsx`

Dual portal cards for:
- **Patient Portal**: Medical history, consent management, record downloads
- **Healthcare Provider Portal**: Access requests, patient data, treatment records
- Feature lists with icons
- Color-coded CTAs (primary for patients, secondary for providers)

### TechStackSection
**File:** `src/components/TechStackSection.jsx`

Technology showcase grid featuring:
- Base L2 blockchain
- Decentralized Identifiers (DIDs)
- IPFS Storage (distributed storage)
- Africa's Talking (USSD/SMS)
- Node.js Relayer (gasless transactions)
- Zero-Knowledge encryption

## 🎭 Animations

### Framer Motion Patterns

**Fade In on Scroll:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Staggered Children:**
```jsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

**Hover Effects:**
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
  Hoverable content
</motion.div>
```

## 🛠️ Utility Functions

### cn() - ClassName Merger
**File:** `src/lib/utils.js`

Combines Tailwind classes without conflicts:

```jsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  "override-classes"
)}>
  Content
</div>
```

## 📐 Layout System

### Container
```jsx
<div className="container px-4 mx-auto max-w-7xl">
  Content
</div>
```

### Grid Layouts
```jsx
/* 2-column responsive */
<div className="grid md:grid-cols-2 gap-8">

/* 3-column responsive */
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

/* 4-column responsive */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

### Spacing
- **Section Padding**: `py-24` (96px vertical)
- **Container Padding**: `px-4` (16px horizontal)
- **Card Padding**: `p-6` or `p-8`
- **Gap**: `gap-6` or `gap-8` for grids

## 🌓 Dark Mode Support

The design system includes CSS variables for dark mode (currently light mode only):

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    /* ... other dark mode variables */
  }
}
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## ✨ Best Practices

1. **Use Design Tokens**: Always use CSS variables instead of hardcoded colors
2. **Consistent Spacing**: Use Tailwind spacing scale (4, 6, 8, 12, 16, 24)
3. **Semantic Colors**: Use semantic color names (success, warning, destructive)
4. **Accessibility**: Maintain proper contrast ratios (4.5:1 for text)
5. **Animation Performance**: Use `transform` and `opacity` for smooth animations
6. **Component Composition**: Build complex UIs from smaller, reusable components
7. **Mobile First**: Design for mobile, then enhance for larger screens

## 🔗 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Radix UI Primitives](https://www.radix-ui.com)

---

**Last Updated:** January 2026

