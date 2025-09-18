import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from '@reduxjs/toolkit';

import Offcanvas from 'react-bootstrap/Offcanvas';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

import i18n from "../i18n"; // your i18n config

import api from "../api"
import { navigate } from "../navigationService";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,   // user profile data
    isLoggedIn: false,
    token: "",
    isDarkTheme: true,
    connecting: false,
    isLoading: false,
    isSaving: false,
    isOpenLoading: false,
    settings: {},
    scopes: ["username", "payments", "wallet_address", "preferred_language"],
    /* dateFilter: {
      genders: [],
      min_age: 18,
      max_age: 80,
      max_distance: 80,
    }, */
    dateFilter: null,
    geolocation: null,
    reloadHomePage: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    loggedUserOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = "";
    },
    setIsLoggedIn: (state, action) => {
      alert('in setIsLoggedIn')
      state.isLoggedIn = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    setIsDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
      if (state.isDarkTheme===true) {
        document.body.classList.add("theme-dark");
      }else{
        document.body.classList.remove("theme-dark");
      }
    },
    setBodyClass: (state, action) => {
        document.body.classList.add(action.payload);
    },
    setDateFilter: (state, action) => {
        state.dateFilter = action.payload;
    },
    setGeolocation: (state, action) => {
        state.geolocation = action.payload;
    },
    setReloadHomePage: (state, action) => {
        state.reloadHomePage = action.payload;
    },
    setSettings: (state, action) => {
        state.settings = action.payload;
    },
    showOffcanvas(id) {
        var myOffcanvas = document.getElementById(id)
        var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
        if (bsOffcanvas) {
            bsOffcanvas.show()
        }
    },
    hideOffcanvas(id) {
        var myOffcanvas = document.getElementById(id)
        var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
        if (bsOffcanvas) {
            bsOffcanvas.hide()
        }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinPiketplace.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(signinPiketplace.fulfilled, (state, action) => {
        state.isSaving = false;
        //alert('fulfilled signinPiketplace');
        console.log('fulfilled signinPiketplace', state, action.payload);
        const data = action.payload
        if (data.status==="success") {
            state.isLoggedIn = true;
            state.token = data.token;
            if (data.current_user_for_automatic_update || data.user) {
              state.user = data?.current_user_for_automatic_update??(data?.user??null);
            }
            /* MySwal.fire({ 
              title: "Hello!",
              text: "Connexion new1",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            }); */
            if(data.redirectTo) {
                navigate(data.redirectTo)
            }else{
                navigate('/home')
            }
        }
      })
      .addCase(signinPiketplace.rejected, (state, action) => {
        //alert('rejected signinPiketplace');
        state.isLoading = false;
        state.error = action.payload || 'Authentication failed';
      })
      .addCase(signoutPiketplace.pending, (state) => {
        //alert('pending signoutPiketplace');
        state.isLoading = true;
      })
      .addCase(signoutPiketplace.fulfilled, (state, action) => {
        console.log('fulfilled signoutPiketplace');
        state.isLoading = false;
        //alert('fulfilled signoutPiketplace');
        console.log('fulfilled signoutPiketplace', state, action.payload);
        const data = action.payload
        if (data.status=='success') {
            state.isLoggedIn = false;
            state.token = "";
            state.user = null;
            /* MySwal.fire({
              title: <p>Hello React JSX!</p>,
              text: "Deconnexion",
              icon: "success",
              //confirmButtonText: "Cool",
              showConfirmButton: false,
              timer: 1500
            }); */
            navigate('/')
        }
      })
      .addCase(signoutPiketplace.rejected, (state, action) => {
        console.log('rejected signoutPiketplace', state, action);
        //alert('rejected signoutPiketplace');
        state.isLoading = false;
        //state.error = action.payload || 'Authentication failed';
      })
      ;
  },
});

export const signinPiketplace = createAsyncThunk(
  'auth/signinPiketplace',
  async (geolocation, { rejectWithValue, dispatch }) => {
    const scopes = ["username", "payments", "wallet_address", "preferred_language"];
    const onIncompletePaymentFound = (payment) =>{
        //console.log('signin onIncompletePaymentFound', payment)
        const txid = payment.transaction.txid;
        const txUrl = payment.transaction._link;
        const paymentId = payment.identifier;
        const data = {
            paymentId:paymentId,
            txid:txid,
        }
        //self.executePaymentCompletion(data)
        //We're not allowed to cancel a payment after approve
        //this.dispatch('cancelPayment', data)
    };
    try {
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log('signinPiketplace', auth)
      const authResult = auth
        const referred_by = document.getElementById('referred_by')
        if (referred_by) {
            authResult.referred_by = referred_by.value
        }
        //alert(authResult.referred_by)
        const config = {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        }};
        //authResult.user_country = this.user_country
        authResult.geolocation = geolocation
        const res = await api.post(`/signin`, { authResult }, config)
        return res.data
      //return auth; // this goes to `fulfilled` reducer
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signoutPiketplace = createAsyncThunk(
  'auth/signoutPiketplace',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post('/signout')
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const { setUser, clearUser, setIsDarkTheme, setIsLoggedIn,
  setIsLoading, loggedUserOut, hideOffcanvas, showOffcanvas, setSettings,
  setIsSaving, setDateFilter, setGeolocation, setReloadHomePage, 
} = userSlice.actions;
export default userSlice.reducer;