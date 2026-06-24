import type { CategoryId } from '../domain/snippet'

export const CATEGORY_ORDER: CategoryId[] = [
  'current-projects',
  'github-prs',
  'create-project',
  'npm-install',
  'sweetalert',
  'folder-structure',
  'mui-components',
  'git-commands',
  'docker-commands',
  'agent-md',
]

export const CATEGORY_META: Record<
  CategoryId,
  { label: string; icon: string; description: string }
> = {
  'current-projects': {
    label: 'Current Projects',
    icon: '💼',
    description: 'บันทึกงานที่กำลังทำอยู่และติดตามสถานะโปรเจคต่าง ๆ สามารถ เพิ่ม แก้ไข ลบ ข้อมูลได้',
  },
  'github-prs': {
    label: 'GitHub PRs',
    icon: '🌿',
    description: 'รายการ Pull Requests ที่เราสร้างค้างไว้ ดึงข้อมูลสดจาก GitHub API ค้นหาและดูสถานะการตรวจสอบได้',
  },
  'create-project': {
    label: 'Create Project',
    icon: '🚀',
    description: 'คำสั่งสร้างโปรเจคใหม่สำหรับ Next.js, Elysia, และ Go',
  },
  'npm-install': {
    label: 'npm Install',
    icon: '📦',
    description: 'คำสั่ง install package ที่ใช้บ่อย จัดกลุ่มตามหมวดหมู่',
  },
  sweetalert: {
    label: 'SweetAlert2',
    icon: '🍬',
    description: 'ตัวอย่าง Swal.fire() pattern ที่ใช้บ่อยในโปรเจค',
  },
  'folder-structure': {
    label: 'Folder Structure',
    icon: '📁',
    description: 'โครงสร้าง folder เบื้องต้นสำหรับ Next.js, Go, และ Elysia',
  },
  'mui-components': {
    label: 'MUI Components',
    icon: '🎨',
    description: 'แหล่งรวม Material UI (MUI) components ที่ใช้บ่อย พร้อมตัวอย่าง preview และโค้ดสำหรับก๊อปปี้',
  },
  'git-commands': {
    label: 'Git Commands',
    icon: '🌿',
    description: 'คำสั่ง Git ที่ใช้บ่อยในการจัดการโค้ดและการทำงานร่วมกัน',
  },
  'docker-commands': {
    label: 'Docker Commands',
    icon: '🐳',
    description: 'คำสั่ง Docker ที่ใช้บ่อยในการจัดการอิมเมจ คอนเทนเนอร์ และเน็ตเวิร์ก',
  },
  'agent-md': {
    label: 'Agent Guidelines',
    icon: '🤖',
    description: 'แนวทางปฏิบัติตามมาตรฐานสำหรับ Frontend และ Backend AI Coding Assistant',
  },
}

export const SNIPPET_LANGUAGES = [
  { value: 'bash', label: 'Bash / Shell' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'go', label: 'Go' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'text', label: 'Plain Text' },
] as const

export const SNIPPET_TYPES = [
  { value: 'command', label: 'Command' },
  { value: 'code', label: 'Code Block' },
  { value: 'tree', label: 'Folder Tree' },
] as const
