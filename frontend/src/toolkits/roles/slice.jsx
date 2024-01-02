import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  role: {
    role_id: null,
    name: "",
    permission: "",
  },
  selectedRole: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "roles",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedRole =
        action.payload !== null ? action.payload : initialState.role;
    },
    getRoles: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getRolesSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.roles = action.payload;
      state.isLoading = false;
    },
    getRolesError: (state, action) => {
      state.errorMassage = "Error";
      state.roles = action.payload ? action.payload : state.roles;
      state.isLoading = false;
    },
    handleRole: (state, action) => {},
    handleRoleSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedRole = action.payload;
    },
    handleRoleError: (state, action) => {},
    updateSelectedRoleInput: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export default reducer;
