import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  COUPON_LIST,
  COUPON_DELETE,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  couponData: [],
  successMessage: "",
  error: "",
};

export const fetchCouponList = createAsyncThunk(
  "couponList/fetchCouponList.",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(BASE_URL + COUPON_LIST, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "couponList/deleteCoupon",
  async (data) => {
    try {
      const { token, ...dataNew } = data;

      const response = await axios.post(BASE_URL + COUPON_DELETE, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        return { couponId: data.coupon_id };
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const couponListSlice = createSlice({
  name: "couponList",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.couponData = Object.values(state.couponData).map((coupon) => {
        if (coupon.id === action.payload.coupon_id) {
          return {
            ...coupon, // Spread syntax to copy existing properties
            show_online: action.payload.show_online, // Update the show_online
          };
        } else {
          // This isn't the one we're looking for - leave it as is
          return {
            ...coupon, // Spread syntax to copy existing properties
            show_online: action.payload.show_offline, // Update the show_online
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCouponList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponList.fulfilled, (state, action) => {
      state.loading = false;
      state.couponData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCouponList.rejected, (state, action) => {
      state.loading = false;
      state.couponData = {};
      state.error = action.error.message;
    });

    builder.addCase(deleteCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.couponData = Object.values(state.couponData).filter(
        (item) => item && item.id !== action.payload.couponId
      );
      state.error = ""; // Reset the error message
    });
    builder.addCase(deleteCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { updateStatus } = couponListSlice.actions;

export default couponListSlice.reducer;
