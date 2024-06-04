import React, { useState, useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";

const SalesPersonFilter = ({ onFilterDataChange }) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);
  const [filteredData, setFilteredData] = useState({ emp_id: "all" });

  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      case "orderType":
        setOrderTypeDropdownVisible(!orderTypeDropdownVisible);
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        if (option === "All") {
          setSelectedEmployee("All");
          setSelectedEmployeeID("All");
          setEmployeeDropdownVisible(false);
          setFilteredData({
            ...filteredData,
            emp_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const emp_id = option.id;
          setSelectedEmployee(option.title);
          setSelectedEmployeeID(option.id);
          setEmployeeDropdownVisible(false);
          setFilteredData({
            ...filteredData,
            emp_id,
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        }
        break;
      case "orderSource":
        setSelectedOrderSource(option.title);
        setOrderSourceDropdownVisible(false);
        break;
      case "orderType":
        setSelectedOrderType(option.title);
        setOrderTypeDropdownVisible(false);
        break;
    }
  };

  const [employeeList, setemployeeList] = useState([]);
  const [loadingEmpList, setLoadingEmpList] = useState(true);

  useEffect(() => {
    fetchData();
  }, []); // Fetch categories only once when the component mounts
  const fetchData = async () => {
    try {
      const response = await axios.post(
        BASE_URL + EMPLOYEE_LIST,
        { merchant_id: merchant_id,token_id:userTypeData?.token_id,login_type:userTypeData?.login_type },
        { headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${userTypeData?.token}` } }
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
      console.error("Error fetching Employee List:", error);
      setLoadingEmpList(false);
    }
  };

  useEffect(() => {
    onFilterDataChange(
      selectedOrderSource,
      selectedOrderType,
      selectedEmployeeID
    );
  }, [selectedOrderSource, selectedOrderType, selectedEmployeeID]);

  const orderSourceList = ["All", "Online", "Offline"];
  const orderTypeList = ["All", "Pickup", "Delivery"];

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Report By Sales Person</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Filter by</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Select Employee
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={employeeList}
                title={"title"}
                selectedOption={selectedEmployee}
                onClickHandler={handleOptionClick}
                dropdownFor={"employee"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title={"title"}
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
                dropdownFor={"orderSource"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Order Type
              </label>
              <SelectDropDown
                listItem={orderTypeList.map((item) => ({ title: item }))}
                title={"title"}
                selectedOption={selectedOrderType}
                dropdownFor={"orderType"}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="">
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">
                Report By Sales Person
              </div>
            </div>
            <div className="q_details_header ml-8">Filter by</div>
          </div>

          <div className="q-order-page-container ml-8">
     
            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Select Employee
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("employee")}
                >
                  <span className="selected-option mt-1">
                    {selectedEmployee}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>

                {employeeDropdownVisible && (
                  <div className="dropdown-content">
                    <div onClick={() => handleOptionClick("All", "employee")}>
                      All
                    </div>
                    {employeeList.map((option, key) => (
                      <div
                        key={key}
                        onClick={() => handleOptionClick(option, "employee")}
                      >
                        {option.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>


            <div className="q-order-page-filter">
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("orderSource")}
                >
                  <span className="selected-option mt-1">
                    {selectedOrderSource}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {orderSourceDropdownVisible && (
                  <div className="dropdown-content">
                    <div
                      onClick={() => handleOptionClick("All", "orderSource")}
                    >
                      All
                    </div>
                    <div
                      onClick={() => handleOptionClick("Online", "orderSource")}
                    >
                      Online
                    </div>
                    <div
                      onClick={() =>
                        handleOptionClick("Offline", "orderSource")
                      }
                    >
                      Offline
                    </div>
                  </div>
                )}
              </div>
            </div>

 
            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Order Type
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("orderType")}
                >
                  <span className="selected-option mt-1">
                    {selectedOrderType}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {orderTypeDropdownVisible && (
                  <div className="dropdown-content">
                    <div onClick={() => handleOptionClick("All", "orderType")}>
                      All
                    </div>
                    <div
                      onClick={() => handleOptionClick("Pickup", "orderType")}
                    >
                      Pickup
                    </div>
                    <div
                      onClick={() => handleOptionClick("Delivery", "orderType")}
                    >
                      Delivery
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SalesPersonFilter;
