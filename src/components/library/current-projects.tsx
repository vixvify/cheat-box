"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Code,
  AlertTriangle,
  X,
} from "lucide-react";
import { useLibraryStore } from "@/store/library-store";
import type { Project } from "@/core/domain/snippet";

export function CurrentProjects() {
  const { projects, searchQuery, addProject, updateProject, deleteProject } =
    useLibraryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Project["status"]>("In Progress");

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setTechStack(editingProject.techStack);
      setDescription(editingProject.description);
      setStatus(editingProject.status);
    } else {
      setName("");
      setTechStack("");
      setDescription("");
      setStatus("In Progress");
    }
  }, [editingProject, isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingProject) {
      updateProject(
        editingProject.id,
        name.trim(),
        techStack.trim(),
        description.trim(),
        status,
      );
    } else {
      addProject(name.trim(), techStack.trim(), description.trim(), status);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (id: string) => {
    if (confirmDeleteId === id) {
      deleteProject(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => {
        setConfirmDeleteId((prev) => (prev === id ? null : prev));
      }, 3000);
    }
  };

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return projects;

    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.techStack.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.status.toLowerCase().includes(query),
    );
  }, [projects, searchQuery]);

  const getStatusBadge = (pStatus: Project["status"]) => {
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
  };

  const inputClass =
    "w-full rounded border border-[#1c1c1c] bg-[#080808] px-3 py-2.5 text-sm text-white placeholder:text-[#444] transition-colors focus:border-[#333] focus:outline-none";

  const labelClass = "mb-1.5 block text-xs font-medium text-[#888]";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#1e1e1e] pb-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#bbb]">
            งานที่กำลังทำอยู่ตอนนี้
          </h2>
          <p className="mt-1 text-xs text-[#555]">
            แสดงและจัดการโครงงานพัฒนา เว็บบันทึกเวลา สถานะ ความก้าวหน้า
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded border border-[#2a2a2a] bg-[#111] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1a1a1a]"
        >
          <Plus size={14} strokeWidth={2} />
          เพิ่มงานใหม่
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-[#1e1e1e] py-16 text-center">
          <AlertTriangle size={24} className="text-[#444] mb-3" />
          <p className="text-sm text-[#666]">
            {searchQuery
              ? `ไม่พบโครงการที่ค้นหาสำหรับ "${searchQuery}"`
              : "ยังไม่มีงานในระบบ"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 cursor-pointer rounded border border-[#222] bg-[#111] px-4 py-2 text-xs text-[#888] transition-colors hover:border-[#333] hover:text-white"
            >
              สร้างโครงการแรกของคุณ
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const statusBadge = getStatusBadge(project.status);
            const techTags = project.techStack
              ? project.techStack
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              : [];

            return (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between rounded border border-[#1e1e1e] bg-[#090909] p-5 transition-all duration-200 hover:border-[#2e2e2e] hover:bg-[#0c0c0c] hover:shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${statusBadge.classes}`}
                    >
                      {statusBadge.label}
                    </span>

                    <div className="flex items-center gap-1.5 opacity-45 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer rounded p-1 text-[#666] transition-colors hover:bg-white/5 hover:text-white"
                        title="แก้ไข"
                      >
                        <Pencil size={13} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project.id)}
                        className={`cursor-pointer rounded p-1 transition-colors ${
                          confirmDeleteId === project.id
                            ? "bg-red-950/50 text-red-400"
                            : "text-[#666] hover:bg-red-950/20 hover:text-red-400"
                        }`}
                        title={
                          confirmDeleteId === project.id
                            ? "คลิกอีกครั้งเพื่อลบ"
                            : "ลบ"
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
                      {techTags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded bg-[#131313] border border-[#202020] px-2 py-0.5 text-[10px] font-medium text-[#777] font-mono"
                        >
                          <Code size={9} />
                          {tag}
                        </span>
                      ))}
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
          })}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 cursor-pointer bg-black/80"
            onClick={handleCloseModal}
          />

          <div className="relative z-10 flex w-full max-w-md flex-col rounded border border-[#1c1c1c] bg-[#080808] shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-[#1c1c1c] px-5 py-4">
              <h2 className="text-[13px] font-bold text-white uppercase tracking-wider">
                {editingProject ? "แก้ไขโครงการ" : "เพิ่มโครงการงานใหม่"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="cursor-pointer rounded p-1.5 text-[#444] transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
              <div>
                <label className={labelClass}>
                  ชื่อโครงการ <span className="text-red-800">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  placeholder="เช่น ACS Website"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  เทคโนโลยี (Tech Stack){" "}
                  <span className="text-[#444]">
                    (คั่นด้วยเครื่องหมายจุลภาค ,)
                  </span>
                </label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="เช่น Next.js, Elysia, TailwindCSS"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>สถานะโครงการ</label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Project["status"])
                  }
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Planning">Planning</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>รายละเอียดโครงการ</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="รายละเอียดและความก้าวหน้าของโครงการ..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-[#1c1c1c] pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cursor-pointer rounded px-4 py-2 text-[13px] text-[#444] transition-colors hover:bg-white/5 hover:text-white"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded border border-[#2a2a2a] bg-[#111] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
                >
                  {editingProject ? "บันทึกการแก้ไข" : "เพิ่มโครงการ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
