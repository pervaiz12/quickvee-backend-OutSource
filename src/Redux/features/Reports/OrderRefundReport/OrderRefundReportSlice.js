import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, ORDER_REFUND_REPORT } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    OrderRefundData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchOrderRefundData = createAsyncThunk('OrderRefundDataList/fetchOrderRefundData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + ORDER_REFUND_REPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
// console.log(response)
        if (response.data.status === true) {
            // console.log(response.data.report_data
            //     )
           return response.data.report_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const OrderRefundReportSlice = createSlice({
    name: 'OrderRefundDataList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchOrderRefundData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchOrderRefundData.fulfilled, (state, action) => {
            state.loading = false;
            state.OrderRefundData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchOrderRefundData.rejected, (state, action) => {
            state.loading = false;
            state.OrderRefundData = {};
            state.error = action.error.message;
        })

    }
})

export default OrderRefundReportSlice.reducer