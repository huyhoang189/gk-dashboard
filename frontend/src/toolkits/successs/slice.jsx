import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successs: [],
  success: {
    timestamp: "",
    ip_source: "",
    url: "",
    request: "",
    HTTPStatus: 0,
    responseSize: 0,
    raw: "",
  },
  errorMassage: false,
  isLoading: false,
  totalItem: 0,
  currentPage: 0,
  totalPage: 0,
  pageSize: 20,
};

const reducer = createSlice({
  name: "successs",
  initialState,
  reducers: {
    getSuccesss: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getSuccesssSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.successs = action.payload.data;
      state.totalItem = action.payload.totalItem;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getSuccesssError: (state, action) => {
      state.errorMassage = "Error";
      state.successs = action.payload ? action.payload : state.successs;
      state.isLoading = false;
    },
  },
});

export default reducer;
