import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, PRODUCTS_LIST } from "../../../Constants/Config";

const initialState = {
    loading: false,
    productsData: [],
    page: 0,
    hasMore: true,
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchProductsData = createAsyncThunk('products/fetchProductsData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + PRODUCTS_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
        // console.log(response)
        if (response.status === 200) {                          
           return response.data;
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})




const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        editProduct: (state, action) => {
            state.productsData = state.productsData.map(product => {
                if (product.id === action.payload.id) {

                    return {
                        ...product, // Spread syntax to copy existing properties
                        title: action.payload.title, // Update the title
                        old_title: action.payload.title
                    };
                } else {
                    // This isn't the one we're looking for - leave it as is
                    return product;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductsData.fulfilled, (state, action) => {
            state.loading = false;
            // state.productsData = action.payload;
            // state.productsData = [...state.productsData, ...action.payload];
            // Ensure productsData is always treated as an array
            if (!Array.isArray(state.productsData)) {
                state.productsData = [];
            }
            console.log(state.productsData);
            // Append new items to the productsData array
            state.productsData.push(...action.payload);
           
            state.page += 1;
             console.log(state.page);
            state.hasMore = action.payload.length > 0;
            state.error = '';
        })
        builder.addCase(fetchProductsData.rejected, (state, action) => {
            state.loading = false;
            state.productsData = {};
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
*/


    }
})

export const {  editProduct} = productsSlice.actions;
export default productsSlice.reducer