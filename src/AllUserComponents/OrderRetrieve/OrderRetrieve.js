import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import axios from "axios";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import {
  BASE_URL,
  SPLIT_LIST,
  ORDERRETRIEVE_SUBMIT,
} from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";

import PasswordShow from "./../../Common/passwordShow";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmModal from "../../reuseableComponents/ConfirmModal";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CurrencyInputHelperFun from "../../helperFunctions/CurrencyInputHelperFun";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";



const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const OrderRetrieve = () => {
  const [selectedStorefrom, setSelectedStorefrom] =useState("-- Select Store --");
  const [tableData, setTableData]=useState([]);


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

  const [splitCheckbox, setSplitCheckbox] = useState(false);
  const [orderData, setOrderData] = useState({
    merchant_id:'',
    order_id:"",
    is_split_payment:0,
    pay_amt: "",
    remaining_amt: "",
    pay_count:""
  });

  const [fieldErrors, setFieldErrors] = useState({
    order_id:"",
    pay_amt: "",
    remaining_amt: "",
    pay_count: "",
  });

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
          setOrderData((preValue) => ({
            ...preValue,
            merchant_id: value.id,
          }));
          setStoreFromError("");
        }else{
          setOrderData((preValue) => ({
            ...preValue,
            merchant_id: "",
          }));
          setStoreFromError("Store Name is required");
          setSplitCheckbox(false)
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


  const [openAlert, setOpenAlert] = useState(true);
  const [submitmessage, setsubmitmessage] = useState();
  const goToTop = () => {
    setsubmitmessage();
  };

  
  const handleStoreInput =  async (event) => {
    const isChecked = event.target.checked;

    if (orderData.merchant_id === "" || orderData.order_id === "") {
      if(orderData.merchant_id === ""){
        setStoreFromError("Store Name is required");
      }
      setFieldErrors((preValue) => ({
        ...preValue,
        order_id: orderData.order_id === "" ? "Order Id is required" : "",
      }));
      return; // Prevent checking the checkbox
    } 

    // Perform any additional actions based on the checkbox state
    if (isChecked) {
      console.log("Checkbox is checked");
      setSplitCheckbox(true);
      setOrderData((preValue) => ({
        ...preValue,
        pay_amt: "",
        remaining_amt: "",
        pay_count:""
      }));
      setFieldErrors((preValue) => ({
        ...preValue,
        pay_amt: "",
        remaining_amt: "",
        pay_count: "",
      }));
      setOrderData((preValue) => ({
        ...preValue,
        is_split_payment:1,
      }));
      const data = {
        merchant_id:orderData.merchant_id,
        order_id:orderData.order_id,
        is_split_payment:1,
        ...userTypeData,
      };
      const res = await axios.post(BASE_URL + SPLIT_LIST, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      if(res.data.status === true && res.data.message === "Split data found."){
        setTableData(res.data.data)
      }else{
        setTableData([])
      }

    } else {
      console.log("Checkbox is unchecked");
        setSplitCheckbox(false);
        setOrderData((preValue) => ({
          ...preValue,
          is_split_payment:0,
        }));
    }
  }

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    const updatedFieldErrors = { ...fieldErrors };
    if (name === "pay_amt" || name === "remaining_amt") {
      newValue = CurrencyInputHelperFun(value);
    }else if(name === "pay_count") {
      const numberOnlyValue = value.replace(/[^0-9]/g, '');
      newValue = numberOnlyValue;
    } else if(name==="order_id"){
      newValue = value.replace(/[^a-zA-Z0-9]/g, '');
    }

    if (newValue.trim() === '') {
      if(name==="order_id"){
        setSplitCheckbox(false);
        updatedFieldErrors[name] = `Order Id is required`;
      }
      if(name === "pay_amt"){
        if (newValue.trim() === '' || newValue == "0.00") {
          updatedFieldErrors[name] = `Payment Amount is required`;
        }
      }
      if(name === "pay_count"){
        if (newValue.trim() === '' || +newValue === 0) {
          updatedFieldErrors[name] = `Pay Count is required`;
        } 
      }
    } else {
      updatedFieldErrors[name] = ''; // Clear the error message if the field is not empty
    }
  
    setFieldErrors(updatedFieldErrors);
    setOrderData((preValue) => ({
      ...preValue,
      [name]: newValue,
    }));

  };


  const submit = async (e) => {
    if (orderData.merchant_id === "" || orderData.order_id === "") {
      if(orderData.merchant_id === ""){
        setStoreFromError("Store Name is required");
      }
      setFieldErrors((preValue) => ({
        ...preValue,
        order_id: orderData.order_id === "" ? "Order Id is required" : "",
      }));
      return; // Prevent checking the checkbox
    }
    if(orderData.is_split_payment===1){
      if (orderData.pay_amt === "" || +orderData.pay_amt === 0 || orderData.remaining_amt === "" || orderData.pay_count === "" || +orderData.pay_count === 0) {
        if(orderData.pay_amt === "" || +orderData.pay_amt == 0){
          setFieldErrors((preValue) => ({
            ...preValue,
            pay_amt: orderData.pay_amt === "" || +orderData.pay_amt == 0 ? "Payment Amount is required" : "",
          }));
        }
        if(orderData.remaining_amt === ""){
          setFieldErrors((preValue) => ({
            ...preValue,
            remaining_amt: orderData.remaining_amt === "" ? "Remaining Amount is required" : "",
          }));
        }
        setFieldErrors((preValue) => ({
          ...preValue,
          pay_count: orderData.pay_count === "" || +orderData.pay_count==0 ? "Pay Count is required" : "",
        }));
  
        return; // Prevent checking the checkbox
      }
    }
    setConfirmModalOpen(true);
  };


  const confirmfun = async () => {
    setConfirmModalOpen(false);
    const formData = new FormData();
    formData.append("merchant_id",orderData.merchant_id);
    formData.append("order_id",orderData.order_id);
    formData.append("is_split_payment",orderData.is_split_payment);
    if(orderData.is_split_payment===1){
      formData.append("pay_amt",orderData.pay_amt);
      formData.append("remaining_amt",orderData.remaining_amt);
      formData.append("pay_count",orderData.pay_count);
    }
    formData.append("token_id",userTypeData?.token_id);
    formData.append("login_type",userTypeData?.login_type);

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    // return
    setLoader(true);
    try {
      const res = await axios.post(BASE_URL + ORDERRETRIEVE_SUBMIT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });

      const data = await res.data.status;
      const update_message = await res.data.message;
      if (data === true) {
        setSelectedStorefrom("-- Select Store --")
        setOrderData((preValue) => ({
          ...preValue,
          order_id: "",
        }));
        setFieldErrors((preValue) => ({
          ...preValue,
          order_id: "",
        }));
        setSplitCheckbox(false)
        ToastifyAlert("Updated Successfully", "success");
      } else{
        ToastifyAlert(update_message, "error");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
    setLoader(false);
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
              <Grid item xs={12} sm={12} md={6}>
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
                {storeFromError && (
                  <span className="input-error ">{storeFromError}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} >
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter "
                >
                  Order Id
                </label>
                <BasicTextFields
                  type="text"
                  id="order_id"
                  name="order_id"
                  onChangeFun={handleUserInputChange}
                  value={orderData.order_id}
                  placeholder={"Order Id"}
                  sx={{ pt: 0.5 }}
                />
                {fieldErrors?.order_id && (
                  <span className="input-error ">{fieldErrors?.order_id}</span>
                )}
              </Grid>
            </Grid>
          </div>
    

          <div className="q-add-inventory-section-header isSplite_Checkbox mx-2">
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
              <div className="q-add-inventory-section-header mx-1">
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <StyledTableCell>Pay Count</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Remaining</StyledTableCell>
                    <StyledTableCell>Pay Type</StyledTableCell>
                  </TableHead>
                  <TableBody>
                      {tableData.length > 0 ? (
                          tableData.map((data, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {data.pay_count || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method">
                                  {data.pay_amount || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {data.remaining_amount || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {data.pay_type || ""}
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <StyledTableRow>
                            <StyledTableCell colSpan={4} align="center">
                              No records found
                            </StyledTableCell>
                          </StyledTableRow>
                        )}
                  </TableBody>
                </StyledTable>
              </TableContainer>
              </div>
          

            <div className="q-order-page-container mx-6  md:flex-col d-flex">
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter"
                >
                  Payment Amount
                </label>
                <BasicTextFields
                  type="text"
                  id="pay_amt"
                  name="pay_amt"
                  maxLength={8}
                  onChangeFun={handleUserInputChange}
                  value={orderData.pay_amt}
                  placeholder={"Payment Amount"}
                  sx={{ pt: 0.5 }}
                />
                 {fieldErrors?.pay_amt && (
                  <span className="input-error ">{fieldErrors?.pay_amt}</span>
                )}
              </Grid>
              
              <Grid item xs={12} sm={12} md={4} >
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter "
                  
                >
                  Remaining Amount
                </label>
                <BasicTextFields
                  type="text"
                  id="remaining_amt"
                  name="remaining_amt"
                  maxLength={8}
                  onChangeFun={handleUserInputChange}
                  value={orderData.remaining_amt}
                  placeholder={"Remaining Amount"}
                  sx={{ pt: 0.5 }}
                />
                 {fieldErrors?.remaining_amt && (
                  <span className="input-error ">{fieldErrors?.remaining_amt}</span>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={4} >
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter "
                  
                >
                  Pay Count
                </label>
                <BasicTextFields
                  type="text"
                  maxLength={5}
                  id="pay_count"
                  name="pay_count"
                  onChangeFun={handleUserInputChange}
                  value={orderData.pay_count}
                  placeholder={"Pay Count"}
                  sx={{ pt: 0.5 }}
                />
                {fieldErrors?.pay_count && (
                  <span className="input-error ">{fieldErrors?.pay_count}</span>
                )}
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

      <ConfirmModal
        headerText="Are you sure you want to Retrieve Order?"
        open={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
        }}
        onConfirm={confirmfun}
      />
    </>
  );
};

export default OrderRetrieve;
