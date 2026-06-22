"use client";

import {
  RotateCcw,
  Search,
  Terminal,
  Package,
  Layers,
  FolderOpen,
  Palette,
  Briefcase,
  GitBranch,
  Box,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { useLibraryStore } from "@/store/library-store";
import { CATEGORY_META } from "@/core/constants/categories";
import type { CategoryId } from "@/core/domain/snippet";

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  "current-projects": Briefcase,
  "create-project": Terminal,
  "npm-install": Package,
  sweetalert: Layers,
  "folder-structure": FolderOpen,
  "mui-components": Palette,
  "git-commands": GitBranch,
  "docker-commands": Box,
  "agent-md": Bot,
};

export function Header() {
  const {
    activeCategory,
    searchQuery,
    setSearchQuery,
    resetToDefaults,
  } = useLibraryStore();

  const meta = CATEGORY_META[activeCategory];
  const Icon = CATEGORY_ICONS[activeCategory];

  const handleReset = () => {
    if (
      window.confirm(
        "ต้องการลบข้อมูลโครงการทั้งหมดในระบบใช่หรือไม่?\n\nโครงการทั้งหมดจะถูกลบออกจากฐานข้อมูลอย่างถาวร",
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
          placeholder={
            activeCategory === "current-projects"
              ? "Search projects..."
              : "Search snippets..."
          }
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

      {activeCategory === "current-projects" && (
        <div className="ml-auto flex items-center gap-2">
          <button
            id="reset-btn"
            onClick={handleReset}
            className="cursor-pointer rounded p-2 text-[#555] transition-colors hover:bg-[#111] hover:text-[#999]"
            title="ล้างข้อมูลโครงการทั้งหมด"
          >
            <RotateCcw size={14} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </header>
  );
}
