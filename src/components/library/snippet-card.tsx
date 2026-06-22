'use client'

import { CopyButton } from '@/components/ui/copy-button'
import { TagBadge } from '@/components/ui/tag-badge'
import { LanguageBadge } from '@/components/ui/language-badge'
import type { CategoryId, Snippet } from '@/core/domain/snippet'

interface SnippetCardProps {
  snippet: Snippet
  categoryId: CategoryId
  groupId: string
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <article className="group relative rounded border border-[#222] bg-[#0f0f0f] transition-colors duration-100 hover:border-[#2e2e2e]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#1a1a1a]">
        <div className="flex min-w-0 flex-1 items-center gap-2 flex-wrap">
          <LanguageBadge language={snippet.language} />
          <h3 className="text-sm font-semibold text-[#f0f0f0] truncate">{snippet.title}</h3>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <CopyButton content={snippet.content} />
        </div>
      </div>

      {snippet.description && (
        <p className="px-4 pt-2.5 text-sm text-[#999] leading-relaxed">
          {snippet.description}
        </p>
      )}

      <div className="px-4 py-3">
        <pre
          className={`overflow-x-auto rounded bg-black px-4 py-4 text-[13px] leading-[1.8] text-[#ddd] border border-[#181818] ${
            snippet.type === 'tree' ? 'whitespace-pre' : 'whitespace-pre-wrap break-all'
          }`}
        >
          <code>{snippet.content}</code>
        </pre>
      </div>

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-3.5">
          {snippet.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
