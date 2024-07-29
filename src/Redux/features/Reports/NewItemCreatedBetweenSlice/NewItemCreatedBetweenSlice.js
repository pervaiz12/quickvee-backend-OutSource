import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  NEW_ITEM_CREATED_BETWEEN_LIST,
} from "../../../../Constants/Config";

const initialState = {
  loading: false,
  NewItemData: [],
  status:false,
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchNewItemCreatedBetweenData = createAsyncThunk(
  "NewItemCreatedBetweenList/fetchNewItemCreatedBetweenData.",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(
        BASE_URL + NEW_ITEM_CREATED_BETWEEN_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log(response);
      if (response.data.status === true) {
        const arr = response.data
        const status = response.data.status;
        return {arr,status};
      }else if (response.data.status === false) {
        const arr = [];
        const status = false;
        return {arr,status};
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

const NewItemCreatedBetweenSlice = createSlice({
  name: "NewItemCreatedBetweenList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNewItemCreatedBetweenData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNewItemCreatedBetweenData.fulfilled,
      (state, action) => {
        state.loading = false;
        state.NewItemData = action.payload.arr;
        state.status = action.payload.status;
        state.error = "";
      }
    );
    builder.addCase(
      fetchNewItemCreatedBetweenData.rejected,
      (state, action) => {
        state.loading = false;
        state.NewItemData = {};
        state.error = action.error.message;
      }
    );
  },
});

export default NewItemCreatedBetweenSlice.reducer;