"use client";

import React, { useState } from "react";
import { Copy, Check, Bot, Code, Server } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { AGENT_GUIDELINES } from "@/core/data/agent-guidelines";

export function AgentMd() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");
  const [copied, setCopied] = useState(false);

  const activeGuideline = AGENT_GUIDELINES.find((g) => g.id === activeTab) || AGENT_GUIDELINES[0];

  const handleCopy = async () => {
    const success = await copyToClipboard(activeGuideline.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = activeGuideline.content.split("\n");

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="flex items-center justify-between border-b border-[#1e1e1e] pb-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[#bbb] flex items-center gap-2">
            <Bot size={15} className="text-[#888]" />
            Agent Guidelines (agent.md)
          </h2>
          <p className="mt-1 text-xs text-[#555]">
            คัดลอกคำสั่งควบคุม Custom Rules (System Prompts) สำหรับสั่งงาน AI Coding Assistant
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`flex cursor-pointer items-center gap-1.5 rounded border px-3.5 py-2 text-xs font-semibold transition-all duration-150 ${
            copied
              ? "border-green-800 bg-green-950/60 text-green-400"
              : "border-[#2a2a2a] bg-[#111] text-white hover:bg-[#1a1a1a]"
          }`}
          title={copied ? "คัดลอกแล้ว!" : "คัดลอกกฎทั้งหมด"}
        >
          {copied ? (
            <>
              <Check size={13} strokeWidth={2.5} className="shrink-0" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} strokeWidth={1.5} className="shrink-0" />
              <span>Copy Instruction</span>
            </>
          )}
        </button>
      </div>

      <div className="flex gap-2 border-b border-[#111] pb-2">
        {AGENT_GUIDELINES.map((guideline) => (
          <button
            key={guideline.id}
            onClick={() => setActiveTab(guideline.id)}
            className={`flex cursor-pointer items-center gap-2 rounded px-4 py-2 text-xs font-semibold transition-all duration-150 ${
              activeTab === guideline.id
                ? "bg-white/10 text-white border border-[#333]"
                : "text-[#666] hover:bg-white/5 hover:text-[#bbb]"
            }`}
          >
            {guideline.id === "frontend" ? <Code size={13} /> : <Server size={13} />}
            {guideline.name}
          </button>
        ))}
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden rounded border border-[#1e1e1e] bg-[#050505]">
        <div className="flex items-center justify-between border-b border-[#181818] bg-[#0a0a0a] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
            <span className="ml-2.5 font-mono text-[11px] text-[#555]">
              {activeGuideline.fileName}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#444] uppercase">markdown</span>
        </div>

        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed select-text">
          <div className="flex min-w-full">
            <div className="w-10 shrink-0 select-none border-r border-[#181818] pr-3 text-right text-[#333]">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="flex-1 pl-4 text-[#aaa] whitespace-pre">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`min-h-[1.5rem] hover:bg-white/5 hover:text-white ${
                    line.startsWith("#")
                      ? "text-blue-400 font-bold"
                      : line.startsWith("-") || line.startsWith("*")
                        ? "text-purple-400"
                        : line.startsWith("`")
                          ? "text-emerald-400"
                          : ""
                  }`}
                >
                  {line || " "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
