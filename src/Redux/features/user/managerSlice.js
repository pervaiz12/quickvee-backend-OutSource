import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  BASE_URL , GET_MANAGER_RECORD} from "../../../Constants/Config"
import axios from 'axios';
const initialState = {
    loading: false,
    ManagerRecord: {},
    // successMessage:'',
    error: '',
}

// const CustomerFunction=()=>{
   
    
//     const[customerRecord,setCustomerRecord]=useState([])
//     const getCustomerData=async()=>{
//         let data={type:2}
//         await axios.post(BASE_URL+ADMIN_GET_CUSTOMER,data,{headers:{
//             "Content-Type":'multipart/form-data'
//           }}).then(result=>{
//             console.log(result)
//             if(result.data.status==200)
//             {
                
//                 setCustomerRecord(result.data.message)


//             }else{
//                 setCustomerRecord([])
//             }

//         })
        
//     }
// }
export const ManagerRecord=createAsyncThunk('Manager/ManagerRecord', async (data)=>{
    const{token,...newData}=data
    const response=await axios.post(BASE_URL+GET_MANAGER_RECORD,newData,{   headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}` // Use data?.token directly
        } })
  
    if (response.data.status === 200) {
        // console.log()
        return response.data.message
    }
   
    // const response=await axios.get(BASE_URL+GET_MANAGER_RECORD)
  
    // if (response.data.status === 200) {
    //     // console.log()
    //     return response.data.message
    // }
   

})



const ManagerSlice = createSlice({
    name: 'Manager',
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
        builder.addCase(ManagerRecord.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(ManagerRecord.fulfilled, (state, action) => {
            state.loading = false;
            state.ManagerRecord = action.payload;
            state.error = '';
        })
        builder.addCase(ManagerRecord.rejected, (state, action) => {
            state.loading = false;
            state.ManagerRecord = {};
            state.error ='';
        })
    


        // builder.addCase(CustomerUpdate.pending, (state) => {
        //     state.loading = true;
        // })
        // builder.addCase(CustomerUpdate.fulfilled, (state, action) => {
        //     state.loading = false;
        //     // state.successMessage = action.payload.message;
        //     state.error = '';
        // })
        // builder.addCase(CustomerUpdate.rejected, (state, action) => {
        //     state.loading = false;
        //     state.successMessage = action.payload;
        //     // state.error = action.error.message;
        // })
    }
})

// export const { updatecustomerData } = CustomerSlice.actions;

export default ManagerSlice.reducer
