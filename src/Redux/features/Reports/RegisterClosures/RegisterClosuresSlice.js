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
      console.log("fetchRegisterClosuresData", response);
    } catch (error) {}
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
      state.RegisterClosuresData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRegisterClosuresData.rejected, (state, action) => {
      state.loading = false;
      state.RegisterClosuresData = [];
      state.error = action.error.message;
    });
  },
})

export default RegisterClosuresSlice.reducer
