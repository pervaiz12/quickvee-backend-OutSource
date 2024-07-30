import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, TOP_SALLER_REPORT } from "../../../Constants/Config";

const initialState = {
  loading: false,
  topsallerData: [],
  status: false,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchtopsallerData = createAsyncThunk(
  "dailyreport/fetchtopsallerData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(BASE_URL + TOP_SALLER_REPORT, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "Success") {
        const arr = response.data.result;
        const status = response.data.status;
        return { arr, status };
      } else if (
        response.data.status === "Failed" &&
        response.data.msg === "No. Data found."
      ) {
        const arr = [];
        const status = false;
        return { arr, status };
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
// Generate pening , fulfilled and rejected action type

const topsallerSlice = createSlice({
  name: "topsaller",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchtopsallerData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchtopsallerData.fulfilled, (state, action) => {
      state.loading = false;
      state.topsallerData = action.payload.arr;
      state.status = action.payload.status;
      state.error = "";
    });
    builder.addCase(fetchtopsallerData.rejected, (state, action) => {
      state.loading = false;
      state.topsallerData = {};
      state.error = action.error.message;
    });
  },
});

export default topsallerSlice.reducer;
