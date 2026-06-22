import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Project } from "@prisma/client";

export async function GET() {
  try {
    const rows = await prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    const projects = (rows as Project[]).map((r) => ({
      id: r.id,
      name: r.name,
      techStack: r.techStack,
      description: r.description,
      status: r.status,
      updatedAt: Number(r.updatedAt),
      repoUrl: r.repoUrl,
    }));

    return NextResponse.json(projects);
  } catch (err: any) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, techStack, description, status, repoUrl } =
      await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        techStack: techStack || "",
        description: description || "",
        status: status || "In Progress",
        updatedAt: BigInt(Date.now()),
        repoUrl: repoUrl || null,
      },
    });

    return NextResponse.json({
      id: newProject.id,
      name: newProject.name,
      techStack: newProject.techStack,
      description: newProject.description,
      status: newProject.status,
      updatedAt: Number(newProject.updatedAt),
      repoUrl: newProject.repoUrl,
    });
  } catch (err: any) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
