export const createToggleSlice = (set) => ({
  isSidebarHidden: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden })),
  setSidebarHidden: (value) => set({ isSidebarHidden: value }),
});
