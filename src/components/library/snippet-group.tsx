"use client";

import { useState } from "react";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { SnippetCard } from "./snippet-card";
import { useLibraryStore } from "@/store/library-store";
import type {
  CategoryId,
  SnippetGroup as SnippetGroupType,
} from "@/core/domain/snippet";

interface SnippetGroupProps {
  group: SnippetGroupType;
  categoryId: CategoryId;
}

export function SnippetGroup({ group, categoryId }: SnippetGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { openAddSnippetModal, openEditGroupModal, deleteGroup } =
    useLibraryStore();

  const handleDeleteGroup = () => {
    if (confirmDelete) {
      deleteGroup(categoryId, group.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <section className="mb-10">
      <div className="group/header mb-4 flex items-center justify-between gap-3 pb-2.5 border-b border-[#1e1e1e]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
        >
          <ChevronRight
            size={14}
            strokeWidth={2}
            className={`shrink-0 text-[#666] transition-transform duration-150 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#bbb]">
            {group.label}
          </h2>
          {group.description && (
            <span className="hidden truncate text-xs text-[#666] sm:block">
              — {group.description}
            </span>
          )}
          <span className="ml-1 shrink-0 rounded bg-[#1a1a1a] px-1.5 py-0.5 text-[10px] tabular-nums text-[#777] border border-[#222]">
            {group.snippets.length}
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => openAddSnippetModal(categoryId, group.id)}
            className="flex cursor-pointer items-center gap-1 rounded border border-[#222] bg-[#111] px-2 py-1 text-xs text-[#888] transition-colors hover:border-[#333] hover:text-[#ccc]"
            title="Add snippet"
          >
            <Plus size={12} strokeWidth={2} />
            Add
          </button>
          <button
            onClick={() => openEditGroupModal(categoryId, group)}
            className="cursor-pointer rounded p-1.5 text-[#555] transition-colors hover:bg-white/5 hover:text-[#aaa]"
            title="Edit group"
          >
            <Pencil size={12} strokeWidth={1.5} />
          </button>
          <button
            onClick={handleDeleteGroup}
            className={`cursor-pointer rounded p-1.5 transition-colors ${
              confirmDelete
                ? "bg-red-950/40 text-red-400"
                : "text-[#555] hover:bg-red-950/30 hover:text-red-400"
            }`}
            title={confirmDelete ? "Click again to confirm" : "Delete group"}
          >
            <Trash2 size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid gap-3">
          {group.snippets.length === 0 ? (
            <div className="rounded border border-dashed border-[#1e1e1e] py-10 text-center">
              <p className="text-sm text-[#666]">ยังไม่มี snippet ในกลุ่มนี้</p>
              <button
                onClick={() => openAddSnippetModal(categoryId, group.id)}
                className="mt-2 cursor-pointer rounded border border-[#222] bg-[#111] px-3 py-1.5 text-sm text-[#888] transition-colors hover:border-[#333] hover:text-white"
              >
                + เพิ่ม snippet
              </button>
            </div>
          ) : (
            group.snippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                categoryId={categoryId}
                groupId={group.id}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}
