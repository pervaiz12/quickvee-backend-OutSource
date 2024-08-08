import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_MIX_MAX_PRICING_DEAL,
  BASE_URL,
  MIX_MAX_PRICING_DEALS_LIST,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  mixAndMatchDeals: [],
  error: "",
};

export const addNewDeal = createAsyncThunk(
  "mixAndMatch/addNewDeal",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + ADD_MIX_MAX_PRICING_DEAL,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response);
      if (response.status === 200) {
        return response.data.status;
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

export const mixAndMatchPricingDealsList = createAsyncThunk(
  "mixAndMatch/mixAndMatchPricingDealsList",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + MIX_MAX_PRICING_DEALS_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("mix match deals response: ", response);
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

const mixAndMatchSlice = createSlice({
  name: "mixAndMatch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(mixAndMatchPricingDealsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(mixAndMatchPricingDealsList.fulfilled, (state, action) => {
      state.mixAndMatchDeals = action.payload;
      state.loading = false;
    });
    builder.addCase(mixAndMatchPricingDealsList.rejected, (state, action) => {
      state.mixAndMatchDeals = [];
      state.loading = false;
    });
  },
});

export default mixAndMatchSlice.reducer;
