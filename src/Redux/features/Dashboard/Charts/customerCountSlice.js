import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, CUSTOMER_COUNT_CHART } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  customerCountData: [],
  totalCustomerCount: 0,
  error: "",
};

export const getCustomerCount = createAsyncThunk(
  "customerCountChart/getCustomerCount.",
  async (data, { rejectWithValue }) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + CUSTOMER_COUNT_CHART,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("customer count api: ", response);
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
    builder.addCase(getCustomerCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomerCount.fulfilled, (state, action) => {
      state.loading = false;
      state.customerCountData = action.payload?.filter_customer_count || [];
      state.totalCustomerCount = action.payload?.total_customer_count || 0;
      state.error = "";
    });
    builder.addCase(getCustomerCount.rejected, (state, action) => {
      state.loading = false;
      state.customerCountData = [];
      state.totalCustomerCount = 0;
      state.error = action.error.message;
    });
  },
});

export default salesCountChartSlice.reducer;
