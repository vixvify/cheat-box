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

export type CategoryId =
  | 'create-project'
  | 'npm-install'
  | 'sweetalert'
  | 'folder-structure'

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
