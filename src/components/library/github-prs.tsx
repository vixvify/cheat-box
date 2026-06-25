"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GitPullRequest, RefreshCw, AlertCircle } from "lucide-react";
import { useLibraryStore } from "@/store/library-store";
import type { GitHubComment } from "@/core/domain/github";
import { getRepoName } from "@/utils/github-utils";
import { PRStatsHeader } from "./pr-stats-header";
import { PRFilters, PRFilterType } from "./pr-filters";
import { PRCard } from "./pr-card";

export function GithubPrs() {
  const {
    githubPrs,
    isLoadingPrs,
    prsError,
    fetchGithubPrs,
    searchQuery,
  } = useLibraryStore();

  const [activeSubFilter, setActiveSubFilter] = useState<PRFilterType>("all");

  const [expandedPrId, setExpandedPrId] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, GitHubComment[]>>({});
  const [loadingComments, setLoadingComments] = useState<Record<number, boolean>>({});
  const [commentsError, setCommentsError] = useState<Record<number, string | null>>({});

  const handleToggleComments = async (
    prId: number,
    repoUrl: string,
    prNumber: number,
  ) => {
    if (expandedPrId === prId) {
      setExpandedPrId(null);
      return;
    }

    setExpandedPrId(prId);

    if (comments[prId]) {
      return;
    }

    const repoPath = getRepoName(repoUrl);
    const [owner, repo] = repoPath.split("/");

    setLoadingComments((prev) => ({ ...prev, [prId]: true }));
    setCommentsError((prev) => ({ ...prev, [prId]: null }));

    try {
      const res = await fetch(
        `/api/github/comments?owner=${owner}&repo=${repo}&number=${prNumber}`,
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch comments (HTTP ${res.status})`,
        );
      }
      const data = (await res.json()) as GitHubComment[];
      setComments((prev) => ({ ...prev, [prId]: data }));
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error ? err.message : "Failed to load comments.";
      setCommentsError((prev) => ({ ...prev, [prId]: msg }));
    } finally {
      setLoadingComments((prev) => ({ ...prev, [prId]: false }));
    }
  };

  useEffect(() => {
    fetchGithubPrs();
  }, [fetchGithubPrs]);

  const filteredPrs = useMemo(() => {
    let prs = githubPrs;

    if (activeSubFilter === "draft") {
      prs = prs.filter((pr) => pr.draft === true);
    } else if (activeSubFilter === "active") {
      prs = prs.filter((pr) => !pr.draft);
    } else if (activeSubFilter === "readyToMerge") {
      prs = prs.filter(
        (pr) =>
          pr.draft !== true &&
          pr.mergeable === true &&
          (pr.mergeable_state === "clean" || pr.mergeable_state === "unstable"),
      );
    } else if (activeSubFilter === "changesRequested") {
      prs = prs.filter((pr) => pr.changes_requested === true);
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
    const readyToMerge = githubPrs.filter(
      (pr) =>
        pr.draft !== true &&
        pr.mergeable === true &&
        (pr.mergeable_state === "clean" || pr.mergeable_state === "unstable"),
    ).length;
    const changesRequested = githubPrs.filter(
      (pr) => pr.changes_requested === true,
    ).length;

    return { total, drafts, readyToMerge, changesRequested };
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

      {!prsError && <PRStatsHeader isLoadingPrs={isLoadingPrs} stats={stats} />}

      <div className="space-y-4">
        {!prsError && (
          <PRFilters
            activeFilter={activeSubFilter}
            onChangeFilter={setActiveSubFilter}
            filteredCount={filteredPrs.length}
          />
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
            {filteredPrs.map((pr) => (
              <PRCard
                key={pr.id}
                pr={pr}
                expandedPrId={expandedPrId}
                comments={comments}
                loadingComments={loadingComments}
                commentsError={commentsError}
                onToggleComments={handleToggleComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
