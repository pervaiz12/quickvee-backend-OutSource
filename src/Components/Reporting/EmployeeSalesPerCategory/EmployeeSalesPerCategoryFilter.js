import React, { useState, useEffect } from "react";

import { BASE_URL, EMPLOYEE_LIST, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const EmployeeSalesPerCategoryFilter = ({ onFilterDataChange ,hide}) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("all");


  const [selectedLCategoryType, setselectedLCategoryType] = useState("All");
  const [selectedLCategoryID, setselectedLCategoryID] = useState("all");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);

  const [filteredData, setFilteredData] = useState({ emp_id: "all" });

  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;


  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        if (option === "All") {
          setSelectedEmployee("All");
          setSelectedEmployeeID("all");
          setEmployeeDropdownVisible(false);
          setFilteredData({
            ...filteredData,
            emp_id: "all",
            merchant_id: "",
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
          });
        }
        break;
        case "category":
            if (option === "All") {
              setselectedLCategoryType("All");
              setselectedLCategoryID("all");
              setFilteredData({
                ...filteredData,
                category_id: "all",
                merchant_id: "",
              });
            } else {
              const category_id = option.id;
              setselectedLCategoryType(option.title);
              setselectedLCategoryID(option.id);
    
              setFilteredData({
                ...filteredData,
                category_id,
                merchant_id: "",
              });
            }
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
      console.error("Error fetching Employee List:", error);
      setLoadingEmpList(false);
    }
  };

  useEffect(() => {
    onFilterDataChange(
      selectedEmployeeID,
      selectedLCategoryID
    );
  }, [selectedEmployeeID,selectedLCategoryID]);

  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];

  let data = {
    merchant_id: merchant_id,
    ...userTypeData,
  };

  useEffect(() => {
    const { token, ...dataNew } = data;
    const fetchDataCategory = async () => {
      try {
        const response = await axios.post(
          BASE_URL + TAXE_CATEGORY_LIST,
          dataNew,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the API response has a data property containing the category list
        const categoryList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = categoryList.map((category) => ({
          id: category.id,
          title: category.title,
        }));

        setCategoryOptions(mappedOptions);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchDataCategory();
  }, []); // Fetch categories only once when the component mounts

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {!hide && <CustomHeader>Employee Sales Per Category Report</CustomHeader> }

          <Grid container sx={{ px: 2.5,pt:1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter By</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Select Employee
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                heading={"All"}
                listItem={employeeList}
                title={"title"}
                selectedOption={selectedEmployee}
                onClickHandler={handleOptionClick}
                dropdownFor={"employee"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" style={{marginBottom:"0.24rem"}} htmlFor="orderTypeFilter">
                Category
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={categoryOptions}
                title="title"
                dropdownFor="category"
                selectedOption={selectedLCategoryType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};

export default EmployeeSalesPerCategoryFilter;
