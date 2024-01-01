import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  whitelists: [],
  whitelist: {
    id: null,
    ip: "",
  },
  selectedWhitelist: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "whitelists",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedWhitelist =
        action.payload !== null ? action.payload : initialState.whitelist;
    },
    getWhitelists: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getWhitelistsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.whitelists = action.payload.map((ip) => ({ ip }));
      state.isLoading = false;
    },
    getWhitelistsError: (state, action) => {
      state.errorMassage = "Error";
      state.whitelists = action.payload ? action.payload : state.whitelists;
      state.isLoading = false;
    },
    handleWhitelist: (state, action) => {},
    handleWhitelistSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedWhitelist = action.payload;
    },
    handleWhitelistError: (state, action) => {},
    updateSelectedWhitelistInput: (state, action) => {
      state.selectedWhitelist = action.payload;
    },
  },
});

export default reducer;
