import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  DIGITALMAKRTING_LIST,
  DELETE_DIGITALMAKRTING,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  digitalMarketingData: [],
  successMessage: "",
  error: "",
};

export const fetchdigitalMarketingData = createAsyncThunk(
  "digitalmarketing/fetchdigitalMarketingData",
  async (data, { rejectWithValue }) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + DIGITALMAKRTING_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      if (response) {
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

export const deleteDigitalMarketing = createAsyncThunk(
  "digitalmarketing/deleteDigitalMarketing",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + DELETE_DIGITALMAKRTING,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log(response);
        return {
          categoryId: data.tags_id,
        };
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



const digitalMarketingSlice = createSlice({
  name: "digitalmarketing",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchdigitalMarketingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchdigitalMarketingData.fulfilled, (state, action) => {
      state.loading = false;
      state.digitalMarketingData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchdigitalMarketingData.rejected, (state, action) => {
      state.loading = false;
      state.digitalMarketingData = {};
      state.error = action.error.message;
    });

    builder.addCase(deleteDigitalMarketing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDigitalMarketing.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      // console.log("Xvcbnvc",Object.values(state.digitalMarketingData))
      // return
      state.digitalMarketingData = Object.values(state.digitalMarketingData).filter(
        (item) => item && item.id !== action.payload.categoryId
      );
      state.error = ""; // Reset the error message
    });
    builder.addCase(deleteDigitalMarketing.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export default digitalMarketingSlice.reducer;
