
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LOYALTY_PROGRAM_LIST} from "../../../Constants/Config"


const initialState = {
    loading: false,
    loyaltyprogramData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchloyaltyprogramData = createAsyncThunk('loyaltyprogram/fetchloyaltyprogramData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LOYALTY_PROGRAM_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === "Success") {

           return response.data.result
        }else if(response.data.status === "Failed" && response.data.msg === "No found"){
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type

const loyaltyprogramSlice = createSlice({
    name: 'loyaltyprogram',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchloyaltyprogramData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchloyaltyprogramData.fulfilled, (state, action) => {
            state.loading = false;
            state.loyaltyprogramData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchloyaltyprogramData.rejected, (state, action) => {
            state.loading = false;
            state.loyaltyprogramData = {};
            state.error = action.error.message;
        })

    }
})


export default loyaltyprogramSlice.reducer