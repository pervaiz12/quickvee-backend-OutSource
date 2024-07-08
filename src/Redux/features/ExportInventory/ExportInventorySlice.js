import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_ALL_MERCHANTS } from "../../../Constants/Config";
const initialState = {
  loading: false,
  MerchantListData: [],
  successMessage: "",
  error: "",
};

export const fetchMerchantsList = createAsyncThunk(
  "ExportInventory/fetchMerchantsList.",
  async (data , { rejectWithValue }) => {
    const { token, ...dataAlter } = data;
    try {
      const response = await axios.post(
        BASE_URL + LIST_ALL_MERCHANTS,
        dataAlter,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response);
        return response.data.result;
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

const ExportInventorySlice = createSlice({
  name: "ExportInventory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMerchantsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMerchantsList.fulfilled, (state, action) => {
      state.loading = false;
      state.MerchantListData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMerchantsList.rejected, (state, action) => {
      state.loading = false;
      state.MerchantListData = {};
      state.error = action.error.message;
    });
  },
});

export default ExportInventorySlice.reducer;
