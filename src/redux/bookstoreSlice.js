import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const bookStoreSlice = createSlice({
  name: "bookstore",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { loginSuccess ,logoutSuccess} = bookStoreSlice.actions;

export default bookStoreSlice.reducer;
