import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, LIST_ALL_STORE_ORDER_LIST } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const initialState = {
  loading: false,
  inStoreOrderData: [],
  OrderListCount:0,
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
export const getOrderListCount = createAsyncThunk(
  "purchase/getPurchaseOrderCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + "Order_list_api/all_order_list_count",
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    console.log("AllInStoreDataState OrderListCount: ", response.data.order_data);
    if (response.status == 200) {
      return response.data.order_data;
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
    builder.addCase(getOrderListCount.fulfilled, (state, action) => {
      state.OrderListCount = action.payload;
    });
    builder.addCase(getOrderListCount.rejected, (state, action) => {
      state.OrderListCount = 0;
    });
  },
});

export default inStoreOrderSlice.reducer;
