import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  challenges: [],
  challenge: {
    timestamp: "",
    ip_source: "",
    url: "",
    request: "",
    HTTPStatus: 0,
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
  name: "challenges",
  initialState,
  reducers: {
    getChallenges: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getChallengesSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.challenges = action.payload.data;
      state.totalItem = action.payload.totalItem;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getChallengesError: (state, action) => {
      state.errorMassage = "Error";
      state.challenges = action.payload ? action.payload : state.challenges;
      state.isLoading = false;
    },
  },
});

export default reducer;
