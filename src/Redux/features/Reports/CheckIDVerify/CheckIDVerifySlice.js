import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  CHECKID_VARIFICATION_REPORT_LIST,
} from "../../../../Constants/Config";

const initialState = {
  loading: false,
  CheckIDVerifyData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchCheckIDVerifyData = createAsyncThunk(
  "CheckIDVerifySlice/fetchCheckIDVerifyData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...newData } = data;
      const response = await axios.post(
        BASE_URL + CHECKID_VARIFICATION_REPORT_LIST,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response);
        return response.data.order_data;
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

const CheckIDVerifySlice = createSlice({
  name: "StoreSettingAlertsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCheckIDVerifyData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCheckIDVerifyData.fulfilled, (state, action) => {
      state.loading = false;
      state.CheckIDVerifyData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCheckIDVerifyData.rejected, (state, action) => {
      state.loading = false;
      state.CheckIDVerifyData = {};
      state.error = action.error.message;
    });
  },
});

export default CheckIDVerifySlice.reducer;
