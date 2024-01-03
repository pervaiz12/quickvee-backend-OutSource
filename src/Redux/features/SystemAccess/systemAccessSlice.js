import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_SYSTEM_ACCESS,UPDATE_SYSTEM_ACCESS,END_DAY_ACTUAL_AMT} from "../../../Constants/Config"


const initialState = {
    loading: false,
    systemAccessData: [],
    successMessage: "",
    error: '',
}

//Async thunk for adding actual amount system access data
export const addActualAmountData = createAsyncThunk('systemAccessList/addActualAmountData',async (data)=>{
    try{
        const response = await axios.post(BASE_URL + END_DAY_ACTUAL_AMT, data, {headers :{"Content-Type":"multipart/form-data"}});
        if(response.data.status ===true){
            return response.data.data;
        }
    }catch(error){
        throw new Error(error.response.data.message);
    }

});


// Async thunk for updating system access data
export const updateSystemAccessData = createAsyncThunk('systemAccessList/updateSystemAccessData', async (data) => {
    try {
        const response = await axios.post(BASE_URL + UPDATE_SYSTEM_ACCESS, data, { headers: { "Content-Type": "multipart/form-data" } });

        if (response.data.success === true) {
            alert("Updated Successfully!");
            return response.data.data;
        }
    } catch (error) {
        throw new Error(error.response.data.msg);
    }
});




// Generate pening , fulfilled and rejected action type
export const fetchsystemAccessListData = createAsyncThunk('systemAccessList/fetchsystemAccessListData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_SYSTEM_ACCESS, data, { headers: { "Content-Type": "multipart/form-data" } })
  
        if (response.data.success === true) {

           return response.data.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

// const SystemAccessSlice = createSlice({
//     name: 'systemAccessList',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(fetchsystemAccessListData.pending, (state) => {
//             state.loading = true;
//         })
//         builder.addCase(fetchsystemAccessListData.fulfilled, (state, action) => {
//             state.loading = false;
//             state.systemAccessData = action.payload;
//             state.error = '';
//         })
//         builder.addCase(fetchsystemAccessListData.rejected, (state, action) => {
//             state.loading = false;
//             state.systemAccessData = {};
//             state.error = action.error.message;
//         })

//     }
// })


const SystemAccessSlice = createSlice({
    name: 'systemAccessList',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchsystemAccessListData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchsystemAccessListData.fulfilled, (state, action) => {
                state.loading = false;
                state.systemAccessData = action.payload;
                state.error = '';
            })
            .addCase(fetchsystemAccessListData.rejected, (state, action) => {
                state.loading = false;
                state.systemAccessData = [];
                state.error = action.error.message;
            })

            .addCase(addActualAmountData.pending, (state) => {
                state.loading = true;
            })
            .addCase(addActualAmountData.fulfilled, (state, action) => {
                state.loading = false;
                state.systemAccessData = action.payload;
                state.error = '';
            })
            .addCase(addActualAmountData.rejected, (state, action) => {
                state.loading = false;
                state.systemAccessData = [];
                state.error = action.error.message;
            })
            .addCase(updateSystemAccessData.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSystemAccessData.fulfilled, (state, action) => {
                state.loading = false;
                state.systemAccessData = action.payload;
                state.successMessage = 'System access data updated successfully';
                state.error = '';
            })
            .addCase(updateSystemAccessData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default SystemAccessSlice.reducer
