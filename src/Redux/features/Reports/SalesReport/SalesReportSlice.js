import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, SALES_REPORT_LIST } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  SalesReportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchSalesReportData = createAsyncThunk(
  "SalesReportList/fetchSalesReportData.",
  async (data) => {
    try {
      const { token, ...newData } = data;

      // console.log(BASE_URL + VENDORS_SALES_REPORT)
      const response = await axios.post(BASE_URL + SALES_REPORT_LIST, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response)
      if (response.data.status === true) {
        // console.log(response.data.sales_data
        //     )
        return response.data.sales_data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const SalesReportSlice = createSlice({
  name: "SalesReportList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSalesReportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSalesReportData.fulfilled, (state, action) => {
      state.loading = false;
      state.SalesReportData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSalesReportData.rejected, (state, action) => {
      state.loading = false;
      state.SalesReportData = {};
      state.error = action.error.message;
    });
  },
});

export default SalesReportSlice.reducer;
