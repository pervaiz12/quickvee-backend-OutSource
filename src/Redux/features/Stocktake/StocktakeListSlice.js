import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GET_STOCKTAKE_LIST } from "../../../Constants/Config";

const initialState = {
  loading: false,
  StocktakeList: [],
  successMessage: "",
  error: "",
};

export const fetchStocktakeList = createAsyncThunk(
  "stocktake/fetchStocktakeList",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
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
  },
});

export default StocktakeListSlice.reducer;