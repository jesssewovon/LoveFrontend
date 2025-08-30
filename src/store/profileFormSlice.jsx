// store/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  birthdate: "",
  gender: "",
  sexual_orientation: [
      {name: "straight", value: false},
      {name: "gay", value: false},
      {name: "lesbian", value: false},
      {name: "bisexual", value: false},
      {name: "asexual", value: false},
      {name: "queer", value: false},
      {name: "asexual", value: false},
      {name: "demisexual", value: false},
  ],
  date_filter_gender: "",
  relationship_goal: "",
  images: [],
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
