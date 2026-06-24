import { NextResponse } from "next/server";
import { fetchUserPRs } from "@/core/service/github-service";

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return NextResponse.json(
        { error: "GITHUB_USERNAME is not configured in .env file." },
        { status: 400 },
      );
    }

    const prs = await fetchUserPRs(username, token);
    return NextResponse.json(prs);
  } catch (err: unknown) {
    console.error("GET /api/github/prs error:", err);
    const errMsg =
      err instanceof Error ? err.message : "Failed to fetch Pull Requests.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
