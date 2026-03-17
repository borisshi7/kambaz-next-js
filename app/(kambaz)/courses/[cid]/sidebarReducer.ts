import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../../database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  sidebar: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    clickSidebar: (state) => {
        state.sidebar = !state.sidebar
    }
  },
});
export const { clickSidebar } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
