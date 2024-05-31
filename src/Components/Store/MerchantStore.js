import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import storeDefaultImage from "../../Assests/Vendors/DefaultStore.svg";
import {
  getAuthSessionRecord,
  handleGetStoreRecord,
  getAuthInvalidMessage,
} from "../../Redux/features/Authentication/loginSlice";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "./../../Common/cookiesHelper";

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
  const navigate = useNavigate();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  // let AuthSessionRecord=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
  // let UserLoginDataStringFy=Cookies.get('user_auth_record') !==undefined ? Cookies.get('user_auth_record') :[]
  // const getUserLoginAuth = atob(UserLoginDataStringFy);
  // const GetSessionLogin=getUserLoginAuth !==""? JSON.parse(getUserLoginAuth):[]
  // const {handleGetStoreData}=StoreListLogic()
  // const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  // const AdminRocord= AdminRocordNew !=="" ?JSON.parse(AdminRocordNew):[]

  // useEffect(()=>{
  //   if( AuthSessionRecord !=="")
  //     {
  //       dispatch(getAuthSessionRecord(AuthSessionRecord))
  //     }

  // },[AuthSessionRecord])

  // const handleGetRecord=(merchantId)=>{
  //   console.log(merchantId)

  // }

  //   let getSingleStore = (result) => {
  //     const matchedStorenew = AdminRocord?.data?.stores?.find(store => store?.merchant_id === result);
  //     if (matchedStorenew) {
  //         console.log("Matched store:", matchedStorenew); // Check if the matched store is correct GetSessionLogin.username
  //         return <span onClick={()=>handleGetRecord(matchedStorenew?.merchant_id)} key={matchedStorenew?.id}>{matchedStorenew.name}</span>;
  //     }GetSessionLogin?.username  GetSessionLogin?.username
  // }
  const handleSubmitStoreRecord = (merchant_id) => {
    const data = {
      username: GetSessionLogin?.username,
      password: GetSessionLogin.password,
      login_type: LoginGetDashBoardRecordJson?.data?.login_type,
      merchant_id: merchant_id,
    };

    dispatch(handleGetStoreRecord(data)).then((result) => {
      if (result?.payload?.status == true) {
        if (result?.payload?.final_login == 1) {
          navigate(`/`);
        } else {
          console.log("store page called");
        }
      } else {
        Cookies.remove("loginDetails");
        Cookies.remove("user_auth_record");
        // Cookies.remove('token_data');
        dispatch(getAuthInvalidMessage(result?.payload?.msg));
        navigate("/login");
      }
    });
  };
  return (
    <>
      {LoginAllStore?.data?.login_type == "admin" ? (
        <>
          <Grid container className="store-items-list" spacing={2}>
            {Array.isArray(LoginAllStore?.data?.stores) &&
              LoginAllStore?.data?.stores.map((store, Index) => {
                return (
                  <Grid
                    item
                    className="store-items "
                    xs={12}
                    sm={6}
                    key={Index}
                  >
                    {/* <Link to={`/?m_id=${store?.merchant_id}`}> */}
                    <div
                      className="store-item-card border my-2 p-2"
                      onClick={() =>
                        handleSubmitStoreRecord(store?.merchant_id)
                      }
                    >
                      <div className="me-5">
                        <img
                          src={store.img || storeDefaultImage}
                          alt="store_image"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = storeDefaultImage;
                          }}
                        
                        />
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
                    {/* </Link> */}
                  </Grid>
                );
              })}
          </Grid>
        </>
      ) : LoginAllStore?.data?.login_type == "merchant" ? (
        <Grid container className="store-items-list" spacing={2}>
          {Array.isArray(LoginAllStore?.data?.stores) &&
            LoginAllStore?.data?.stores.map((store, Index) => {
              return (
                <Grid item className="store-items " xs={12} sm={6} key={Index}>
                  {/* <Link to={`/?m_id=${store?.merchant_id}`}> */}
                  <div
                    className="store-item-card border my-2 p-2"
                    onClick={() => handleSubmitStoreRecord(store?.merchant_id)}
                  >
                    <div className="me-5">
                      <img
                        src={store.img || storeDefaultImage}
                        alt="store_image"
                      />
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
                  {/* </Link> */}
                </Grid>
              );
            })}
        </Grid>
      ) : LoginAllStore?.data?.login_type == "manager" ? (
        <Grid container className="store-items-list" spacing={2}>
          {Array.isArray(LoginAllStore?.data?.stores) &&
            LoginAllStore?.data?.stores.map((store, Index) => {
              return (
                <Grid item className="store-items " xs={12} sm={6} key={Index}>
                  {/* <Link to={`/?m_id=${store?.merchant_id}`}> */}
                  <div
                    className="store-item-card border my-2 p-2"
                    onClick={() => handleSubmitStoreRecord(store?.merchant_id)}
                  >
                    <div className="me-5">
                      <img
                        src={store.img || storeDefaultImage}
                        alt="store_image"
                      />
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
                  {/* </Link> */}
                </Grid>
              );
            })}
        </Grid>
      ) : (
        ""
      )}
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
