import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  LIST_CURRENT_INVENTORY_REPORT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  currentInventoryreportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchcurrentInventoryreportData = createAsyncThunk(
  "currentInventoryreport/fetchcurrentInventoryreportData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + LIST_CURRENT_INVENTORY_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        return response.data.result;
      } else if (
        response.data.status === "Failed" &&
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
// Generate pening , fulfilled and rejected action type

const currentInventoryreportSlice = createSlice({
  name: "currentInventoryreport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchcurrentInventoryreportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchcurrentInventoryreportData.fulfilled,
      (state, action) => {
        state.loading = false;
        state.currentInventoryreportData = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchcurrentInventoryreportData.rejected,
      (state, action) => {
        state.loading = false;
        state.currentInventoryreportData = {};
        state.error = action.error.message;
      }
    );
  },
});

export default currentInventoryreportSlice.reducer;
