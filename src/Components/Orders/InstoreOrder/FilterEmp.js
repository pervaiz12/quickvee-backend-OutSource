import React, { useState, useEffect, useRef } from "react";
// import { AiOutlineSearch } from 'react-icons/ai';
import DownIcon from '../../../Assests/Dashboard/Down.svg';
import SearchIcon from "../../../Assests/Filter/Search.svg"
import UpArrow from "../../../Assests/Dashboard/Up.svg"
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";

const FilterEmp = ({onFilterEmpDataChange}) => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  // const handleFilter = (filterType) => {
  //   console.log('Selected filter:', filterType);
  // };

  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };

  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
  const [filteredData, setFilteredData] = useState({ emp_id: "all" });
  
  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  // const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] = useState(false);
  // const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "transaction":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      // case "orderStatus":
      //   setOrderStatusDropdownVisible(!orderStatusDropdownVisible);
      //   break;
      default:
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
      case "transaction":
        setSelectedTransaction(option);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // setEmployeeDropdownVisible(false);
        // setTransactionDropdownVisible(false);
        // setOrderStatusDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [employeeList, setemployeeList] = useState([]);
  const [loadingEmpList, setLoadingEmpList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + EMPLOYEE_LIST,
          {
            merchant_id: "MAL0100CA",
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Assuming the API response has a data property containing the category list
        const EmpList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = EmpList.map((empdata) => ({
          id: empdata.id,
          title: empdata.f_name+' '+empdata.l_name,
        }));

        setemployeeList(mappedOptions);
        setLoadingEmpList(false);
      } catch (error) {
        console.error("Error fetching Employee List:", error);
        setLoadingEmpList(false);
      }
    };
    fetchData();
  }, []); // Fetch categories only once when the component mounts

  useEffect(() => {
    onFilterEmpDataChange(selectedTransaction , selectedEmployeeID)
  }, [selectedTransaction , selectedEmployeeID]);

  return (
    <>
      <div className="q_main_data_range">
        <div className="q_searchBar">
          <div className="flex border  rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-2 border-none focus:outline-none place_text_search"
            />
            <button
              onClick={handleSearch}
              className="text-black px-4 py-2 focus:outline-none text-2xl"
            >
              <img src={SearchIcon} alt="" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt_card_header q_dashbaord_netsales">
          <h1 className="">Filter By</h1>
        </div>

        <div className="qvrow">
          {/* Employee Dropdown */}
          <div className="col-qv-4">
            <label htmlFor="employeeFilter">
              Employee
            </label>
            <div className="custom-dropdown input_area" ref={dropdownRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("employee")}
              >
                <span className="selected-option mt-1">{selectedEmployee}</span>
                <img
                  src={transactionDropdownVisible ? UpArrow : DownIcon}
                  alt="Dropdown Icon"
                  className="w-8 h-8"
                />
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

          {/* Transaction Dropdown */}
          <div className="col-qv-4">
            <label htmlFor="transactionFilter">
              Transactions
            </label>
            <div className="custom-dropdown input_area" ref={dropdownRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("transaction")}
              >
                <span className="selected-option mt-1">{selectedTransaction}</span>
                <img src={DownIcon} alt="Down Icon" className="w-6 h-6" />
              </div>
              {transactionDropdownVisible && (
                <div className="dropdown-content">
                  <div className="all" onClick={() => handleOptionClick("Both", "transaction")}>Both</div>
                  <div className="all" onClick={() => handleOptionClick("Cash", "transaction")}>Cash</div>
                  <div className="all" onClick={() => handleOptionClick("Online", "transaction")}>Online</div>
                </div>
              )}
            </div>
          </div>

          {/* Order Status Dropdown */}
          {/* <div className="col-qv-4">
            <label htmlFor="orderStatusFilter">
              Order Status
            </label>
            <div className="custom-dropdown input_area" ref={dropdownRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("orderStatus")}
              >
                <span className="selected-option mt-1">{selectedOrderStatus}</span>
                <img src={DownIcon} alt="Down Icon" className="w-6 h-6" />
              </div>
              {orderStatusDropdownVisible && (
                <div className="dropdown-content">
                  <div className="all" onClick={() => handleOptionClick("All", "orderStatus")}>All</div>
                  <div className="all" onClick={() => handleOptionClick("status1", "orderStatus")}>status1</div>
                  <div className="all" onClick={() => handleOptionClick("status2", "orderStatus")}>status2</div>
                </div>
              )}
            </div>
          </div> */}
        </div>

      </div>
    </>
  );
};

export default FilterEmp;
