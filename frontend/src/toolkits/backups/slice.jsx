import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backup: {
    id: null,
    ip: "",
  },
  selectedBackup: {},
  errorMassage: false,
  isLoading: false,
};

const reducer = createSlice({
  name: "backups",
  initialState,
  reducers: {
    getBackups: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getBackupsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.selectedBackup = action.payload[0];
      state.isLoading = false;
    },
    getBackupsError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedBackup = action.payload
        ? action.payload
        : state.selectedBackup;
      state.isLoading = false;
    },
    handleBackup: (state, action) => {},
    handleBackupSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedBackup = action.payload;
    },
    handleBackupError: (state, action) => {},
    updateSelectedBackupInput: (state, action) => {
      state.selectedBackup = action.payload;
    },
  },
});

export default reducer;
