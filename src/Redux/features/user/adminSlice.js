import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  BASE_URL , GET_ADMIN_RECORD} from "../../../Constants/Config"
import axios from 'axios';
const initialState = {
    loading: false,
    AdminRecord: {},
    error: '',
}
export const AdminFunction=createAsyncThunk('adminRecord/AdminFunction',async(data)=>{
    const{token,...newData}=data
    const response=await axios.post( BASE_URL+GET_ADMIN_RECORD,newData,{ headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${token}` }})
    if(response.data.status==200)
    {
        return response.data.message

    }
})


const AdminSlice=createSlice({
    name:'adminRecord',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(AdminFunction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(AdminFunction.fulfilled, (state, action) => {
            state.loading = false;
            state.AdminRecord = action.payload;
            state.error = '';
        })
        builder.addCase(AdminFunction.rejected, (state, action) => {
            state.loading = false;
            state.AdminRecord = {};
            state.error = action.error.message;
        })
    }
})
export default AdminSlice.reducer