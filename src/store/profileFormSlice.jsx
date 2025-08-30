// store/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  birthdate: "",
};

const formSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState
  }
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
