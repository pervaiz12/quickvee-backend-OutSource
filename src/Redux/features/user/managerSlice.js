import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADD_MANAGER,
  BASE_URL,
  DELETE_MANAGER,
  GET_MANAGER_LISTING,
  GET_MANAGER_RECORD,
  GET_MANAGER_RECORD_COUNT,
} from "../../../Constants/Config";
import axios from "axios";
const initialState = {
  loading: false,
  ManagerRecord: [],
  managerRecordsCount: 0,
  error: "",
};

export const ManagerRecord = createAsyncThunk(
  "Manager/ManagerRecord",
  async (data) => {
    const { token, ...newData } = data;
    const response = await axios.post(BASE_URL + GET_MANAGER_RECORD, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Use data?.token directly
      },
    });

    if (response.data.status === 200) {
      return response.data.message;
    }
  }
);

export const getManagerRecordCount = createAsyncThunk(
  "Manager/getManagerRecordCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + GET_MANAGER_RECORD_COUNT,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    console.log("GET_MANAGER_RECORD_COUNT: ", response);
    if (response.data.status == 200) {
      return response.data.data_count;
    }
  }
);

export const deleteManagerById = createAsyncThunk(
  "Manager/deleteManagerById",
  async (data) => {
    const response = await axios.post(
      BASE_URL + DELETE_MANAGER,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        
        },
      }
    );
    return response?.data
  }
);


export const addManager = createAsyncThunk(
  "Manager/addManager",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + ADD_MANAGER,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    return response?.data;
  }
);

export const getManagerListing = createAsyncThunk(
  "Manager/getManagerListing",
  async (data) => {
    const response = await axios.post(
      BASE_URL + GET_MANAGER_LISTING,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }
    );
    return response?.data;
  }
);



const ManagerSlice = createSlice({
  name: "Manager",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(ManagerRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ManagerRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.ManagerRecord = action.payload;
      state.error = "";
    });
    builder.addCase(ManagerRecord.rejected, (state, action) => {
      state.loading = false;
      state.ManagerRecord = {};
      state.error = "";
    });
    builder.addCase(getManagerRecordCount.fulfilled, (state, action) => {
      state.managerRecordsCount = action.payload;
    });
    builder.addCase(getManagerRecordCount.rejected, (state, action) => {
      state.managerRecordsCount = 0;
    });
  },
});

export default ManagerSlice.reducer;
