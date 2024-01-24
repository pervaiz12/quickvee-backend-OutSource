import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_STORE_ORDER_DATA } from '../../../Constants/Config';

const initialState = {
    loading: false,
    StoreOrderData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchStoreOrderData = createAsyncThunk('StoreOrderSlice/fetchStoreOrderData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + GET_STORE_ORDER_DATA, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === true) {
            // console.log(response);
           return response.data.store_order_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const StoreOrderSlice = createSlice({
    name: 'StoreSettingAlertsList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStoreOrderData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchStoreOrderData.fulfilled, (state, action) => {
            state.loading = false;
            state.StoreOrderData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchStoreOrderData.rejected, (state, action) => {
            state.loading = false;
            state.StoreOrderData = {};
            state.error = action.error.message;
        })

    }
})

export default StoreOrderSlice.reducer