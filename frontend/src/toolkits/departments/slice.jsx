import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  department: {},
  selectedDepartment: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "departments",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDepartment =
        action.payload !== null ? action.payload : initialState.department;
    },
    getDepartments: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDepartmentsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.departments = action.payload;
      state.isLoading = false;
    },
    getDepartmentsError: (state, action) => {
      state.errorMassage = "Error";
      state.departments = action.payload ? action.payload : state.departments;
      state.isLoading = false;
    },
    handleDepartment: (state, action) => {},
    handleDepartmentSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedDepartment = action.payload;
    },
    handleDepartmentError: (state, action) => {},
    updateSelectedDepartmentInput: (state, action) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export default reducer;
