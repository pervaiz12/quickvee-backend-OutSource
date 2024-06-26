import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  GET_STOCKTAKE_LIST,
  STOCKTAKE_LIST_COUNT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  StocktakeList: [],
  stocktakeListCount: 0,
  singleStocktakeState: null,
  gotDatafromPo: null,
  status: "idle",
  successMessage: "",
  error: "",
};

export const fetchStocktakeList = createAsyncThunk(
  "stocktake/fetchStocktakeList",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      // console.log("dataNew", dataNew);
      const response = await axios.post(
        BASE_URL + GET_STOCKTAKE_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data)
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getStocktakeListCount = createAsyncThunk(
  "purchase/getPurchaseOrderCount",
  async (data) => {
    const { token, ...dataNew } = data;
    const response = await axios.post(
      BASE_URL + STOCKTAKE_LIST_COUNT,
      dataNew,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      }
    );
    // console.log("getPurchaseOrderCount: ", response);
    if (response.status == 200) {
      return response.data.result;
    }
  }
);
export const fetchSingleStocktakeData = createAsyncThunk(
  "stocktake/fetchSingleStocktakeData",
  async ({ merchant_id, id, userTypeData }, { rejectWithValue }) => {
    let singleStocktakeData = {
      merchant_id: merchant_id,
      stocktake_id: id,
    };
    const { token, ...otherUserData } = userTypeData;
    try {
      
      const response = await axios.post(
        `${BASE_URL}Stocktake_react_api/get_stocktake_details_by_id`,
        { ...singleStocktakeData, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const fetchProductDataPromises =
          response.data.result.stocktake_item.map(async (item) => {
            try {
              const formData = {
                merchant_id: merchant_id,
                id:item.product_id,
                ...otherUserData,
              }
              
              const productResponse = await axios.post(
                `${BASE_URL}Product_api_react/get_productdata_ById`,
                formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (productResponse.data.status) {
                if (
                  item.variant_id !== "0" &&
                  productResponse.data.data.product_variants.length > 0
                ) {
                  const product =
                    productResponse.data.data.product_variants.find(
                      (prod) => prod.id === item.variant_id
                    );
                  return product;
                } else {
                  const product = productResponse.data.data.productdata;
                  return product;
                }
              } else {
                console.log("Product Not available!");
              }
            } catch (e) {
              console.log("e: ", e);
            }
          });

        const dataFromPo = await Promise.all(fetchProductDataPromises);
        return { result: response.data.result, dataFromPo };
      } else {
        // ToastifyAlert(response.error, 'error');
        return rejectWithValue(response.error);
      }
    } catch (error) {
      console.error("Error creating stocktake:", error);
      return rejectWithValue(error.message);
    }
  }
);
const StocktakeListSlice = createSlice({
  name: "stocktake",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStocktakeList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStocktakeList.fulfilled, (state, action) => {
      state.loading = false;
      state.StocktakeList = action.payload;
      state.error = "";
    });
    builder.addCase(fetchStocktakeList.rejected, (state, action) => {
      state.loading = false;
      state.StocktakeList = {};
      state.error = action.error.message;
    });
    builder.addCase(getStocktakeListCount.fulfilled, (state, action) => {
      state.stocktakeListCount = action.payload;
    });
    builder.addCase(getStocktakeListCount.rejected, (state, action) => {
      state.stocktakeListCount = 0;
    });
    builder.addCase(fetchSingleStocktakeData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleStocktakeData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.singleStocktakeState = action.payload.result;
      state.gotDatafromPo = action.payload.dataFromPo;
    });
    builder.addCase(fetchSingleStocktakeData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default StocktakeListSlice.reducer;
