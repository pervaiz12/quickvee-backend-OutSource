import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  NEW_CUSTOMER_ADDED_REPORT,
} from "../../../../Constants/Config";

const initialState = {
  loading: false,
  NewCustomersAddedReportArr: [],
  status: false,
  successMessage: "",
  error: "",
};

export const fetchNewCustomersAddedReportArr = createAsyncThunk(
  "NewCustomersAddedReport/fetchNewCustomersAddedReportArr",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const res = await axios.post(
        BASE_URL + NEW_CUSTOMER_ADDED_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.status === true) {
        console.log(res)

        const arr = res.data.new_customer_list;
        const status = res.data.status;
        return { arr, status };
      } else if (res.data.status === false) {
      
        const arr = [];
        const status = false;
        return { arr, status };
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

const NewCustomersAddedReportSlice = createSlice({
  name: "NewCustomersAddedReport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNewCustomersAddedReportArr.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNewCustomersAddedReportArr.fulfilled,
      (state, action) => {
        state.loading = false;
        state.NewCustomersAddedReportArr = action.payload.arr;
        state.status = action.payload.status;
        state.error = "";
      }
    );
    builder.addCase(
      fetchNewCustomersAddedReportArr.rejected,
      (state, action) => {
        state.loading = false;
        state.NewCustomersAddedReportArr = [];
        state.error = action.error.message;
      }
    );
  },
});
export default NewCustomersAddedReportSlice.reducer;
