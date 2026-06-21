'use client'

import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { useLibraryStore } from '@/store/library-store'
import type { SnippetLanguage, SnippetType } from '@/core/domain/snippet'
import { SNIPPET_LANGUAGES, SNIPPET_TYPES } from '@/core/constants/categories'

export function SnippetModal() {
  const { modal, closeModal, addSnippet, updateSnippet } = useLibraryStore()

  const isOpen = modal.type === 'add-snippet' || modal.type === 'edit-snippet'
  const isEdit = modal.type === 'edit-snippet'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<SnippetType>('command')
  const [language, setLanguage] = useState<SnippetLanguage>('bash')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (!isOpen) return
    if (isEdit && modal.snippet) {
      setTitle(modal.snippet.title)
      setDescription(modal.snippet.description ?? '')
      setType(modal.snippet.type)
      setLanguage(modal.snippet.language)
      setContent(modal.snippet.content)
      setTags(modal.snippet.tags)
    } else {
      setTitle('')
      setDescription('')
      setType('command')
      setLanguage('bash')
      setContent('')
      setTags([])
    }
    setTagInput('')
  }, [isOpen, isEdit, modal.snippet])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeModal])

  const handleAddTag = () => {
    const newTags = tagInput
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter((t) => t && !tags.includes(t))
    if (newTags.length) {
      setTags([...tags, ...newTags])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const data = {
      title: title.trim(),
      description: description.trim() || undefined,
      type,
      language,
      content: content.trim(),
      tags,
    }

    if (isEdit && modal.categoryId && modal.groupId && modal.snippet) {
      updateSnippet(modal.categoryId, modal.groupId, modal.snippet.id, data)
    } else if (modal.categoryId && modal.groupId) {
      addSnippet(modal.categoryId, modal.groupId, data)
    }
    closeModal()
  }

  if (!isOpen) return null

  const inputClass =
    'w-full rounded border border-[#1c1c1c] bg-[#080808] px-3 py-2.5 text-sm text-white placeholder:text-[#444] transition-colors focus:border-[#333] focus:outline-none'

  const labelClass = 'mb-1.5 block text-xs font-medium text-[#888]'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 cursor-pointer bg-black/80" onClick={closeModal} />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded border border-[#1c1c1c] bg-[#080808] shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#1c1c1c] px-5 py-4">
          <h2 className="text-[13px] font-semibold text-white">
            {isEdit ? 'Edit Snippet' : 'New Snippet'}
          </h2>
          <button
            onClick={closeModal}
            className="cursor-pointer rounded p-1.5 text-[#444] transition-colors hover:bg-white/5 hover:text-white"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
        >
          <div>
            <label className={labelClass}>
              Title <span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              placeholder="Snippet title..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Description{' '}
              <span className="text-[#2a2a2a]">(optional — Thai or English)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="คำอธิบาย..."
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as SnippetType)}
                className={`${inputClass} cursor-pointer`}
              >
                {SNIPPET_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SnippetLanguage)}
                className={`${inputClass} cursor-pointer`}
              >
                {SNIPPET_LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Content <span className="text-red-800">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              placeholder="Command or code..."
              className={`${inputClass} resize-none font-mono text-[12px] leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelClass}>Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="tag1, tag2 (Enter to add)"
                className={`flex-1 ${inputClass}`}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="cursor-pointer rounded border border-[#1c1c1c] bg-[#111] px-3 py-2 text-[#555] transition-colors hover:border-[#2a2a2a] hover:text-white"
              >
                <Plus size={13} strokeWidth={2} />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="flex cursor-pointer items-center gap-1 rounded border border-[#1c1c1c] px-2 py-px text-[11px] text-[#555] transition-colors hover:border-red-950 hover:text-red-600"
                  >
                    {tag}
                    <X size={9} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-[#1c1c1c] pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="cursor-pointer rounded px-4 py-2 text-[13px] text-[#444] transition-colors hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded border border-[#2a2a2a] bg-[#111] px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1a1a1a]"
            >
              {isEdit ? 'Save Changes' : 'Add Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
