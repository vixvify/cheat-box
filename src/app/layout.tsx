import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dev Library — คลังอารมณ์นักพัฒนา',
  description:
    'คลัง snippet และคำสั่งที่ใช้บ่อยสำหรับนักพัฒนา Next.js, Go, และ Elysia — พร้อม copy, add, edit, delete',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
