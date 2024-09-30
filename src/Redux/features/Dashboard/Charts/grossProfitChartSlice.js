import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GROSS_PROFIT_CHART } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: true,
  grossProfitData: [],
  totalGrossProfit: 0,
  error: "",
};

export const getGrossProfit = createAsyncThunk(
  "grossProfitChart/getGrossProfit.",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + GROSS_PROFIT_CHART,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("gross profit api: ", response);
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

const grossProfitChartSlice = createSlice({
  name: "grossProfitChart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGrossProfit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGrossProfit.fulfilled, (state, action) => {
      state.loading = false;
      state.grossProfitData = action.payload?.gross_profit_data || [];
      state.totalGrossProfit = action.payload?.total_gross_profit || 0;
      state.error = "";
    });
    builder.addCase(getGrossProfit.rejected, (state, action) => {
      state.loading = false;
      state.grossProfitData = [];
      state.totalGrossProfit = 0;
      state.error = action.error.message;
    });
  },
});

export default grossProfitChartSlice.reducer;
