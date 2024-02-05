import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  BASE_URL , ADMIN_GET_CUSTOMER} from "../../../Constants/Config"
import axios from 'axios';
const initialState = {
    loading: false,
    CustomerRecord: {},
    successMessage:'',
    error: '',
}

export const CustomerUpdate=createAsyncThunk('Customer/CustomerUpdate', async (data)=>{
    // console.log("update data")
    // return data
  
    // const response = await axios.post( BASE_URL+ADMIN_GET_CUSTOMER,data, { headers: { "Content-Type": "multipart/form-data" } })
    // // console.log(response.data.status)
    // if (response.data.status === 200) {
    //     // console.log()
    //     return response.data.message
    // }
   

})


export const CustomerFunction = createAsyncThunk('Customer/CustomerFunction', async (data) => {
    const response = await axios.post( BASE_URL+ADMIN_GET_CUSTOMER,data, { headers: { "Content-Type": "multipart/form-data" } })
    // console.log(response.data.status)
    if (response.data.status === 200) {
        // console.log()
        return response.data.message
    }
})

const CustomerSlice = createSlice({
    name: 'Customer',
    initialState,
    // reducers: {
        
       
    //         updatecustomerData: (state, action) => {
    //             // console.log(action)
    //             if(action.payload.id !=="" && action.payload.id !==undefined){
    //                 // console.log(action.payload.id)

    //                 const index = state.CustomerRecord.findIndex(item => item.id === action.payload.id);
    //                 if (index !== -1) {
                      
    //                     // You can update the quantity in action.payload.quantity or use another value
    //                     state.CustomerRecord[index].name = action.payload.name;
    //                     // state.CustomerRecord[index].name
    //                     state.CustomerRecord[index].email = action.payload.email;
    //                     state.CustomerRecord[index].phone = action.payload.phone;
    //                     state.CustomerRecord[index].phone = action.payload.reSet;
    //                 }

    //             }
               
    //         }

        
    
       
    // },
    extraReducers: (builder) => {
        builder.addCase(CustomerFunction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(CustomerFunction.fulfilled, (state, action) => {
            state.loading = false;
            state.CustomerRecord = action.payload;
            state.error = '';
        })
        builder.addCase(CustomerFunction.rejected, (state, action) => {
            state.loading = false;
            state.CustomerRecord = {};
            state.error = action.error.message;
        })
    


        builder.addCase(CustomerUpdate.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(CustomerUpdate.fulfilled, (state, action) => {
            state.loading = false;
            // state.successMessage = action.payload.message;
            state.error = '';
        })
        builder.addCase(CustomerUpdate.rejected, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload;
            // state.error = action.error.message;
        })
    }
})

export const { updatecustomerData } = CustomerSlice.actions;

export default CustomerSlice.reducer
