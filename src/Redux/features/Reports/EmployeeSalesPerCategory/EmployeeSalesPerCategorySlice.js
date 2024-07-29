import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, EMPLOYEE_SALES_PER_CATEGORY_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  EmployeeSalesPerCategoryData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchEmployeeSalesPerCategoryData = createAsyncThunk(
  "EmployeeSalesPerCategorySlice/fetchEmployeeSalesPerCategoryData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...newData } = data;
      const response = await axios.post(
        BASE_URL + EMPLOYEE_SALES_PER_CATEGORY_REPORT,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response.data);
        return response.data.report_data;
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

const EmployeeSalesPerCategorySlice = createSlice({
  name: "EmployeeSalesPerCategorySlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeSalesPerCategoryData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployeeSalesPerCategoryData.fulfilled, (state, action) => {
      state.loading = false;
      state.EmployeeSalesPerCategoryData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEmployeeSalesPerCategoryData.rejected, (state, action) => {
      state.loading = false;
      state.EmployeeSalesPerCategoryData = {};
      state.error = action.error.message;
    });
  },
});

export default EmployeeSalesPerCategorySlice.reducer;
