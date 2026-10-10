// Initials on a hue derived from the name: Aa NAD's "-100 fill, -800 text" pair (>= 7:1).
const HUES = [
  'bg-blue-100 text-blue-800',
  'bg-violet-100 text-violet-800',
  'bg-amber-100 text-amber-800',
  'bg-green-100 text-green-800',
]

function hueFor(name: string): string {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return HUES[hash % HUES.length]
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}

interface AvatarProps {
  name: string
  size?: 24 | 32 | 48
  /** Decorative avatars sit next to the printed name, so screen readers skip them. */
  decorative?: boolean
}

export function Avatar({ name, size = 24, decorative = true }: AvatarProps) {
  const font = size >= 48 ? 'text-base' : size >= 32 ? 'text-xs' : 'text-[10px]'
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold ${font} ${hueFor(name)}`}
      style={{ width: size, height: size }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative ? true : undefined}
    >
      {initials(name)}
    </span>
  )
}

/** Shown wherever an owner is missing: drawn on purpose, never a blank cell. */
export function NoOwner({ label = 'No owner' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-subtle">
      <span aria-hidden className="h-6 w-6 shrink-0 rounded-full border border-dashed border-line-strong" />
      {label}
    </span>
  )
}
