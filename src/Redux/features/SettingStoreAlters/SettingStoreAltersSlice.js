import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_STORE_ALERTS_DATA } from "../../../Constants/Config";

const initialState = {
    loading: false,
    storealertsData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchStoreSettingalertsData = createAsyncThunk('SettingStoreAltersSlice/fetchStoreSettingalertsData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + GET_STORE_ALERTS_DATA, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.status === 200) {
           return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const SettingStoreAltersSlice = createSlice({
    name: 'StoreSettingAlertsList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStoreSettingalertsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchStoreSettingalertsData.fulfilled, (state, action) => {
            state.loading = false;
            state.storealertsData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchStoreSettingalertsData.rejected, (state, action) => {
            state.loading = false;
            state.storealertsData = {};
            state.error = action.error.message;
        })

    }
})

export default SettingStoreAltersSlice.reducer