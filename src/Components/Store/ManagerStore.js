import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import storeDefaultImage from "../../Assests/Vendors/DefaultStore.svg";
import EmailLogo from "../../Assests/Vendors/EmailLogo.svg";
import PhoneLogo from "../../Assests/Vendors/PhoneLogo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import AddIcon from "../../Assests/Category/addIcon.svg";
import {
  getAuthSessionRecord,
  handleGetStoreRecord,
  getAuthInvalidMessage,
} from "../../Redux/features/Authentication/loginSlice";
import AddManagerFormModel from "./AddManagerFormModel";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import "../../Styles/Manager.css";
import {
  deleteManagerById,
  getManagerListing,
} from "../../Redux/features/user/managerSlice";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import Loader from "../../CommonComponents/Loader";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";

const managerStore = [
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
];
const stores = [
  { id: 1, value: "chocolate", title: "Chocolate" },
  { id: 2, value: "strawberry", title: "Strawberry" },
  { id: 3, value: "vanilla", title: "Vanilla" },
];

const ManagerStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LoginGetDashBoardRecordJson, LoginAllStore } = useAuthDetails();

  const [managerList, setManagerList] = useState([]);
  const [loading, setLoading] = useState(false);

  // let AuthSessionRecord=Cookies.get('loginDetails') !==undefined ? Cookies.get('loginDetails') :[]
  // const AdminRocordNew=useSelector((state)=>CryptoJS.AES.decrypt(state?.loginAuthentication?.getUserRecord, 'secret key').toString(CryptoJS.enc.Utf8));
  // const LoginAllStore= AdminRocordNew !=="" ?JSON.parse(AdminRocordNew):[]
  let UserLoginDataStringFy =
    Cookies.get("user_auth_record") !== undefined
      ? Cookies.get("user_auth_record")
      : [];
  const getUserLoginAuth = atob(UserLoginDataStringFy);
  const GetSessionLogin =
    getUserLoginAuth !== "" ? JSON.parse(getUserLoginAuth) : [];
  // useEffect(()=>{
  //   if( AuthSessionRecord !=="")
  //     {
  //       dispatch(getAuthSessionRecord(AuthSessionRecord))
  //     }

  // },[AuthSessionRecord])
  // onClick={()=>handleSubmitStoreRecord(matchedStorenew?.merchant_id)}
  // onClick={()=>handleSubmitStoreRecord(matchedStore?.merchant_id)}

  // const handleSubmitStoreRecord=(merchant_id)=>{
  //   const data={username:GetSessionLogin?.username,password:GetSessionLogin.password,login_type:LoginAllStore?.data?.login_type,merchant_id:merchant_id}
  //   dispatch(handleGetStoreRecord(data)).then(result=>{
  //     if(result?.payload?.status==true)
  //       {
  //         console.log(result?.payload)
  //         console.log(result?.payload?.final_login)
  //         if(result?.payload?.final_login==1)
  //           {
  //             navigate(`/`)

  //           }else{
  //             console.log("store page called")
  //           }

  //       }else{
  //           Cookies.remove('loginDetails');
  //           Cookies.remove('user_auth_record');
  //           // navigate('/login'), { state: {msg: result?.payload?.msg} }
  //           dispatch(getAuthInvalidMessage(result?.payload?.msg))
  //           navigate('/login')

  //       }
  //   })

  // }

  const fetchManagerListing = () => {
    setLoading(true);
    const data = {
      admin_id: LoginGetDashBoardRecordJson?.data?.user_id,
    };
    dispatch(getManagerListing(data))
      .then((res) => {
        if (res?.payload?.msg === "Data found.") {
          setManagerList(res?.payload?.result);
        } else if (res?.payload?.msg === "No data found.") {
          setManagerList([]);
        }
      })
      .catch(() => {
        ToastifyAlert("Error!", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // calling manager listing API.
    fetchManagerListing();
  }, []);

  let getSingleStore = (result) => {
    const matchedStorenew = LoginAllStore?.data?.stores?.find(
      (store) => store?.merchant_id === result
    );
    if (matchedStorenew) {
      // console.log("Matched store:", matchedStorenew); // Check if the matched store is correct
      return (
        <p
          className="p-1 border me-3 store-items-store-names"
          key={matchedStorenew?.id}
        >
          {matchedStorenew.name}
        </p>
      );
    }
  };

  const handleDeleteManager = (id) => {
    const data = {
      manager_id: id,
    };
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this ?"
    );
    if (userConfirmed) {
      if (id) {
        dispatch(deleteManagerById(data))
          .then((res) => {
            if (res?.payload?.status) {
              ToastifyAlert("Deleted Successfully", "success");
              fetchManagerListing();
            }
          })
          .catch((_) => {
            ToastifyAlert("Error!", "error");
          });
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <>
      <Grid container-fluid className="managerStore-title-main border" px={2}>
        <Grid item xs={12}>
          <div className="flex justify-between  m-3">
            <p className="managerStore-title select-none">Manager</p>
            <div className="flex items-center cursor-pointer">
              {/* <p className="me-3 select-none managerStore-btn" style={{whiteSpace:"nowrap"}}>Add Manager</p> <img src={AddIcon} /> */}
              <AddManagerFormModel
                stores={LoginAllStore}
                modalType="add"
                fetchManagerListing={fetchManagerListing}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      {loading ? (
        <div class="loading-box">
          <Loader />
        </div>
      ) : (
        <Grid container className="store-items-list" spacing={2} px={2}>
          {managerList?.length ? (
            managerList?.map((item, Index) => {
              return (
                <Grid item className="store-items" xs={12} sm={6} key={Index}>
                  <div className="store-item-card-manager">
                    <div className="flex">
                      <div className="me-5 flex items-start">
                        {/* <img
                            src={item.img || storeDefaultImage}
                            alt="store_image"
                          /> */}
                        <div className="name-logo">
                          <span>
                            {item?.name
                              ?.split(" ")[0]
                              ?.charAt(0)
                              ?.toUpperCase() +
                              item?.name
                                ?.split(" ")[1]
                                ?.charAt(0)
                                ?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="grid content-center w-full store-items-address">
                        <div className="flex justify-between">
                          <p className="store-items-store-name">{item.name}</p>
                          <div className="user-operation">
                            <p>
                              <AddManagerFormModel
                                stores={LoginAllStore}
                                modalType="edit"
                                modalData={item}
                                fetchManagerListing={fetchManagerListing}
                              />
                            </p>
                            <p>
                              <img
                                src={DeleteIcon}
                                alt="delete-icon"
                                onClick={() => handleDeleteManager(item?.id)}
                              />
                            </p>
                          </div>
                        </div>

                        <div className="store-items-store-name-address">
                          <div className="email">
                            <img className="me-2" src={EmailLogo} />
                            <span className="me-4">{`${item.email} `}</span>
                          </div>
                          <div className="phone">
                            <img className="" src={PhoneLogo} />
                            <span>{`${item.phone} `}</span>
                          </div>
                        </div>
                        <div className="merchant-list">
                          {item?.merchant_id.includes(",")
                            ? item?.merchant_id
                                .split(",")
                                ?.map((merchantData, index) => {
                                  const matchedStore =
                                    LoginAllStore?.data?.stores?.find(
                                      (store) =>
                                        store?.merchant_id === merchantData
                                    );
                                  if (matchedStore) {
                                    return (
                                      <p
                                        key={index}
                                        className="p-1 border me-3 store-items-store-names"
                                      >
                                        {matchedStore.name}
                                      </p>
                                    );
                                  }
                                })
                            : getSingleStore(item?.merchant_id)}
                          {/* {item.stores.map((store) => (
                                <p className="p-1 border me-3 store-items-store-names">{store}</p>
                                ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <p>No Manager Found</p>
          )}
        </Grid>
      )}

      {/* <Grid container className="store-items-list" spacing={2}>
        {managerStore.map((item, Index) => (
          <Grid item className="store-items " xs={12} sm={6} key={Index}>
            <div className="store-item-card-manager border my-2 p-4">
              <div className="flex">
                <div className="me-5 flex items-start">
                  <img src={item.img || storeDefaultImage} alt="store_image" />
                </div>
                <div className="grid content-center w-full store-items-address">
                  <div className="flex justify-between">
                    <p className="store-items-store-name">{item.name}</p>
                    <p className="store-items-edit-btn">Edit</p>
                  </div>

                  <div className="store-items-store-name-address w-full">
                    <span className="flex ">
                      <img className="me-2" src={EmailLogo} />
                      <span className="me-4">{`${item.email} `}</span>
                    </span>
                    <span className="flex  ">
                      <img className="" src={PhoneLogo} />
                      <span>{`${item.phone} `}</span>
                    </span>
                  </div>
                  <div className="flex mt-2">
                {item.stores.map((store) => (
                  <p className="p-1 border me-3 store-items-store-names">{store}</p>
                ))}
              </div>
                </div>
              </div>

              
            </div>
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default ManagerStore;
