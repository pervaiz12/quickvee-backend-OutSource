import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ORDER_REFUND_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  OrderRefundData: [],
  status:false,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchOrderRefundData = createAsyncThunk(
  "OrderRefundDataList/fetchOrderRefundData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + ORDER_REFUND_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      if (response.data.status === true) {
        // console.log(response.data)
        const arr = response.data.report_data;
        const status = response.data.status;
        return {arr,status};
      }
      else if (response.data.status ===false){
        const arr =[];
        const status = false;
        return {arr,status};
      }
    } catch (error) {
      // throw new Error(error.response.data.message);
      const customError = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);

const OrderRefundReportSlice = createSlice({
  name: "OrderRefundDataList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrderRefundData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderRefundData.fulfilled, (state, action) => {
      state.loading = false;
      state.OrderRefundData = action.payload.arr;
      state.status = action.payload.status;
      state.error = "";
    });
    builder.addCase(fetchOrderRefundData.rejected, (state, action) => {
      state.loading = false;
      state.OrderRefundData = {};
      state.error = action.error.message;
    });
  },
});

export default OrderRefundReportSlice.reducer;
