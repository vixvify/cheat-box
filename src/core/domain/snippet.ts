export type SnippetLanguage =
  | 'bash'
  | 'typescript'
  | 'javascript'
  | 'go'
  | 'json'
  | 'yaml'
  | 'text'

export type SnippetType = 'command' | 'code' | 'tree'

export interface Snippet {
  id: string
  title: string
  description?: string
  type: SnippetType
  content: string
  language: SnippetLanguage
  tags: string[]
  createdAt: number
  updatedAt: number
}

export interface SnippetGroup {
  id: string
  label: string
  description?: string
  snippets: Snippet[]
}

export interface Project {
  id: string
  name: string
  techStack: string
  description: string
  status: 'In Progress' | 'Completed' | 'Planning' | 'On Hold'
  updatedAt: number
  repoUrl?: string | null
}

export type CategoryId =
  | 'current-projects'
  | 'github-prs'
  | 'create-project'
  | 'npm-install'
  | 'sweetalert'
  | 'folder-structure'
  | 'mui-components'
  | 'git-commands'
  | 'docker-commands'
  | 'agent-md'

export interface Category {
  id: CategoryId
  label: string
  icon: string
  description: string
  groups: SnippetGroup[]
}

export interface SnippetFormData {
  title: string
  description: string
  type: SnippetType
  content: string
  language: SnippetLanguage
  tags: string[]
}

export interface GroupFormData {
  label: string
  description: string
}
