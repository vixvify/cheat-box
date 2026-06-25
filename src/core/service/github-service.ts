import type { GitHubPRSearchItem, GitHubComment } from "../domain/github";

interface GitHubPullDetails {
  mergeable: boolean | null;
  mergeable_state: string;
  comments: number;
  review_comments: number;
}

interface GitHubReview {
  user?: {
    login: string;
  };
  state?: string;
}

async function fetchDetail<T>(url: string, token?: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, { headers, cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchUserPRs(
  username: string,
  token?: string,
): Promise<GitHubPRSearchItem[]> {
  if (!username) {
    throw new Error("GitHub username is required.");
  }

  const query = encodeURIComponent(`is:open is:pr author:${username}`);
  const url = `https://api.github.com/search/issues?q=${query}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("GitHub token is invalid or expired.");
    }
    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
      if (rateLimitRemaining === "0") {
        throw new Error(
          "GitHub API rate limit exceeded. Add a GitHub Token in settings to increase your limits.",
        );
      }
      throw new Error(
        "Access forbidden. Verify your token permissions (need repo/read access) or username.",
      );
    }
    const errorData = (await response.json().catch(() => ({}))) as Record<
      string,
      string
    >;
    throw new Error(
      errorData.message || `Failed to fetch PRs (HTTP ${response.status})`,
    );
  }

  const data = (await response.json()) as { items?: GitHubPRSearchItem[] };
  const searchItems = data.items || [];

  const detailedItems = await Promise.all(
    searchItems.map(async (pr) => {
      try {
        const repoPath = pr.repository_url.replace(
          "https://api.github.com/repos/",
          "",
        );
        const [owner, repo] = repoPath.split("/");
        const prNumber = pr.number;

        const pullsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;
        const reviewsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`;

        const [pullDetails, reviews] = await Promise.all([
          fetchDetail<GitHubPullDetails>(pullsUrl, token),
          fetchDetail<GitHubReview[]>(reviewsUrl, token),
        ]);

        const latestReviews: Record<string, string> = {};
        if (Array.isArray(reviews)) {
          reviews.forEach((r) => {
            if (r.user?.login && r.state) {
              latestReviews[r.user.login] = r.state;
            }
          });
        }

        const approvalsCount = Object.values(latestReviews).filter(
          (state) => state === "APPROVED",
        ).length;
        const changesRequested = Object.values(latestReviews).some(
          (state) => state === "CHANGES_REQUESTED",
        );

        return {
          ...pr,
          mergeable: pullDetails ? pullDetails.mergeable : null,
          mergeable_state: pullDetails
            ? pullDetails.mergeable_state
            : "unknown",
          approvals_count: approvalsCount,
          changes_requested: changesRequested,
          comments: pullDetails
            ? pullDetails.comments + pullDetails.review_comments
            : pr.comments,
        };
      } catch (err) {
        console.error(`Failed to fetch details for PR #${pr.number}:`, err);
        return {
          ...pr,
          mergeable: null,
          mergeable_state: "unknown",
          approvals_count: 0,
          changes_requested: false,
        };
      }
    }),
  );

  return detailedItems;
}

export async function fetchPRComments(
  owner: string,
  repo: string,
  number: number,
  token?: string,
): Promise<GitHubComment[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const issueCommentsUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments`;
  const reviewCommentsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${number}/comments`;

  const [issueRes, reviewRes] = await Promise.all([
    fetch(issueCommentsUrl, { headers, cache: "no-store" }),
    fetch(reviewCommentsUrl, { headers, cache: "no-store" }),
  ]);

  if (!issueRes.ok && issueRes.status === 401) {
    throw new Error("GitHub token is invalid or expired.");
  }

  const issueData = issueRes.ok
    ? ((await issueRes.json()) as GitHubComment[])
    : [];
  const reviewData = reviewRes.ok
    ? ((await reviewRes.json()) as GitHubComment[])
    : [];

  const combined = [...issueData, ...reviewData];
  combined.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return combined.map((c) => ({
    id: c.id,
    user: {
      login: c.user?.login || "unknown",
      avatar_url: c.user?.avatar_url || "",
    },
    body: c.body || "",
    created_at: c.created_at,
    html_url: c.html_url,
  }));
}
