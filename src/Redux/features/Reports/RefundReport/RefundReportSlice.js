import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, REFUND_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  refundreportData: [],
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
      if (response.data.status === true) {
        return response.data.report_data;
      } else if (
        response.data.status === false &&
        response.data.msg === "No. Data found."
      ) {
        return response.data;
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
      state.refundreportData = action.payload;
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
