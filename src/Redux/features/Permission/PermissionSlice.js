import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_PERMISSION , DELETE_SINGLE_PERMISSION} from "../../../Constants/Config"

const initialState = {
    loading: false,
    permissionData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchPermissionData = createAsyncThunk('permission/fetchPermissionData', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_PERMISSION, data, { headers: { "Content-Type": "multipart/form-data" } })

        if (response.data.status === "success") {
            // console.log(response.data.data)
           return response.data.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

export const deletePermission = createAsyncThunk('permission/deletePermission', async (data) => {

    try {
        const response = await axios.post(BASE_URL + DELETE_SINGLE_PERMISSION, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
      if(response){
        console.log(response)
        return {
            id:data.id
        }
      }
        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


const taxesSlice = createSlice({
    name: 'permission',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPermissionData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchPermissionData.fulfilled, (state, action) => {
            state.loading = false;
            state.permissionData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchPermissionData.rejected, (state, action) => {
            state.loading = false;
            state.permissionData = {};
            state.error = action.error.message;
        })


        
        builder.addCase(deletePermission.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePermission.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.permissionData = state.permissionData.filter((item) => item && item.id !== action.payload.id);
            state.error = ''; // Reset the error message
        });
        builder.addCase(deletePermission.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


    }
})


export default taxesSlice.reducer