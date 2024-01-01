import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  config: {
    id: null,
    ip: "",
  },
  selectedConfig: {},
  errorMassage: false,
  isLoading: false,
};

const reducer = createSlice({
  name: "configs",
  initialState,
  reducers: {
    getConfigs: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getConfigsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.selectedConfig = action.payload;
      state.isLoading = false;
    },
    getConfigsError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedConfig = action.payload
        ? action.payload
        : state.selectedConfig;
      state.isLoading = false;
    },
    handleConfig: (state, action) => {},
    handleConfigSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedConfig = action.payload;
    },
    handleConfigError: (state, action) => {},
    updateSelectedConfigInput: (state, action) => {
      state.selectedConfig = action.payload;
    },
  },
});

export default reducer;
