import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  LOYALITY_PROGRAM_STORE_LIST,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  loyaltyProgramStore: [],
  successMessage: "",
  error: "",
};

export const fetchloyaltyProgramStore = createAsyncThunk(
  "loyaltyprogram/fetchloyaltyProgramStore",
  async (data, { rejectWithValue }) => {
    const dataNew = {
      merchant_id: data?.merchantId,
      token_id: data?.tokenId,
      login_type: data?.tokenType,
    };
    try {
      const response = await axios.post(
        BASE_URL + LOYALITY_PROGRAM_STORE_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${data?.token}`,
          },
        }
      );

      if (response?.data?.status == true) {
        return response?.data?.loyalty_program_data;
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

const loyaltyprogramStoreSlice = createSlice({
  name: "loyaltyprogram",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchloyaltyProgramStore.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchloyaltyProgramStore.fulfilled, (state, action) => {
      state.loading = false;
      state.loyaltyProgramStore = action.payload;
      state.error = "";
    });
    builder.addCase(fetchloyaltyProgramStore.rejected, (state, action) => {
      state.loading = false;
      state.loyaltyProgramStore = [];
      state.error = action.error.message;
    });
  },
});

export default loyaltyprogramStoreSlice.reducer;
