import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, INSTANT_ACTIVITY_REPORT } from "../../../Constants/Config";

const initialState = {
  loading: false,
  instantactivityData: [],
  status:false,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchinstantactivityData = createAsyncThunk(
  "instantactivity/fetchinstantactivityData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + INSTANT_ACTIVITY_REPORT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      if (response.data.status === "Success") {
        // console.log(response.data)
        const arr = response.data.result;
        const status = response.data.status === "Success" ? true : false;
        return {arr, status};
      } else if (
        response.data.status === "Failed" &&
        response.data.msg === "No. Data found."
      ) {
        const arr = [];
        const status =false;
        return {arr,status};
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
// Generate pening , fulfilled and rejected action type

const instantactivitySlice = createSlice({
  name: "instantactivity",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchinstantactivityData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchinstantactivityData.fulfilled, (state, action) => {
      state.loading = false;
      state.instantactivityData = action.payload.arr;
      state.status= action.payload.status;
      state.error = "";
    });
    builder.addCase(fetchinstantactivityData.rejected, (state, action) => {
      state.loading = false;
      state.instantactivityData = {};
      state.error = action.error.message;
    });
  },
});

export default instantactivitySlice.reducer;
