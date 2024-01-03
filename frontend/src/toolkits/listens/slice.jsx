import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listens: [],
  listen: {
    listen_id: null,
    name: "",
    permission: "",
  },
  selectedListen: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  totalItem: 0,
  currentPage: 0,
  pageSize: 0,
};

const reducer = createSlice({
  name: "listens",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedListen =
        action.payload !== null ? action.payload : initialState.listen;
    },
    getListens: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getListensSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.listens = action.payload.data;
      state.totalItem = action.payload.totalItem;
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getListensError: (state, action) => {
      state.errorMassage = "Error";
      state.listens = action.payload ? action.payload : state.listens;
      state.isLoading = false;
    },
    handleListen: (state, action) => {},
    handleListenSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedListen = action.payload;
    },
    handleListenError: (state, action) => {},
    updateSelectedListenInput: (state, action) => {
      state.selectedListen = action.payload;
    },
  },
});

export default reducer;
