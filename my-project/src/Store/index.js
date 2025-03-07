import { create } from "zustand";
import { createAuthSlice } from "./Slice/authSlice";
import { createParagraphSlice } from "./Slice/paragraphSlice";
import {createProjectSlice} from "./Slice/projectSlice";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createParagraphSlice(...a),
  ...createProjectSlice(...a)
}));
