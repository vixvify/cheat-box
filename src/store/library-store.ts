import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Category,
  CategoryId,
  Snippet,
  SnippetGroup,
} from "@/core/domain/snippet";
import { getDefaultCategories } from "@/lib/seed-data";

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

  resetToDefaults: () => void;
}

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set) => ({
      categories: getDefaultCategories(),
      activeCategory: "create-project",
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

      resetToDefaults: () =>
        set({
          categories: getDefaultCategories(),
          activeCategory: "create-project",
          searchQuery: "",
          modal: DEFAULT_MODAL,
        }),
    }),
    {
      name: "dev-library-storage",
      partialize: (state) => ({ categories: state.categories }),
    },
  ),
);
