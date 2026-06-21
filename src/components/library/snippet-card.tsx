'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { CopyButton } from '@/components/ui/copy-button'
import { TagBadge } from '@/components/ui/tag-badge'
import { LanguageBadge } from '@/components/ui/language-badge'
import { useLibraryStore } from '@/store/library-store'
import type { CategoryId, Snippet } from '@/core/domain/snippet'

interface SnippetCardProps {
  snippet: Snippet
  categoryId: CategoryId
  groupId: string
}

export function SnippetCard({ snippet, categoryId, groupId }: SnippetCardProps) {
  const { openEditSnippetModal, deleteSnippet } = useLibraryStore()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    if (confirmDelete) {
      deleteSnippet(categoryId, groupId, snippet.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <article className="group relative rounded border border-[#222] bg-[#0f0f0f] transition-colors duration-100 hover:border-[#2e2e2e]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#1a1a1a]">
        <div className="flex min-w-0 flex-1 items-center gap-2 flex-wrap">
          <LanguageBadge language={snippet.language} />
          <h3 className="text-sm font-semibold text-[#f0f0f0] truncate">{snippet.title}</h3>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <CopyButton content={snippet.content} />
          <div className="h-4 w-px bg-[#222]" />
          <button
            onClick={() => openEditSnippetModal(categoryId, groupId, snippet)}
            className="cursor-pointer rounded p-1.5 text-[#666] transition-colors hover:bg-white/5 hover:text-[#ccc]"
            title="Edit"
          >
            <Pencil size={13} strokeWidth={1.5} />
          </button>
          <button
            onClick={handleDelete}
            className={`cursor-pointer rounded p-1.5 transition-colors ${
              confirmDelete
                ? 'bg-red-950/40 text-red-400'
                : 'text-[#666] hover:bg-red-950/30 hover:text-red-400'
            }`}
            title={confirmDelete ? 'Click again to confirm' : 'Delete'}
          >
            <Trash2 size={13} strokeWidth={1.5} />
          </button>
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

      {confirmDelete && (
        <div className="absolute inset-x-0 bottom-0 rounded-b border-t border-red-950/60 bg-red-950/25 px-4 py-2 text-center text-xs text-red-400">
          คลิกอีกครั้งเพื่อยืนยันการลบ — ยกเลิกใน 3 วินาที
        </div>
      )}
    </article>
  )
}
