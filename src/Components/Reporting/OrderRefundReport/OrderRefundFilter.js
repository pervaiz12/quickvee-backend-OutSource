import React, { useState, useEffect } from "react";

import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import axios from "axios";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import PasswordShow from "../../../Common/passwordShow";

const OrderRefundFilter = ({
  title,
  onCategoryChange,
  onReasonChange,
  selectedReason,
  hide,
  searchRecord,
  setSearchRecord,
  debouncedValue,
  selectedEmployeeID,
  setSelectedEmployeeID,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [employeeList, setemployeeList] = useState([]);
  
  const [filteredEmpData, setFilteredEmpData] = useState({
    category_id: "all",
  });
  const [loadingEmpList, setLoadingEmpList] = useState(true);
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
  PasswordShow();

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            BASE_URL + EMPLOYEE_LIST,
            {
              merchant_id: merchant_id,
              token_id: userTypeData?.token_id,
              login_type: userTypeData?.login_type,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userTypeData?.token}`,
              },
            }
          );
          // Assuming the API response has a data property containing the category list
          const EmpList = response.data.result;
          // Extracting category IDs and view titles
          const mappedOptions = EmpList.map((empdata) => ({
            id: empdata.id,
            title: empdata.f_name + " " + empdata.l_name,
          }));
  
          setemployeeList(mappedOptions);
          setLoadingEmpList(false);
        } catch (error) {
          if (error?.status == 401 || error?.response?.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        } finally {
          setLoadingEmpList(false);
        }
      };
      fetchData();
    }, []);
  const Categoryfilter = (event) => {
    const selectedCategoryId = event.target.value;

    onCategoryChange(selectedCategoryId);
  };

  const reasonfilter = (event) => {
    const selectedReason = event.target.value;

    onReasonChange(selectedReason);
  };
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [categoryList, setCategoryList] = useState([]);
  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        if (option === "All") {
          setSelectedEmployee("All");
          setSelectedEmployeeID("All");

          setFilteredEmpData({
            ...filteredEmpData,
            emp_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const emp_id = option.id;
          setSelectedEmployee(option.title);
          setSelectedEmployeeID(option.id);

          setFilteredEmpData({
            ...filteredEmpData,
            emp_id,
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        }
        break;
      default:
        break;
    }
  };


  const ReasonList = [
    "All",
    "Accidental Charge",
    "Cancelled Order",
    "Defective Item",
    "Fraudulent Order",
    "Returned Goods",
    "Out of Stock",
    "Other",
  ];
  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        
          <Grid item xs={12} sx={{ padding: 2.5, }}>
            <InputTextSearch
              className=""
              type="text"
              value={searchRecord}
              handleChange={handleSearchInputChange}
              placeholder="Search by Order ID..."
              autoComplete="off"
            />
          </Grid>
        
        <Grid item xs={12}>
          {!hide && <CustomHeader>Order Refund Report</CustomHeader>}

          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="heading">Filter By</div>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Select Reason
              </label>
              <SelectDropDown
                listItem={ReasonList.map((item) => ({ title: item }))}
                title={"title"}
                selectedOption={selectedReason}
                onClickHandler={onReasonChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Employee
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                heading={"All"}
                listItem={employeeList}
                title={"title"}
                selectedOption={selectedEmployee}
                dropdownFor={"employee"}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderRefundFilter;
