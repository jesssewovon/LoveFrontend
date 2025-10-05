// store/formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setIsSaving, hideOffcanvas, setUser } from "./userSlice";
import api from "../api"
import { navigate } from "../navigationService";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

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
  interested_gender: "",
  relationship_goal: "",
  images: {},
  reactions: [],
};

const formSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
    setReactions: (state, action) => {
      state.reactions = action.payload;
    },
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profile, { rejectWithValue, dispatch }) => {
      //console.log('updateProfile', profile)
      //alert('updateProfile')
      const formData = new FormData();
  
      formData.append("firstname", profile.firstname);
      if (profile.about_me) {
        formData.append("about_me", profile.about_me);
      }
      formData.append("birthdate", profile.birthdate);
      formData.append("gender", profile.gender);
      if (profile.address) {
        formData.append("address", profile.address);
      }
      
      formData.append("interested_gender", profile.interested_gender);
      if (profile.interested_min_age) {
        formData.append("interested_min_age", profile.interested_min_age);
      }
      if (profile.interested_max_age) {
        formData.append("interested_max_age", profile.interested_max_age);
      }
      if (profile.interested_max_distance) {
        formData.append("interested_max_distance", profile.interested_max_distance);
      }
      formData.append("relationship_goal", profile.relationship_goal);
      profile.sexual_orientation?.forEach((val, index) => {
          if (val) {
              formData.append("sexual_orientation[]", val);
          }
      })
      //formData.append("interests[]", '');
      profile.interests?.forEach((val, index) => {
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
              MySwal.fire({ 
                title: "Info",
                text: res.data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              //console.log(res.data)
              dispatch(setUser(res.data.user))
              //navigate('/home')
          }else{
            MySwal.fire({ 
                title: "Info",
                text: res.data.message,
                icon: "error",
                showConfirmButton: false,
            });
          }
          console.log('res', res.data)
      }).catch(error => {
          MySwal.fire({ 
            title: "Info",
            text: t('an_error_occured'),
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
          console.log('error', error)
      });
  }
);

export const { updateField, resetForm, setReactions } = formSlice.actions;
export default formSlice.reducer;
