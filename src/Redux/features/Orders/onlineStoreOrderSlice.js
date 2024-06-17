import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  LIST_ALL_STORE_ORDER_LIST,
  UPDATE_ORDER_STATUS,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  onlineStoreOrderData: [],
  OrderChangeStatusData: [],
  OrderListCount:0,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchOnlieStoreOrderData = createAsyncThunk(
  "onlineStoreOrder/fetchOnlieStoreOrderData.",
  async (data) => {
    const{token,...newData}=data
    try {
      const response = await axios.post(
        BASE_URL + LIST_ALL_STORE_ORDER_LIST,
        newData,
        { headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`,} }
      );
      // console.log(response)
      if (response.data.status === true) {
        return response.data.order_data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchOrderChangeStatusData = createAsyncThunk(
  "onlineStoreOrder/fetchOrderChangeStatusData.",
  async (data) => {
    const{token,...newData}=data
    try {
      const response = await axios.post(BASE_URL + UPDATE_ORDER_STATUS, newData, {
        headers: { "Content-Type": "multipart/form-data" ,Authorization: `Bearer ${token}`},
      });
      console.log(response);
      if (response.data.status === true) {
        return response.data.message;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getOrderListCount = createAsyncThunk(
  "purchase/getPurchaseOrderCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + "Order_list_api/all_order_list_count",
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    console.log("AllInStoreDataState OrderListCount: ", response.data.order_data);
    if (response.status == 200) {
      return response.data.order_data;
    }
  }
);

const onlineStoreOrderSlice = createSlice({
  name: "onlineStoreOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOnlieStoreOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOnlieStoreOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.onlineStoreOrderData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchOnlieStoreOrderData.rejected, (state, action) => {
      state.loading = false;
      state.onlineStoreOrderData = {};
      state.error = action.error.message;
    });
    // for Chnage order status
    builder.addCase(fetchOrderChangeStatusData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderChangeStatusData.fulfilled, (state, action) => {
      state.loading = false;
      state.OrderChangeStatusData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchOrderChangeStatusData.rejected, (state, action) => {
      state.loading = false;
      state.OrderChangeStatusData = {};
      state.error = action.error.message;
    });
    builder.addCase(getOrderListCount.fulfilled, (state, action) => {
      state.OrderListCount = action.payload;
    });
    builder.addCase(getOrderListCount.rejected, (state, action) => {
      state.OrderListCount = 0;
    });
  },
});

export default onlineStoreOrderSlice.reducer;
