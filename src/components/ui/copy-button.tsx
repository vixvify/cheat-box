'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'
import { copyToClipboard } from '@/lib/clipboard'

interface CopyButtonProps {
  content: string
}

export function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [content])

  return (
    <button
      onClick={handleCopy}
      className={`flex cursor-pointer items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ${
        copied
          ? 'border-green-800 bg-green-950/60 text-green-400'
          : 'border-[#333] bg-[#1a1a1a] text-[#aaa] hover:border-[#444] hover:bg-[#222] hover:text-white'
      }`}
      aria-label="Copy to clipboard"
      title={copied ? 'Copied!' : 'Copy'}
    >
      {copied ? (
        <>
          <Check size={12} strokeWidth={2.5} className="shrink-0" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={12} strokeWidth={1.5} className="shrink-0" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}
