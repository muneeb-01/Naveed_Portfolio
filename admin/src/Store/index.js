import { create } from "zustand";
import { createToggleSlice } from "./Slice/createToggleSlice";
import { createModeSlice } from "./Slice/createModeSlice";
import { createAuthSlice } from "./Slice/createAuthSlice";
import { createProjectSlice } from "./Slice/createProjectsSlice";
export const useAppStore = create()((...a) => ({
  ...createToggleSlice(...a),
  ...createModeSlice(...a),
  ...createAuthSlice(...a),
  ...createProjectSlice(...a),
}));
