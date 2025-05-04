export const createSingleProjectSlice = (set) => ({
  singleProject: null,
  setSingleProject: (singleProject) => set({ singleProject }),
  prevId: null,
  setprevId: (id) => set({ id }),
});
