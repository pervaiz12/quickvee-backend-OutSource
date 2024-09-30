import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, SALES_COUNT_CHART } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: true,
  salesCountData: [],
  totalSalesCount: 0,
  error: "",
};

export const getSalesCount = createAsyncThunk(
  "salesCountChart/getSalesCount.",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + SALES_COUNT_CHART,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("sales count api: ", response);
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

const salesCountChartSlice = createSlice({
  name: "salesCountChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSalesCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSalesCount.fulfilled, (state, action) => {
      state.loading = false;
      state.salesCountData = action.payload?.sale_count_data || [];
      state.totalSalesCount = action.payload?.total_sale_count || 0;
      state.error = "";
    });
    builder.addCase(getSalesCount.rejected, (state, action) => {
      state.loading = false;
      state.salesCountData = [];
      state.totalSalesCount = 0;
      state.error = action.error.message;
    });
  },
});

export default salesCountChartSlice.reducer;
