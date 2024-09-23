import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  GET_REGISTER_CLOSURE_LIST,
} from "../../../../Constants/Config";

const initialState = {
  loading: false,
  RegisterClosuresData: [],
  successMessage: "",
  error: "",
};

export const fetchRegisterClosuresData = createAsyncThunk(
  "RegisterClosuresSlice/fetchRegisterClosuresData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + GET_REGISTER_CLOSURE_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        const arr = response.data;
        const status = true;
        return { arr, status };
      } else if (response.data.length === 0) {
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

const RegisterClosuresSlice = createSlice({
  name: "RegisterClosuresSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterClosuresData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRegisterClosuresData.fulfilled, (state, action) => {
      state.loading = false;
      state.RegisterClosuresData = action.payload.arr;
      state.status = action.payload.status;
      state.error = "";
    });
    builder.addCase(fetchRegisterClosuresData.rejected, (state, action) => {
      state.loading = false;
      state.RegisterClosuresData = [];
      state.error = action.error.message;
    });
  },
});

export default RegisterClosuresSlice.reducer;
