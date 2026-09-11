import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Project } from "@/src/types/project";

interface ProjectState {
  selectedProject: Project | null;
}

const initialState: ProjectState = {
  selectedProject: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setSelectedProject } = projectSlice.actions;

export default projectSlice.reducer;
