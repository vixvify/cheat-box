import React from "react";

interface PRStatsHeaderProps {
  isLoadingPrs: boolean;
  stats: {
    total: number;
    drafts: number;
    readyToMerge: number;
    changesRequested: number;
  };
}

export function PRStatsHeader({ isLoadingPrs, stats }: PRStatsHeaderProps) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <div className="rounded border border-[#161616] bg-[#070707] p-4 flex flex-col justify-between">
        <span className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">
          PRs ทั้งหมด
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            {isLoadingPrs ? "..." : stats.total}
          </span>
          <span className="text-[10px] text-[#444]">Pull Requests</span>
        </div>
      </div>

      <div className="rounded border border-[#161616] bg-[#070707] p-4 flex flex-col justify-between">
        <span className="text-[10px] font-semibold text-emerald-500/75 uppercase tracking-wider">
          พร้อม Merge (Ready)
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-emerald-400">
            {isLoadingPrs ? "..." : stats.readyToMerge}
          </span>
          <span className="text-[10px] text-[#444]">Conflicts Cleaned</span>
        </div>
      </div>

      <div className="rounded border border-[#161616] bg-[#070707] p-4 flex flex-col justify-between">
        <span className="text-[10px] font-semibold text-red-500/75 uppercase tracking-wider">
          ต้องแก้ไข (Changes Requested)
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-red-400">
            {isLoadingPrs ? "..." : stats.changesRequested}
          </span>
          <span className="text-[10px] text-[#444]">Review Blocked</span>
        </div>
      </div>

      <div className="rounded border border-[#161616] bg-[#070707] p-4 flex flex-col justify-between">
        <span className="text-[10px] font-semibold text-amber-500/75 uppercase tracking-wider">
          แบบร่าง (Draft)
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-amber-400">
            {isLoadingPrs ? "..." : stats.drafts}
          </span>
          <span className="text-[10px] text-[#444]">Draft PRs</span>
        </div>
      </div>
    </div>
  );
}
