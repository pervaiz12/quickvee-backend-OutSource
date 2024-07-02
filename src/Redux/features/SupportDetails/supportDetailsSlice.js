
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, SUPPORT_DETAILS_LIST  } from "../../../Constants/Config"


const initialState = {
    loading: false,
    supportDetailsData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchsupportDetailsData = createAsyncThunk('supportDetail/fetchsuppoertDetailsData', async (data) => {
    const {token, ...dataNew}= data;
    try {
        const response = await axios.post(BASE_URL + SUPPORT_DETAILS_LIST, dataNew, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}` // Use data?.token directly
            }
        });
        if (response.data.status === true) {
           return response.data.json_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type




const supportDetailsSlice = createSlice({
    name: 'supportDetail',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchsupportDetailsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchsupportDetailsData.fulfilled, (state, action) => {
            state.loading = false;
            state.supportDetailsData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchsupportDetailsData.rejected, (state, action) => {
            state.loading = false;
            state.supportDetailsData = {};
            state.error = action.error.message;
        })



    }
})


export default supportDetailsSlice.reducer