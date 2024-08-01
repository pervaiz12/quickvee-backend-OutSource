import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GIFT_CARD_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  GiftCardReportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchGiftCardReportData = createAsyncThunk(
  "GiftCardReportList/fetchGiftCardReportData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + GIFT_CARD_REPORT,
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

const GiftCardReportSlice = createSlice({
  name: "GiftCardReportList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGiftCardReportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGiftCardReportData.fulfilled, (state, action) => {
      state.loading = false;
      state.GiftCardReportData = action.payload;
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
