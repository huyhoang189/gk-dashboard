import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailHeader: {
    id: null,
    ip: "",
  },
  selectedEmailHeader: {},
  errorMassage: false,
  isLoading: false,
};

const reducer = createSlice({
  name: "emailHeaders",
  initialState,
  reducers: {
    getEmailHeaders: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getEmailHeadersSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.selectedEmailHeader = action.payload;
      state.isLoading = false;
    },
    getEmailHeadersError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedEmailHeader = action.payload
        ? action.payload
        : state.selectedEmailHeader;
      state.isLoading = false;
    },
    handleEmailHeader: (state, action) => {},
    handleEmailHeaderSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedEmailHeader = action.payload;
    },
    handleEmailHeaderError: (state, action) => {},
    updateSelectedEmailHeaderInput: (state, action) => {
      state.selectedEmailHeader = action.payload;
    },
  },
});

export default reducer;
