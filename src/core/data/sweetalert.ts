import type { SnippetGroup } from '../domain/snippet'

const now = Date.now()

export const sweetalertGroups: SnippetGroup[] = [
  {
    id: 'swal-basic',
    label: 'Basic Alert',
    description: 'alert พื้นฐานแบบต่างๆ',
    snippets: [
      {
        id: 'swal-basic-1',
        title: 'Simple Alert (shorthand)',
        description: 'รูปแบบสั้นที่สุด: ส่ง title, text, icon ตรงๆ',
        type: 'code',
        language: 'typescript',
        content: `Swal.fire('หัวข้อ', 'ข้อความที่ต้องการแสดง', 'success')`,
        tags: ['swal', 'basic', 'shorthand'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-basic-2',
        title: 'Alert with Icon',
        description: 'alert แบบ object config พร้อม icon (success | error | warning | info | question)',
        type: 'code',
        language: 'typescript',
        content: `await Swal.fire({
  title: 'หัวข้อ',
  text: 'ข้อความที่ต้องการแสดง',
  icon: 'success', // 'error' | 'warning' | 'info' | 'question'
  confirmButtonText: 'ตกลง',
})`,
        tags: ['swal', 'alert', 'icon'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-basic-3',
        title: 'Alert with HTML Content',
        description: 'alert ที่ใช้ HTML ใน content — สามารถใส่ tag, style ได้',
        type: 'code',
        language: 'typescript',
        content: `await Swal.fire({
  title: 'หัวข้อ',
  html: \`
    ข้อความ <strong>ตัวหนา</strong>
    และ <em>ตัวเอน</em><br/>
    <code>inline code</code>
  \`,
  icon: 'info',
  confirmButtonText: 'ตกลง',
})`,
        tags: ['swal', 'alert', 'html'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'swal-confirm',
    label: 'Confirm Dialog',
    description: 'dialog สำหรับยืนยันการกระทำของ user',
    snippets: [
      {
        id: 'swal-confirm-1',
        title: 'Confirm with Action',
        description: 'dialog ยืนยัน พร้อม callback เมื่อ user กด confirm',
        type: 'code',
        language: 'typescript',
        content: `const result = await Swal.fire({
  title: 'คุณแน่ใจหรือไม่?',
  text: 'การกระทำนี้ไม่สามารถย้อนกลับได้',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'ใช่, ดำเนินการ!',
  cancelButtonText: 'ยกเลิก',
})

if (result.isConfirmed) {
  // ดำเนินการเมื่อกด confirm
  await Swal.fire({
    title: 'สำเร็จ!',
    text: 'ดำเนินการเรียบร้อยแล้ว',
    icon: 'success',
  })
}`,
        tags: ['swal', 'confirm', 'dialog'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-confirm-2',
        title: 'Delete Confirmation',
        description: 'dialog สำหรับยืนยันการลบข้อมูล — ปุ่มแดง reverseButtons',
        type: 'code',
        language: 'typescript',
        content: `const result = await Swal.fire({
  title: 'ลบข้อมูล?',
  text: 'ข้อมูลจะถูกลบถาวร ไม่สามารถกู้คืนได้',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#ef4444',
  cancelButtonColor: '#6b7280',
  confirmButtonText: 'ลบ',
  cancelButtonText: 'ยกเลิก',
  reverseButtons: true,
})

if (result.isConfirmed) {
  // เรียก API ลบข้อมูล
  await deleteItem(id)
}`,
        tags: ['swal', 'confirm', 'delete'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'swal-toast',
    label: 'Toast Notification',
    description: 'แจ้งเตือนแบบ toast ที่มุมหน้าจอ auto-close',
    snippets: [
      {
        id: 'swal-toast-1',
        title: 'Success Toast',
        description: 'toast แจ้งสำเร็จที่มุมบนขวา หายเองใน 3 วินาที',
        type: 'code',
        language: 'typescript',
        content: `Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'บันทึกสำเร็จ!',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})`,
        tags: ['swal', 'toast', 'success'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-toast-2',
        title: 'Error Toast',
        description: 'toast แจ้ง error ที่มุมบนขวา หายเองใน 4 วินาที',
        type: 'code',
        language: 'typescript',
        content: `Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'เกิดข้อผิดพลาด!',
  text: 'กรุณาลองใหม่อีกครั้ง',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
})`,
        tags: ['swal', 'toast', 'error'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-toast-3',
        title: 'Reusable Toast Mixin',
        description: 'สร้าง Toast instance ที่นำกลับมาใช้ซ้ำได้ด้วย Swal.mixin()',
        type: 'code',
        language: 'typescript',
        content: `const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

// การใช้งาน
Toast.fire({ icon: 'success', title: 'บันทึกสำเร็จ!' })
Toast.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด!' })
Toast.fire({ icon: 'warning', title: 'คำเตือน!' })
Toast.fire({ icon: 'info', title: 'ข้อมูล' })`,
        tags: ['swal', 'toast', 'mixin', 'reusable'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'swal-loading',
    label: 'Loading / Async',
    description: 'แสดง loading state ระหว่าง async operation',
    snippets: [
      {
        id: 'swal-loading-1',
        title: 'Show Loading Spinner',
        description: 'แสดง loading spinner ระหว่างทำงาน ปิดไม่ได้จนกว่าจะ close เอง',
        type: 'code',
        language: 'typescript',
        content: `// เปิด loading
Swal.fire({
  title: 'กำลังโหลด...',
  allowOutsideClick: false,
  allowEscapeKey: false,
  didOpen: () => {
    Swal.showLoading()
  },
})

// ทำงาน async
await someAsyncOperation()

// ปิด loading
Swal.close()`,
        tags: ['swal', 'loading', 'async', 'spinner'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-loading-2',
        title: 'Loading → Success / Error',
        description: 'แสดง loading แล้วเปลี่ยนเป็น success หรือ error ตาม result',
        type: 'code',
        language: 'typescript',
        content: `Swal.fire({
  title: 'กำลังบันทึก...',
  allowOutsideClick: false,
  didOpen: () => Swal.showLoading(),
})

try {
  await saveData()
  await Swal.fire({
    icon: 'success',
    title: 'บันทึกสำเร็จ!',
    timer: 2000,
    showConfirmButton: false,
  })
} catch (error) {
  await Swal.fire({
    icon: 'error',
    title: 'เกิดข้อผิดพลาด!',
    text: 'กรุณาลองใหม่อีกครั้ง',
  })
}`,
        tags: ['swal', 'loading', 'async', 'try-catch'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'swal-input',
    label: 'Input Dialog',
    description: 'dialog ที่รับ input หรือ selection จาก user',
    snippets: [
      {
        id: 'swal-input-1',
        title: 'Text Input Dialog',
        description: 'รับข้อความ input จาก user พร้อม validation',
        type: 'code',
        language: 'typescript',
        content: `const { value, isConfirmed } = await Swal.fire({
  title: 'กรอกข้อมูล',
  input: 'text',
  inputLabel: 'กรอกชื่อของคุณ',
  inputPlaceholder: 'ชื่อ...',
  inputAttributes: { autocomplete: 'off' },
  showCancelButton: true,
  cancelButtonText: 'ยกเลิก',
  confirmButtonText: 'ยืนยัน',
  inputValidator: (value) => {
    if (!value) return 'กรุณากรอกข้อมูล!'
    if (value.length < 2) return 'ต้องมีอย่างน้อย 2 ตัวอักษร!'
  },
})

if (isConfirmed && value) {
  console.log('ได้รับข้อมูล:', value)
}`,
        tags: ['swal', 'input', 'dialog', 'validation'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-input-2',
        title: 'Select / Dropdown Dialog',
        description: 'dialog ที่มี dropdown select สำหรับเลือกตัวเลือก',
        type: 'code',
        language: 'typescript',
        content: `const { value: selectedRole } = await Swal.fire({
  title: 'เลือก Role',
  input: 'select',
  inputOptions: {
    admin: 'Admin',
    editor: 'Editor',
    viewer: 'Viewer',
  },
  inputPlaceholder: 'เลือก role...',
  showCancelButton: true,
  cancelButtonText: 'ยกเลิก',
  confirmButtonText: 'ยืนยัน',
  inputValidator: (value) => {
    if (!value) return 'กรุณาเลือก role!'
  },
})

if (selectedRole) {
  console.log('Role ที่เลือก:', selectedRole)
}`,
        tags: ['swal', 'input', 'select', 'dropdown'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'swal-status',
    label: 'Status Shortcuts',
    description: 'คำสั่งสั้นๆ สำหรับแสดงสถานะและ auto-close',
    snippets: [
      {
        id: 'swal-status-1',
        title: 'All Status Types',
        description: 'ตัวอย่าง icon type ทั้ง 4 แบบ: success, error, warning, info',
        type: 'code',
        language: 'typescript',
        content: `// ✅ Success
await Swal.fire({ icon: 'success', title: 'สำเร็จ!', text: 'ดำเนินการเรียบร้อยแล้ว' })

// ❌ Error
await Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด!', text: 'กรุณาลองใหม่อีกครั้ง' })

// ⚠️ Warning
await Swal.fire({ icon: 'warning', title: 'คำเตือน', text: 'กรุณาตรวจสอบข้อมูลก่อนดำเนินการ' })

// ℹ️ Info
await Swal.fire({ icon: 'info', title: 'ข้อมูล', text: 'นี่คือข้อมูลที่คุณควรทราบ' })`,
        tags: ['swal', 'status', 'icon'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'swal-status-2',
        title: 'Auto-close with Timer',
        description: 'alert ที่ปิดตัวเองอัตโนมัติพร้อม progress bar',
        type: 'code',
        language: 'typescript',
        content: `await Swal.fire({
  icon: 'success',
  title: 'บันทึกสำเร็จ!',
  text: 'หน้าต่างนี้จะปิดใน 2 วินาที',
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  allowOutsideClick: false,
})`,
        tags: ['swal', 'timer', 'auto-close', 'progress'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
]
