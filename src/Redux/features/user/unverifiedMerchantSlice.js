import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  BASE_URL , GET_VERIFIED_MERCHANT} from "../../../Constants/Config"
import axios from 'axios';

let initialState={
    loading: false,
    unverifiedMerchantData: {},
    error: '',
}

export const getUnVerifiedMerchant=createAsyncThunk('UnVerified/getUnVerifiedMerchant',async(data)=>{
    // console.log(data)
       const response= await axios.post(BASE_URL+GET_VERIFIED_MERCHANT,data,{ headers: { "Content-Type": "multipart/form-data" } })
    //    console.log(response)
       if(response.data.status==200)
        {
            return response.data.message
        }
   

})

export const UnVerifiedMerchantSlice=createSlice({
    name:'UnVerified',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getUnVerifiedMerchant.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUnVerifiedMerchant.fulfilled, (state, action) => {
            state.loading = false;
            state.unverifiedMerchantData = action.payload;
            state.error = '';
        })
        builder.addCase(getUnVerifiedMerchant.rejected, (state, action) => {
            state.loading = false;
            state.unverifiedMerchantData = {};
            state.error = action.error.message;
        })

    }

})
export default UnVerifiedMerchantSlice.reducer