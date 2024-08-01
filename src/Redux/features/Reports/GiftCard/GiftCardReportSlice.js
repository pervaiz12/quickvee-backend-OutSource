import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GIFT_CARD_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  GiftCardReportData: [],
  Totalbalance: 0,
  TotalCredit: 0,
  TotalDebit: 0,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchGiftCardReportData = createAsyncThunk(
  "GiftCardReportList/fetchGiftCardReportData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(BASE_URL + GIFT_CARD_REPORT, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === true) {
        return {
          arr: response.data.gc_data,
          total_balance: parseFloat(response.data.total_balance).toFixed(2),
          total_credit: parseFloat(response.data.total_credit).toFixed(2),
          total_debit: parseFloat(response.data.total_debit).toFixed(2),
        };
      }
      else if(response.data.status === false){
        return {
          arr: [],
          total_balance:0,
          total_credit:0,
          total_debit:0,
        };
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

const GiftCardReportSlice = createSlice({
  name: "GiftCardReportList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGiftCardReportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGiftCardReportData.fulfilled, (state, action) => {
      state.loading = false;
      state.GiftCardReportData = action.payload.arr;
      state.Totalbalance= action.payload.total_balance;
      state.TotalCredit= action.payload.total_credit;
      state.TotalDebit= action.payload.total_debit;
      state.error = "";
    });
    builder.addCase(fetchGiftCardReportData.rejected, (state, action) => {
      state.loading = false;
      state.GiftCardReportData = {};
      state.error = action.error.message;
    });
  },
});

export default GiftCardReportSlice.reducer;
