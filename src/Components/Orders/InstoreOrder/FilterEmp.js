import React, { useState, useEffect, useRef } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import SearchIcon from "../../../Assests/Filter/Search.svg";
import UpArrow from "../../../Assests/Dashboard/Up.svg";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Grid } from "@mui/material";
const FilterEmp = ({ onFilterEmpDataChange }) => {
  const transactionsList = [
    {
      title: "Both",
    },
    {
      title: "Cash",
    },
    {
      title: "Online",
    },
  ];

  const [searchId, setSearchId] = useState("");
  const [selected, setSelected] = useState(false);

  const [isTablet, setIsTablet] = useState(false);
  //const [selectedEmployee, setSelectedEmployee] = useState("All");

  const [selectedEmployee, setSelectedEmployee] = useState("All");
  console.log("Selected employee", selectedEmployee);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
  const [filteredData, setFilteredData] = useState({ emp_id: "all" });

  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  // const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);
  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };
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
          console.log("handleOptionClick ", option);
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
  const [loadingEmpList, setLoadingEmpList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + EMPLOYEE_LIST,
          { merchant_id: "MAL0100CA" },
          { headers: { "Content-Type": "multipart/form-data" } }
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
    onFilterEmpDataChange(selectedTransaction, selectedEmployeeID);
  }, [selectedTransaction, selectedEmployeeID]);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Grid container className="">
        <Grid item xs={12}>
          <Grid container className="mt-5">
            <Grid item xs={12} className="">
              <InputTextSearch
                placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
                value={searchId}
                handleChange={setSearchId}
                handleSearchButton={handleSearch}
              />
            </Grid>
          </Grid>
          <Grid container className="mt-5 ">
            <Grid item className="mt_card_header q_dashbaord_netsales ">
              <h1 className="">Filter By</h1>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="">
            <Grid item xs={4}>
              <label htmlFor="employeeFilter">Employee</label>
              <SelectDropDown
                heading={"All"}
                listItem={employeeList}
                onClickHandler={handleOptionClick}
                selectedOption={selectedEmployee}
                dropdownFor={"employee"}
              />
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="transactionFilter">Transactions</label>
              <SelectDropDown
                heading={""}
                listItem={transactionsList}
                onClickHandler={handleOptionClick}
                selectedOption={selectedTransaction}
                dropdownFor={"transaction"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FilterEmp;
