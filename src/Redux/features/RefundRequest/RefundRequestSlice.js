import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  GET_REFUND_EMAILS,
  GET_REFUND_EMAILS_COUNT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  RefundRequestArr: [],
  RefundRequestCount: 0, // Added RefundRequestCount here
  status: false,
  successMessage: "",
  error: "",
};

// Fetch Refund Requests
export const fetchRefundRequestArr = createAsyncThunk(
  "RefundRequest/fetchRefundRequestArr",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const res = await axios.post(BASE_URL + GET_REFUND_EMAILS, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === true) {
        return { arr: res.data.result, status: res.data.status };
      } else {
        return {
          arr: [],
          status: false,
          error: res.data.message || "Failed to fetch refund requests",
        };
      }
    } catch (err) {
      const customError = {
        message: err.message,
        status: err.response ? err.response.status : "Network Error",
        data: err.response ? err.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);

// Fetch Refund Requests Count
export const fetchRefundRequestArrCount = createAsyncThunk(
  "RefundRequest/fetchRefundRequestArrCount",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const res = await axios.post(
        BASE_URL + GET_REFUND_EMAILS_COUNT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === true) {
        return { count: res.data.count, status: res.data.status };
      } else {
        return {
          count: 0,
          status: false,
          error: res.data.message || "Failed to fetch refund requests count",
        };
      }
    } catch (err) {
      const customError = {
        message: err.message,
        status: err.response ? err.response.status : "Network Error",
        data: err.response ? err.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);

const RefundRequestSlice = createSlice({
  name: "RefundRequest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefundRequestArr.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRefundRequestArr.fulfilled, (state, action) => {
        state.loading = false;
        state.RefundRequestArr = action.payload.arr;
        state.status = action.payload.status;
        state.error = action.payload.error || "";
      })
      .addCase(fetchRefundRequestArr.rejected, (state, action) => {
        state.loading = false;
        state.RefundRequestArr = [];
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(fetchRefundRequestArrCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRefundRequestArrCount.fulfilled, (state, action) => {
        state.loading = false;
        state.RefundRequestCount = action.payload.count;
        state.status = action.payload.status;
        state.error = action.payload.error || "";
      })
      .addCase(fetchRefundRequestArrCount.rejected, (state, action) => {
        state.loading = false;
        state.RefundRequestCount = 0;
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export default RefundRequestSlice.reducer;
