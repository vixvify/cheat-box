import type { GitHubPRSearchItem } from "../domain/github";

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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch PRs (HTTP ${response.status})`,
    );
  }

  const data = await response.json();
  return data.items || [];
}
