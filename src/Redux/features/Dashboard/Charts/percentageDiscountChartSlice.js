import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  PERCENTAGE_DISCOUNT_CHART,
} from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: true,
  percentageDiscountData: [],
  totalPercentageDiscount: 0,
  error: "",
};

export const getPercentageDiscount = createAsyncThunk(
  "percentageDiscountChart/getPercentageDiscount",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + PERCENTAGE_DISCOUNT_CHART,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("discount api: ", response);
      return response.data;
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

const percentageDiscountChartSlice = createSlice({
  name: "percentageDiscountChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPercentageDiscount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPercentageDiscount.fulfilled, (state, action) => {
      state.loading = false;
      state.percentageDiscountData = action.payload?.discount_per_data || [];
      state.totalPercentageDiscount = action.payload?.total_discount_per || 0;
      state.error = "";
    });
    builder.addCase(getPercentageDiscount.rejected, (state, action) => {
      state.loading = false;
      state.percentageDiscountData = [];
      state.totalPercentageDiscount = 0;
      state.error = action.error.message;
    });
  },
});

export default percentageDiscountChartSlice.reducer;
