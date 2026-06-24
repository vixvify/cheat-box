import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const appPassword = process.env.APP_PASSWORD || "admin";

    const isMatch =
      appPassword.startsWith("$2a$") || appPassword.startsWith("$2b$")
        ? await bcrypt.compare(password, appPassword)
        : password === appPassword;

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 },
      );
    }

    const hash = await crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(appPassword))
      .then((buf) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
      );

    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_session", hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 2147483647,
    });

    return response;
  } catch (err: unknown) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดของเซิร์ฟเวอร์" },
      { status: 500 },
    );
  }
}
