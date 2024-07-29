import React, { useState, useEffect, useRef } from "react";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import { Grid } from "@mui/material";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const transactionsList = [
  {
    title: "Both",
  },
  {
    title: "Cash",
  },
  {
    title: "Credit Card",
  },
];
const transactionsListSuperadmin = [
  {
    title: "Both",
  },
  {
    title: "Cash",
  },
  {
    title: "Credit Card",
  },
  {
    title: "Unpaid",
  },
];

const FilterEmp = ({ onFilterEmpDataChange, searchId, setSearchId }) => {
  const [selected, setSelected] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
  const [filteredData, setFilteredData] = useState({ emp_id: "all" });

  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  // const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);

  const handleSearch = () => {
    // console.log("Search ID:", searchId);
  };
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "transaction":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      default:
        break;
    }
  };

  const dropdownContentClass =
    Object.values(filteredData.emp_id).length > 2
      ? "dropdown-content scrollable"
      : "dropdown-content";
  const lengthOfArray = Object.values(filteredData.emp_id).length;
  // console.log("Length of array:", lengthOfArray);

  // console.log((filteredData.emp_id).lengt)

  const handleOptionClick = (option, dropdown) => {
    // console.log("handleOptionClick", e.target.value);

    switch (dropdown) {
      case "employee":
        if (option === "All") {
          // console.log("handleOptionClick ", option);
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
          setSelected(true);
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
      case "transaction":
        setSelectedTransaction(option.title);
        setTransactionDropdownVisible(false);
        break;
      // case "orderStatus":
      //   setSelectedOrderStatus(option);
      //   setOrderStatusDropdownVisible(false);
      //   break;
      default:
        break;
    }
  };

  const dropdownRef = useRef(null);
  const transactionRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEmployeeDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        transactionRef.current &&
        !transactionRef.current.contains(event.target)
      ) {
        setTransactionDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [employeeList, setemployeeList] = useState([]);
  // console.log("employeeList ,", employeeList);
  const [loadingEmpList, setLoadingEmpList] = useState(true);

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

        const EmpList = response.data.result;

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
    fetchData();
  }, []);

  useEffect(() => {
    onFilterEmpDataChange(selectedTransaction, selectedEmployeeID, searchId);
  }, [selectedTransaction, selectedEmployeeID, searchId]);

  return (
    <>
      <Grid container className="px-5">
        <Grid item xs={12}>
          <Grid container className="mt-5">
            <Grid item xs={12} className="">
              <InputTextSearch
                placeholder="Search orders by order ID, or invoice ID "
                value={searchId}
                handleChange={setSearchId}
                handleSearchButton={handleSearch}
              />
            </Grid>
          </Grid>

          {!searchId && (
            <>
              <Grid container className="mt-5 ">
                <Grid item className="mt_card_header q_dashbaord_netsales ">
                  <h1 className="">Filter By </h1>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="">
                <Grid item xs={12} sm={6} md={4}>
                  <label>Employee</label>
                  <SelectDropDown
                    sx={{ pt: 0.5 }}
                    heading={"All"}
                    listItem={employeeList}
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedEmployee}
                    dropdownFor={"employee"}
                    title={"title"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label htmlFor="transactionFilter">Payment Type</label>
                  <SelectDropDown
                    sx={{ pt: 0.5 }}
                    listItem={
                      userTypeData.login_type === "superadmin"
                        ? transactionsListSuperadmin
                        : transactionsList
                    }
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedTransaction}
                    dropdownFor={"transaction"}
                    title={"title"}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FilterEmp;
