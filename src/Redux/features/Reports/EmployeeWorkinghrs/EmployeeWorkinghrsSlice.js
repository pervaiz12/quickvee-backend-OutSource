import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, EMPLOYEE_WORK_HOURS } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  employeewrkhrstData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchemployeewrkhrs = createAsyncThunk(
  "EmployeeWorkinghrsSlice/fetchemployeewrkhrs.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + EMPLOYEE_WORK_HOURS,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        return response.data.report_data;
      } else {
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
// Generate pening , fulfilled and rejected action type

const EmployeeWorkinghrsSlice = createSlice({
  name: "EmployeeWorkinghrsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchemployeewrkhrs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchemployeewrkhrs.fulfilled, (state, action) => {
      state.loading = false;
      state.employeewrkhrstData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchemployeewrkhrs.rejected, (state, action) => {
      state.loading = false;
      state.employeewrkhrstData = {};
      state.error = action.error.message;
    });
  },
});

export default EmployeeWorkinghrsSlice.reducer;
