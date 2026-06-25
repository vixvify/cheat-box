"use client";

import React, { useState, useMemo } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { useLibraryStore } from "@/store/library-store";
import type { Project } from "@/core/domain/snippet";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

export function CurrentProjects() {
  const {
    projects,
    isLoadingProjects,
    searchQuery,
    addProject,
    updateProject,
    deleteProject,
  } = useLibraryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = (
    name: string,
    techStack: string,
    description: string,
    status: Project["status"],
    repoUrl: string | null,
  ) => {
    if (editingProject) {
      updateProject(
        editingProject.id,
        name,
        techStack,
        description,
        status,
        repoUrl,
      );
    } else {
      addProject(name, techStack, description, status, repoUrl);
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

  if (isLoadingProjects) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#1e1e1e] pb-4">
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#bbb]">
              งานที่กำลังทำอยู่ตอนนี้
            </h2>
            <p className="mt-1 text-xs text-[#555]">
              กำลังโหลดข้อมูลโครงการของคุณ...
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex flex-col justify-between rounded border border-[#1e1e1e] bg-[#090909] p-5 space-y-4 animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4.5 w-16 rounded-full bg-[#1b1b1b] border border-[#222]" />
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded bg-[#1b1b1b] border border-[#222]" />
                    <div className="h-5 w-5 rounded bg-[#1b1b1b] border border-[#222]" />
                  </div>
                </div>
                <div className="h-5 w-3/4 rounded bg-[#1b1b1b]" />
              </div>

              <div className="my-3 flex-1 space-y-2">
                <div className="h-3 w-full rounded bg-[#1b1b1b]" />
                <div className="h-3 w-5/6 rounded bg-[#1b1b1b]" />
              </div>

              <div className="mt-4 pt-3 border-t border-[#161616] space-y-3">
                <div className="flex gap-1">
                  <div className="h-4.5 w-14 rounded bg-[#1b1b1b] border border-[#222]" />
                  <div className="h-4.5 w-16 rounded bg-[#1b1b1b] border border-[#222]" />
                </div>
                <div className="h-3 w-1/2 rounded bg-[#1b1b1b]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              confirmDeleteId={confirmDeleteId}
              onEditClick={(p) => {
                setEditingProject(p);
                setIsModalOpen(true);
              }}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        editingProject={editingProject}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
      />
    </div>
  );
}
