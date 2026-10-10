/** @type {import('tailwindcss').Config} */
// Every colour, radius and shadow points at an Aa NAD token (CSS variable),
// so the light / dark themes come from src/styles/tokens.css, not from Tailwind.
const hue = (name) => ({
  50: `var(--${name}-50)`,
  100: `var(--${name}-100)`,
  200: `var(--${name}-200)`,
  300: `var(--${name}-300)`,
  600: `var(--${name}-600)`,
  800: `var(--${name}-800)`,
})

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      notes: '1100px', // the Notes column appears from here up
      xl: '1280px', // the full sidebar appears from here up
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      bg: 'var(--bg)',
      'bg-subtle': 'var(--bg-subtle)',
      surface: 'var(--surface)',
      raised: 'var(--surface-raised)',
      sunken: 'var(--surface-sunken)',
      hover: 'var(--surface-hover)',
      pressed: 'var(--surface-pressed)',
      inverse: 'var(--surface-inverse)',
      'on-inverse': 'var(--text-inverse)',
      line: 'var(--border)',
      'line-strong': 'var(--border-strong)',
      ink: 'var(--text)',
      muted: 'var(--text-muted)',
      subtle: 'var(--text-subtle)',
      action: 'var(--action)',
      'action-hover': 'var(--action-hover)',
      'on-action': 'var(--on-action)',
      focus: 'var(--focus-ring)',
      overlay: 'var(--overlay)',
      danger: { DEFAULT: 'var(--danger)', solid: 'var(--danger-solid)', bg: 'var(--danger-bg)' },
      warning: { DEFAULT: 'var(--warning)', bg: 'var(--warning-bg)', border: 'var(--warning-border)' },
      success: { DEFAULT: 'var(--success)', bg: 'var(--success-bg)', border: 'var(--success-border)' },
      blue: hue('blue'),
      violet: hue('violet'),
      amber: hue('amber'),
      green: hue('green'),
    },
    fontFamily: {
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
    },
    extend: {
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        enter: 'cubic-bezier(0, 0, 0, 1)',
        exit: 'cubic-bezier(0.3, 0, 1, 1)',
      },
      keyframes: {
        'panel-in': { from: { transform: 'translateX(24px)', opacity: '0' }, to: { transform: 'none', opacity: '1' } },
        'toast-in': { from: { transform: 'translateY(8px)', opacity: '0' }, to: { transform: 'none', opacity: '1' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        flash: { '0%': { boxShadow: '0 0 0 4px var(--amber-300)' }, '100%': { boxShadow: '0 0 0 4px transparent' } },
        'row-flash': { '0%': { backgroundColor: 'var(--amber-100)' }, '100%': { backgroundColor: 'transparent' } },
      },
      animation: {
        'panel-in': 'panel-in 320ms cubic-bezier(0, 0, 0, 1)',
        'toast-in': 'toast-in 200ms cubic-bezier(0, 0, 0, 1)',
        'fade-in': 'fade-in 200ms cubic-bezier(0, 0, 0, 1)',
        flash: 'flash 1600ms cubic-bezier(0.2, 0, 0, 1)',
        'row-flash': 'row-flash 1600ms cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [
    // Sidebar states, driven by data attributes on the app root:
    // pinned = the full sidebar is open in the layout (1280px and up, not collapsed);
    // wide   = the sidebar shows labels (pinned, or opened as an overlay on narrower screens).
    function ({ addVariant }) {
      addVariant('pinned', '@media (min-width: 1280px) { [data-sidebar="open"] & }')
      addVariant('wide', ['@media (min-width: 1280px) { [data-sidebar="open"] & }', '[data-sidebar-overlay="true"] &'])
    },
  ],
}
