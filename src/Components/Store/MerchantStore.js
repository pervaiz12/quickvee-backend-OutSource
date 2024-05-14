import React,{useEffect} from 'react'
import { Grid } from "@mui/material";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from "react-redux";//,localAuthCheck 
import storeDefaultImage from "../../Assests/Vendors/DefaultStore.svg";
import {getAuthSessionRecord } from "../../Redux/features/Authentication/loginSlice";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie'; 
const storeList = [
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76710",
    img: null,
    merchant_id: "TES76710AA",
    name: "vapeNew",
    phone: "7878787878",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76722",
    img: null,
    merchant_id: "RIN76722AA",
    name: "Vapnew2",
    phone: "7777777777",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76727",
    img: null,
    merchant_id: "RIN76727AA",
    name: "vapeNew3",
    phone: "7878787878",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76727",
    img: null,
    merchant_id: "RIN76727AA",
    name: "vapeNew3",
    phone: "7878787878",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76727",
    img: null,
    merchant_id: "RIN76727AA",
    name: "vapeNew3",
    phone: "7878787878",
    user_type: "merchant",
  },
];

const StorePage = () => {
  const dispatch = useDispatch();
  let AuthSessionRecord=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
  // const {handleGetStoreData}=StoreListLogic()
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
    <>
    {
      AdminRocord?.data?.login_type=="admin"?
      <>
      <Grid container className="store-items-list" spacing={2}>
        {
          Array.isArray(AdminRocord?.data?.stores) &&
          AdminRocord?.data?.stores.map((store,Index) => {
            return(
             
                  <Grid item className="store-items " xs={12} sm={6}  key={Index}>
                    <Link to={`/?m_id=${store?.merchant_id}`}>
                      <div className="store-item-card border my-2 p-2">
                        <div className="me-5">
                        <img src={store.img || storeDefaultImage} alt="store_image" />
                        </div>
                          <div className="grid content-center store-items-address">
                            <p className="store-items-store-name">{store.name}</p>
                            <p className="store-items-store-name-address">
                              {[
                              store.a_address_line_1,
                              store.a_address_line_2,
                              store.a_city,
                              store.a_state,
                              store.a_zip,
                              ]
                              .filter((part) => part !== null && part !== "")
                              .join(", ")}
                            </p>
                          </div>
                      </div>
                    </Link>
                  </Grid>
         
          )
          })
        }
      </Grid>
      </>
      :
      AdminRocord?.data?.login_type=="merchant"?
      <Grid container className="store-items-list" spacing={2}>
        {
            Array.isArray(AdminRocord?.data?.stores) &&
            AdminRocord?.data?.stores.map((store,Index) => {
              return(
                <Grid item className="store-items " xs={12} sm={6}  key={Index}>
                  <Link to={`/?m_id=${store?.merchant_id}`}>
                <div className="store-item-card border my-2 p-2">
                  <div className="me-5">
                    <img src={store.img || storeDefaultImage} alt="store_image" />
                  </div>
                  <div className="grid content-center store-items-address">
                    <p className="store-items-store-name">{store.name}</p>
                    <p className="store-items-store-name-address">
                      {[
                        store.a_address_line_1,
                        store.a_address_line_2,
                        store.a_city,
                        store.a_state,
                        store.a_zip,
                      ]
                        .filter((part) => part !== null && part !== "")
                        .join(", ")}
                    </p>
                  </div>
                </div>
                </Link>
              </Grid>
              )
              
              
            })
        }
      </Grid>
      :
      AdminRocord?.data?.login_type=="manager"?
      <Grid container className="store-items-list" spacing={2}>
        {
            Array.isArray(AdminRocord?.data?.stores) &&
            AdminRocord?.data?.stores.map((store,Index) => {
              return(
                <Grid item className="store-items " xs={12} sm={6}  key={Index}>
                   <Link to={`/?m_id=${store?.merchant_id}`}>
                <div className="store-item-card border my-2 p-2">
                  <div className="me-5">
                    <img src={store.img || storeDefaultImage} alt="store_image" />
                  </div>
                  <div className="grid content-center store-items-address">
                    <p className="store-items-store-name">{store.name}</p>
                    <p className="store-items-store-name-address">
                      {[
                        store.a_address_line_1,
                        store.a_address_line_2,
                        store.a_city,
                        store.a_state,
                        store.a_zip,
                      ]
                        .filter((part) => part !== null && part !== "")
                        .join(", ")}
                    </p>
                  </div>
                </div>
                </Link>
              </Grid>
              )
              
              
            })
        }
      </Grid>:''
    }
      {/* <Grid container className="store-items-list" spacing={2}>
        {storeList.map((store, Index) => (
          <Grid item className="store-items " xs={12} sm={6}  key={Index}>
            <div className="store-item-card border my-2 p-2">
              <div className="me-5">
                <img src={store.img || storeDefaultImage} alt="store_image" />
              </div>
              <div className="grid content-center store-items-address">
                <p className="store-items-store-name">{store.name}</p>
                <p className="store-items-store-name-address">
                  {[
                    store.a_address_line_1,
                    store.a_address_line_2,
                    store.a_city,
                    store.a_state,
                    store.a_zip,
                  ]
                    .filter((part) => part !== null && part !== "")
                    .join(", ")}
                </p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default StorePage;
