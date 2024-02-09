import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, NEWS_LETTER_LIIST } from '../../../Constants/Config';

const initialState = {
    loading: false,
    NewsLetterListData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchNewsLetterListData = createAsyncThunk('NewsLetterList/fetchNewsLetterListData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + NEWS_LETTER_LIIST, data, { headers: { "Content-Type": "multipart/form-data" } })
// console.log(response)
        if (response.data.status === true) {
            // console.log(response.data.news_data)
           return response.data.news_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const VendorListSlice = createSlice({
    name: 'NewsLetterList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNewsLetterListData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchNewsLetterListData.fulfilled, (state, action) => {
            state.loading = false;
            state.NewsLetterListData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchNewsLetterListData.rejected, (state, action) => {
            state.loading = false;
            state.NewsLetterListData = {};
            state.error = action.error.message;
        })

    }
})

export default VendorListSlice.reducer