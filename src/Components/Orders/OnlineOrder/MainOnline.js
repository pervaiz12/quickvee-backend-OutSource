import React, { useState } from "react";
import SearchIcon from "../../../Assests/Filter/Search.svg"
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const MainOnline = () => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  // const handleFilter = (filterType) => {
  //   console.log('Selected filter:', filterType);

  // };

  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState("All");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);
  const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
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
      case "employee":
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false);
        break;
      case "transaction":
        setSelectedTransaction(option);
        setTransactionDropdownVisible(false);
      case "orderStatus":
        setSelectedOrderStatus(option);
        setOrderStatusDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="q_searchBar">
      <div className="box_shadow_div mt_card_header">
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
          <label  htmlFor="employeeFilter">
            Employee
            </label>
            <div className="custom-dropdown input_area">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("employee")}
              >
                <span className="selected-option mt-1">{selectedEmployee}</span>
                <img src={DownIcon} alt="Down Icon" className="w-6 h-6" />
              </div>
              {employeeDropdownVisible && (
                <div className="dropdown-content ">
                  <div onClick={() => handleOptionClick("All", "employee")}>All</div>
                  <div onClick={() => handleOptionClick("employee1", "employee")}>employee1</div>
                  <div onClick={() => handleOptionClick("employee2", "employee")}>employee2</div>
                  {/* ... (other employee options) ... */}
                </div>
              )}
            </div>
          </div>

          {/* Transaction Dropdown */}
          <div className="col-qv-4">
            <label htmlFor="transactionFilter">
            Transactions
            </label>
            <div className="custom-dropdown input_area">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("transaction")}
              >
                <span className="selected-option mt-1">{selectedTransaction}</span>
                <img src={DownIcon} alt="Down Icon" className="w-6 h-6" />
              </div>
              {transactionDropdownVisible && (
                <div className="dropdown-content ">
                  <div onClick={() => handleOptionClick("All", "transaction")}>All</div>
                  <div onClick={() => handleOptionClick("transaction1", "transaction")}>transaction1</div>
                  {/* ... (other transaction options) ... */}
                </div>
              )}
            </div>
          </div>
          <div className="q-order-page-filter"></div>
        </div>
      </div>
      <div></div>
      </div>
   
    </>
  );
};

export default MainOnline;
