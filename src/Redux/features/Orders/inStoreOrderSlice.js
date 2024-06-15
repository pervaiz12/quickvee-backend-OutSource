import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_ALL_STORE_ORDER_LIST } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  inStoreOrderData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchInStoreOrderData = createAsyncThunk(
  "inStoreOrder/fetchInStoreOrderData.",
  async (data) => {
    const { userTypeData } = useAuthDetails();
    const { token, ...otherUserData } = userTypeData;
    try {
      const response = await axios.post(
        BASE_URL + LIST_ALL_STORE_ORDER_LIST,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response)
      if (response.data.status === true) {
        return response.data.order_data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const inStoreOrderSlice = createSlice({
  name: "inStoreOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInStoreOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInStoreOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.inStoreOrderData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchInStoreOrderData.rejected, (state, action) => {
      state.loading = false;
      state.inStoreOrderData = {};
      state.error = action.error.message;
    });
  },
});

export default inStoreOrderSlice.reducer;
