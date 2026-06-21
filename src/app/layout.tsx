import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

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
    <html lang="th" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
