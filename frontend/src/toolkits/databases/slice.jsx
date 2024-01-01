import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  database: {
    id: null,
    ip: "",
  },
  selectedDatabase: {},
  errorMassage: false,
  isLoading: false,
};

const reducer = createSlice({
  name: "databases",
  initialState,
  reducers: {
    getDatabases: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDatabasesSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.selectedDatabase = action.payload;
      state.isLoading = false;
    },
    getDatabasesError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedDatabase = action.payload
        ? action.payload
        : state.selectedDatabase;
      state.isLoading = false;
    },
    handleDatabase: (state, action) => {},
    handleDatabaseSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedDatabase = action.payload;
    },
    handleDatabaseError: (state, action) => {},
    updateSelectedDatabaseInput: (state, action) => {
      state.selectedDatabase = action.payload;
    },
  },
});

export default reducer;
