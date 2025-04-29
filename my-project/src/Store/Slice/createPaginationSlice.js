export const createTotalPagesSlice = (set) => ({
  totalPages: 1,
  setTotalPages: (totalPages) => set({ totalPages }),
});

export const createCurrentPageSlice = (set) => ({
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
});
