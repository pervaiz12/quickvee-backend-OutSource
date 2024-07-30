import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, STORE_CREDIT_REPORT } from "../../../../Constants/Config";

const initialState = {
  loading: false,
  StoreCreditReportArr: [],
  status:false,
  successMessage: "",
  error: "",
};

export const fetchStoreCreditReportArr = createAsyncThunk(
    "StoreCreditReport/fetchStoreCreditReportArr",
  async (data, { rejectWithValue }) => {
    try {
      const { tocken, ...dataNew } = data;
      const res = await axios.post(BASE_URL + STORE_CREDIT_REPORT, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tocken}`,
        },
      });
      console.log(res.data);
      if (res.data.status === true) {
        // console.log(response.data
        //     )
        const arr = res.data.store_credit_data;
        const status = res.data.status;
        return {arr,status}
      }
      else if(res.data.status === false) {
        console.log("inside else if")
        const arr = [];
        const status = false;
        return {arr,status}
      }
    } catch (error) {
      const customError = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      return rejectWithValue(customError);
    }
  }
);

const StoreCreditReportSlice = createSlice({
    name: "StoreCreditReport",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchStoreCreditReportArr.pending, (state)=>{
            state.loading=true;
        });
        builder.addCase(fetchStoreCreditReportArr.fulfilled, (state, action) => {
            state.loading = false;
            state.StoreCreditReportArr = action.payload.arr;
            state.status= action.payload.status;
            state.error = "";
          });
          builder.addCase(fetchStoreCreditReportArr.rejected, (state, action) => {
            state.loading = false;
            state.StoreCreditReportArr = [];
            state.error = action.error.message;
          });
    }
})
export default StoreCreditReportSlice.reducer;