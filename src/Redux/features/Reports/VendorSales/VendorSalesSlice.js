import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, VENDORS_SALES_REPORT } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
const initialState = {
  loading: false,
  VendorSalesData: [],
  status:false,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchVendorSalesData = createAsyncThunk(
  "VendorSalesReportList/fetchVendorSalesData.",
  async (data) => {
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      // console.log(BASE_URL + VENDORS_SALES_REPORT)
      const response = await axios.post(
        BASE_URL + VENDORS_SALES_REPORT,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      if (response.data.status === true) {
        // console.log(response.data.data_list
        //     )
        const arr = response.data.data_list;
        const status = response.data.status;
        return {arr,status};
      }
      else if (response.data.status ===false ){
        const arr = {};
        const status = false;
        return {arr,status};
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const VendorSalesSlice = createSlice({
  name: "VendorSalesReportList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVendorSalesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVendorSalesData.fulfilled, (state, action) => {
      state.loading = false;
      state.VendorSalesData = action.payload.arr;
      state.status= action.payload.status;
      state.error = "";
    });
    builder.addCase(fetchVendorSalesData.rejected, (state, action) => {
      state.loading = false;
      state.VendorSalesData = {};
      state.error = action.error.message;
    });
  },
});

export default VendorSalesSlice.reducer;
