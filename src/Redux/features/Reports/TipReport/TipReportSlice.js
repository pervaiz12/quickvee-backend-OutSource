import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, TIP_REPORT_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    TipReportData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchTipReportData = createAsyncThunk('TipReportList/fetchTipReportData.', async (data) => {
    try {

        const response = await axios.post(BASE_URL + TIP_REPORT_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
// console.log(response)
        if (response.data.status === true) {
            // console.log(response.data
            //     )
           return response.data.tip_report_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const TipReportSlice = createSlice({
    name: 'TipReportList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTipReportData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchTipReportData.fulfilled, (state, action) => {
            state.loading = false;
            state.TipReportData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchTipReportData.rejected, (state, action) => {
            state.loading = false;
            state.TipReportData = {};
            state.error = action.error.message;
        })

    }
})

export default TipReportSlice.reducer