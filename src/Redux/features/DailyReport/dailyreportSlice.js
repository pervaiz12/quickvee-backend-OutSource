import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_DAILY_REPORT } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  dailyreportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchdailyreportData = createAsyncThunk(
  "dailyreport/fetchdailyreportData.",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + LIST_DAILY_REPORT,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        return response.data.result;
      } else if (
        response.data.status === "Failed" &&
        response.data.msg === "No. Data found."
      ) {
        return response.data;
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

const dailyreportSlice = createSlice({
  name: "dailyreport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchdailyreportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchdailyreportData.fulfilled, (state, action) => {
      state.loading = false;
      state.dailyreportData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchdailyreportData.rejected, (state, action) => {
      state.loading = false;
      state.dailyreportData = {};
      state.error = action.error.message;
    });
  },
});

export default dailyreportSlice.reducer;
