import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  ADMIN_GET_CUSTOMER,
  GET_CUSTOMER_COUNT,
} from "../../../Constants/Config";
import axios from "axios";
const initialState = {
  loading: false,
  CustomerRecord: {},
  CustomerRecordCount: 0,
  successMessage: "",
  error: "",
};

export const CustomerUpdate = createAsyncThunk(
  "Customer/CustomerUpdate",
  async (data) => {
    // console.log("update data")
    // return data
    // const response = await axios.post( BASE_URL+ADMIN_GET_CUSTOMER,data, { headers: { "Content-Type": "multipart/form-data" } })
    // // console.log(response.data.status)
    // if (response.data.status === 200) {
    //     // console.log()
    //     return response.data.message
    // }
  }
);

export const CustomerFunction = createAsyncThunk(
  "Customer/CustomerFunction",
  async (data) => {
    const { token, ...newData } = data;
    const response = await axios.post(BASE_URL + ADMIN_GET_CUSTOMER, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Use data?.token directly
      },
    });
    if (response.data.status === 200) {
      return response.data.message;
    }
  }
);

export const getCustomersCount = createAsyncThunk(
  "Customer/getCustomersCount",
  async (data) => {
    // console.log(data)
    const { token, ...dataNew } = data;
    const response = await axios.post(BASE_URL + GET_CUSTOMER_COUNT, dataNew, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Use data?.token directly
      },
    });
    console.log("customer count: ", response);
    if (response.data.status == 200) {
      return response.data.data_count;
    }
  }
);

const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(CustomerFunction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CustomerFunction.fulfilled, (state, action) => {
      state.loading = false;
      state.CustomerRecord = action.payload;
      state.error = "";
    });
    builder.addCase(CustomerFunction.rejected, (state, action) => {
      state.loading = false;
      state.CustomerRecord = {};
      state.error = action.error.message;
    });
    builder.addCase(CustomerUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CustomerUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(CustomerUpdate.rejected, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    });
    builder.addCase(getCustomersCount.fulfilled, (state, action) => {
      state.CustomerRecordCount = action.payload;
    });
    builder.addCase(getCustomersCount.rejected, (state, action) => {
      state.CustomerRecordCount = 0;
    });
  },
});

export const { updatecustomerData } = CustomerSlice.actions;

export default CustomerSlice.reducer;
