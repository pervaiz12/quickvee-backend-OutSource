import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, GET_STORE_RECEIPT_DATA } from "../../../../Constants/Config";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
const initialState = {
  loading: false,
  StoreReceiptData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchSettingReceiptData = createAsyncThunk(
  "SettingsReceiptSlice/fetchSettingReceiptData.",
  async (data) => {
    const { userTypeData } = useAuthDetails();
    try {
        const { token, ...otherUserData } = userTypeData;
      
      const response = await axios.post(
        BASE_URL + GET_STORE_RECEIPT_DATA,
        {...data,...otherUserData},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response);
        return response.data.receipt_list;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const SettingsReceiptSlice = createSlice({
  name: "StoreSettingAlertsList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSettingReceiptData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSettingReceiptData.fulfilled, (state, action) => {
      state.loading = false;
      state.StoreReceiptData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSettingReceiptData.rejected, (state, action) => {
      state.loading = false;
      state.StoreReceiptData = {};
      state.error = action.error.message;
    });
  },
});

export default SettingsReceiptSlice.reducer;
