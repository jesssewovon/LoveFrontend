// store/formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setIsSaving, hideOffcanvas, setUser } from "./userSlice";
import api from "../api"
import { navigate } from "../navigationService";

export const initialState = {
  firstname: "",
  birthdate: "",
  gender: "",
  sexual_orientation: [
      {name: "straight", value: false},
      {name: "gay", value: false},
      {name: "lesbian", value: false},
      {name: "bisexual", value: false},
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

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profile, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
  
      formData.append("firstname", profile.firstname);
      formData.append("birthdate", profile.birthdate);
      formData.append("gender", profile.gender);
      formData.append("address", profile.address);
      
      formData.append("date_filter_gender", profile.date_filter_gender);
      formData.append("date_filter_min_age", profile.date_filter_min_age);
      formData.append("date_filter_max_age", profile.date_filter_max_age);
      formData.append("date_filter_max_distance", profile.date_filter_max_distance);
      formData.append("relationship_goal", profile.relationship_goal);
      profile.sexual_orientation.forEach((val, index) => {
          if (val) {
              formData.append("sexual_orientation[]", val);
          }
      })
      profile.interests.forEach((val, index) => {
          if (val) {
              formData.append("interests[]", val);
          }
      })
      Object.entries(profile.images).forEach(([key, val]) => {
          formData.append(`images[${key}]`, val);
      });
      console.log("update formData", formData);
      //return
      dispatch(setIsSaving(true))
      formData.append("_method", 'put');
      api.post(`/profiles/${profile.id}`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      }).then(res => {
          dispatch(setIsSaving(false))
          console.log("jessss", res.data)
          if (res.data.status === true) {
              //console.log(res.data)
              dispatch(setUser(res.data.user))
              navigate('/home')
          }
          console.log('res', res.data)
      }).catch(error => {
          console.log('error', error)
      });
  }
);

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
