import { CURRENT_USER } from '../data/contacts'
import { Avatar } from './ui/Avatar'
import { Icon } from './ui/Icon'

interface NavItem {
  label: string
  icon: string
  count?: string
  badge?: { text: string; tone: 'danger' | 'info' }
  current?: boolean
}

// Mock navigation so the page feels like part of a real GTM workspace.
// Only Contacts is built; the rest are placeholders.
const SECTIONS: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: 'Home', icon: 'home' },
      { label: 'Conversations', icon: 'chatbubbles', badge: { text: '3', tone: 'danger' } },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Contacts', icon: 'people', count: '10', current: true },
      { label: 'Accounts', icon: 'business', count: '24' },
      { label: 'Signals', icon: 'pulse', badge: { text: '5 new', tone: 'info' } },
    ],
  },
  {
    title: 'Outreach',
    items: [
      { label: 'Campaigns', icon: 'megaphone', count: '4' },
      { label: 'Assets', icon: 'images' },
      { label: 'Knowledge', icon: 'library' },
    ],
  },
]

const SAVED_VIEWS = [
  { label: 'My leads', dot: 'bg-blue-600' },
  { label: 'Ready to qualify', dot: 'bg-amber-600' },
  { label: 'Enterprise customers', dot: 'bg-green-600' },
]

interface SidebarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  /** Whether labels are showing (pinned open, or opened over the page on narrower screens). */
  expanded: boolean
  /** Opened over the page (below 1280px) rather than pinned in the layout. */
  overlay: boolean
  onToggle: () => void
}

/** The familiar "panel" glyph (Linear, Notion, macOS): a frame with a left column. */
function SidebarGlyph() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" />
      <path d="M6 3v10" />
    </svg>
  )
}

/**
 * The workspace sidebar has two states, switched by the toggle or the [ key:
 * - Open: full labels. Pinned in the layout from 1280px; below that it opens over the page.
 * - Closed: a 64px icon rail (every item keeps a tooltip and accessible name).
 * Hidden on phones. Placeholder links are real <a> elements but do nothing (href="#").
 */
export function Sidebar({ theme, onToggleTheme, expanded, overlay, onToggle }: SidebarProps) {
  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  const toggleLabel = expanded ? 'Close sidebar' : 'Open sidebar'
  const toggle = (
    <button
      type="button"
      onClick={onToggle}
      aria-label={toggleLabel}
      aria-expanded={expanded}
      aria-controls="workspace-sidebar"
      title={`${toggleLabel}  [`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-hover hover:text-ink"
    >
      <SidebarGlyph />
    </button>
  )
  return (
    <aside
      id="workspace-sidebar"
      aria-label="Workspace"
      className={`flex h-full flex-col items-center gap-4 overflow-hidden border-r border-line bg-bg-subtle py-4 wide:items-stretch wide:px-3 ${
        overlay ? 'absolute inset-y-0 left-0 z-40 w-[232px] animate-fade-in shadow-4' : 'w-full'
      }`}
    >
      {/* Open: logo · name · toggle in a row. Closed: logo above the toggle, in the rail. */}
      <div className="flex flex-col items-center gap-4 wide:h-10 wide:flex-row wide:gap-2 wide:px-2">
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-action text-xs font-extrabold text-on-action"
        >
          S
        </span>
        <span className="hidden flex-1 truncate whitespace-nowrap text-sm font-bold wide:block">Sundial Studio</span>
        {toggle}
      </div>

      <button
        type="button"
        className="hidden h-8 items-center gap-2 rounded-sm border border-line bg-surface px-2 text-sm text-muted hover:bg-hover wide:flex"
        onClick={() => document.getElementById('contact-search')?.focus()}
      >
        <Icon name="search" size={16} />
        <span className="flex-1 text-left">Search</span>
        <kbd className="text-xs text-subtle">/</kbd>
      </button>

      <nav aria-label="Pages" className="flex min-h-0 flex-col gap-4 overflow-y-auto">
        {SECTIONS.map((section, i) => (
          <div key={section.title ?? i} className="flex flex-col gap-0.5">
            {section.title && (
              <div className="hidden px-2 pb-1 text-xs font-bold uppercase tracking-[0.08em] text-muted wide:block">
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-current={item.current ? 'page' : undefined}
                aria-label={item.label}
                title={item.label}
                className={`relative flex h-11 items-center justify-center gap-2 rounded-sm px-2 text-sm text-ink no-underline hover:bg-hover wide:h-8 wide:justify-start ${
                  item.current ? 'bg-pressed font-semibold' : 'font-medium'
                }`}
              >
                <Icon name={item.current ? item.icon : `${item.icon}-outline`} size={16} />
                <span className="hidden flex-1 wide:block">{item.label}</span>
                {item.count && <span className="hidden font-normal text-muted wide:block">{item.count}</span>}
                {item.badge && (
                  <span
                    className={`hidden h-5 items-center rounded-sm px-1.5 text-[11px] font-semibold wide:inline-flex ${
                      item.badge.tone === 'danger' ? 'bg-danger-solid text-white' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.badge.text}
                  </span>
                )}
                {item.badge?.tone === 'danger' && (
                  <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-solid wide:hidden" />
                )}
              </a>
            ))}
          </div>
        ))}

        <div className="hidden flex-col gap-0.5 wide:flex">
          <div className="px-2 pb-1 text-xs font-bold uppercase tracking-[0.08em] text-muted">Saved views</div>
          {SAVED_VIEWS.map((view) => (
            <a
              key={view.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex h-8 items-center gap-2 rounded-sm px-2 text-sm font-medium text-ink no-underline hover:bg-hover"
            >
              <span aria-hidden className={`mx-1 h-2 w-2 rounded-[2px] ${view.dot}`} />
              {view.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-line pt-3 items-center wide:items-stretch">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
          className="flex h-11 items-center justify-center gap-2 rounded-sm px-2 text-sm font-medium text-ink hover:bg-hover wide:h-8 wide:justify-start"
        >
          <Icon name={theme === 'dark' ? 'sunny' : 'moon'} size={16} />
          <span className="hidden wide:block">{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
        </button>
        <div className="flex items-center gap-2 px-1 py-1 wide:px-2">
          <Avatar name={CURRENT_USER.name} size={32} decorative={false} />
          <div className="hidden flex-col wide:flex">
            <span className="text-sm font-semibold leading-5">{CURRENT_USER.name}</span>
            <span className="text-xs leading-4 text-muted">{CURRENT_USER.role}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
