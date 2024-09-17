import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_MIX_MAX_PRICING_DEAL,
  BASE_URL,
  DELETE_MIX_MAX_PRICING_DEAL,
  ENABLE_DISABLE_MIX_MAX_PRICING_DEAL,
  MIX_MAX_PRICING_DEALS_LIST,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  mixAndMatchDeals: [],
  singleMixAndMatchDeal: [],
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

      // console.log("mix match deals response: ", response);
      if (response.status === 200) {
        return response.data.data || [];
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

export const singleMixAndMatchPricingDeal = createAsyncThunk(
  "mixAndMatch/singleMixAndMatchPricingDeal",
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

      // console.log("single deal response: ", response);
      if (response.status === 200) {
        return response.data.data || [];
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

export const updateMixAndMatchpricingDeal = createAsyncThunk(
  "mixAndMatch/updateMixAndMatchpricingDeal",
  async (data, rejectWithValue) => {
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

      console.log("update deal: ", response);
      if (response.status === 200) {
        return response.data;
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

export const enableDisableMixAndMatchPricingDeal = createAsyncThunk(
  "mixAndMatch/enableDisableMixAndMatchPricingDeal",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + ENABLE_DISABLE_MIX_MAX_PRICING_DEAL,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("enable disable deal: ", response);
      if (response.status === 200) {
        return response.data;
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

export const deleteMixAndMatchPricingDeal = createAsyncThunk(
  "mixAndMatch/deleteMixAndMatchPricingDeal",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + DELETE_MIX_MAX_PRICING_DEAL,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("delete deal: ", response);
      if (response.status === 200) {
        return response.data;
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

const mixAndMatchSlice = createSlice({
  name: "mixAndMatch",
  initialState,
  reducers: {
    clearSingleMixAndMatchDeal: (state, action) => {
      state.singleMixAndMatchDeal = [];
    },
  },
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
    builder.addCase(singleMixAndMatchPricingDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(singleMixAndMatchPricingDeal.fulfilled, (state, action) => {
      state.singleMixAndMatchDeal = action.payload;
      state.loading = false;
    });
    builder.addCase(singleMixAndMatchPricingDeal.rejected, (state, action) => {
      state.singleMixAndMatchDeal = [];
      state.loading = false;
    });
  },
});

export const { clearSingleMixAndMatchDeal } = mixAndMatchSlice.actions;
export default mixAndMatchSlice.reducer;
