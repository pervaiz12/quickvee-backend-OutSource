import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AVG_SALE_VALUE, BASE_URL } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  avgSaleValueData: [],
  totalAvgSaleValue: 0,
  error: "",
};

export const getAvgSaleValue = createAsyncThunk(
  "avgSaleValueChart/getAvgSaleValue.",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + AVG_SALE_VALUE,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("avg sale value data: ", response);

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

const avgSaleValueChartSlice = createSlice({
  name: "avgSaleValueChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAvgSaleValue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvgSaleValue.fulfilled, (state, action) => {
      state.loading = false;
      state.avgSaleValueData = action.payload?.filter_revenue_data || [];
      state.totalAvgSaleValue = action.payload?.total_revenue_data || 0;
      state.error = "";
    });
    builder.addCase(getAvgSaleValue.rejected, (state, action) => {
      state.loading = false;
      state.avgSaleValueData = [];
      state.totalAvgSaleValue = 0;
      state.error = action.error.message;
    });
  },
});

export default avgSaleValueChartSlice.reducer;
