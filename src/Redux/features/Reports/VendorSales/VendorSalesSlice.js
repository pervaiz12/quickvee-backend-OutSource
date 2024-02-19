import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, VENDORS_SALES_REPORT } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    VendorSalesData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchVendorSalesData = createAsyncThunk('VendorSalesReportList/fetchVendorSalesData.', async (data) => {
    try {

        // console.log(BASE_URL + VENDORS_SALES_REPORT)
        const response = await axios.post(BASE_URL + VENDORS_SALES_REPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
// console.log(response)
        if (response.data.status === true) {
            // console.log(response.data.data_list
            //     )
           return response.data.data_list
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const VendorSalesSlice = createSlice({
    name: 'VendorSalesReportList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVendorSalesData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchVendorSalesData.fulfilled, (state, action) => {
            state.loading = false;
            state.VendorSalesData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchVendorSalesData.rejected, (state, action) => {
            state.loading = false;
            state.VendorSalesData = {};
            state.error = action.error.message;
        })

    }
})

export default VendorSalesSlice.reducer