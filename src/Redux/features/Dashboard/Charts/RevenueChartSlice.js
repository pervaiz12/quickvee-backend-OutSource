import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, REVENUE_CHART } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  revenueData: [],
  totalRevenue: 0,
  error: "",
};

export const getRevenue = createAsyncThunk(
  "revenueChart/getRevenue.",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + REVENUE_CHART,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("revenue data: ", response);

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

const RevenueChartSlice = createSlice({
  name: "revenueChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRevenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.revenueData = action.payload?.filter_revenue_data || [];
      state.totalRevenue = action.payload?.total_revenue_data || 0;
      state.error = "";
    });
    builder.addCase(getRevenue.rejected, (state, action) => {
      state.loading = false;
      state.revenueData = [];
      state.totalRevenue = 0;
      state.error = action.error.message;
    });
  },
});

export default RevenueChartSlice.reducer;
