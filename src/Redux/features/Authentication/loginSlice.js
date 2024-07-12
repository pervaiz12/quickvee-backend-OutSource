// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import {LOGIN_AUTHENICATE2_API,BASE_URL,LOGIN_OTP_AUTHENTICATION,LOGIN_OTP_SUBMIT_AUTHENTICATION} from '../../../Constants/Config'
// // import { useSelector, useDispatch } from "react-redux";
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const initialState = {
//     loading: false,
//     checkemailValidate:false,
//     error:"",
//     EmailValidateOtp:false,
//     CoockieEmailValidate:false,
//     getAuthRecord:[]
// }
// let otp_get_api=BASE_URL+LOGIN_AUTHENICATE2_API
// export const fetchLoginData=createAsyncThunk("LoginAuth/fetchLoginData",async(data)=>{
//     try{
//         const response = await axios.post(otp_get_api, data, { headers: { "Content-Type": "multipart/form-data" } })
//         if (response.status === 200) {
//             // localStorage.setItem('checkemailValidate',response.data);

//             return response.data
//         }

//     }catch(error){
//         console.log(error)//error.response.data.message
//         // throw new Error(error.response.data.message);
//     }
// })

// // OTP CHECK API--------------------------------
// export const handleCheckOTP=createAsyncThunk("LoginAuth/handleCheckOTP",async(data)=>{
//      try{
//           const response = await axios.post(BASE_URL+LOGIN_OTP_AUTHENTICATION, data, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//           console.log(response.data)
//         //   localStorage.setItem('emailValidateOtp',);
//         if(response.data)
//         {
//             Cookies.set('emailValidateOtp',JSON.stringify(response.data));
//         }

//         return response.data

//         }catch(error){
//           console.error("Error validating email:", error.message);
//           throw error;
//         }

// }
// )
// // OTP CHECK API--------------------------------
// // after otp api submit----------------------
// // after otp submit-------------------
// export const handleSubmitOtp=createAsyncThunk("LoginAuth/handleSubmitOtp",async(data)=>{
//     try{
//         const response = await axios.post(BASE_URL+LOGIN_OTP_SUBMIT_AUTHENTICATION, data, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });

//         const decodedData =response?.data!==undefined ? JSON.stringify(response.data):'';
//         Cookies.set('AuthsessionData', decodedData);
//         // return response.data

//     }catch(error)
//     {
//         console.error("Error validating email:", error.message);
//         throw error;
//     }

// })
// // after otp submit-------------------

// const LoginSlice = createSlice({
//     name:'LoginAuth',
//     initialState,
//     reducers: {
//        localAuthCheck(state,action) {
//             state.CoockieEmailValidate=action.payload
//         },
//         getAuthSessionRecord(state,action){
//             state.getAuthRecord=action.payload
//         }
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(fetchLoginData.pending,(state)=>{
//             state.loading=true;
//         });
//         builder.addCase(fetchLoginData.fulfilled,(state,action)=>{
//             state.loading=false;
//             state.checkemailValidate=action.payload;
//         })
//         builder.addCase(fetchLoginData.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//         });
//         // ===================================================
//         builder.addCase(handleCheckOTP.pending,(state)=>{
//             state.loading=true;
//         });
//         builder.addCase(handleCheckOTP.fulfilled,(state,action)=>{
//             state.loading=false;
//             state.EmailValidateOtp=action.payload;
//         })
//         builder.addCase(handleCheckOTP.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//         });
//         // ================================================
//         // builder.addCase(handleSubmitOtp.pending,(state)=>{
//         //     state.loading=true;
//         // });
//         // builder.addCase(handleSubmitOtp.fulfilled,(state,action)=>{
//         //     state.loading=false;
//         //     state.loginAuthResult=action.payload;
//         // })
//         // builder.addCase(handleSubmitOtp.rejected, (state, action) => {
//         //     state.loading = false;
//         //     state.error = action.error.message;
//         // });

//     }
// })
// export const { localAuthCheck,getAuthSessionRecord } = LoginSlice.actions;

// export default LoginSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import axios from "axios";
import {
  BASE_URL,
  LOGIN_OTP_SUBMIT_AUTHENTICATION,
} from "../../../Constants/Config";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: false,
  getUserRecord: [],
  errors: "",
  getUserLoginRecord: [],
  StoreUserDashboardRecord: [],
};

// Async thunk to handle user authentication
export const handleUserType = createAsyncThunk(
  "LoginAuth/handleUserType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL + LOGIN_OTP_SUBMIT_AUTHENTICATION,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localStorage.removeItem("AllStore");
      if (response.data.status === true) {
        // Encrypt response data before storing in cookies
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response.data),
          "secret key"
        ).toString();
        Cookies.set("loginDetails", encryptedData);
        Cookies.set("token_data", encryptedData);

        // Store user authentication record in local storage
        const encoded = btoa(JSON.stringify(data));
        Cookies.set("user_auth_record", encoded);

        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      const customError = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);

export const handleGetStoreRecord = createAsyncThunk(
  "LoginAuth/handleGetStoreRecord",
  async (data) => {
    console.log(BASE_URL + LOGIN_OTP_SUBMIT_AUTHENTICATION);
    try {
      const response = await axios.post(
        BASE_URL + LOGIN_OTP_SUBMIT_AUTHENTICATION,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // localStorage.removeItem("AllStore")
      if (response.data.status === true) {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response?.data),
          "secret key"
        ).toString();
        Cookies.set("token_data", encryptedData);
      }
      return response.data;
    } catch (error) {
      console.error("Error validating email:", error.message);
      throw error;
    }
  }
);

const LoginSlice = createSlice({
  name: "LoginAuth",
  initialState: initialState,
  reducers: {
    getAuthSessionRecord(state, action) {
      state.getUserRecord = action.payload;
    },
    getAuthInvalidMessage(state, action) {
      state.errors = action.payload;
    },
    getUserRecordData(state, action) {
      state.getUserLoginRecord = action.payload;
    },
    getUserDashboardRecord(state, action) {
      state.StoreUserDashboardRecord = action.payload;
    },
  },
});

export const {
  getAuthSessionRecord,
  getAuthInvalidMessage,
  getUserRecordData,
  getUserDashboardRecord,
} = LoginSlice.actions;
export default LoginSlice.reducer;
