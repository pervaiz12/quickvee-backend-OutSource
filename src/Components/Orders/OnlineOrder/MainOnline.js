import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../Assests/Filter/Search.svg"
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const MainOnline = ({onFilterDataChange}) => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };

  // const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("New");

  // const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] = useState(false);
  const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      // case "employee":
      //   setEmployeeDropdownVisible(!employeeDropdownVisible);
      //   break;
      case "transaction":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      case "orderStatus":
        setOrderStatusDropdownVisible(!orderStatusDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      // case "employee":
      //   setSelectedEmployee(option);
      //   setEmployeeDropdownVisible(false);
      //   break;
      case "transaction":
        setSelectedTransaction(option);
        setTransactionDropdownVisible(false);
        break;
      case "orderStatus":
          setSelectedOrderStatus(option);
          setOrderStatusDropdownVisible(false); 
          break;
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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onFilterDataChange(selectedTransaction , selectedOrderStatus)
  }, [selectedTransaction , selectedOrderStatus]);

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
          {/* <div className="col-qv-4">
            <label htmlFor="employeeFilter">
              Employee
            </label>
            <div className="custom-dropdown input_area" ref={dropdownRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("employee")}
              >
                <span className="selected-option mt-1">{selectedEmployee}</span>
                <img src={DownIcon} alt="Down Icon" className="w-6 h-6" />
              </div>
              {employeeDropdownVisible && (
                <div className="dropdown-content">
                  <div className="all" onClick={() => handleOptionClick("All", "employee")}>All</div>
                  <div className="all" onClick={() => handleOptionClick("employee1", "employee")}>employee1</div>
                  <div className="all" onClick={() => handleOptionClick("employee2", "employee")}>employee2</div>
                </div>
              )}
            </div>
          </div> */}

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
          <div className="col-qv-4">
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
                  <div className="all" onClick={() => handleOptionClick("New", "orderStatus")}>New</div>
                  <div className="all" onClick={() => handleOptionClick("Closed", "orderStatus")}>Closed</div>
                  <div className="all" onClick={() => handleOptionClick("Failed", "orderStatus")}>Failed</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainOnline;
