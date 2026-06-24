"use client";

import { useLibraryStore } from "@/store/library-store";
import { CATEGORY_ORDER, CATEGORY_META } from "@/core/constants/categories";
import type { CategoryId } from "@/core/domain/snippet";
import { AGENT_GUIDELINES } from "@/core/data/agent-guidelines";
import { MUI_COMPONENTS_DATA } from "@/core/data/mui-components-data";
import {
  Terminal,
  Package,
  Layers,
  FolderOpen,
  Palette,
  Briefcase,
  GitBranch,
  Box,
  Bot,
  GitPullRequest,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  "current-projects": Briefcase,
  "github-prs": GitPullRequest,
  "create-project": Terminal,
  "npm-install": Package,
  sweetalert: Layers,
  "folder-structure": FolderOpen,
  "mui-components": Palette,
  "git-commands": GitBranch,
  "docker-commands": Box,
  "agent-md": Bot,
};

export function Sidebar() {
  const { activeCategory, setActiveCategory, categories, projects, githubPrs } = useLibraryStore();

  const getSnippetCount = (categoryId: CategoryId) => {
    if (categoryId === "current-projects") {
      return projects.length;
    }
    if (categoryId === "github-prs") {
      return githubPrs.length;
    }
    if (categoryId === "agent-md") {
      return AGENT_GUIDELINES.length;
    }
    if (categoryId === "mui-components") {
      return MUI_COMPONENTS_DATA.length;
    }
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.groups.reduce((acc, g) => acc + g.snippets.length, 0) ?? 0;
  };

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-[#1e1e1e] bg-[#080808]">
      <div className="border-b border-[#1e1e1e] px-5 py-5">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-sm font-bold leading-none text-white">
              Dev Library
            </h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-[#555]">
          Library
        </p>
        <div className="space-y-0.5">
          {CATEGORY_ORDER.map((id) => {
            const meta = CATEGORY_META[id];
            const Icon = CATEGORY_ICONS[id];
            const count = getSnippetCount(id);
            const isActive = activeCategory === id;

            return (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded px-3 py-2.5 text-left transition-colors duration-100 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-[#999] hover:bg-white/5 hover:text-[#ddd]"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-[#666] group-hover:text-[#bbb]"
                  }`}
                />
                <span className="flex-1 text-sm font-medium leading-none">
                  {meta.label}
                </span>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-xs tabular-nums transition-colors ${
                    isActive
                      ? "bg-white/10 text-[#bbb]"
                      : "text-[#666] group-hover:text-[#999]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
