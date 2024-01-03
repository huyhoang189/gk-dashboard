import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: {
    id: null,
    ip: "",
  },
  selectedSession: {},
  errorMassage: false,
  isLoading: false,
};

const reducer = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    getSessions: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getSessionsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.selectedSession = action.payload;
      state.isLoading = false;
    },
    getSessionsError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedSession = action.payload
        ? action.payload
        : state.selectedSession;
      state.isLoading = false;
    },
    handleSession: (state, action) => {},
    handleSessionSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedSession = action.payload;
    },
    handleSessionError: (state, action) => {},
    updateSelectedSessionInput: (state, action) => {
      state.selectedSession = action.payload;
    },
  },
});

export default reducer;
