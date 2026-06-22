import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, techStack, description, status } = await request.json();

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        techStack: techStack || "",
        description: description || "",
        status: status || "In Progress",
        updatedAt: BigInt(Date.now()),
      },
    });

    return NextResponse.json({
      id: updatedProject.id,
      name: updatedProject.name,
      techStack: updatedProject.techStack,
      description: updatedProject.description,
      status: updatedProject.status,
      updatedAt: Number(updatedProject.updatedAt),
    });
  } catch (err: any) {
    console.error("PUT /api/projects/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
