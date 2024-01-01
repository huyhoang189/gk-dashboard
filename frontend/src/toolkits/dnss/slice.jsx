import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dnss: [],
  dns: {
    id: null,
    ip: "",
  },
  selectedDns: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "dnss",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDns =
        action.payload !== null ? action.payload : initialState.dns;
    },
    getDnss: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDnssSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.dnss = action.payload;
      state.isLoading = false;
    },
    getDnssError: (state, action) => {
      state.errorMassage = "Error";
      state.dnss = action.payload ? action.payload : state.dnss;
      state.isLoading = false;
    },
    handleDns: (state, action) => {},
    handleDnsSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedDns = action.payload;
    },
    handleDnsError: (state, action) => {},
    updateSelectedDnsInput: (state, action) => {
      state.selectedDns = action.payload;
    },
  },
});

export default reducer;
