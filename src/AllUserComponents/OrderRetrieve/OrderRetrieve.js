import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton, Grid } from "@mui/material";

import Select from "react-select";

import CrossIcons from "../../Assests/MultipleUserIcon/crossIcons.svg";
import axios from "axios";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import {
  BASE_URL,
  LIST_ALL_CATEGORIES_MECHANT_ID,
  CATEGORY_INVENTORY_DUPLICATE,
} from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";

import AlertModal from "../../reuseableComponents/AlertModal";

import PasswordShow from "./../../Common/passwordShow";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmModal from "../../reuseableComponents/ConfirmModal";
import FinalConfirm from "../../reuseableComponents/FinalConfirm";
import BasicTextFields from "../../reuseableComponents/TextInputField";

const OrderRetrieve = () => {
  const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");
  const [selectedStoreto, setSelectedStoreto] = useState("-- Select Store --");

  const [storeFromDropdownVisible, setStoreFromDropdownVisible] =
    useState(false);

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setStoreFromDropdownVisible(!storeFromDropdownVisible);
        break;

      default:
        break;
    }
  };
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const { userTypeData } = useAuthDetails();
  const { token, ...userTypeDataNew } = userTypeData;
  const [loader, setLoader] = useState(false);
  const [storefrom, setStorefrom] = useState();

  const [storeFromError, setStoreFromError] = useState("");

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmfinalModalOpen, setConfirmFinalModalOpen] = useState(false);

  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleOptionClick = async (value, dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setSelectedStorefrom(value?.title ? value?.title : value);
        setStoreFromDropdownVisible(false);

        // Fetch additional data based on the selected merchant's ID
        if (value !== "-- Select Store --") {
        }
        if (value == "-- Select Store --") {
          setStoreFromError("This field is required");
        } else {
          setStoreFromError("");
        }
        break;

      default:
        break;
    }
  };

  // for fetch mearcahnt list start
  const [MerchantList, setMerchantList] = useState();
  const MerchantListData = useSelector((state) => state.ExportInventoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
      setMerchantList(MerchantListData.MerchantListData);
    }
  }, [MerchantListData, MerchantListData.loading]);

  useEffect(() => {
    // dispatch(fetchMerchantsList(userTypeData));
    getFetchMerchantsList();
  }, []);

  const getFetchMerchantsList = async () => {
    try {
      const data = {
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchMerchantsList(data)).unwrap();
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  const myStyles = {
    height: "300px",
    overflow: "auto",
  };

  const [openAlert, setOpenAlert] = useState(true);
  const [submitmessage, setsubmitmessage] = useState();
  const goToTop = () => {
    setsubmitmessage();
  };

  const confirmfun = () => {
    setConfirmModalOpen(false);
    setConfirmFinalModalOpen(true);
  };

  const confirmFinalfun = async () => {};



  const [splitCheckbox, setSplitCheckbox] = useState(false);

  const [orderData, setOrderData] = useState({
    id:"",
    payment: "",
    remainingAMT: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    id:"",
    payment: "",
    remainingAMT: "",
  });
  
  const handleStoreInput = (event) => {
    const isChecked = event.target.checked;
    // Perform any additional actions based on the checkbox state
    if (isChecked) {
      console.log("Checkbox is checked");
      setSplitCheckbox(true);
    } else {
        setSplitCheckbox(false);
      console.log("Checkbox is unchecked");
    }
  }

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;

    setOrderData((preValue) => ({
        ...preValue,
        [name]: value,
      }));
  };
  

  const submit = async (e) => {
    
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className=" box_shadow_div_order">
          <div className="q-add-categories-section-header ">
            <span>
              <span>Order Retrieve</span>
            </span>
          </div>

          <div className="q-order-page-container mx-6 mt-6 md:flex-col d-flex">
            {/* StoreFrom Dropdown */}

            <Grid container spacing={4} className="">
              <Grid item xs={6} sm={12} md={6}>
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter"
                >
                  Store Name
                </label>
                <SelectDropDown
                  sx={{ pt: 0.5 }}
                  listItem={
                    MerchantList?.length &&
                    MerchantList?.map((item) => ({
                      title: item?.name,
                      id: item?.merchant_id,
                    }))
                  }
                  heading={"-- Select Store --"}
                  title={"title"}
                  selectedOption={selectedStorefrom}
                  onClickHandler={handleOptionClick}
                  dropdownFor={"storefrom"}
                />
              </Grid>
              <Grid item xs={6} sm={12} md={6} >
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter "
                >
                  Order Id
                </label>
                <BasicTextFields
                  type="text"
                  id="id"
                  name="id"
                  onChangeFun={handleUserInputChange}
                  value={orderData.id}
                  placeholder={"Order Id"}
                  sx={{ pt: 0.5 }}
                />
              </Grid>
            </Grid>
          </div>
    

          <div className="q-add-inventory-section-header mx-2">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label ">
                is Split
                <input
                  type="checkbox"
                  id="is_split"
                  name="is_split"
                  checked={splitCheckbox}
                  onChange={handleStoreInput}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
          </div>

          {splitCheckbox  && (
            <>
            <div className="q-order-page-container mx-6  md:flex-col d-flex">
            <Grid container spacing={4}>
            <Grid item xs={6} sm={12} md={6}>
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter"
                >
                  Payment
                </label>
                <BasicTextFields
                  type="text"
                  id="payment"
                  name="payment"
                  onChangeFun={handleUserInputChange}
                  value={orderData.payment}
                  placeholder={"Payment"}
                  sx={{ pt: 0.5 }}
                />
              </Grid>
              <Grid item xs={6} sm={12} md={6} >
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter "
                  
                >
                  Remaining Amount
                </label>
                <BasicTextFields
                  type="text"
                  id="remainingAMT"
                  name="remainingAMT"
                  onChangeFun={handleUserInputChange}
                  value={orderData.remainingAMT}
                  placeholder={"Remaining Amount"}
                  sx={{ pt: 0.5 }}
                />
              </Grid>
             
            </Grid>
            
          </div>
            </>
                 
            )}

          

          <div
            className="q-add-categories-section-middle-footer mt-4"
            style={{ justifyContent: "start" }}
          >
            <button
              className="quic-btn quic-btn-save attributeUpdateBTN"
              onClick={submit}
              disabled={loader}
            >
              {loader ? (
                <>
                  <CircularProgress color={"inherit"} width={15} size={15} />
                  Submit
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderRetrieve;
