import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Project } from "@/core/domain/snippet";

interface ProjectModalProps {
  isOpen: boolean;
  editingProject: Project | null;
  onClose: () => void;
  onSave: (
    name: string,
    techStack: string,
    description: string,
    status: Project["status"],
    repoUrl: string | null,
  ) => void;
}

export function ProjectModal({
  isOpen,
  editingProject,
  onClose,
  onSave,
}: ProjectModalProps) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Project["status"]>("In Progress");
  const [repoUrl, setRepoUrl] = useState("");

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setTechStack(editingProject.techStack);
      setDescription(editingProject.description);
      setStatus(editingProject.status);
      setRepoUrl(editingProject.repoUrl || "");
    } else {
      setName("");
      setTechStack("");
      setDescription("");
      setStatus("In Progress");
      setRepoUrl("");
    }
  }, [editingProject, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave(
      name.trim(),
      techStack.trim(),
      description.trim(),
      status,
      repoUrl.trim() || null,
    );
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded border border-[#1c1c1c] bg-[#080808] px-3 py-2.5 text-sm text-white placeholder:text-[#444] transition-colors focus:border-[#333] focus:outline-none";

  const labelClass = "mb-1.5 block text-xs font-medium text-[#888]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 cursor-pointer bg-black/80"
        onClick={onClose}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col rounded border border-[#1c1c1c] bg-[#080808] shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#1c1c1c] px-5 py-4">
          <h2 className="text-[13px] font-bold text-white uppercase tracking-wider">
            {editingProject ? "แก้ไขโครงการ" : "เพิ่มโครงการงานใหม่"}
          </h2>
          <button
            onClick={onClose}
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
            <label className={labelClass}>Tech Stack (คั่นด้วยเครื่องหมายจุลภาค ,)</label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="เช่น React, TypeScript, Next.js"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>คำอธิบายโครงการ</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="รายละเอียดสั้นๆ เกี่ยวกับเป้าหมายโครงการนี้..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Repository URL (GitHub, GitLab, etc.)</label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>สถานะโครงการ</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Project["status"])}
                className="w-full appearance-none rounded border border-[#1c1c1c] bg-[#080808] px-3 py-2.5 pr-8 text-sm text-white focus:border-[#333] focus:outline-none"
              >
                <option value="Planning">Planning 📅</option>
                <option value="In Progress">In Progress 🚀</option>
                <option value="Completed">Completed ✅</option>
                <option value="On Hold">On Hold ⏸️</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-[#1c1c1c] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded border border-[#1e1e1e] bg-transparent px-4 py-2 text-xs font-semibold text-[#888] transition-all hover:bg-white/5 hover:text-white"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded border border-[#2a2a2a] bg-white px-4 py-2 text-xs font-bold text-black transition-all hover:bg-[#ebebeb]"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
