import { create } from "zustand";
import { createProjectSlice } from "./Slice/projectSlice";
import {
  createCurrentPageSlice,
  createTotalPagesSlice,
} from "./Slice/createPaginationSlice";
import { createLatestProjectSlice } from "./Slice/createLatestProjectSlice";
import { createSingleProjectSlice } from "./Slice/SingleProjectSlice";

export const useAppStore = create()((...a) => ({
  ...createProjectSlice(...a),
  ...createCurrentPageSlice(...a),
  ...createTotalPagesSlice(...a),
  ...createLatestProjectSlice(...a),
  ...createSingleProjectSlice(...a),
}));
