import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import AutoPo from "./AutoPo";
import { FormControl } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import { fetchaddpopurchaseData } from "../../Redux/features/PurchaseOrder/AddpurchaseOrderSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { event } from "jquery";

const AddPo = ({ seVisible }) => {
  // const [isHide, setIsHide] = useState(false);
  // const [visible, seVisible] = useState("MainPurchase");
  const [issueDate, setIssueDate] = useState(null);

  const [addpostock, setAddpostock] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [purchaseInfo, setPurchaseInfo] = useState({
    issuedDate: "",
    stockDate: "",
    email: "",
    reference: "",
  });

  const dispatch = useDispatch();
  const addpoData = useSelector((state) => state.Addpolist);
  const adpoDataList = addpoData?.addpoData?.result;

  useEffect(() => {
    const data = { merchant_id: "MAL0100CA", admin_id: "MAL0100CA" };
    dispatch(fetchaddpopurchaseData(data));
  }, [dispatch]);

  const handleVendorClick = (data) => {
    const { email, reference, issued_date, stock_date } = data;

    setSelectedVendor(() => data?.vendor_name ?? "");

    // Update state with the extracted data
    setPurchaseInfo((prevState) => ({
      ...prevState,
      issuedDate: issued_date,
      stockDate: stock_date,
      email: email,
      reference: reference,
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
        break;
      default:
        setPurchaseInfo((prev) => prev);
    }
  };

  useEffect(() => {
    if (adpoDataList) {
      const { issued_date, stock_date, email, reference } = adpoDataList;
      setPurchaseInfo({
        issuedDate: issued_date,
        stockDate: stock_date,
        email: email,
        reference: reference,
      });
    }
  }, [adpoDataList]);

  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="q-add-categories-section-header">
            <span onClick={() => seVisible("PurchaseTable")}>
              <img
                src={AddNewCategory}
                alt="Add New Category"
                className="w-6 h-6"
              />
              <span>Create Purchase Order</span>
            </span>
          </div>

          <div>
            <div className="px-6 py-7">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <label>Vendor</label>
                  <SelectDropDown
                    heading={"All"}
                    selectedOption={selectedVendor}
                    listItem={adpoDataList}
                    onClickHandler={handleVendorClick}
                    title={"vendor_name"}
                  />
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
                        title={purchaseInfo.issuedDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                        title={purchaseInfo.stockDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      <div className="second-component">
        <AutoPo />
      </div>
    </>
  );
};

export default AddPo;
