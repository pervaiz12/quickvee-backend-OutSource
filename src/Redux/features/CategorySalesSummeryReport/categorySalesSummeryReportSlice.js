import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  TAXE_CATEGORY_LIST,
  CATEGORY_SALES_SUMMERY_REPORT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  CategoryReport: [],
  categoryloading: false,
  CategorySalesReportRecord: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const CategoryAllData = createAsyncThunk(
  "CategorySalesReport/CategoryAllData",
  async (data, { rejectWithValue }) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + TAXE_CATEGORY_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status?.toLowerCase() === "success") {
        return response.data.result;
      }
    } catch (error) {
      const customError = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);
//get Category sales summery report--------------------------
export const getCategorySalesSummeryData = createAsyncThunk(
  "CategorySalesReport/getCategorySalesSummeryData",
  async (data, { rejectWithValue }) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + CATEGORY_SALES_SUMMERY_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data);
      if (response?.data?.status == true) {
        return response?.data?.report_data;
      }
    } catch (error) {
      const customError = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);
//get Category sales summery report--------------------------

const CategorySalesReportSlice = createSlice({
  name: "CategorySalesReport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(CategoryAllData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CategoryAllData.fulfilled, (state, action) => {
      state.loading = false;
      state.CategoryReport = action.payload;
      state.error = "";
    });
    builder.addCase(CategoryAllData.rejected, (state, action) => {
      state.loading = false;
      state.CategoryReport = {};
      state.error = action.error.message;
    });
    // get category record---------
    builder.addCase(getCategorySalesSummeryData.pending, (state) => {
      state.categoryloading = true;
    });
    builder.addCase(getCategorySalesSummeryData.fulfilled, (state, action) => {
      state.categoryloading = false;
      state.CategorySalesReportRecord = action.payload;
      state.error = "";
    });
    builder.addCase(getCategorySalesSummeryData.rejected, (state, action) => {
      state.categoryloading = false;
      state.CategorySalesReportRecord = [];
      state.error = action.error.message;
    });
    // get category record---------
  },
});

// export const { editAttribute } = attributesSlice.actions;
export default CategorySalesReportSlice.reducer;
