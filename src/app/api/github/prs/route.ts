import { NextRequest, NextResponse } from "next/server";
import { fetchUserPRs, fetchReviewRequestedPRs } from "@/core/service/github-service";

export async function GET(request: NextRequest) {
  try {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username) {
      return NextResponse.json(
        { error: "GITHUB_USERNAME is not configured in .env file." },
        { status: 400 },
      );
    }

    const { searchParams } = request.nextUrl;
    const type = searchParams.get("type");

    if (type === "review-requested") {
      const prs = await fetchReviewRequestedPRs(username, token);
      return NextResponse.json(prs);
    } else {
      const prs = await fetchUserPRs(username, token);
      return NextResponse.json(prs);
    }
  } catch (err: unknown) {
    console.error("GET /api/github/prs error:", err);
    const errMsg =
      err instanceof Error ? err.message : "Failed to fetch Pull Requests.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
