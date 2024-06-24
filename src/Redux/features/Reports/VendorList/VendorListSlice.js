import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, VENDORS_REPORT_LIST, GET_VENDORS_DATA_COUNT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  VendorListData: [],
  VendorListCount: 0,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchVendorListData = createAsyncThunk(
  "VendorReportList/fetchVendorListData.",
  async (data) => {
    try {
      const { token, ...newData } = data;
      const response = await axios.post(
        BASE_URL + VENDORS_REPORT_LIST,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response)
      if (response.data.status === true) {
        console.log(response.data.vendor_list);
        return response.data.vendor_list;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getVendorListCount = createAsyncThunk(
  "VendorReportList/getVendorListCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + GET_VENDORS_DATA_COUNT,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
   
    if (response.data.status === true) {
      return response.data.tot_count;
    }
  }
);

const VendorListSlice = createSlice({
  name: "VendorReportList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVendorListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVendorListData.fulfilled, (state, action) => {
      state.loading = false;
      state.VendorListData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVendorListData.rejected, (state, action) => {
      state.loading = false;
      state.VendorListData = {};
      state.error = action.error.message;
    });
    builder.addCase(getVendorListCount.fulfilled, (state, action) => {
      state.VendorListCount = action.payload;
    });
    builder.addCase(getVendorListCount.rejected, (state, action) => {
      state.VendorListCount = 0;
    });
  },
});

export default VendorListSlice.reducer;
