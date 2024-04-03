
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_DAILY_REPORT} from "../../../Constants/Config"


const initialState = {
    loading: false,
    dailyreportData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchemployeewrkhrs = createAsyncThunk('dailyreport/fetchemployeewrkhrs.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_DAILY_REPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === "Success") {

           return response.data.result
        }else if(response.data.status === "Failed" && response.data.msg === "No. Data found."){
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type




const EmployeeWorkinghrsSlice = createSlice({
    name: 'dailyreport',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchemployeewrkhrs.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchemployeewrkhrs.fulfilled, (state, action) => {
            state.loading = false;
            state.employeewrkhrstData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchemployeewrkhrstData.rejected, (state, action) => {
            state.loading = false;
            state.employeewrkhrsData = {};
            state.error = action.error.message;
        })

    }
})


export default EmployeeWorkinghrsSlice.reducer