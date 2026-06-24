"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  GitPullRequest,
  RefreshCw,
  Calendar,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Tag,
  Clock,
} from "lucide-react";
import { useLibraryStore } from "@/store/library-store";

function GithubIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function getContrastColor(hex: string): string {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex =
      cleanHex[0] +
      cleanHex[0] +
      cleanHex[1] +
      cleanHex[1] +
      cleanHex[2] +
      cleanHex[2];
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
}

export function GithubPrs() {
  const {
    githubPrs,
    isLoadingPrs,
    prsError,
    fetchGithubPrs,
    searchQuery,
  } = useLibraryStore();

  const [activeSubFilter, setActiveSubFilter] = useState<
    "all" | "active" | "draft"
  >("all");

  useEffect(() => {
    fetchGithubPrs();
  }, [fetchGithubPrs]);

  const getRepoName = (repoUrl: string): string => {
    return repoUrl.replace("https://api.github.com/repos/", "");
  };

  const filteredPrs = useMemo(() => {
    let prs = githubPrs;

    if (activeSubFilter === "draft") {
      prs = prs.filter((pr) => pr.draft === true);
    } else if (activeSubFilter === "active") {
      prs = prs.filter((pr) => !pr.draft);
    }

    const query = searchQuery.trim().toLowerCase();
    if (!query) return prs;

    return prs.filter((pr) => {
      const titleMatch = pr.title.toLowerCase().includes(query);
      const repoMatch = getRepoName(pr.repository_url)
        .toLowerCase()
        .includes(query);
      const labelMatch = pr.labels.some((l) =>
        l.name.toLowerCase().includes(query),
      );
      return titleMatch || repoMatch || labelMatch;
    });
  }, [githubPrs, activeSubFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = githubPrs.length;
    const drafts = githubPrs.filter((pr) => pr.draft === true).length;
    const ready = total - drafts;

    const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;
    const needsAttention = githubPrs.filter((pr) => {
      const updatedAt = new Date(pr.updated_at).getTime();
      return updatedAt < fiveDaysAgo && !pr.draft;
    }).length;

    return { total, drafts, ready, needsAttention };
  }, [githubPrs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1e1e1e] pb-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#bbb]">
            ดึง Pull Requests ค้างอยู่
          </h2>
          <p className="mt-1 text-xs text-[#555]">
            แสดงรายการ Pull Requests ที่เปิดทิ้งไว้ตามที่กำหนดไว้ใน .env
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => fetchGithubPrs()}
            disabled={isLoadingPrs}
            className="flex cursor-pointer items-center gap-1.5 rounded border border-[#2a2a2a] bg-[#111] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1a1a1a] disabled:opacity-50"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw
              size={13}
              className={isLoadingPrs ? "animate-spin" : ""}
            />
            <span>รีเฟรช</span>
          </button>
        </div>
      </div>

      {prsError && (
        <div className="flex gap-3 rounded border border-red-950/40 bg-red-950/15 p-4 text-sm text-red-400">
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <div>
            <h4 className="font-bold text-red-200">เกิดข้อผิดพลาดในการโหลดข้อมูล</h4>
            <p className="mt-1 text-xs text-red-400/90 leading-relaxed">
              {prsError}
            </p>
            <p className="mt-2 text-xs text-red-300">
              คำแนะนำ: ตรวจสอบ GITHUB_USERNAME และ GITHUB_TOKEN ในไฟล์ .env ของโครงการ
            </p>
          </div>
        </div>
      )}

      {!prsError && (
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
              พร้อมพิจารณา (Active)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-emerald-400">
                {isLoadingPrs ? "..." : stats.ready}
              </span>
              <span className="text-[10px] text-[#444]">Ready for Review</span>
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

          <div className="rounded border border-[#161616] bg-[#070707] p-4 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-red-500/75 uppercase tracking-wider">
              ต้องการการดูแล
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-red-400">
                {isLoadingPrs ? "..." : stats.needsAttention}
              </span>
              <span className="text-[10px] text-[#444]">ค้างเกิน 5 วัน</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!prsError && (
          <div className="flex items-center justify-between border-b border-[#141414] pb-2">
            <div className="flex gap-2">
              {(["all", "active", "draft"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveSubFilter(filter)}
                  className={`cursor-pointer rounded px-2.5 py-1 text-xs capitalize transition-all ${
                    activeSubFilter === filter
                      ? "bg-[#161616] font-semibold text-white border border-[#262626]"
                      : "text-[#555] hover:text-[#999] border border-transparent"
                  }`}
                >
                  {filter === "all"
                    ? "ทั้งหมด"
                    : filter === "active"
                    ? "พร้อมรีวิว"
                    : "แบบร่าง"}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-[#444]">
              ผลลัพธ์: {filteredPrs.length} รายการ
            </div>
          </div>
        )}

        {isLoadingPrs ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded border border-[#151515] bg-[#080808] p-4 flex flex-col gap-3 animate-pulse"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 w-1/4 rounded bg-[#181818]" />
                    <div className="h-4.5 w-3/4 rounded bg-[#181818]" />
                  </div>
                  <div className="h-5 w-14 rounded-full bg-[#181818]" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-4 w-12 rounded bg-[#181818]" />
                  <div className="h-4 w-16 rounded bg-[#181818]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPrs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded border border-[#161616] py-16 text-center bg-[#070707]/30">
            <GitPullRequest size={24} className="text-[#333] mb-3" />
            <p className="text-xs text-[#555]">
              {searchQuery
                ? `ไม่พบ Pull Request ที่ค้นหาสำหรับ "${searchQuery}"`
                : "ไม่พบ Pull Request ที่เปิดค้างอยู่"}
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredPrs.map((pr) => {
              const repoName = getRepoName(pr.repository_url);
              const isDraft = pr.draft === true;
              const updatedAt = new Date(pr.updated_at);
              const createdAt = new Date(pr.created_at);

              return (
                <article
                  key={pr.id}
                  className="group relative flex flex-col justify-between rounded border border-[#1e1e1e] bg-[#090909] p-4 transition-all duration-200 hover:border-[#2e2e2e] hover:bg-[#0c0c0c] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-[#555] group-hover:text-[#888] transition-colors">
                          {repoName}
                        </span>
                        <span className="text-[10px] font-mono text-[#333]">
                          #{pr.number}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[#fafafa] leading-snug group-hover:text-white transition-colors">
                        {pr.title}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wide ${
                        isDraft
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isDraft ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      />
                      {isDraft ? "Draft" : "Open"}
                    </span>
                  </div>

                  {pr.labels.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pr.labels.map((label) => {
                        const bg = `#${label.color}`;
                        return (
                          <span
                            key={label.id}
                            style={
                              {
                                backgroundColor: bg + "1a",
                                borderColor: bg + "33",
                                color: bg,
                              } as React.CSSProperties
                            }
                            title={label.description || undefined}
                            className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-semibold font-mono tracking-wide"
                          >
                            <Tag size={8} />
                            {label.name}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#151515] pt-3 text-[10px] text-[#444] flex-wrap">
                    <div className="flex items-center gap-3.5 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar size={10} />
                        <span>
                          เปิด:{" "}
                          {createdAt.toLocaleDateString("th-TH", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>
                          อัปเดต:{" "}
                          {updatedAt.toLocaleDateString("th-TH", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {pr.comments > 0 && (
                        <div className="flex items-center gap-1 text-[#666]">
                          <MessageSquare size={10} />
                          <span>{pr.comments} ความคิดเห็น</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={pr.user.avatar_url}
                          alt={pr.user.login}
                          className="h-4 w-4 rounded-full border border-[#222]"
                        />
                        <span className="text-[#555]">{pr.user.login}</span>
                      </div>

                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-0.5 font-semibold text-[#666] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>ดู PR</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
