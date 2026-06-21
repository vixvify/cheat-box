import type { Category } from '@/core/domain/snippet'
import { createProjectGroups } from '@/core/data/create-project'
import { npmInstallGroups } from '@/core/data/npm-install'
import { sweetalertGroups } from '@/core/data/sweetalert'
import { folderStructureGroups } from '@/core/data/folder-structure'

export function getDefaultCategories(): Category[] {
  return [
    {
      id: 'create-project',
      label: 'Create Project',
      icon: '🚀',
      description: 'คำสั่งสร้างโปรเจคใหม่สำหรับ Next.js, Elysia, และ Go',
      groups: createProjectGroups,
    },
    {
      id: 'npm-install',
      label: 'npm Install',
      icon: '📦',
      description: 'คำสั่ง install package ที่ใช้บ่อย จัดกลุ่มตามหมวดหมู่',
      groups: npmInstallGroups,
    },
    {
      id: 'sweetalert',
      label: 'SweetAlert2',
      icon: '🍬',
      description: 'ตัวอย่าง Swal.fire() pattern ที่ใช้บ่อยในโปรเจค',
      groups: sweetalertGroups,
    },
    {
      id: 'folder-structure',
      label: 'Folder Structure',
      icon: '📁',
      description: 'โครงสร้าง folder เบื้องต้นสำหรับ Next.js, Go, และ Elysia',
      groups: folderStructureGroups,
    },
  ]
}
