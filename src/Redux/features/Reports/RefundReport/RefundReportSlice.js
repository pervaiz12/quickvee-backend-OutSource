import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, REFUND_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  refundreportData: [],
  status: false,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchRefundData = createAsyncThunk(
  "RefundDataList/fetchRefundData",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(BASE_URL + REFUND_REPORT, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      if (response.data.status === true) {
        console.log(response.data)
        const arr = response.data.report_data;
        const status = response.data.status;
        return {arr, status};
      } else if (
        response.data.status === false &&
        response.data.msg === "No Data Found."
      ) {
        console.log("inside else",response.data)
        const arr = [];
        const status = false;
        return {arr, status};
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

const RefundReportSlice = createSlice({
  name: "RefundDataList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRefundData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRefundData.fulfilled, (state, action) => {
      state.loading = false;
      state.refundreportData = action.payload.arr;
      state.status = action.payload.status;
      state.error = "";
    });
    builder.addCase(fetchRefundData.rejected, (state, action) => {
      state.loading = false;
      state.refundreportData = {};
      state.error = action.error.message;
    });
  },
});

export default RefundReportSlice.reducer;
