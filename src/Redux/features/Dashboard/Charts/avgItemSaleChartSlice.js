import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AVG_ITEM_SALE, BASE_URL } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: true,
  avgItemSaleData: [],
  totalAvgItemSale: 0,
  error: "",
};

export const getAvgItemSale = createAsyncThunk(
  "avgItemSaleChart/getAvgItemSale.",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + AVG_ITEM_SALE,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("avg item sale data: ", response);

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

const avgItemSaleChartSlice = createSlice({
  name: "avgItemSaleChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAvgItemSale.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvgItemSale.fulfilled, (state, action) => {
      state.loading = false;
      state.avgItemSaleData = action.payload?.filter_revenue_data || [];
      state.totalAvgItemSale = action.payload?.total_revenue_data || 0;
      state.error = "";
    });
    builder.addCase(getAvgItemSale.rejected, (state, action) => {
      state.loading = false;
      state.avgItemSaleData = [];
      state.totalAvgItemSale = 0;
      state.error = action.error.message;
    });
  },
});

export default avgItemSaleChartSlice.reducer;
