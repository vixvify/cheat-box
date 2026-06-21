"use client";

import {
  Plus,
  RotateCcw,
  Search,
  Terminal,
  Package,
  Layers,
  FolderOpen,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useLibraryStore } from "@/store/library-store";
import { CATEGORY_META } from "@/core/constants/categories";
import type { CategoryId } from "@/core/domain/snippet";

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  "create-project": Terminal,
  "npm-install": Package,
  sweetalert: Layers,
  "folder-structure": FolderOpen,
  "mui-components": Palette,
};

export function Header() {
  const {
    activeCategory,
    searchQuery,
    setSearchQuery,
    openAddGroupModal,
    resetToDefaults,
  } = useLibraryStore();

  const meta = CATEGORY_META[activeCategory];
  const Icon = CATEGORY_ICONS[activeCategory];

  const handleReset = () => {
    if (
      window.confirm(
        "รีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น?\n\nSnippet และ Group ที่เพิ่มเองจะหายทั้งหมด",
      )
    ) {
      resetToDefaults();
    }
  };

  return (
    <header className="flex items-center gap-4 border-b border-[#1e1e1e] bg-[#080808] px-6 py-4">
      <div className="flex shrink-0 items-center gap-2.5">
        <Icon size={16} strokeWidth={1.5} className="text-[#777]" />
        <div>
          <h2 className="text-sm font-semibold leading-none text-white">
            {meta.label}
          </h2>
        </div>
      </div>

      <div className="mx-1 h-5 w-px bg-[#1e1e1e]" />

      <div className="relative max-w-sm flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
        />
        <input
          type="text"
          id="snippet-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search snippets..."
          className="w-full rounded border border-[#222] bg-[#111] py-2 pl-9 pr-8 text-sm text-white placeholder:text-[#555] transition-colors focus:border-[#444] focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-xs text-[#666] transition-colors hover:text-[#bbb]"
          >
            ✕
          </button>
        )}
      </div>

      {activeCategory !== "mui-components" && (
        <div className="ml-auto flex items-center gap-2">
          <button
            id="add-group-btn"
            onClick={() => openAddGroupModal(activeCategory)}
            className="flex cursor-pointer items-center gap-1.5 rounded border border-[#2a2a2a] bg-[#141414] px-3.5 py-2 text-sm font-medium text-[#ccc] transition-colors hover:border-[#3a3a3a] hover:bg-[#1c1c1c] hover:text-white"
          >
            <Plus size={13} strokeWidth={2.5} />
            Add Group
          </button>
          <button
            id="reset-btn"
            onClick={handleReset}
            className="cursor-pointer rounded p-2 text-[#555] transition-colors hover:bg-[#111] hover:text-[#999]"
            title="Reset to defaults"
          >
            <RotateCcw size={14} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </header>
  );
}
