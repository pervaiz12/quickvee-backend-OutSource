import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, VENDORS_REPORT_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    VendorListData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchVendorListData = createAsyncThunk('VendorReportList/fetchVendorListData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + VENDORS_REPORT_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
// console.log(response)
        if (response.data.status === true) {
            console.log(response.data.vendor_list)
           return response.data.vendor_list
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const VendorListSlice = createSlice({
    name: 'VendorReportList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVendorListData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchVendorListData.fulfilled, (state, action) => {
            state.loading = false;
            state.VendorListData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchVendorListData.rejected, (state, action) => {
            state.loading = false;
            state.VendorListData = {};
            state.error = action.error.message;
        })

    }
})

export default VendorListSlice.reducer