
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, TOP_SALLER_REPORT} from "../../../Constants/Config"


const initialState = {
    loading: false,
    topsallerData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchtopsallerData = createAsyncThunk('dailyreport/fetchtopsallerData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + TOP_SALLER_REPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
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




const topsallerSlice = createSlice({
    name: 'topsaller',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchtopsallerData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchtopsallerData.fulfilled, (state, action) => {
            state.loading = false;
            state.topsallerData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchtopsallerData.rejected, (state, action) => {
            state.loading = false;
            state.topsallerData = {};
            state.error = action.error.message;
        })

    }
})


export default topsallerSlice.reducer