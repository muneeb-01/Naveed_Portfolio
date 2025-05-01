import { create } from "zustand";
import { createProjectSlice } from "./Slice/projectSlice";
import {
  createCurrentPageSlice,
  createTotalPagesSlice,
} from "./Slice/createPaginationSlice";
import { createLatestProjectSlice } from "./Slice/createLatestProjectSlice";

export const useAppStore = create()((...a) => ({
  ...createProjectSlice(...a),
  ...createCurrentPageSlice(...a),
  ...createTotalPagesSlice(...a),
  ...createLatestProjectSlice(...a),
}));
