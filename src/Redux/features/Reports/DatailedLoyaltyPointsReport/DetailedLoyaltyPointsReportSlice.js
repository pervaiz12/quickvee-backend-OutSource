import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  DETAILED_LOYALTY_POINTS,
} from "../../../../Constants/Config";

const initialState = {
  loading: false,
  DetailedLoyaltyPointsReportArr: [],
  status: false,
  successMessage: "",
  error: "",
};

export const fetchDetailedLoyaltyPointsReportArr = createAsyncThunk(
  "DetailedLoyaltyPointsReport/fetchDetailedLoyaltyPointsReportArr",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const res = await axios.post(
        BASE_URL + DETAILED_LOYALTY_POINTS,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.status === true) {
        // console.log(response.data)

        const arr = res.data.loyalty_points_data;
        const status = res.data.status;
        return { arr, status };
      } else if (res.data.status === false) {
        console.log("inside else if");
        const arr = [];
        const status = false;
        return { arr, status };
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

const DetailedLoyaltyPointsReportSlice = createSlice({
  name: "DetailedLoyaltyPointsReport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDetailedLoyaltyPointsReportArr.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDetailedLoyaltyPointsReportArr.fulfilled,
      (state, action) => {
        state.loading = false;
        state.DetailedLoyaltyPointsReportArr = action.payload.arr;
        state.status = action.payload.status;
        state.error = "";
      }
    );
    builder.addCase(
      fetchDetailedLoyaltyPointsReportArr.rejected,
      (state, action) => {
        state.loading = false;
        state.DetailedLoyaltyPointsReportArr = [];
        state.error = action.error.message;
      }
    );
  },
});
export default DetailedLoyaltyPointsReportSlice.reducer;
