import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {
    user_id: 0,
    username: "",
    password: "",
    role_id: 0,
    roles: {},
  },
  selectedUser: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedUser =
        action.payload !== null ? action.payload : initialState.user;
    },
    getUsers: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.users = action.payload;
      state.isLoading = false;
    },
    getUsersError: (state, action) => {
      state.errorMassage = "Error";
      state.users = action.payload ? action.payload : state.users;
      state.isLoading = false;
    },
    handleUser: (state, action) => {},
    handleUserSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedUser = action.payload;
    },
    handleUserError: (state, action) => {},
    updateSelectedUserInput: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export default reducer;
