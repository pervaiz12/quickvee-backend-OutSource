import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GET_STOCKTAKE_LIST,STOCKTAKE_LIST_COUNT } from "../../../Constants/Config";

const initialState = {
  loading: false,
  StocktakeList: [],
  stocktakeListCount:0,
  successMessage: "",
  error: "",
};

export const fetchStocktakeList = createAsyncThunk(
  "stocktake/fetchStocktakeList",
  async (data) => {
    
    try {
      const { token, ...dataNew } = data;
      console.log("dataNew",dataNew)
      const response = await axios.post(
        BASE_URL + GET_STOCKTAKE_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data)
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getStocktakeListCount = createAsyncThunk(
  "purchase/getPurchaseOrderCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + STOCKTAKE_LIST_COUNT,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    // console.log("getPurchaseOrderCount: ", response);
    if (response.status == 200) {
      return response.data.result;
    }
  }
);
const StocktakeListSlice = createSlice({
  name: "stocktake",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStocktakeList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStocktakeList.fulfilled, (state, action) => {
      state.loading = false;
      state.StocktakeList = action.payload;
      state.error = "";
    });
    builder.addCase(fetchStocktakeList.rejected, (state, action) => {
      state.loading = false;
      state.StocktakeList = {};
      state.error = action.error.message;
    });
    builder.addCase(getStocktakeListCount.fulfilled, (state, action) => {
      state.stocktakeListCount = action.payload;
    });
    builder.addCase(getStocktakeListCount.rejected, (state, action) => {
      state.stocktakeListCount = 0;
    });
  },
});

export default StocktakeListSlice.reducer;