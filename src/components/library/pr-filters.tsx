import React from "react";

export type PRFilterType =
  | "all"
  | "active"
  | "draft"
  | "readyToMerge"
  | "changesRequested";

interface PRFiltersProps {
  activeFilter: PRFilterType;
  onChangeFilter: (filter: PRFilterType) => void;
  filteredCount: number;
}

export function PRFilters({
  activeFilter,
  onChangeFilter,
  filteredCount,
}: PRFiltersProps) {
  const filters: { value: PRFilterType; label: string }[] = [
    { value: "all", label: "ทั้งหมด" },
    { value: "active", label: "พร้อมรีวิว" },
    { value: "draft", label: "แบบร่าง" },
    { value: "readyToMerge", label: "พร้อม Merge" },
    { value: "changesRequested", label: "ต้องแก้ไข" },
  ];

  return (
    <div className="flex items-center justify-between border-b border-[#141414] pb-2">
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onChangeFilter(filter.value)}
            className={`cursor-pointer rounded px-2.5 py-1 text-xs transition-all ${
              activeFilter === filter.value
                ? "bg-[#161616] font-semibold text-white border border-[#262626]"
                : "text-[#555] hover:text-[#999] border border-transparent"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="text-[10px] text-[#444]">
        ผลลัพธ์: {filteredCount} รายการ
      </div>
    </div>
  );
}
