import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, DROP_CASH_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  DropCashReportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchDropCashReportData = createAsyncThunk(
  "DropCashReportList/fetchDropCashReportData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + DROP_CASH_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response)
      if (response.data.status === true) {
        // console.log(response.data
        //     )
        return response.data.drop_cash_data;
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

const DropCashReportSlice = createSlice({
  name: "DropCashReportList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDropCashReportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDropCashReportData.fulfilled, (state, action) => {
      state.loading = false;
      state.DropCashReportData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchDropCashReportData.rejected, (state, action) => {
      state.loading = false;
      state.DropCashReportData = {};
      state.error = action.error.message;
    });
  },
});

export default DropCashReportSlice.reducer;
