"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SnippetCard } from "./snippet-card";
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
      </div>

      {isExpanded && (
        <div className="grid gap-3">
          {group.snippets.length === 0 ? (
            <div className="rounded border border-dashed border-[#1e1e1e] py-10 text-center">
              <p className="text-sm text-[#666]">ยังไม่มี snippet ในกลุ่มนี้</p>
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
