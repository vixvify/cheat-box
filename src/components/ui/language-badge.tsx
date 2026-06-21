const LANGUAGE_STYLES: Record<
  string,
  { border: string; text: string; label: string }
> = {
  bash: { border: 'border-green-800', text: 'text-green-400', label: 'bash' },
  typescript: { border: 'border-blue-800', text: 'text-blue-400', label: 'ts' },
  javascript: { border: 'border-yellow-800', text: 'text-yellow-400', label: 'js' },
  go: { border: 'border-cyan-800', text: 'text-cyan-400', label: 'go' },
  json: { border: 'border-orange-800', text: 'text-orange-400', label: 'json' },
  yaml: { border: 'border-pink-800', text: 'text-pink-400', label: 'yaml' },
  text: { border: 'border-[#2a2a2a]', text: 'text-[#777]', label: 'txt' },
}

interface LanguageBadgeProps {
  language: string
}

export function LanguageBadge({ language }: LanguageBadgeProps) {
  const style = LANGUAGE_STYLES[language] ?? {
    border: 'border-[#2a2a2a]',
    text: 'text-[#777]',
    label: language,
  }
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${style.border} ${style.text}`}
    >
      {style.label}
    </span>
  )
}
