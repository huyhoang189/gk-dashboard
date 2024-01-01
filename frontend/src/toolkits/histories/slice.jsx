import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  histories: [],
  history: {
    timestamp: "",
    error: "",
    client: "",
    server: "",
    request: "",
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
  name: "histories",
  initialState,
  reducers: {
    getHistories: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getHistoriesSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.histories = action.payload.data;
      state.totalItem = action.payload.totalItem;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getHistoriesError: (state, action) => {
      state.errorMassage = "Error";
      state.histories = action.payload ? action.payload : state.histories;
      state.isLoading = false;
    },
  },
});

export default reducer;
