import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, NEW_ITEMWISE_SALE_LIST } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  NewItemSalesData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchNewItemSalesData = createAsyncThunk(
  "NewItemSalesSlice/fetchNewItemSalesData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + NEW_ITEMWISE_SALE_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {

        // return response.data.item_sale_data
        return [
          response.data.item_sale_data,
          response.data.net_sale,
          response.data.total_sold,
          response.data.status
        ];
      }
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

const NewItemSalesSlice = createSlice({
  name: "NewItemSalesSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNewItemSalesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNewItemSalesData.fulfilled, (state, action) => {
      state.loading = false;
      state.NewItemSalesData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchNewItemSalesData.rejected, (state, action) => {
      state.loading = false;
      state.NewItemSalesData = {};
      state.error = action.error.message;
    });
  },
});

export default NewItemSalesSlice.reducer;
