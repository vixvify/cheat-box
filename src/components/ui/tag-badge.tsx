const TAG_COLORS: Record<string, string> = {
  nextjs: 'border-[#2a2a2a] text-[#888]',
  elysia: 'border-[#2a2a2a] text-[#888]',
  bun: 'border-[#2a2a2a] text-[#888]',
  go: 'border-[#2a2a2a] text-[#888]',
  typescript: 'border-blue-900 text-blue-400',
  javascript: 'border-yellow-900 text-yellow-400',
  prisma: 'border-teal-900 text-teal-400',
  zustand: 'border-orange-900 text-orange-400',
  zod: 'border-purple-900 text-purple-400',
  axios: 'border-[#2a2a2a] text-[#888]',
  mui: 'border-blue-900 text-blue-400',
  shadcn: 'border-[#2a2a2a] text-[#888]',
  tailwind: 'border-cyan-900 text-cyan-400',
  auth: 'border-[#2a2a2a] text-[#888]',
  jwt: 'border-[#2a2a2a] text-[#888]',
  swal: 'border-yellow-900 text-yellow-400',
}

interface TagBadgeProps {
  tag: string
}

export function TagBadge({ tag }: TagBadgeProps) {
  const colorClass = TAG_COLORS[tag] ?? 'border-[#2a2a2a] text-[#777]'
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {tag}
    </span>
  )
}
