"use client";

import React, { useState } from "react";
import { Terminal, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        window.location.href = "/";
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน");
      }
    } catch (err: unknown) {
      console.error("Login request failed:", err);
      setError("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 py-12 font-sans selection:bg-white/10 selection:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,0.4)_0%,rgba(0,0,0,1)_80%)]" />

      <div className="relative z-10 w-full max-w-sm rounded border border-[#1e1e1e] bg-[#090909]/80 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111] text-[#888] shadow-inner mb-4 transition-all duration-300 hover:border-white/20 hover:text-white">
            <Lock size={20} strokeWidth={1.5} />
          </div>
          <h1 className="text-lg font-bold tracking-wider text-white uppercase">
            Dev Library
          </h1>
          <p className="mt-1.5 text-xs text-[#555] leading-relaxed max-w-[240px]">
            กรุณากรอกรหัสผ่านผ่านระบบความปลอดภัยส่วนตัวเพื่อเข้าใช้งานคลังข้อมูล
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#666]">
              รหัสผ่านเข้าใช้งาน (App Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full rounded border border-[#1c1c1c] bg-[#050505] px-3.5 py-3 text-sm text-white placeholder:text-[#333] transition-all focus:border-[#333] focus:outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-[#444] transition-colors hover:text-white disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex gap-2 rounded border border-red-950/40 bg-red-950/10 p-3 text-xs text-red-400">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#2a2a2a] bg-[#111] py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#181818] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                <span>กำลังเข้ารหัส...</span>
              </>
            ) : (
              <>
                <Terminal size={13} />
                <span>ยืนยันเข้าสู่ระบบ</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
