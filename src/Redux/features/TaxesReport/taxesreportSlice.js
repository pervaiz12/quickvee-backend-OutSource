import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_TAXES_REPORT } from "../../../Constants/Config";

const initialState = {
  loading: false,
  taxesreportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchtaxesreportData = createAsyncThunk(
  "taxesreport/fetchtaxesreportData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(BASE_URL + LIST_TAXES_REPORT, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "Success") {
        return response.data;
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

const taxesreportSlice = createSlice({
  name: "taxesreport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchtaxesreportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchtaxesreportData.fulfilled, (state, action) => {
      state.loading = false;
      state.taxesreportData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchtaxesreportData.rejected, (state, action) => {
      state.loading = false;
      state.taxesreportData = {};
      state.error = action.error.message;
    });
  },
});

export default taxesreportSlice.reducer;
