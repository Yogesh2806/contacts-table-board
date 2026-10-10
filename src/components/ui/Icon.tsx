// Aa NAD uses Ionicons 8: outline at rest, filled for active/selected.
// Only the glyphs this app uses are bundled (Vite inlines them as strings).
const svgs = import.meta.glob(
  '../../../node_modules/ionicons/dist/svg/{people,people-outline,home-outline,chatbubbles-outline,business-outline,pulse-outline,megaphone-outline,images-outline,library-outline,settings-outline,search-outline,chevron-down,chevron-up,chevron-forward,close,list-outline,albums-outline,person-outline,flag-outline,briefcase-outline,person-circle-outline,pricetags-outline,mail-outline,document-text-outline,copy-outline,checkmark,checkmark-circle,checkmark-circle-outline,keypad-outline,information-circle-outline,time-outline,warning-outline,trending-up-outline,arrow-down,funnel-outline,move-outline,return-down-back-outline,sunny-outline,moon-outline,mail-unread-outline,arrow-undo-outline}.svg',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>

const byName: Record<string, string> = Object.fromEntries(
  Object.entries(svgs).map(([path, svg]) => [path.split('/').pop()!.replace('.svg', ''), svg]),
)

export type IconName = string

interface IconProps {
  name: IconName
  size?: 16 | 20 | 24
  /** Give a label only when the icon carries meaning on its own. */
  label?: string
  className?: string
}

export function Icon({ name, size = 20, label, className = '' }: IconProps) {
  const svg = byName[name] ?? byName[`${name}-outline`]
  if (!svg) return null
  return (
    <span
      className={`inline-flex shrink-0 [&>svg]:h-full [&>svg]:w-full ${className}`}
      style={{ width: size, height: size }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg.replace('<svg ', '<svg fill="currentColor" ') }}
    />
  )
}
