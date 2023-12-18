import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_CATEGORIES} from "../../../Constants/Config"

const initialState = {
    loading: false,
    categoriesData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchCategoriesData = createAsyncThunk('categories/fetchCategoriesData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_CATEGORIES, data, { headers: {  'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
        "Content-Type": "application/json"
    } })
        if (response.data.status === 200) {
           return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
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

export const deleteToWishlist = createAsyncThunk('wishlist/deleteToWishlist', async (data) => {

    try {
        const response = await axios.post(BASE_URL + DELETE_TO_WISHLIST, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
      if(response.data.status === 200){
        return {
            productId: data.product_id,
            message: response.data.message
        };
      }
        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

*/
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCategoriesData.rejected, (state, action) => {
            state.loading = false;
            state.categoriesData = {};
            state.error = action.error.message;
        })

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

        builder.addCase(deleteToWishlist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.wishlistData = state.wishlistData.filter((item) => item && item.id.toString() !== action.payload.productId);

            state.error = ''; // Reset the error message
        });
        builder.addCase(deleteToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

*/
    }
})


export default categoriesSlice.reducer