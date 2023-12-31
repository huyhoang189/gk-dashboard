import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blacklists: [],
  blacklist: {
    id: null,
    ip: "",
  },
  selectedBlacklist: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "blacklists",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedBlacklist =
        action.payload !== null ? action.payload : initialState.blacklist;
    },
    getBlacklists: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getBlacklistsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.blacklists = action.payload.map((ip) => ({ ip }));
      state.isLoading = false;
    },
    getBlacklistsError: (state, action) => {
      state.errorMassage = "Error";
      state.blacklists = action.payload ? action.payload : state.blacklists;
      state.isLoading = false;
    },
    handleBlacklist: (state, action) => {},
    handleBlacklistSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedBlacklist = action.payload;
    },
    handleBlacklistError: (state, action) => {},
    updateSelectedBlacklistInput: (state, action) => {
      state.selectedBlacklist = action.payload;
    },
  },
});

export default reducer;
