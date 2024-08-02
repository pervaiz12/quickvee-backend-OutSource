import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  GET_ADMIN_RECORD,
  GET_ADMIN_RECORD_COUNT,
} from "../../../Constants/Config";
import axios from "axios";
const initialState = {
  loading: false,
  AdminRecord: [],
  adminRecordCount: 0,
  error: "",
};
export const AdminFunction = createAsyncThunk(
  "adminRecord/AdminFunction",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...newData } = data;
      const response = await axios.post(BASE_URL + GET_ADMIN_RECORD, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status == 200) {
        return response.data.message;
      }
      else if (response.data.status === 400){
        return []
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

export const getAdminRecordCount = createAsyncThunk(
  "Verified/getAdminRecordCount",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + GET_ADMIN_RECORD_COUNT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      if (response.data.status == 200) {
        return response.data.data_count;
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

const AdminSlice = createSlice({
  name: "adminRecord",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(AdminFunction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AdminFunction.fulfilled, (state, action) => {
      state.loading = false;
      state.AdminRecord = action.payload;
      state.error = "";
    });
    builder.addCase(AdminFunction.rejected, (state, action) => {
      state.loading = false;
      state.AdminRecord = {};
      state.error = action.error.message;
    });
    builder.addCase(getAdminRecordCount.fulfilled, (state, action) => {
      state.adminRecordCount = action.payload;
    });
    builder.addCase(getAdminRecordCount.rejected, (state, action) => {
      state.adminRecordCount = 0;
    });
  },
});
export default AdminSlice.reducer;
