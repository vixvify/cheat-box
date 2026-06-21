'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useLibraryStore } from '@/store/library-store'

export function GroupModal() {
  const { modal, closeModal, addGroup, updateGroup } = useLibraryStore()

  const isOpen = modal.type === 'add-group' || modal.type === 'edit-group'
  const isEdit = modal.type === 'edit-group'

  const [label, setLabel] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!isOpen) return
    if (isEdit && modal.group) {
      setLabel(modal.group.label)
      setDescription(modal.group.description ?? '')
    } else {
      setLabel('')
      setDescription('')
    }
  }, [isOpen, isEdit, modal.group])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeModal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!label.trim() || !modal.categoryId) return

    if (isEdit && modal.groupId) {
      updateGroup(
        modal.categoryId,
        modal.groupId,
        label.trim(),
        description.trim() || undefined
      )
    } else {
      addGroup(modal.categoryId, label.trim(), description.trim() || undefined)
    }
    closeModal()
  }

  if (!isOpen) return null

  const inputClass =
    'w-full rounded border border-[#1c1c1c] bg-[#080808] px-3 py-2.5 text-sm text-white placeholder:text-[#444] transition-colors focus:border-[#333] focus:outline-none'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 cursor-pointer bg-black/80" onClick={closeModal} />

      <div className="relative z-10 w-full max-w-md rounded border border-[#1c1c1c] bg-[#080808] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1c1c1c] px-5 py-4">
          <h2 className="text-[13px] font-semibold text-white">
            {isEdit ? 'Edit Group' : 'New Group'}
          </h2>
          <button
            onClick={closeModal}
            className="cursor-pointer rounded p-1.5 text-[#444] transition-colors hover:bg-white/5 hover:text-white"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-[#444]">
              Group Name <span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
              autoFocus
              placeholder="Group name..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#888]">
              Description <span className="text-[#222]">(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="คำอธิบาย..."
              className={inputClass}
            />
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
              {isEdit ? 'Save Changes' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
