/**
 * ==============================================================================
 * NEXADHI MASTER THEME & DESIGN SYSTEM CONFIGURATION
 * ==============================================================================
 * 
 * Minimal + Premium + Professional + Spacious + Typography-driven
 * - Primary: Indigo #312E81
 * - Secondary: Violet #7C3AED
 * - Hiring / Growth: Mint #10B981
 * - Logo / Brand Growth: Green #16A34A
 * - Background: Soft White #F8FAFC
 * - Surface: White #FFFFFF
 * - Headings: Sora (700-800 weight)
 * - Body: Plus Jakarta Sans
 * ==============================================================================
 */

export const themeConfig = {
  // ----------------------------------------------------------------------------
  // 1. TYPOGRAPHY & FONTS
  // ----------------------------------------------------------------------------
  fonts: {
    // Primary headline font family (h1, h2, hero title, section headings)
    heading: "var(--font-sora), 'Sora', sans-serif",

    // Main body copy font family (paragraphs, descriptions, inputs, buttons)
    body: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",

    // Code & telemetry font family (IDE sandboxes, timestamps, telemetry badges)
    mono: "var(--font-mono), 'JetBrains Mono', 'Fira Code', monospace",
  },

  // ----------------------------------------------------------------------------
  // 2. FONT COLORS
  // ----------------------------------------------------------------------------
  fontColors: {
    // Dark high-contrast color for main titles, h1, h2, h3, and card titles
    heading: "#312E81", // Indigo

    // Standard high-readability color for body copy, paragraphs, and list items
    body: "#334155", // Slate-700

    // Secondary subtext color for subtitles, card descriptions, and secondary info
    subtle: "#64748B", // Slate-500

    // Muted color for small metadata, timestamps, input placeholders, and inactive states
    muted: "#94A3B8", // Slate-400

    // Interactive hyperlinks, active tab text, and primary text highlights
    link: "#312E81", // Indigo
    linkHover: "#1E1B4B", // Indigo-950

    // Pre-launch banner and pill text color
    pillText: "#312E81", // Indigo

    // Hero headline text gradient
    heroGradientStart: "#312E81",
    heroGradientMid: "#4338CA",
    heroGradientEnd: "#312E81",
  },

  // ----------------------------------------------------------------------------
  // 3. THEME PALETTE & SURFACES
  // ----------------------------------------------------------------------------
  themeColors: {
    // Primary Brand Color (Indigo)
    primary: "#312E81",
    primaryHover: "#1E1B4B",
    primaryLight: "#EEF2FF",

    // Secondary Brand Color (Violet)
    secondary: "#7C3AED",
    secondaryLight: "#F5F3FF",

    // Accent Highlights (Violet)
    accent: "#7C3AED",
    accentHover: "#6D28D9",
    accentLight: "#F5F3FF",

    // Hiring / Growth (Mint)
    growth: "#10B981",
    growthLight: "#ECFDF5",

    // Brand Growth / Logo (Green)
    brandGreen: "#16A34A",
    brandGreenLight: "#F0FDF4",

    // Page Background Surfaces (Soft White Foundation)
    background: "#F8FAFC",
    backgroundSubtle: "#F1F5F9",

    // Card and Dialog Surfaces
    cardBg: "#FFFFFF",
    cardBorder: "#E2E8F0",
    cardBorderHover: "#CBD5E1",

    // Form Inputs & Selects
    inputBg: "#FFFFFF",
    inputBorder: "#E2E8F0",
    inputFocusRing: "#312E81",

    // Status Colors
    success: "#10B981",
    successLight: "#ECFDF5",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    danger: "#EF4444",
  },

  // ----------------------------------------------------------------------------
  // 4. HERO SECTION ANIMATION & CREATIVE GRID CONFIGURATION
  // ----------------------------------------------------------------------------
  heroAnimation: {
    // Coordinate Grid Dimensions & Colors
    gridSize: 44, // 44px square cells
    majorGridMultiple: 4, // Major grid line every 4 cells (176px)
    gridLineColor: "rgba(49, 46, 129, 0.05)", // Ultra-subtle indigo grid lines
    gridMajorLineColor: "rgba(49, 46, 129, 0.09)", // Subtle major axes
    gridCrossColor: "rgba(49, 46, 129, 0.18)", // Precision '+' crosshairs at intersections
    gridDotColor: "rgba(49, 46, 129, 0.25)",
    gridDotSize: 1.5,

    // Interactive Mouse Spotlight
    spotlightColor: "rgba(124, 58, 237, 0.06)",
    spotlightRadius: 320,

    // Sweeping Radar / Talent Scan Beam
    radarBeamColor: "rgba(124, 58, 237, 0.12)",
    radarBeamDuration: 12,

    // Ambient Luminous Glow Orbs
    glowOrbTopCenter: "rgba(124, 58, 237, 0.10)", // Violet warmth
    glowOrbTopRight: "rgba(49, 46, 129, 0.06)",  // Indigo
    glowOrbTopLeft: "rgba(16, 185, 129, 0.06)",   // Mint
    glowOrbWarmAccent: "rgba(124, 58, 237, 0.14)",
  },
} as const;

export type ThemeConfig = typeof themeConfig;

/**
 * Helper function that generates the CSS Variables string from themeConfig
 * so that layout.tsx can inject it dynamically into the document root.
 */
export function getThemeCssVariables(): string {
  return `
    :root {
      --theme-font-heading: ${themeConfig.fonts.heading};
      --theme-font-body: ${themeConfig.fonts.body};
      --theme-font-mono: ${themeConfig.fonts.mono};

      --theme-color-heading: ${themeConfig.fontColors.heading};
      --theme-color-body: ${themeConfig.fontColors.body};
      --theme-color-subtle: ${themeConfig.fontColors.subtle};
      --theme-color-muted: ${themeConfig.fontColors.muted};
      --theme-color-link: ${themeConfig.fontColors.link};
      --theme-color-link-hover: ${themeConfig.fontColors.linkHover};
      --theme-color-pill-text: ${themeConfig.fontColors.pillText};

      --theme-gradient-start: ${themeConfig.fontColors.heroGradientStart};
      --theme-gradient-mid: ${themeConfig.fontColors.heroGradientMid};
      --theme-gradient-end: ${themeConfig.fontColors.heroGradientEnd};

      --theme-primary: ${themeConfig.themeColors.primary};
      --theme-primary-hover: ${themeConfig.themeColors.primaryHover};
      --theme-primary-light: ${themeConfig.themeColors.primaryLight};

      --theme-secondary: ${themeConfig.themeColors.secondary};
      --theme-secondary-light: ${themeConfig.themeColors.secondaryLight};

      --theme-accent: ${themeConfig.themeColors.accent};
      --theme-accent-hover: ${themeConfig.themeColors.accentHover};
      --theme-accent-light: ${themeConfig.themeColors.accentLight};

      --theme-growth: ${themeConfig.themeColors.growth};
      --theme-growth-light: ${themeConfig.themeColors.growthLight};

      --theme-brand-green: ${themeConfig.themeColors.brandGreen};
      --theme-brand-green-light: ${themeConfig.themeColors.brandGreenLight};

      --theme-bg: ${themeConfig.themeColors.background};
      --theme-bg-subtle: ${themeConfig.themeColors.backgroundSubtle};

      --theme-card-bg: ${themeConfig.themeColors.cardBg};
      --theme-card-border: ${themeConfig.themeColors.cardBorder};
      --theme-card-border-hover: ${themeConfig.themeColors.cardBorderHover};

      --theme-input-border: ${themeConfig.themeColors.inputBorder};
      --theme-ring: ${themeConfig.themeColors.inputFocusRing};

      --theme-grid-line: ${themeConfig.heroAnimation.gridLineColor};
      --theme-grid-dot: ${themeConfig.heroAnimation.gridDotColor};
      --theme-radar-beam: ${themeConfig.heroAnimation.radarBeamColor};
    }
  `;
}
