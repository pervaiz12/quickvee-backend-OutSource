import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  PRODUCTS_LIST,
  UPDATE_TYPE,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  productsData: [],
  page: 0,
  offset: 0,
  limit: 10,
  hasMore: true,
  successMessage: "",
  error: "",
  formData: [],

  // for add product varient
  isLoading: false,
  isError: false,
};

// Generate pening , fulfilled and rejected action type
export const fetchProductsData = createAsyncThunk(
  "products/fetchProductsData.",
  async (data) => {
    try {
      const response = await axios.post(BASE_URL + PRODUCTS_LIST, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(response)
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateProductsType = createAsyncThunk(
  "products/updateProductsType.",
  async (data) => {
    try {
      const response = await axios.post(BASE_URL + UPDATE_TYPE, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(response)
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getInventorySetting = createAsyncThunk(
  "products/getInventorySetting",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL + "Profile_setup/inventory_register_setting",
        payload
      );

      return response?.data?.result?.cost_per;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL + "Product_api_react/add_product",
        payload
      );

      console.log("product response", response);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// dropdown content
export const fetchVarientList = createAsyncThunk(
  "products/fetchVarientList",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL + "Varientsapi/varients_list",
        payload
      );
      return response?.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchCategoryList = createAsyncThunk(
  "products/fetchCategoryList",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL + "Categoryapi/category_list",
        payload
      );
      return response?.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchTaxList = createAsyncThunk(
  "products/fetchTaxList",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL + "Settingapi/tax_list",
        payload
      );
      return response?.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchProductList = createAsyncThunk(
  "products/fetchProductList",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL + "Productapi/products_list",
        payload
      );
      return response?.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    emptyProduct: (state, action) => {
      state.productsData = action.payload;
      state.offset = 0;
      state.limit = 10;
      state.hasMore = true;
      state.page = 0;
    },
    editProduct: (state, action) => {
      state.productsData = state.productsData.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product, // Spread syntax to copy existing properties
            title: action.payload.title, // Update the title
            old_title: action.payload.title,
          };
        } else {
          // This isn't the one we're looking for - leave it as is
          return product;
        }
      });
    },
    updateFormValue: (state, action) => {
      console.log("action", action);
      state.formData = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsData.fulfilled, (state, action) => {
      state.loading = false;
      // state.productsData = action.payload;
      // state.productsData = [...state.productsData, ...action.payload];
      // Ensure productsData is always treated as an array
      if (!Array.isArray(state.productsData)) {
        state.productsData = [];
      }
      // Append new items to the productsData array
      console.log(state);
      state.productsData.push(...action.payload);
      state.offset += 10;
      state.hasMore = action.payload.length > 0;
      state.error = "";
    });
    builder.addCase(fetchProductsData.rejected, (state, action) => {
      state.loading = false;
      state.productsData = {};
      state.error = action.error.message;
    });

    builder.addCase(updateProductsType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductsType.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      console.log(state.productsData);
    });
    builder.addCase(updateProductsType.rejected, (state, action) => {
      state.loading = false;
      state.productsData = {};
      state.error = action.error.message;
    });

    /*  builder.addCase(addToWishlist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload;
            state.error = ''; // Reset the error message
        });
        builder.addCase(addToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    */

    // add product varient
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { editProduct, emptyProduct, updateFormValue } =
  productsSlice.actions;
export default productsSlice.reducer;
