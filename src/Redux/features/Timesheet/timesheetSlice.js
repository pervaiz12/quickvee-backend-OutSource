
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, TIME_SHEET_LIST } from "../../../Constants/Config"


const initialState = {
    loading: false,
    timeSheetData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchtimeSheetData = createAsyncThunk('timeSheet/fetchtimeSheetData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + TIME_SHEET_LIST , data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === true) {
           return response.data
        }else if(response.data.status === false ){
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type




const timeSheetSlice = createSlice({
    name: 'timeSheet',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchtimeSheetData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchtimeSheetData.fulfilled, (state, action) => {
            state.loading = false;
            state.timeSheetData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchtimeSheetData.rejected, (state, action) => {
            state.loading = false;
            state.timeSheetData = {};
            state.error = action.error.message;
        })

    }
})


export default timeSheetSlice.reducer