import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_ALL_EMPLOYEE } from "../../../Constants/Config";

const initialState = {
  loading: false,
  employeeListData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchEmployeeListData = createAsyncThunk(
  "isEmployeeList/fetchEmployeeListData.",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(BASE_URL + LIST_ALL_EMPLOYEE, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response)
      if (response.data.status === true) {
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const employeeListDataSlice = createSlice({
  name: "isEmployeeList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployeeListData.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeListData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEmployeeListData.rejected, (state, action) => {
      state.loading = false;
      state.employeeListData = {};
      state.error = action.error.message;
    });
  },
});

export default employeeListDataSlice.reducer;
