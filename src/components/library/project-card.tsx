import React from "react";
import { Pencil, Trash2, Code, Calendar } from "lucide-react";
import type { Project } from "@/core/domain/snippet";

interface ProjectCardProps {
  project: Project;
  confirmDeleteId: string | null;
  onEditClick: (project: Project) => void;
  onDeleteClick: (id: string) => void;
}

function getStatusBadge(pStatus: Project["status"]) {
  switch (pStatus) {
    case "Completed":
      return {
        label: "Completed",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    case "In Progress":
      return {
        label: "In Progress",
        classes: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      };
    case "Planning":
      return {
        label: "Planning",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      };
    case "On Hold":
      return {
        label: "On Hold",
        classes: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      };
    default:
      return {
        label: pStatus,
        classes: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
      };
  }
}

export function ProjectCard({
  project,
  confirmDeleteId,
  onEditClick,
  onDeleteClick,
}: ProjectCardProps) {
  const statusBadge = getStatusBadge(project.status);
  const techTags = project.techStack
    ? project.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="group relative flex flex-col justify-between rounded border border-[#1e1e1e] bg-[#090909] p-5 transition-all duration-200 hover:border-[#2e2e2e] hover:bg-[#0c0c0c] hover:shadow-lg">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${statusBadge.classes}`}
          >
            {statusBadge.label}
          </span>

          <div className="flex items-center gap-1.5 opacity-45 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onEditClick(project)}
              className="cursor-pointer rounded p-1 text-[#666] transition-colors hover:bg-white/5 hover:text-white"
              title="แก้ไข"
            >
              <Pencil size={13} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => onDeleteClick(project.id)}
              className={`cursor-pointer rounded p-1 transition-colors ${
                confirmDeleteId === project.id
                  ? "bg-red-950/50 text-red-400"
                  : "text-[#666] hover:bg-red-950/20 hover:text-red-400"
              }`}
              title={
                confirmDeleteId === project.id ? "คลิกอีกครั้งเพื่อลบ" : "ลบ"
              }
            >
              <Trash2 size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-[#fafafa] group-hover:text-white">
          {project.name}
        </h3>
      </div>

      <div className="my-3 flex-1">
        <p className="text-xs text-[#999] leading-relaxed whitespace-pre-line">
          {project.description || "ไม่มีคำอธิบายโครงการ"}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#161616] space-y-2.5">
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {techTags.map((tag) => {
              const rUrl = project.repoUrl;
              if (rUrl) {
                return (
                  <a
                    key={tag}
                    href={rUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open Repository: ${rUrl}`}
                    className="flex items-center gap-1 rounded bg-[#131313] border border-[#202020] px-2.5 py-1 text-xs font-medium text-[#777] font-mono transition-all hover:border-blue-500/30 hover:bg-blue-950/25 hover:text-blue-400 cursor-pointer"
                  >
                    <Code size={11} />
                    {tag}
                  </a>
                );
              }
              return (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded bg-[#131313] border border-[#202020] px-2.5 py-1 text-xs font-medium text-[#777] font-mono"
                >
                  <Code size={11} />
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[10px] text-[#444]">
          <Calendar size={10} />
          <span>
            อัปเดตล่าสุด:{" "}
            {new Date(project.updatedAt).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {confirmDeleteId === project.id && (
        <div className="absolute inset-x-0 bottom-0 rounded-b border-t border-red-950/60 bg-red-950/30 px-3 py-1.5 text-center text-[10px] font-semibold text-red-400 transition-all duration-200">
          คลิกไอคอนถังขยะอีกครั้งเพื่อยืนยันการลบ
        </div>
      )}
    </article>
  );
}
