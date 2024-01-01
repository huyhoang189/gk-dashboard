import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threshold: {
    id: null,
    ip: "",
  },
  selectedThreshold: {},
  errorMassage: false,
  isLoading: false,
};

const reducer = createSlice({
  name: "thresholds",
  initialState,
  reducers: {
    getThresholds: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getThresholdsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.selectedThreshold = action.payload;
      state.isLoading = false;
    },
    getThresholdsError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedThreshold = action.payload
        ? action.payload
        : state.selectedThreshold;
      state.isLoading = false;
    },
    handleThreshold: (state, action) => {},
    handleThresholdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedThreshold = action.payload;
    },
    handleThresholdError: (state, action) => {},
    updateSelectedThresholdInput: (state, action) => {
      state.selectedThreshold = action.payload;
    },
  },
});

export default reducer;
