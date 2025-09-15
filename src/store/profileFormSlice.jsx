// store/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
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
  relationships: [
      {name: "long_term_partner", value: false},
      {name: "long_term_open_to_short", value: false},
      {name: "short_term_open_to_long", value: false},
      {name: "short_term_fun", value: false},
      {name: "new_friends", value: false},
      {name: "still_figuring_it_out", value: false},
  ],
  interests: [
      {name: "ludo", value: false},
      {name: "football", value: false},
      {name: "cricket", value: false},
      {name: "tea", value: false},
      {name: "brunch", value: false},
      {name: "shopping", value: false},
      {name: "instagram", value: false}, 
      {name: "collecting", value: false},
      {name: "travelling", value: false},
      {name: "coffee", value: false},
      {name: "movies", value: false},
      {name: "dancing", value: false},
      {name: "bike", value: false},
      {name: "cars", value: false},
      {name: "study", value: false},
      {name: "walking", value: false},
      {name: "running", value: false},
      {name: "manga", value: false},
  ],
  date_filter_gender: "",
  relationship_goal: "",
  images: {},
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
