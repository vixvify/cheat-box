import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Category,
  CategoryId,
  Snippet,
  SnippetGroup,
  Project,
} from "@/core/domain/snippet";
import { getDefaultCategories } from "@/lib/seed-data";
import type { GitHubPRSearchItem } from "@/core/domain/github";

interface ModalState {
  type: "add-snippet" | "edit-snippet" | "add-group" | "edit-group" | null;
  categoryId: CategoryId | null;
  groupId: string | null;
  snippet: Snippet | null;
  group: SnippetGroup | null;
}

const DEFAULT_MODAL: ModalState = {
  type: null,
  categoryId: null,
  groupId: null,
  snippet: null,
  group: null,
};

interface LibraryStore {
  categories: Category[];
  projects: Project[];
  isLoadingProjects: boolean;

  activeCategory: CategoryId;
  searchQuery: string;
  modal: ModalState;

  setActiveCategory: (id: CategoryId) => void;
  setSearchQuery: (q: string) => void;

  openAddSnippetModal: (categoryId: CategoryId, groupId: string) => void;
  openEditSnippetModal: (
    categoryId: CategoryId,
    groupId: string,
    snippet: Snippet,
  ) => void;
  openAddGroupModal: (categoryId: CategoryId) => void;
  openEditGroupModal: (categoryId: CategoryId, group: SnippetGroup) => void;
  closeModal: () => void;

  addSnippet: (
    categoryId: CategoryId,
    groupId: string,
    data: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateSnippet: (
    categoryId: CategoryId,
    groupId: string,
    snippetId: string,
    data: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
  ) => void;
  deleteSnippet: (
    categoryId: CategoryId,
    groupId: string,
    snippetId: string,
  ) => void;

  addGroup: (
    categoryId: CategoryId,
    label: string,
    description?: string,
  ) => void;
  updateGroup: (
    categoryId: CategoryId,
    groupId: string,
    label: string,
    description?: string,
  ) => void;
  deleteGroup: (categoryId: CategoryId, groupId: string) => void;

  fetchProjects: () => Promise<void>;
  addProject: (
    name: string,
    techStack: string,
    description: string,
    status: Project["status"],
    repoUrl?: string | null,
  ) => Promise<void>;
  updateProject: (
    id: string,
    name: string,
    techStack: string,
    description: string,
    status: Project["status"],
    repoUrl?: string | null,
  ) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  githubPrs: GitHubPRSearchItem[];
  isLoadingPrs: boolean;
  prsError: string | null;
  fetchGithubPrs: () => Promise<void>;
  reviewRequestedPrs: GitHubPRSearchItem[];
  isLoadingReviewRequests: boolean;
  reviewRequestsError: string | null;
  fetchReviewRequestedPrs: () => Promise<void>;

  resetToDefaults: () => Promise<void>;
}

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      categories: getDefaultCategories(),
      projects: [],
      isLoadingProjects: false,
      githubPrs: [],
      isLoadingPrs: false,
      prsError: null,
      reviewRequestedPrs: [],
      isLoadingReviewRequests: false,
      reviewRequestsError: null,
      activeCategory: "current-projects",
      searchQuery: "",
      modal: DEFAULT_MODAL,

      setActiveCategory: (id) => set({ activeCategory: id, searchQuery: "" }),
      setSearchQuery: (q) => set({ searchQuery: q }),

      openAddSnippetModal: (categoryId, groupId) =>
        set({
          modal: {
            type: "add-snippet",
            categoryId,
            groupId,
            snippet: null,
            group: null,
          },
        }),

      openEditSnippetModal: (categoryId, groupId, snippet) =>
        set({
          modal: {
            type: "edit-snippet",
            categoryId,
            groupId,
            snippet,
            group: null,
          },
        }),

      openAddGroupModal: (categoryId) =>
        set({
          modal: {
            type: "add-group",
            categoryId,
            groupId: null,
            snippet: null,
            group: null,
          },
        }),

      openEditGroupModal: (categoryId, group) =>
        set({
          modal: {
            type: "edit-group",
            categoryId,
            groupId: group.id,
            snippet: null,
            group,
          },
        }),

      closeModal: () => set({ modal: DEFAULT_MODAL }),

      addSnippet: (categoryId, groupId, data) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  groups: cat.groups.map((grp) =>
                    grp.id !== groupId
                      ? grp
                      : {
                          ...grp,
                          snippets: [
                            ...grp.snippets,
                            {
                              ...data,
                              id: crypto.randomUUID(),
                              createdAt: Date.now(),
                              updatedAt: Date.now(),
                            },
                          ],
                        },
                  ),
                },
          ),
        })),

      updateSnippet: (categoryId, groupId, snippetId, data) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  groups: cat.groups.map((grp) =>
                    grp.id !== groupId
                      ? grp
                      : {
                          ...grp,
                          snippets: grp.snippets.map((s) =>
                            s.id !== snippetId
                              ? s
                              : {
                                  ...s,
                                  ...data,
                                  id: snippetId,
                                  createdAt: s.createdAt,
                                  updatedAt: Date.now(),
                                },
                          ),
                        },
                  ),
                },
          ),
        })),

      deleteSnippet: (categoryId, groupId, snippetId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  groups: cat.groups.map((grp) =>
                    grp.id !== groupId
                      ? grp
                      : {
                          ...grp,
                          snippets: grp.snippets.filter(
                            (s) => s.id !== snippetId,
                          ),
                        },
                  ),
                },
          ),
        })),

      addGroup: (categoryId, label, description) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  groups: [
                    ...cat.groups,
                    {
                      id: crypto.randomUUID(),
                      label,
                      description,
                      snippets: [],
                    },
                  ],
                },
          ),
        })),

      updateGroup: (categoryId, groupId, label, description) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  groups: cat.groups.map((grp) =>
                    grp.id !== groupId ? grp : { ...grp, label, description },
                  ),
                },
          ),
        })),

      deleteGroup: (categoryId, groupId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  groups: cat.groups.filter((grp) => grp.id !== groupId),
                },
          ),
        })),

      fetchProjects: async () => {
        set({ isLoadingProjects: true });
        try {
          const res = await fetch("/api/projects");
          if (res.ok) {
            const data = await res.json();
            set({ projects: data });
          }
        } catch (err) {
          console.error("Error fetching projects from API:", err);
        } finally {
          set({ isLoadingProjects: false });
        }
      },

      addProject: async (name, techStack, description, status, repoUrl) => {
        try {
          const res = await fetch("/api/projects", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, techStack, description, status, repoUrl }),
          });
          if (res.ok) {
            const newProject = await res.json();
            set((state) => ({
              projects: [newProject, ...state.projects],
            }));
          }
        } catch (err) {
          console.error("Error adding project to API:", err);
        }
      },

      updateProject: async (id, name, techStack, description, status, repoUrl) => {
        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, techStack, description, status, repoUrl }),
          });
          if (res.ok) {
            const updatedProject = await res.json();
            set((state) => ({
              projects: state.projects.map((p) =>
                p.id === id ? updatedProject : p,
              ),
            }));
          }
        } catch (err) {
          console.error("Error updating project via API:", err);
        }
      },

      deleteProject: async (id) => {
        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            set((state) => ({
              projects: state.projects.filter((p) => p.id !== id),
            }));
          }
        } catch (err) {
          console.error("Error deleting project via API:", err);
        }
      },

      fetchGithubPrs: async () => {
        set({ isLoadingPrs: true, prsError: null });
        try {
          const res = await fetch("/api/github/prs");
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || `Failed to fetch PRs (HTTP ${res.status})`);
          }
          const prs = await res.json();
          set({ githubPrs: prs, prsError: null });
        } catch (err: unknown) {
          console.error("Error fetching GitHub PRs:", err);
          const errMsg = err instanceof Error ? err.message : "Failed to fetch Pull Requests.";
          set({ prsError: errMsg });
        } finally {
          set({ isLoadingPrs: false });
        }
      },

      fetchReviewRequestedPrs: async () => {
        set({ isLoadingReviewRequests: true, reviewRequestsError: null });
        try {
          const res = await fetch("/api/github/prs?type=review-requested");
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || `Failed to fetch review requested PRs (HTTP ${res.status})`);
          }
          const prs = await res.json();
          set({ reviewRequestedPrs: prs, reviewRequestsError: null });
        } catch (err: unknown) {
          console.error("Error fetching review requested PRs:", err);
          const errMsg = err instanceof Error ? err.message : "Failed to fetch review requested Pull Requests.";
          set({ reviewRequestsError: errMsg });
        } finally {
          set({ isLoadingReviewRequests: false });
        }
      },

      resetToDefaults: async () => {
        try {
          const res = await fetch("/api/projects/reset", {
            method: "POST",
          });
          if (res.ok) {
            set({
              categories: getDefaultCategories(),
              activeCategory: "current-projects",
              searchQuery: "",
              modal: DEFAULT_MODAL,
            });
            await get().fetchProjects();
          }
        } catch (err) {
          console.error("Error resetting defaults:", err);
        }
      },
    }),
    {
      name: "dev-library-storage",
      partialize: (state) => ({
        categories: state.categories,
      }),
      merge: (persistedState: unknown, currentState) => {
        if (!persistedState) return currentState;
        const pState = persistedState as Record<string, unknown>;

        const mergedCategories = [...currentState.categories];
        if (Array.isArray(pState.categories)) {
          (pState.categories as Category[]).forEach((pCat) => {
            const index = mergedCategories.findIndex((c) => c.id === pCat.id);
            if (index !== -1) {
              const currentCat = mergedCategories[index];
              const mergedGroups = [...currentCat.groups];
              
              pCat.groups.forEach((pGrp) => {
                const gIndex = mergedGroups.findIndex((g) => g.id === pGrp.id);
                if (gIndex !== -1) {
                  const defaultGroup = mergedGroups[gIndex];
                  const mergedSnippets = [...defaultGroup.snippets];
                  
                  pGrp.snippets.forEach((pSnip) => {
                    const sIndex = mergedSnippets.findIndex((s) => s.id === pSnip.id);
                    if (sIndex !== -1) {
                      mergedSnippets[sIndex] = pSnip;
                    } else {
                      mergedSnippets.push(pSnip);
                    }
                  });
                  
                  mergedGroups[gIndex] = {
                    ...defaultGroup,
                    ...pGrp,
                    snippets: mergedSnippets,
                  };
                } else {
                  mergedGroups.push(pGrp);
                }
              });
              
              mergedCategories[index] = {
                ...currentCat,
                ...pCat,
                groups: mergedGroups,
              };
            }
          });
        }

        return {
          ...currentState,
          ...pState,
          categories: mergedCategories,
          projects: currentState.projects,
        };
      },
    },
  ),
);
