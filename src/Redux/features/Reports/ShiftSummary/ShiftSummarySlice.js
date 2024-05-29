import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GET_SHIFT_SUMMARY_LIST } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  shiftsummaryData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchshiftsummaryData = createAsyncThunk(
  "ShiftSummarylist/fetchshiftsummaryData.",
  async (data) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + GET_SHIFT_SUMMARY_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const ShiftSummarySlice = createSlice({
  name: "ShiftSummarylist",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchshiftsummaryData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchshiftsummaryData.fulfilled, (state, action) => {
      state.loading = false;
      state.shiftsummaryData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchshiftsummaryData.rejected, (state, action) => {
      state.loading = false;
      state.shiftsummaryData = {};
      state.error = action.error.message;
    });
  },
});

export default ShiftSummarySlice.reducer;
