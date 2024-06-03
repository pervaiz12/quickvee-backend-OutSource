
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LOYALTY_PROGRAM_LIST, GET_LOYATY_DATA_COUNT} from "../../../Constants/Config"


const initialState = {
    loading: false,
    loyaltyprogramData: [],
    loyaltyOrderCount: 0,
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchloyaltyprogramData = createAsyncThunk('loyaltyprogram/fetchloyaltyprogramData.', async (data) => {
    const { token, ...dataNew } = data;
    try {
        const response = await axios.post(BASE_URL + LOYALTY_PROGRAM_LIST, dataNew, { headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` } })
        if (response.data.status === "Success") {

           return response.data.result
        }else if(response.data.status === "Failed" && response.data.msg === "No found"){
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type
export const getLoyaltyCount = createAsyncThunk(
    "loyaltyprogram/getLoyaltyCount",
    async (data) => {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + GET_LOYATY_DATA_COUNT,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
     
      if (response.data.status == "Success") {
        return response.data.result[0].data_count;
      }
    }
  );

const loyaltyprogramSlice = createSlice({
    name: 'loyaltyprogram',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchloyaltyprogramData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchloyaltyprogramData.fulfilled, (state, action) => {
            state.loading = false;
            state.loyaltyprogramData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchloyaltyprogramData.rejected, (state, action) => {
            state.loading = false;
            state.loyaltyprogramData = {};
            state.error = action.error.message;
        })
        builder.addCase(getLoyaltyCount.fulfilled, (state, action) => {
            state.loyaltyOrderCount = action.payload;
          });
          builder.addCase(getLoyaltyCount.rejected, (state, action) => {
            state.loyaltyOrderCount = 0;
          });

    }
})


export default loyaltyprogramSlice.reducer