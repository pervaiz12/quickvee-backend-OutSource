import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_STORE_SETUP_LIST } from "../../../Constants/Config";

const initialState = {
    loading: false,
    storesetupData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchStoreSettingSetupData = createAsyncThunk('SettingSetupSlice/fetchStoreSettingSetupData.', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(BASE_URL + GET_STORE_SETUP_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
        // console.log(response)
        if (response.data.status === true) {
           return response.data.result
        }
    } catch (error) {
        // throw new Error("Internal Server Error");
        const customError = {
          message: error.message,
          status: error.response ? error.response.status : "Network Error",
          data: error.response ? error.response.data : null,
        };
        return rejectWithValue(customError);
      }
})





const SettingSetupSlice = createSlice({
    name: 'StoreSettingsetupList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStoreSettingSetupData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchStoreSettingSetupData.fulfilled, (state, action) => {
            state.loading = false;
            state.storesetupData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchStoreSettingSetupData.rejected, (state, action) => {
            state.loading = false;
            state.storesetupData = {};
            state.error = action.error.message;
        })

    }
})


export default SettingSetupSlice.reducer




