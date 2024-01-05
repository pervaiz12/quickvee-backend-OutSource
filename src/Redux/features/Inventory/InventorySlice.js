import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_INVENTORY,UPDATE_INVENTORY} from "../../../Constants/Config"


const initialState = {
    loading: false,
    inventoryData: [],
    successMessage: "",
    error: '',
}



// Async thunk for updating system access data
export const updateInventoryData = createAsyncThunk('inventoryDataList/updateInventoryData', async (data) => {
    try {
        const response = await axios.post(BASE_URL + UPDATE_INVENTORY, data, { headers: { "Content-Type": "multipart/form-data" } });

        if (response.data.success === true) {
            alert("Updated Successfully!");
            return response.data.data;
        }
    } catch (error) {
        throw new Error(error.response.data.msg);
    }
});




// Generate pening , fulfilled and rejected action type
export const fetchInventoryListData = createAsyncThunk('inventoryDataList/fetchInventoryListData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_INVENTORY, data, { headers: { "Content-Type": "multipart/form-data" } })
  
        if (response.data.status === true) {
            // If the API response has a true status, return the data
            console.log('AAAAAAAAAAAAAAAAAAAAA',response.data.data.age_verify.includes("1"))
            return response.data.data;
            
          } else {
            // If the API response has a false status, return the error message
            throw new Error(response.data.message);
          }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})




const InventorySlice = createSlice({
    name: 'inventoryDataList',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventoryListData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInventoryListData.fulfilled, (state, action) => {
                state.loading = false;
                state.inventoryData = action.payload;
                state.error = '';
            })
            .addCase(fetchInventoryListData.rejected, (state, action) => {
                state.loading = false;
                state.inventoryData = [];
                state.error = action.error.message;
            })
            .addCase(updateInventoryData.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateInventoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.inventoryData = action.payload;
                state.successMessage = 'Inventory data updated successfully';
                state.error = '';
            })
            .addCase(updateInventoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default InventorySlice.reducer
