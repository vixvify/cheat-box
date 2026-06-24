'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { SnippetGroup } from '@/components/library/snippet-group'
import { SnippetModal } from '@/components/ui/snippet-modal'
import { GroupModal } from '@/components/ui/group-modal'
import { MuiComponentsLibrary } from '@/components/library/mui-components-library'
import { CurrentProjects } from '@/components/library/current-projects'
import { GithubPrs } from '@/components/library/github-prs'
import { AgentMd } from '@/components/library/agent-md'
import { useLibraryStore } from '@/store/library-store'
import { getFilteredGroups } from '@/utils/filter'

export function LibraryShell() {
  const [mounted, setMounted] = useState(false)
  const { categories, activeCategory, searchQuery, fetchProjects } = useLibraryStore()

  useEffect(() => {
    setMounted(true)
    fetchProjects()
  }, [fetchProjects])

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="flex items-center gap-2.5">
          <div className="h-4 w-4 animate-spin rounded-full border border-[#222] border-t-[#666]" />
          <span className="text-sm text-[#555]">Loading...</span>
        </div>
      </div>
    )
  }

  const filteredGroups = getFilteredGroups(categories, activeCategory, searchQuery)
  const totalSnippets = filteredGroups.reduce((acc, g) => acc + g.snippets.length, 0)

  return (
    <div className="flex h-screen overflow-hidden bg-black text-[#ebebeb]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {activeCategory === 'mui-components' ? (
            <MuiComponentsLibrary />
          ) : activeCategory === 'current-projects' ? (
            <CurrentProjects />
          ) : activeCategory === 'github-prs' ? (
            <GithubPrs />
          ) : activeCategory === 'agent-md' ? (
            <AgentMd />
          ) : (
            <>
              {searchQuery && (
                <p className="mb-5 text-sm text-[#666]">
                  {totalSnippets} result{totalSnippets !== 1 ? 's' : ''} for{' '}
                  <span className="text-[#999]">&quot;{searchQuery}&quot;</span>
                </p>
              )}

              {filteredGroups.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  {searchQuery ? (
                    <>
                      <p className="text-sm text-[#666]">
                        No snippets found for &quot;{searchQuery}&quot;
                      </p>
                      <p className="text-xs text-[#444]">Try a different search term</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-[#666]">No snippets in this category</p>
                      <p className="text-xs text-[#444]">Click Add Group to get started</p>
                    </>
                  )}
                </div>
              ) : (
                filteredGroups.map((group) => (
                  <SnippetGroup
                    key={group.id}
                    group={group}
                    categoryId={activeCategory}
                  />
                ))
              )}
            </>
          )}
        </main>
      </div>

      <SnippetModal />
      <GroupModal />
    </div>
  )
}

