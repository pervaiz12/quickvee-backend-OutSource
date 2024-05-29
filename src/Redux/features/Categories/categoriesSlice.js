import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  LIST_ALL_CATEGORIES,
  DELETE_SINGLE_CATEGORIE,
  CATEGORIE_STATUS,
  CATEGORIE_BANNER_REMOVE,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  categoriesData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
// export const fetchCategoriesData = createAsyncThunk('categories/fetchCategoriesData', async (data) => {
//     let dataNew={merchant_id:data?.merchant_id,login_type:data?.login_type,token_id:data?.token_id}
//     let token={token:data?.token}
//     console.log(token)

//     // console.log('hhhhh')
//     try {
//         const response = await axios.post(BASE_URL + LIST_ALL_CATEGORIES, dataNew, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               'Authorization': `${data?.token}`
//             }
//           });
//         if (response.status === 200) {
//             // console.log(response.data)
//            return response.data.result
//         }
//     } catch (error) {
//         throw new Error(error.response.data.message);
//     }
// })
export const fetchCategoriesData = createAsyncThunk(
  "categories/fetchCategoriesData",
  async (data) => {
    // let dataNew = {
    //     merchant_id: data?.merchant_id,
    //     login_type: data?.login_type,
    //     token_id: data?.token_id
    // };
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + LIST_ALL_CATEGORIES,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );

      if (response.status === 200) {
        return response.data.result;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Generate pening , fulfilled and rejected action type

/* export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (data) => {
    try {
        const response = await axios.post(BASE_URL + ADD_TO_WISHLIST, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        if(response.data.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


*/
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + DELETE_SINGLE_CATEGORIE,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log(response);
        return {
          categoryId: data.id,
        };
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// for deleteBanner image
export const deleteCategorybanner = createAsyncThunk(
  "categories/deleteCategorybanner",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + CATEGORIE_BANNER_REMOVE,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log(response);
        return {
          categoryId: data.id,
        };
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//  updating category status
export const updateCategoryStatus = createAsyncThunk(
  "categories/updateCategoryStatus",
  async (data) => {
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(BASE_URL + CATEGORIE_STATUS, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.status;
    } catch (error) {
      throw error;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
      state.loading = false;
      state.categoriesData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCategoriesData.rejected, (state, action) => {
      state.loading = false;
      state.categoriesData = {};
      state.error = action.error.message;
    });

    /* builder.addCase(addToWishlist.pending, (state) => {
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

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.categoriesData = state.categoriesData.filter(
        (item) => item && item.id !== action.payload.categoryId
      );

      state.error = ""; // Reset the error message
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // for deleteCategorybanner
    builder.addCase(deleteCategorybanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategorybanner.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.categoriesData = state.categoriesData.filter(
        (item) => item && item.id !== action.payload.categoryId
      );

      state.error = ""; // Reset the error message
    });
    builder.addCase(deleteCategorybanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default categoriesSlice.reducer;
