import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  BASE_URL , GET_VERIFIED_MERCHANT} from "../../../Constants/Config"
import axios from 'axios';

let initialState={
    loading: false,
    verifiedMerchantData: {},
    error: '',
}

export const getVerifiedMerchant=createAsyncThunk('Verified/getVerifiedMerchant',async(data)=>{
    // console.log(data)
    const { token, ...dataNew } = data;
       const response= await axios.post(BASE_URL+GET_VERIFIED_MERCHANT,dataNew,{ 
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}` // Use data?.token directly
        }
    })
    //    console.log(response)
       if(response.data.status==200)
        {
            return response.data.message
        }
   

})

export const VerifiedMerchantSlice=createSlice({
    name:'Verified',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getVerifiedMerchant.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getVerifiedMerchant.fulfilled, (state, action) => {
            state.loading = false;
            state.verifiedMerchantData = action.payload;
            state.error = '';
        })
        builder.addCase(getVerifiedMerchant.rejected, (state, action) => {
            state.loading = false;
            state.verifiedMerchantData = {};
            state.error = action.error.message;
        })

    }

})
export default VerifiedMerchantSlice.reducer