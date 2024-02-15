import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_ORDER_SUMMARY_DETAILS } from '../../../Constants/Config';

const initialState = {
  loading: false,
  OrderData: [],
  successMessage: "",
  error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchOrderData = createAsyncThunk('OrderSummarySlice/fetchOrderData.', async (data) => {
  try {
    const response = await axios.post(BASE_URL + GET_ORDER_SUMMARY_DETAILS, data, { headers: { "Content-Type": "multipart/form-data" } })
    if (response.data.status === true) {
      // console.log(response.data);
      return response.data.result;
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
})

const OrderSummarySlice = createSlice({
  name: 'OrderSummarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.OrderData = action.payload;
      state.error = '';
    })
    builder.addCase(fetchOrderData.rejected, (state, action) => {
      state.loading = false;
      state.OrderData = {};
      state.error = action.error.message;
    })
  }
})

export default OrderSummarySlice.reducer

