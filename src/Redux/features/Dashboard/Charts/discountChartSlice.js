import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, DISCOUNT_CHART } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: true,
  discountData: [],
  totalDiscount: 0,
  error: "",
};

export const getDiscount = createAsyncThunk(
  "discountChart/getDiscount",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + DISCOUNT_CHART,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("discount api: ", response);
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

const discountChartSlice = createSlice({
  name: "discountChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDiscount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDiscount.fulfilled, (state, action) => {
      state.loading = false;
      state.discountData = action.payload?.filter_discount_data || [];
      state.totalDiscount = action.payload?.total_discount_data || 0;
      state.error = "";
    });
    builder.addCase(getDiscount.rejected, (state, action) => {
      state.loading = false;
      state.discountData = [];
      state.totalDiscount = 0;
      state.error = action.error.message;
    });
  },
});

export default discountChartSlice.reducer;
