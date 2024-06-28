import React, { useEffect, useState } from "react";
import axios from "axios";
import EditNewVendor from "../../Assests/Dashboard/Left.svg";
import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";
import Chip from "@mui/material/Chip";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BASE_URL,
  EDIT_VENDOR_DATA,
  UPDATE_VENDOR_DATA,
} from "../../Constants/Config";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
// import Stack from '@mui/material/Stack';
import { useAuthDetails } from "../../Common/cookiesHelper";
import PasswordShow from "../../Common/passwordShow";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
const vendorFormValues = {
  merchant_id: "",
  id: "",
  name: "",
  email: "",
  phone: "",
  full_address: "",
  city: "",
  zip_code: "",
  state: "",
};
const EditVendors = ({ setVisible }) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const searchParams = new URLSearchParams(location.search);
  const [allvendors, setallvendors] = useState([]);
  const AllVendorsDataState = useSelector((state) => state.vendors);
  const vendorId = searchParams.get("vendorId");
  const [states, setStates] = useState([]);
  const [loader, setLoader] = useState(false);
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [vendorData, setVendorData] = useState(vendorFormValues);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const validate = () => {
    const errors = [];
    let isValid = true;

    const itemErrors = {};
    if (!vendorData.name) {
      itemErrors.name = "Please enter a vendor name";
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(vendorData.email)) {
      itemErrors.email = "Invalid email address";
      isValid = false;
    }
    if (!/^\d{10}$/.test(vendorData.phone)) {
      itemErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }
    // if (!vendorData.full_address) {
    //   itemErrors.full_address = "Please enter a vendor address";
    //   isValid = false;
    // }
    // if (!vendorData.city) {
    //   itemErrors.city = "Please enter a vendor city";
    //   isValid = false;
    // }
    // if (!/^\d{5}$/.test(vendorData.zip_code)) {
    //   itemErrors.zip_code = "ZIP code must be 5 digits";
    //   isValid = false;
    // }
    // if (!vendorData.state) {
    //   itemErrors.state = "Please select state";
    //   isValid = false;
    // }
    setErrorMessage(itemErrors);
    return isValid;
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    let errorMsg = "";

    switch (name) {
      case "name":
        if (value.length <= 0) {
          errorMsg = "Please enter a vendor name";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Invalid email address";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          errorMsg = "Phone number must be 10 digits";
        }
        break;
      // case "zip_code":
      //   if (!/^\d{5}$/.test(value)) {
      //     errorMsg = "ZIP code must be 5 digits";
      //   }
      //   break;
      // case "full_address":
      //   if (value.length <= 0) {
      //     errorMsg = "Please enter a vendor address";
      //   }
      //   break;
      // case "city":
      //   if (value.length <= 0) {
      //     errorMsg = "Please enter a vendor city";
      //   }
      //   break;
      // case "state":
      //   if (vendorData.state === "") {
      //     errorMsg = "Please select state";
      //   }
      //   break;
      default:
        break;
    }
    setErrorMessage((prevState) => ({
      ...prevState,
      [name]: errorMsg,
    }));
    setVendorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function fetchData() {
    const getvendorData = {
      merchant_id: merchant_id,
      vendor_id: vendorId,
      ...userTypeData,
    };
    // console.log(getvendorData);
    const { token, ...Newdata } = getvendorData;

    try {
      const response = await axios.post(BASE_URL + EDIT_VENDOR_DATA, Newdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // setVendorData(response.data);
      // console.log("response.data",response.data);
      // ToastifyAlert("Updated Successfully", "success");
      setVendorData((prevState) => {
        const newData = { ...prevState };
        for (const key in response.data.vendor_data[0]) {
          if (newData.hasOwnProperty(key)) {
            newData[key] = response.data.vendor_data[0][key];
          }
        }
        console.log("return newData", newData);
        return newData;
      });
    } catch (error) {
      console.error("Error:", error);
      handleCoockieExpire();
      getUnAutherisedTokenMessage();
    }
  }

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    let data = {
      merchant_id,
      // ...userTypeData,
    };
    dispatch(fetchVendorsListData(data));
  }, []);

  useEffect(() => {
    if (
      !AllVendorsDataState.loading &&
      AllVendorsDataState.vendorListData &&
      AllVendorsDataState.vendorListData.length >= 1
    ) {
      setallvendors(AllVendorsDataState.vendorListData[0]);
      // setStates(AllVendorsDataState.vendorListData[2])

      const stateArray = AllVendorsDataState.vendorListData[2].map(
        (item) => item.State
      );
      setStates(stateArray);
      // setallvendors(AllVendorsDataState.stateListData[2])
    }
  }, [
    AllVendorsDataState,
    AllVendorsDataState.loading,
    AllVendorsDataState.vendorListData,
  ]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let packet = {
        ...vendorData,
        ...userTypeData,
        // token_id: userTypeData?.token_id,
        // login_type: userTypeData?.login_type,
      };
      const { token, ...newData } = packet;
      try {
        setLoader(true);
        const response = await axios.post(
          BASE_URL + UPDATE_VENDOR_DATA,
          // updatedData,
          newData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (
          response.data.status === "false" &&
          response.data.msg === "Name already exist."
         
        ) {
          ToastifyAlert(
            "Name already exists. Please choose a different name.",
            "error"
          );
          setErrorMessage("Name already exists. Please choose a different name.");
          setLoader(false)
        } else {
          setErrorMessage("");
  
          Navigate(-1);
          
        }
        ToastifyAlert("Updated Successfully.", "success");
        setLoader(false)
      } catch (error) {
        console.error("Error updating data:", error);
        handleCoockieExpire();
        getUnAutherisedTokenMessage();
        setLoader(false)
      }
    }
    
  };

  const handleSetVendorStateChange = (newState) => {
    setVendorData((preState) => ({
      ...preState,
      state: newState["title"],
    }));
  };
  const handleCloseVendor = () => {
    Navigate("/vendors");
    // setVisible("VendorsDetail");
  };
  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };
  return (
    <>
      <Grid container style={{ marginTop: "1.5rem" }}>
        <Grid item xs={12} className="q-add-categories-section ">
          <Grid container sx={{ marginTop: 0, marginLeft: 0 }}>
            <Grid item xs={12}>
              <div
                onClick={() => {
                  Navigate(-1);
                }}
                className="q-add-categories-section-header"
              >
                <img
                  src={EditNewVendor}
                  alt="Edit-New-Vendors"
                  style={{ cursor: "pointer" }}
                />
                <span>Edit Vendors</span>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="vendorName">Vendor Name</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"name"}
                      value={vendorData.name}
                      onChangeFun={handleOnChange}
                  
                    />
                    {errorMessage.name && (
                      <span className="error">{errorMessage.name}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="email">Email Address</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"email"}
                      value={vendorData.email}
                      onChangeFun={handleOnChange}
                      
                    />
                    {errorMessage.email && (
                      <span className="error">{errorMessage.email}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="email">Phone Number</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"phone"}
                      value={vendorData.phone}
                      onChangeFun={handleOnChange}
                   
                      onKeyPressFun={handleKeyPress}
                      maxLength={10}
                    />
                    {errorMessage.phone && (
                      <span className="error">{errorMessage.phone}</span>
                    )}
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 2.5 }}>
                  <Grid item xs={12}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="address">Address</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"full_address"}
                      placeholder="Address Line 1"
                      onChangeFun={handleOnChange}
                      value={vendorData.full_address}
                    />
                    {errorMessage.full_address && (
                      <span className="error">{errorMessage.full_address}</span>
                    )}
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 2.5 }} spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="qvrowmain my-1">
                      <label htmlFor="city">City</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"city"}
                      value={vendorData.city}
                      onChangeFun={handleOnChange}
                      // required={"required"}
                    />
                    {errorMessage.city && (
                      <span className="error">{errorMessage.city}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="qvrowmain my-1">
                      <label htmlFor="city">Zip</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"zip_code"}
                      value={vendorData.zip_code}
                      onChangeFun={handleOnChange}
                      // required={"required"}
                    />
                    {errorMessage.zip_code && (
                      <span className="error"> {errorMessage.zip_code}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="qvrowmain my-1">
                      <label htmlFor="city">State</label>
                    </div>
                    <SelectDropDown
                      listItem={
                        states && states.map((item) => ({ title: item }))
                      }
                      title={"title"}
                      selectedOption={vendorData.state}
                      onClickHandler={handleSetVendorStateChange}
                      name={"state"}
                    />
                    {errorMessage.state && (
                      <span className="error">{errorMessage.state}</span>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  xs={12}
                  sx={{ marginTop: 3 }}
                >
                  <button type="submit" className="quic-btn quic-btn-save me-3 w-44" disabled={loader}>
                    {loader ?  <CircularProgress
                      color={"inherit"}
                      className=""
                      width={15}
                      size={15}
                    /> : "Update"}  
                  </button>
                  <button
                    // onClick={() => setVisible("VendorsDetail")}
                    onClick={() => handleCloseVendor()}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditVendors;
