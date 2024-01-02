import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  isLogin: false,
  modalActive: false,
  errorMessage: false,
};

const reducer = createSlice({
  name: "auths",
  initialState,
  reducers: {
    checkAuthentication: (state, action) => {},
    login: (state, action) => {
      state.errorMessage = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.errorMessage = false;
    },
    loginError: (state, action) => {
      state.isLogin = false;
      state.errorMessage = action.payload.error;
    },
    logout: (state, action) => {
      state.user = initialState.user;
      state.isLogin = false;
    },
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
    },
    forgotPassword: (state, action) => {},
  },
});

export default reducer;
