import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  GET_VERIFIED_MERCHANT,
  GET_VERIFIED_MERCHANT_COUNT,
} from "../../../Constants/Config";
import axios from "axios";

let initialState = {
  loading: false,
  verifiedMerchantData: {},
  verifiedMerchantCount: 0,
  error: "",
};

export const getVerifiedMerchantCount = createAsyncThunk(
  "Verified/getVerifiedMerchantCount",
  async (data) => {
    // console.log(data)
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
    if (response.data.status == 200) {
      return response.data.total_count;
    }
  }
);

export const getVerifiedMerchant = createAsyncThunk(
  "Verified/getVerifiedMerchant",
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
      const customError = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);

export const VerifiedMerchantSlice = createSlice({
  name: "Verified",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVerifiedMerchant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVerifiedMerchant.fulfilled, (state, action) => {
      state.loading = false;
      state.verifiedMerchantData = action.payload;
      state.error = "";
    });
    builder.addCase(getVerifiedMerchant.rejected, (state, action) => {
      state.loading = false;
      state.verifiedMerchantData = {};
      state.error = action.error.message;
    });
    builder.addCase(getVerifiedMerchantCount.fulfilled, (state, action) => {
      state.verifiedMerchantCount = action.payload;
    });
    builder.addCase(getVerifiedMerchantCount.rejected, (state, action) => {
      state.verifiedMerchantCount = 0;
    });
  },
});
export default VerifiedMerchantSlice.reducer;
