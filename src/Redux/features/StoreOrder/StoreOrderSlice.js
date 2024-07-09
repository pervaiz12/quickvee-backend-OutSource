import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  GET_STORE_ORDER_DATA,
  GET_STORE_ORDER_DATA_COUNT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  StoreOrderData: [],
  storeOrderCount: 0,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchStoreOrderData = createAsyncThunk(
  "StoreOrderSlice/fetchStoreOrderData.",
  async (data , { rejectWithValue }) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + GET_STORE_ORDER_DATA,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response);
        return response.data.store_order_data;
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

export const getStoreOrderCount = createAsyncThunk(
  "StoreOrderSlice/getStoreOrderCount",
  async (data , { rejectWithValue }) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + GET_STORE_ORDER_DATA_COUNT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      console.log("getStoreOrderCount: ", response);
      if (response.data.status) {
        return response.data.data_count;
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

const StoreOrderSlice = createSlice({
  name: "StoreSettingAlertsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStoreOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStoreOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.StoreOrderData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchStoreOrderData.rejected, (state, action) => {
      state.loading = false;
      state.StoreOrderData = [];
      state.error = action.error.message;
    });
    builder.addCase(getStoreOrderCount.fulfilled, (state, action) => {
      state.storeOrderCount = action.payload;
    });
    builder.addCase(getStoreOrderCount.rejected, (state, action) => {
      state.storeOrderCount = 0;
    });
  },
});

export default StoreOrderSlice.reducer;
