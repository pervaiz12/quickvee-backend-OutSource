import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  PURCHASE_ORDER_DETAILS_BY_ID,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  purchaseOrderDetail: {},
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchPurchaseOrderById = createAsyncThunk(
  "purchaseOrder/fetchPurchaseOrderById",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + PURCHASE_ORDER_DETAILS_BY_ID,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log("response purchaseOrder by id: ", response);
      if (response.status === 200) {
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const purchaseOrderByIdSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPurchaseOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPurchaseOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.purchaseOrderDetail = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPurchaseOrderById.rejected, (state, action) => {
      state.loading = false;
      state.purchaseOrderDetail = {};
      state.error = action.error.message;
    });
  },
});

export default purchaseOrderByIdSlice.reducer;
