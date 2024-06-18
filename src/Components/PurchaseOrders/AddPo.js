import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AutoPo from "./AutoPo";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import backIcon from "../../Assests/Dashboard/Left.svg";
// import { fetchaddpopurchaseData } from "../../Redux/features/PurchaseOrder/AddpurchaseOrderSlice";
import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useNavigate } from "react-router-dom";

const AddPo = ({ seVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();

  const [purchaseInfo, setPurchaseInfo] = useState({
    issuedDate: null,
    stockDate: null,
    email: "",
    reference: "",
    selectedVendor: "",
    vendorId: "",
  });

  const [purchaseInfoErrors, setPurchaseInfoErrors] = useState({
    issuedDate: "",
    stockDate: "",
    email: "",
    selectedVendor: "",
    reference: "",
  });

  const allVendors = useSelector((state) => state.vendors);

  useEffect(() => {
    const data = {
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      ...userTypeData,
    };
    // dispatch(
    //   fetchaddpopurchaseData({
    //     ...data,
    //     admin_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    //   })
    // );
    dispatch(fetchVendorsListData(data));
  }, [dispatch]);

  const handleVendorClick = (data) => {
    const { email, name, id } = data;

    // Update state with the extracted data
    setPurchaseInfo((prevState) => ({
      ...prevState,
      email: email,
      selectedVendor: name,
      vendorId: id,
    }));

    setPurchaseInfoErrors((prev) => ({
      ...prev,
      selectedVendor:
        purchaseInfoErrors.selectedVendor && name && id
          ? ""
          : prev.selectedVendor,
      email: purchaseInfoErrors.email && email ? "" : prev.email,
    }));
  };

  const handleValue = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "reference":
        setPurchaseInfo((prev) => ({ ...prev, reference: value }));
        break;
      case "email":
        setPurchaseInfo((prev) => ({ ...prev, email: value }));
        setPurchaseInfoErrors((prev) => ({
          ...prev,
          email: Boolean(value.trim()) ? "" : prev.email,
        }));
        break;
      default:
        setPurchaseInfo((prev) => prev);
    }
  };

  const handleDate = (date, type) => {
    const dayjsDate = dayjs(date); // Convert to dayjs object
    const formattedStartDate = dayjsDate.format("YYYY-MM-DD");
    setPurchaseInfo((prev) => ({
      ...prev,
      [type]: formattedStartDate,
    }));

    if (type === "issuedDate" && purchaseInfoErrors.issuedDate) {
      setPurchaseInfoErrors((prev) => ({ ...prev, issuedDate: "" }));
    }

    if (type === "stockDate" && purchaseInfoErrors.stockDate) {
      setPurchaseInfoErrors((prev) => ({ ...prev, stockDate: "" }));
    }
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="q-add-categories-section-header">
            <span onClick={() => navigate("/purchase-data")}>
              <img src={backIcon} alt="Add New Category" className="w-6 h-6" />
              <span>Create Purchase Order</span>
            </span>
          </div>

          <div className="px-6 py-7">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <label>Vendor</label>
                <SelectDropDown
                  selectedOption={purchaseInfo.selectedVendor}
                  listItem={allVendors.vendorListData[0]}
                  onClickHandler={handleVendorClick}
                  title={"name"}
                />
                {purchaseInfoErrors.selectedVendor && (
                  <p className="error-message">
                    {purchaseInfoErrors.selectedVendor}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label>Issued Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ paddingTop: 0 }}
                    components={["DatePicker"]}
                  >
                    <DatePicker
                      sx={{ width: "100%" }}
                      className="issued-date"
                      size="small"
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      format={"MM/DD/YYYY"}
                      disablePast
                      onChange={(newDate) => {
                        handleDate(newDate, "issuedDate");
                        setPurchaseInfo((prev) => ({
                          ...prev,
                          stockDate: null,
                        }));
                      }}
                      value={purchaseInfo.issuedDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {purchaseInfoErrors.issuedDate && (
                  <p className="error-message">
                    {purchaseInfoErrors.issuedDate}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label>Stock Due</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ paddingTop: 0 }}
                    components={["DatePicker"]}
                  >
                    <DatePicker
                      sx={{ width: "100%" }}
                      className="stock-due-date"
                      size="small"
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      disablePast
                      format={"MM/DD/YYYY"}
                      shouldDisableDate={(date) => {
                        return date < dayjs(purchaseInfo.issuedDate);
                      }}
                      onChange={(newDate) => handleDate(newDate, "stockDate")}
                      value={purchaseInfo.stockDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {purchaseInfoErrors.stockDate && (
                  <p className="error-message">
                    {purchaseInfoErrors.stockDate}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label>Reference</label>
                <BasicTextFields
                  value={purchaseInfo.reference}
                  onChangeFun={handleValue}
                  name={"reference"}
                  type={"text"}
                  required={true}
                  placeholder={"Note or Info or Invoice Number"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label>Vendor Email</label>
                <BasicTextFields
                  value={purchaseInfo.email}
                  onChangeFun={handleValue}
                  name={"email"}
                  type={"email"}
                  required={true}
                  placeholder={"Vendor Email Address"}
                />
                {purchaseInfoErrors.email && (
                  <p className="error-message">{purchaseInfoErrors.email}</p>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      <div className="second-component">
        <AutoPo
          purchaseInfo={purchaseInfo}
          setPurchaseInfoErrors={setPurchaseInfoErrors}
        />
      </div>
    </>
  );
};

export default AddPo;
