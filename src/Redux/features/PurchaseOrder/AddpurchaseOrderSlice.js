import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie';

import axios from "axios";

let initial = {
  loading: false,
  addpoData: [],
  errors: "",
};

export const fetchaddpopurchaseData = createAsyncThunk(
  "Addpolist/fetchaddpopurchaseData",
  async (data) => {
    // console.log("data hoho:", data);
    let dataresult = { merchant_id: data.merchant_id, admin_id: data.admin_id };
    // console.log("data res: ", dataresult);
    try {
      const response = await axios.post(
        "https://sandbox.quickvee.net/Purchase_orders_api/po_list",
        dataresult,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("response: ", response); // Log the response data
      return response?.data; // Return the response data
    } catch (error) {
      console.error("Error validating email:", error.message);
      throw error;
    }
  }
);

const AddpurchaseOrderSlice = createSlice({
  name: "Addpolist",
  initialState: initial,
  extraReducers: (builder) => {
    builder.addCase(fetchaddpopurchaseData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchaddpopurchaseData.fulfilled, (state, action) => {
      state.loading = false;
      state.addpoData = action.payload;
    });
    builder.addCase(fetchaddpopurchaseData.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});
export default AddpurchaseOrderSlice.reducer;
