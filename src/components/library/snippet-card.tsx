'use client'

import { CopyButton } from '@/components/ui/copy-button'
import { TagBadge } from '@/components/ui/tag-badge'
import { LanguageBadge } from '@/components/ui/language-badge'
import { Play } from 'lucide-react'
import type { CategoryId, Snippet } from '@/core/domain/snippet'

interface SnippetCardProps {
  snippet: Snippet
  categoryId: CategoryId
  groupId: string
}

export function SnippetCard({ snippet, categoryId }: SnippetCardProps) {
  const handlePreview = async () => {
    try {
      const Swal = (await import('sweetalert2')).default

      if (typeof window !== 'undefined') {
        ;(window as any).Swal = Swal
      }

      const mockContext = {
        Swal,
        deleteItem: async (id: any) => {
          await Swal.fire({
            icon: 'success',
            title: 'Mock Delete Action',
            text: `Item with ID "${id}" was deleted (mock action).`,
            confirmButtonColor: '#2563eb',
          })
        },
        someAsyncOperation: () => new Promise((resolve) => setTimeout(resolve, 2000)),
        saveData: () => new Promise((resolve) => setTimeout(resolve, 1500)),
        id: '12345',
      }

      const keys = Object.keys(mockContext)
      const values = Object.values(mockContext)

      const executeFn = new Function(
        ...keys,
        `return (async () => {
          try {
            ${snippet.content}
          } catch (err) {
            console.error("Snippet execution error:", err);
            Swal.fire({
              icon: 'error',
              title: 'Execution Error',
              text: err instanceof Error ? err.message : String(err),
              confirmButtonColor: '#2563eb',
            });
          }
        })()`
      )

      await executeFn(...values)
    } catch (err: any) {
      console.error('Failed to execute SweetAlert snippet:', err)
      alert(`Error running preview: ${err.message || String(err)}`)
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
          {categoryId === 'sweetalert' && (
            <button
              onClick={handlePreview}
              className="flex cursor-pointer items-center gap-1.5 rounded border border-[#333] bg-[#1a1a1a] text-[#aaa] hover:border-yellow-800 hover:bg-yellow-950/60 hover:text-yellow-400 px-2.5 py-1.5 text-xs font-medium transition-all duration-150"
              aria-label="Preview alert"
              title="Preview Alert"
            >
              <Play size={12} strokeWidth={1.5} className="shrink-0" />
              <span>Preview</span>
            </button>
          )}
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

