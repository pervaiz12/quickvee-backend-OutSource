import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, NEW_CUSTOMER_REPORT } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  newCustomerreportData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchnewCustomerreportData = createAsyncThunk(
  "newCustomerreport/fetchnewCustomerreportData.",
  async (data, { rejectWithValue }) => {

    const { userTypeData } = useAuthDetails();
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + NEW_CUSTOMER_REPORT,
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

const newCustomerReportSlice = createSlice({
  name: "newCustomerreport",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchnewCustomerreportData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchnewCustomerreportData.fulfilled, (state, action) => {
      state.loading = false;
      state.newCustomerreportData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchnewCustomerreportData.rejected, (state, action) => {
      state.loading = false;
      state.newCustomerreportData = {};
      state.error = action.error.message;
    });
  },
});

export default newCustomerReportSlice.reducer;