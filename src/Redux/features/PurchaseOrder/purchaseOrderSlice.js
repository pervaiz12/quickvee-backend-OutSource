import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  LIST_ALL_PARCHASE,
  PURCHASE_ORDER_COUNT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  purchaseData: [],
  purchaseDataCount: 0,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchpurchaseData = createAsyncThunk(
  "purchase/fetchpurchaseData.",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(BASE_URL + LIST_ALL_PARCHASE, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // console.log(response.data)
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getPurchaseOrderCount = createAsyncThunk(
  "purchase/getPurchaseOrderCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + PURCHASE_ORDER_COUNT,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    // console.log("getPurchaseOrderCount: ", response);
    if (response.status == 200) {
      return response.data.result;
    }
  }
);

// Generate pening , fulfilled and rejected action type
const purchaseOrderSlice = createSlice({
  name: "purchase",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchpurchaseData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchpurchaseData.fulfilled, (state, action) => {
      state.loading = false;
      state.purchaseData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchpurchaseData.rejected, (state, action) => {
      state.loading = false;
      state.purchaseData = {};
      state.error = action.error.message;
    });
    builder.addCase(getPurchaseOrderCount.fulfilled, (state, action) => {
      state.purchaseDataCount = action.payload;
    });
    builder.addCase(getPurchaseOrderCount.rejected, (state, action) => {
      state.purchaseDataCount = 0;
    });
  },
});

export default purchaseOrderSlice.reducer;
