
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_PARCHASE} from "../../../Constants/Config"

const initialState = {
    loading: false,
    purchaseData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchpurchaseData = createAsyncThunk('purchase/fetchpurchaseData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_PARCHASE, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.status === 200) {
            // console.log(response.data)
           return response.data.result
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

// Generate pening , fulfilled and rejected action type




const purchaseOrderSlice = createSlice({
    name: 'purchase',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchpurchaseData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchpurchaseData.fulfilled, (state, action) => {
            state.loading = false;
            state.purchaseData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchpurchaseData.rejected, (state, action) => {
            state.loading = false;
            state.purchaseData = {};
            state.error = action.error.message;
        })

    }
})


export default purchaseOrderSlice.reducer