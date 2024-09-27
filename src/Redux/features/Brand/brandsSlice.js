import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GET_BRAND_DATA_LIST } from "../../../Constants/Config";

const initialState = {
  loading: false,
  BrandsData: [],
  tagData:[],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchBrandData = createAsyncThunk(
  "brands/fetchBrandData",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + GET_BRAND_DATA_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status == true) {
        return response?.data?.data;
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
export const fetchTagData = createAsyncThunk(
  "brands/fetchTagData",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + GET_BRAND_DATA_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status == true) {
        return response?.data?.data;
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

const BrandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBrandData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandData.fulfilled, (state, action) => {
      state.loading = false;
      state.BrandsData = action.payload;
      state.successMessage = "";
    });
    builder.addCase(fetchBrandData.rejected, (state, action) => {
      state.loading = false;
      state.BrandsData = [];
      state.successMessage = action.error.message;
    });
    builder.addCase(fetchTagData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTagData.fulfilled, (state, action) => {
      state.loading = false;
      state.tagData = action.payload;
      state.successMessage = "";
    });
    builder.addCase(fetchTagData.rejected, (state, action) => {
      state.loading = false;
      state.tagData = [];
      state.successMessage = action.error.message;
    });
  },
});

// export const { editAttribute } = attributesSlice.actions;
export default BrandsSlice.reducer;
