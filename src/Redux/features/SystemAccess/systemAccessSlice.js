import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_SYSTEM_ACCESS} from "../../../Constants/Config"


const initialState = {
    loading: false,
    systemAccessData: [],
    successMessage: "",
    error: '',
}



// Generate pening , fulfilled and rejected action type
export const fetchsystemAccessListData = createAsyncThunk('systemAccessList/fetchsystemAccessListData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_SYSTEM_ACCESS, data, { headers: { "Content-Type": "multipart/form-data" } })
        // console.log(response)
        if (response.data.status === true) {
           return response.data.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const SystemAccessSlice = createSlice({
    name: 'systemAccessList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchsystemAccessListData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchsystemAccessListData.fulfilled, (state, action) => {
            state.loading = false;
            state.systemAccessData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchsystemAccessListData.rejected, (state, action) => {
            state.loading = false;
            state.systemAccessData = {};
            state.error = action.error.message;
        })

    }
})


export default SystemAccessSlice.reducer
