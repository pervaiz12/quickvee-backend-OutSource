
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, UPDATE_WORKING_HRS_STATUS } from "../../../Constants/Config"


const initialState = {
    loading: false,
    WorkingHrsData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchWorkingHrsData = createAsyncThunk('orderType/fetchWorkingHrsData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + UPDATE_WORKING_HRS_STATUS, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.success === true) {
            console.log("SDFSD", response.data)
            return response.data.data
        } else if (response.data.success === false && response.data.message === "No data found for the specified criteria") {
            console.log("SDFSD", response.data)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type




const OrderTypeSlice = createSlice({
    name: 'orderType',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchWorkingHrsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchWorkingHrsData.fulfilled, (state, action) => {
            state.loading = false;
            state.WorkingHrsData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchWorkingHrsData.rejected, (state, action) => {
            state.loading = false;
            state.WorkingHrsData = {};
            state.error = action.error.message;
        })

    }
})


export default OrderTypeSlice.reducer