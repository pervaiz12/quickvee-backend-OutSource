
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios';
// import { BASE_URL, ADD_PO_LIST } from "../../../Constants/Config"

// const initialState = {
//     loading: false,
//     addpoData: [], 
//     successMessage: "",
//     error: '',
// }


// // Generate pening , fulfilled and rejected action type
// export const fetchaddpopurchaseData = createAsyncThunk('Addpolist/fetchaddpopurchaseData.', async (data) => {
//     //console.log(data)
//     try {
//         const response = await axios.post(BASE_URL + ADD_PO_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
//         console.log(response)
//         console.log(response.data.status)
//         if (response.data.status == true) {
//             console.log("ahahahhahha")
//             console.log(response?.data?.result)
//             return response
//         }else{
//             console.log('qqqqqqqq')
//         }
//     } catch (error) {
//         throw new Error(error.response.data.message);
//     }
// })

// // Generate pening , fulfilled and rejected action type




// const AddpurchaseOrderSlice = createSlice({
//     name: 'Addpolist',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchaddpopurchaseData.pending, (state, action) => {
//             state.loading = true;
//         })
//         builder.addCase(fetchaddpopurchaseData.fulfilled, (state, action) => {
//             state.loading = false;
//             state.addpoData = action.payload;
//             state.error = '';
//         })
//         builder.addCase(fetchaddpopurchaseData.rejected, (state, action) => {
//             state.loading = false;
//             // state.addpoData = {};
            
//             state.error = action.error.message;
//         })

//     }
// })


// export default AddpurchaseOrderSlice.reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import Cookies from 'js-cookie';

import axios from 'axios';

let initial = {
    loading: false,
    addpoData: [],
    errors: '',
}

export const fetchaddpopurchaseData = createAsyncThunk('Addpolist/fetchaddpopurchaseData', async (data) => {
    console.log(data)
    let dataresult = { merchant_id: 'MAL0100CA', admin_id: 'MAL0100CA' }
    try {
        const response = await axios.post("https://sandbox.quickvee.net/Purchase_orders_api/po_list", dataresult, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response); // Log the response data
        return response?.data; // Return the response data
    } catch (error) {
        console.error("Error validating email:", error.message);
        throw error;
    }
});

const AddpurchaseOrderSlice = createSlice({
    name: 'Addpolist',
    initialState: initial,
    extraReducers: (builder) => {
        builder.addCase(fetchaddpopurchaseData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchaddpopurchaseData.fulfilled, (state, action) => {
            state.loading = false
            state.addpoData = action.payload
        })
        builder.addCase(fetchaddpopurchaseData.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })
    }

})
export default AddpurchaseOrderSlice.reducer

