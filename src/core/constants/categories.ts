import type { CategoryId } from '../domain/snippet'

export const CATEGORY_ORDER: CategoryId[] = [
  'create-project',
  'npm-install',
  'sweetalert',
  'folder-structure',
]

export const CATEGORY_META: Record<
  CategoryId,
  { label: string; icon: string; description: string }
> = {
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
