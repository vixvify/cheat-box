import React from "react";
import {
  MessageSquare,
  Calendar,
  Clock,
  Tag,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import type { GitHubPRSearchItem, GitHubComment } from "@/core/domain/github";
import { getContrastColor, getRepoName } from "@/utils/github-utils";

function DiffHunk({ diffHunk }: { diffHunk: string }) {
  const lines = diffHunk.split("\n").filter((line, index, array) => {
    if (index === array.length - 1 && !line.trim()) {
      return false;
    }
    return true;
  });

  return (
    <pre className="text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre">
      {lines.map((line, idx) => {
        let className = "text-[#666] px-2.5 block w-full";
        if (line.startsWith("+")) {
          className = "text-emerald-400 bg-emerald-950/20 px-2.5 block w-full";
        } else if (line.startsWith("-")) {
          className = "text-rose-400 bg-rose-950/20 px-2.5 block w-full";
        } else if (line.startsWith("@@")) {
          className = "text-blue-400/80 bg-blue-950/10 px-2.5 block w-full font-semibold";
        }
        return (
          <code key={idx} className={className}>
            {line}
          </code>
        );
      })}
    </pre>
  );
}

interface PRCardProps {
  pr: GitHubPRSearchItem;
  expandedPrId: number | null;
  comments: Record<number, GitHubComment[]>;
  loadingComments: Record<number, boolean>;
  commentsError: Record<number, string | null>;
  onToggleComments: (
    prId: number,
    repoUrl: string,
    prNumber: number,
  ) => Promise<void> | void;
}

export function PRCard({
  pr,
  expandedPrId,
  comments,
  loadingComments,
  commentsError,
  onToggleComments,
}: PRCardProps) {
  const repoName = getRepoName(pr.repository_url);
  const isDraft = pr.draft === true;
  const updatedAt = new Date(pr.updated_at);
  const createdAt = new Date(pr.created_at);

  const isReadyToMerge =
    !isDraft &&
    pr.mergeable === true &&
    (pr.mergeable_state === "clean" || pr.mergeable_state === "unstable");
  const isConflict =
    !isDraft && (pr.mergeable === false || pr.mergeable_state === "dirty");
  const isBlocked = !isDraft && pr.mergeable_state === "blocked";

  return (
    <article className="group relative flex flex-col justify-between rounded border border-[#1e1e1e] bg-[#090909] p-4 transition-all duration-200 hover:border-[#2e2e2e] hover:bg-[#0c0c0c] hover:shadow-lg">
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

        <div className="flex flex-wrap items-center gap-1.5 shrink-0 select-none">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wide ${
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

          {!isDraft && (
            <>
              {pr.changes_requested ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[9px] font-semibold text-red-400">
                  ต้องการแก้ไข ❌
                </span>
              ) : pr.approvals_count && pr.approvals_count > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
                  อนุมัติแล้ว ({pr.approvals_count} คน) ✅
                </span>
              ) : null}
            </>
          )}

          {!isDraft && (
            <>
              {isReadyToMerge ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-950/30 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 animate-pulse">
                  พร้อม Merge 🚀
                </span>
              ) : isConflict ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-950/20 px-2 py-0.5 text-[9px] font-semibold text-red-400">
                  มี Conflict ⚠️
                </span>
              ) : isBlocked ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-800/40 px-2 py-0.5 text-[9px] font-semibold text-[#888]">
                  Blocked 🔒
                </span>
              ) : pr.mergeable === null ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-800/40 px-2 py-0.5 text-[9px] font-semibold text-[#666]">
                  กำลังตรวจ Conflict... ⏳
                </span>
              ) : null}
            </>
          )}
        </div>
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

          <button
            onClick={() => onToggleComments(pr.id, pr.repository_url, pr.number)}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${
              expandedPrId === pr.id
                ? "text-[#fafafa] font-semibold"
                : "text-[#666] hover:text-[#999]"
            }`}
          >
            <MessageSquare size={10} />
            <span>{pr.comments} ความคิดเห็น</span>
            {expandedPrId === pr.id ? (
              <ChevronUp size={10} />
            ) : (
              <ChevronDown size={10} />
            )}
          </button>
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

      {expandedPrId === pr.id && (
        <div className="mt-4 border-t border-[#1e1e1e] pt-4 animate-in fade-in duration-200">
          {loadingComments[pr.id] && (
            <div className="flex items-center justify-center py-6 text-xs text-[#555] gap-2">
              <Loader2 className="animate-spin" size={14} />
              <span>กำลังโหลดความคิดเห็น...</span>
            </div>
          )}

          {commentsError[pr.id] && (
            <div className="rounded border border-red-950/40 bg-red-950/15 p-3 text-xs text-red-400">
              {commentsError[pr.id]}
            </div>
          )}

          {!loadingComments[pr.id] && !commentsError[pr.id] && (
            <>
              {!comments[pr.id] || comments[pr.id].length === 0 ? (
                <p className="text-center py-4 text-xs text-[#444]">
                  ไม่มีความคิดเห็นใน Pull Request นี้
                </p>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {comments[pr.id].map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-2.5 text-xs text-[#888] leading-relaxed"
                    >
                      <img
                        src={comment.user.avatar_url}
                        alt={comment.user.login}
                        className="h-5 w-5 rounded-full border border-[#222] mt-0.5 shrink-0"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-white">
                            {comment.user.login}
                          </span>
                          <a
                            href={comment.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-[#444] hover:text-[#999] hover:underline"
                          >
                            {new Date(comment.created_at).toLocaleDateString(
                              "th-TH",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </a>
                        </div>
                        {comment.path && comment.diff_hunk && (
                          <div className="rounded border border-[#1e1e1e] bg-[#050505] overflow-hidden my-2">
                            <div className="border-b border-[#1e1e1e] bg-[#0a0a0a] px-2.5 py-1 text-[#888] flex items-center justify-between text-[10px] font-mono">
                              <span className="truncate">{comment.path}</span>
                              {comment.line !== undefined && comment.line !== null && (
                                <span className="shrink-0 text-[#555] font-semibold">L{comment.line}</span>
                              )}
                            </div>
                            <div className="py-1.5 overflow-x-auto max-h-[160px]">
                              <DiffHunk diffHunk={comment.diff_hunk} />
                            </div>
                          </div>
                        )}
                        <div className="text-[#bbb] bg-[#0c0c0c] border border-[#141414] rounded px-3 py-2 whitespace-pre-wrap break-words">
                          {comment.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </article>
  );
}
