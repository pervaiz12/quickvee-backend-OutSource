import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  GET_VERIFIED_MERCHANT,
  GET_VERIFIED_MERCHANT_COUNT,
  LOGIN_VIA_SUPERADMIN,
} from "../../../Constants/Config";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import axios from "axios";

let initialState = {
  loading: false,
  unverifiedMerchantData: [],
  unverifiedMerchantDataCount: 0,
  error: "",
  getDashboardData: [],
};

export const getUnVerifiedMerchant = createAsyncThunk(
  "UnVerified/getUnVerifiedMerchant",
  async (data, { rejectWithValue }) => {
    // console.log(data)
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + GET_VERIFIED_MERCHANT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      //    console.log(response)
      if (response.data.status == 200) {
        return response.data.message;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUnVerifiedMerchantCount = createAsyncThunk(
  "UnVerified/getUnVerifiedMerchantCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + GET_VERIFIED_MERCHANT_COUNT,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    console.log("unverifiedMerchantDataCount: ", response);
    if (response.data.status == 200) {
      return response.data.data_count;
    }
  }
);

//https://sandbox.quickvee.net/Dashboard/login_via_superadmin
export const handleMoveDash = createAsyncThunk(
  "UnVerified/handleMoveDash",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        "https://sandbox.quickvee.net/Dashboard/login_via_superadmin",
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === true) {
        console.log(response?.data?.stores);

        // Cookies.remove("token_data")
        // Cookies.remove("loginDetails")
        const dataNew = {
          data: response?.data?.data,
          token: response?.data?.token,
          token_id: response?.data?.token_id,
          login_type: response?.data?.login_type,
          final_login: response?.data?.final_login,
          status: response?.data?.status,
        };

        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(dataNew),
          "secret key"
        ).toString();
        console.log(response?.data?.stores);
        Cookies.set("token_data", encryptedData);
        Cookies.set("loginDetails", response?.data?.stores);
        localStorage.setItem(
          "AllStore",
          JSON.stringify(response?.data?.stores)
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    }
  }
);

export const UnVerifiedMerchantSlice = createSlice({
  name: "UnVerified",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUnVerifiedMerchant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUnVerifiedMerchant.fulfilled, (state, action) => {
      state.loading = false;
      state.unverifiedMerchantData = action.payload;
      state.error = "";
    });
    builder.addCase(getUnVerifiedMerchant.rejected, (state, action) => {
      state.loading = false;
      state.unverifiedMerchantData = {};
      state.error = action.error.message;
    });
    builder.addCase(getUnVerifiedMerchantCount.fulfilled, (state, action) => {
      state.unverifiedMerchantDataCount = action.payload;
    });
    builder.addCase(getUnVerifiedMerchantCount.rejected, (state, action) => {
      state.unverifiedMerchantDataCount = 0;
    });
    // ==================
    // builder.addCase(handleMoveDash.pending, (state) => {
    //     state.loading = true;
    // })
    // builder.addCase(handleMoveDash.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.getDashboardData = action.payload;
    //     state.error = '';
    // })
    // builder.addCase(handleMoveDash.rejected, (state, action) => {
    //     state.loading = false;
    //     // state.unverifiedMerchantData = {};
    //     state.error = action.error.message;
    // })
    // =================
  },
});
export default UnVerifiedMerchantSlice.reducer;
