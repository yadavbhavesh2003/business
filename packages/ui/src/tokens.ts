/**
 * UdyamOS UI — Canonical Design Tokens
 * Extracted directly from the 194-screen production prototype.
 */

export const colors = {
  // Client App Canvas & Sidebar
  client: {
    canvas: '#F6F7F5',
    sidebar: '#15181C',
    sidebarCard: '#22262C',
    sidebarActive: '#2B3038',
    primary: '#0F766E', // Emerald Teal
    primaryHover: '#0D655E',
    secondary: '#FFFFFF',
    textMain: '#15181C',
    textMuted: '#64748B',
    border: '#E2E8F0'
  },

  // Platform Admin (Our SaaS Staff)
  platform: {
    sidebar: '#0F172A', // Midnight Slate
    sidebarCard: '#1E293B',
    sidebarActive: '#334155',
    primary: '#6366F1', // Indigo Accent
    primaryHover: '#4F46E5',
    textMain: '#0F172A',
    textMuted: '#64748B'
  },

  // Operational Status Tags & Badges
  status: {
    successBg: '#ECFDF5',
    successText: '#065F46',
    warningBg: '#FFFBEB',
    warningText: '#92400E',
    dangerBg: '#FEF2F2',
    dangerText: '#991B1B',
    infoBg: '#EFF6FF',
    infoText: '#1E40AF',
    neutralBg: '#F1F5F9',
    neutralText: '#334155'
  }
} as const;

export const typography = {
  fontFamily:
    "Inter, 'Noto Sans Gujarati', 'Shruti', system-ui, -apple-system, sans-serif",
  // Minimum line-height for Gujarati text to prevent matra clipping
  gujaratiLineHeight: 1.55,
  tabularNums: {
    fontVariantNumeric: 'tabular-nums' as const
  }
} as const;

