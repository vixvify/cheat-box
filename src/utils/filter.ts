import type { Category, CategoryId, SnippetGroup } from '@/core/domain/snippet'

export function getFilteredGroups(
  categories: Category[],
  activeCategory: CategoryId,
  searchQuery: string
): SnippetGroup[] {
  const category = categories.find((c) => c.id === activeCategory)
  if (!category) return []

  const q = searchQuery.trim().toLowerCase()
  if (!q) return category.groups

  return category.groups
    .map((group) => ({
      ...group,
      snippets: group.snippets.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(q) ||
          snippet.description?.toLowerCase().includes(q) ||
          snippet.content.toLowerCase().includes(q) ||
          snippet.tags.some((tag) => tag.toLowerCase().includes(q))
      ),
    }))
    .filter((group) => group.snippets.length > 0)
}
