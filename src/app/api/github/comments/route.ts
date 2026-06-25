import { NextRequest, NextResponse } from "next/server";
import { fetchPRComments } from "@/core/service/github-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const prNumberStr = searchParams.get("number");

    if (!owner || !repo || !prNumberStr) {
      return NextResponse.json(
        { error: "Parameters owner, repo, and number are required." },
        { status: 400 },
      );
    }

    const prNumber = parseInt(prNumberStr, 10);
    if (isNaN(prNumber)) {
      return NextResponse.json(
        { error: "Parameter number must be a valid integer." },
        { status: 400 },
      );
    }

    const token = process.env.GITHUB_TOKEN;
    const comments = await fetchPRComments(owner, repo, prNumber, token);
    return NextResponse.json(comments);
  } catch (err: unknown) {
    console.error("GET /api/github/comments error:", err);
    const errMsg =
      err instanceof Error ? err.message : "Failed to fetch comments.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
