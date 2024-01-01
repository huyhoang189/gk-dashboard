import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  email: {
    id: null,
    email: "",
  },
  selectedEmail: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
};

const reducer = createSlice({
  name: "emails",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedEmail =
        action.payload !== null ? action.payload : initialState.email;
    },
    getEmails: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getEmailsSuccess: (state, action) => {
      state.errorMassage = false;
      //notice
      state.emails = action.payload.map((email) => ({ email }));
      state.isLoading = false;
    },
    getEmailsError: (state, action) => {
      state.errorMassage = "Error";
      state.emails = action.payload ? action.payload : state.emails;
      state.isLoading = false;
    },
    handleEmail: (state, action) => {},
    handleEmailSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedEmail = action.payload;
    },
    handleEmailError: (state, action) => {},
    updateSelectedEmailInput: (state, action) => {
      state.selectedEmail = action.payload;
    },
  },
});

export default reducer;
