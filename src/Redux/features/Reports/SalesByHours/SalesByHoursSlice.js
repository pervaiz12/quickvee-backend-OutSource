import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, SALES_BY_HOURS_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  SalesByHoursData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchSalesByHours = createAsyncThunk(
  "SalesByHours/fetchSalesByHours",
  async (data, { rejectWithValue }) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + SALES_BY_HOURS_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

const SalesByHoursSlice = createSlice({
  name: "SalesByHours",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSalesByHours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSalesByHours.fulfilled, (state, action) => {
      state.loading = false;
      state.SalesByHoursData = action.payload;
      state.successMessage = "";
    });
    builder.addCase(fetchSalesByHours.rejected, (state, action) => {
      state.loading = false;
      state.SalesByHoursData = [];
      state.successMessage = action.error.message;
    });
  },
});

// export const { editAttribute } = attributesSlice.actions;
export default SalesByHoursSlice.reducer;
