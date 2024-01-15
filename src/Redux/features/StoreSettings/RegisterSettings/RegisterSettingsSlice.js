import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_REGISTER_SETTINGS_DATA } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    RegisterSettingsData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchRegisterSettingsData = createAsyncThunk('registerSettings/fetchRegisterSettingsData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + GET_REGISTER_SETTINGS_DATA, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === true) {
            // console.log(response);
           return response.data.result
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const RegisterSettingsSlice = createSlice({
    name: 'registerSettings',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRegisterSettingsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchRegisterSettingsData.fulfilled, (state, action) => {
            state.loading = false;
            state.RegisterSettingsData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchRegisterSettingsData.rejected, (state, action) => {
            state.loading = false;
            state.RegisterSettingsData = {};
            state.error = action.error.message;
        })

    }
})

export default RegisterSettingsSlice.reducer