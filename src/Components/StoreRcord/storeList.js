import React,{useEffect} from 'react'
import Cookies from 'js-cookie'; 
import { useSelector, useDispatch} from "react-redux";//,localAuthCheck 
import CryptoJS from 'crypto-js';
import StoreListLogic from './storeListLogic'
import {getAuthSessionRecord } from "../../Redux/features/Authentication/loginSlice";


export default function StoreList() {
    const dispatch = useDispatch();
    let AuthSessionRecord=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
    const {handleGetStoreData}=StoreListLogic()
    const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
    const AdminRocord= AdminRocordNew !=="" ?JSON.parse(AdminRocordNew):[]
    console.log(AdminRocord)
    useEffect(()=>{
      if( AuthSessionRecord !=="")
        {
          dispatch(getAuthSessionRecord(AuthSessionRecord))
        }
      
    },[AuthSessionRecord])

    const handleGetRecord=(merchantId)=>{
      console.log(merchantId)

    }

    

    let getSingleStore = (result) => {
      const matchedStorenew = AdminRocord?.data?.stores?.find(store => store?.merchant_id === result);
      if (matchedStorenew) {
          console.log("Matched store:", matchedStorenew); // Check if the matched store is correct
          return <span onClick={()=>handleGetRecord(matchedStorenew?.merchant_id)} key={matchedStorenew?.id}>{matchedStorenew.name}</span>;
      }
  }
   
  return (
    <div>
      {
        // console.log(AdminRocord?.data?.login_type)
        AdminRocord?.data?.login_type=="admin"?
          <>
              {
                Array.isArray(AdminRocord?.data?.stores) &&
                AdminRocord?.data?.stores.map((result,index) => {
                    // console.log(result);
                    return(
                        
                        <div key={index}>
                            <span>{result.name}</span>
                            <br/>
                            <span>{result.a_state}</span>
                            <br/>
                        </div>
                        
                    )
                    // Perform other operations here if needed
                  })
              }
              <div>
              {
                      // console.log(AdminRocord?.data?.managers)
                      AdminRocord?.data?.managers && Array.isArray(AdminRocord?.data?.managers)?
                      AdminRocord?.data?.managers?.map((result,index)=>{
                          // console.log(result)
                          return(
                              <div key={index}>

                                  <p><span>{result.f_name}</span><span>{result.l_name}</span></p>
                                  <span>{result.email}</span><span>{result.phone}</span>
                                  {
                                      result?.merchant_id.includes(',') ?
                                      result?.merchant_id.split(',')?.map((merchantData,index) => {
                                          const matchedStore = AdminRocord?.data?.stores?.find(store => store?.merchant_id === merchantData)
                                          if (matchedStore) {
                                            console.log(handleGetStoreData)
                                              return <span key={index} onClick={()=>handleGetStoreData(matchedStore?.merchant_id)}>{matchedStore.name}</span>;
                                          }
                                      
                                      })
                                      :
                                        getSingleStore(result?.merchant_id)
                                  }  
                              </div>
                          )
                      })

                      :''

                  }

              </div>
          </>  
        :
        AdminRocord?.data?.login_type=="merchant"?
        Array.isArray(AdminRocord?.data?.stores) &&
        AdminRocord?.data?.stores.map((result,index) => {
            // console.log(result);
            return(
                
                <div key={index}>
                    <span>{result.name}</span>
                    <br/>
                    <span>{result.a_state}</span>
                    <br/>
                </div>
                
            )
            // Perform other operations here if needed
          })
        :
        AdminRocord?.data?.login_type=="manager"?
        Array.isArray(AdminRocord?.data?.stores) &&
        AdminRocord?.data?.stores.map((result,index) => {
            // console.log(result);
            return(
                
                <div key={index}>
                    <span>{result.name}</span>
                    <br/>
                    <span>{result.a_state}</span>
                    <br/>
                </div>
                
            )
            // Perform other operations here if needed
          })
          :''

      }
    </div>
  )
}
