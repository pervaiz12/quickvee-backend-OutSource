import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, COUPON_REPORT_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    CouponReportData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchCouponReportData = createAsyncThunk('CouponReportList/fetchCouponReportData.', async (data) => {
    try {

        const response = await axios.post(BASE_URL + COUPON_REPORT_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
// console.log(response)
        if (response.data.status === true) {
            // console.log(response.data
            //     )
           return response.data.coupon_report_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const CouponReportSlice = createSlice({
    name: 'CouponReportList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCouponReportData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCouponReportData.fulfilled, (state, action) => {
            state.loading = false;
            state.CouponReportData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCouponReportData.rejected, (state, action) => {
            state.loading = false;
            state.CouponReportData = {};
            state.error = action.error.message;
        })

    }
})

export default CouponReportSlice.reducer