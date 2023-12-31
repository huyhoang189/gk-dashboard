import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};

const reducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    collapsedSidebar: (state, action) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export default reducer;
