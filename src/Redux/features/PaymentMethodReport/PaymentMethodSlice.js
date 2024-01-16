
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_PAYMENT_METHOD_REPORT} from "../../../Constants/Config"


const initialState = {
    loading: false,
    paymentMethodData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchPaymentMethodReportData = createAsyncThunk('paymentReport/fetchPaymentMethodReportData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_PAYMENT_METHOD_REPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === "Success") {
            console.log("SDFSD",response.data)
           return response.data.result
        }else if(response.data.status === "Failed" && response.data.msg === "No Data found."){
            console.log("SDFSD",response.data)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type




const PaymentMethodSlice = createSlice({
    name: 'paymentReport',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPaymentMethodReportData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchPaymentMethodReportData.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentMethodData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchPaymentMethodReportData.rejected, (state, action) => {
            state.loading = false;
            state.paymentMethodData = {};
            state.error = action.error.message;
        })

    }
})


export default PaymentMethodSlice.reducer