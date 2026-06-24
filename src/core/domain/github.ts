export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string | null;
}

export interface GitHubPRSearchItem {
  id: number;
  number: number;
  title: string;
  state: string;
  locked: boolean;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  draft?: boolean;
  html_url: string;
  repository_url: string;
  comments: number;
}
