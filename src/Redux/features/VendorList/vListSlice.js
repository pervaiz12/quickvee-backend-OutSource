import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_ALL_VENDORS } from "../../../Constants/Config";

const initialState = {
  loading: false,
  vendorListData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchVendorsListData = createAsyncThunk(
  "vendors/fetchVendorsListData.",
  async (data) => {
    try {
      const response = await axios.post(BASE_URL + LIST_ALL_VENDORS, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "true") {
        const listdata = [
          response.data.vendor_name_list,
          response.data.vendor_payout_list,
          response.data.states,
        ];

        return listdata;
      }
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
);

const vListSlice = createSlice({
  name: "vendors",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVendorsListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVendorsListData.fulfilled, (state, action) => {
      state.loading = false;
      state.vendorListData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVendorsListData.rejected, (state, action) => {
      state.loading = false;
      state.vendorListData = [];
      state.error = action.error.message;
    });
  },
});

export default vListSlice.reducer;
