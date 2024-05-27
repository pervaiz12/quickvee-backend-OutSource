import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL_SANDBOX,
  BASE_URL,
  GET_ORDER_SUMMERY_DETAILS,
} from "../../../Constants/Config";
import axios from "axios";

const initialState = {
  loading: false,
  orderSummeryDetails: {},
  error: "",
};
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

export const FetchOrderSummeryDetails = createAsyncThunk(
  "orderSummeryDetails/FetchOrderSummeryDetails",
  async (data) => {
    // console.log(data);
    // const { token, ...newData } = data;
    // console.log(newData);
    // console.log(token);
    try {
      const response = await axios.post(
        BASE_URL + GET_ORDER_SUMMERY_DETAILS,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data)
      if (response.data.status === true) {
        return response.data.result;
      }
    } catch (error) {
      console.error("Error fetching order summary details:", error.message);
      throw error; // Rethrow the error to let Redux Toolkit handle it
    }
  }
);

// export const FetchOrderSummeryDetails = createAsyncThunk('orderSummeryDetails/FetchOrderSummeryDetails', async (data) => {
//     const response = await axios.post(
//         'https://sandbox.quickvee.com/MyOrder/detailsNew',
//         data,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log(response)

//     // if (response.data.status === 200) {
//     //     return response.data.result
//     // }
// })

// export const FetchOrderSummeryDetails=createAsyncThunk('orderSummeryDetails/FetchOrderSummeryDetails',async(data)=>{
//     const response= await axios.post(BASE_URL_SANDBOX + GET_ORDER_SUMMERY_DETAILS,data, { headers: { "Content-Type": "multipart/form-data" } });
//     // console.log(response)
// })
const orderSummerySlice = createSlice({
  name: "orderSummeryDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FetchOrderSummeryDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchOrderSummeryDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.orderSummeryDetails = action.payload;
      state.error = "";
    });
    builder.addCase(FetchOrderSummeryDetails.rejected, (state, action) => {
      state.loading = false;
      state.orderSummeryDetails = {};
      // state.error = action.error.message;
    });
  },
});

export default orderSummerySlice.reducer;
