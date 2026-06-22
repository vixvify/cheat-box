import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    await prisma.project.deleteMany();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("POST /api/projects/reset error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
