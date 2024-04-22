import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../Assests/Filter/Search.svg";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import UpArrow from "../../../Assests/Dashboard/Up.svg";

const MainOnline = ({ onFilterDataChange }) => {
  const [searchId, setSearchId] = useState("");
  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };


  const [isTablet, setIsTablet] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("New");

  // const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);
  const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] =
    useState(false);

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
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTransactionDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const orderStatus = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (orderStatus.current && !orderStatus.current.contains(event.target)) {
        setOrderStatusDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
 

  useEffect(() => {
    onFilterDataChange(selectedTransaction, selectedOrderStatus);
  }, [selectedTransaction, selectedOrderStatus]);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 885);
    };

    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {/* Transaction Dropdown */}
          <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
            <label htmlFor="transactionFilter" onClick={() =>
              setTransactionDropdownVisible(!transactionDropdownVisible)
            }>Transactions</label>
            <div className="custom-dropdown input_area" ref={dropdownRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("transaction")}
              >
                <span className="selected-option mt-1">
                  {selectedTransaction}
                </span>
                {/* <img src={DownIcon} alt="Down Icon" className="w-6 h-6" /> */}
                <img
                  src={transactionDropdownVisible ? UpArrow : DownIcon}
                  alt="Dropdown Icon"
                  className="w-6 h-6"
                />
              </div>
              {transactionDropdownVisible && (
                <div className="dropdown-content">
                  <div
                    className={selectedTransaction === "Both" ? "dropdown-item active" : "dropdown-item"}
                    onClick={() => handleOptionClick("Both", "transaction")}
                  >
                    Both
                  </div>
                  <div
                    className={selectedTransaction === "Cash" ? "dropdown-item active" : "dropdown-item"}
                    onClick={() => handleOptionClick("Cash", "transaction")}
                  >
                    Cash
                  </div>
                  <div
                    className={selectedTransaction === "Online" ? "dropdown-item active" : "dropdown-item"}
                    onClick={() => handleOptionClick("Online", "transaction")}
                  >
                    Online
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Status Dropdown */}
          <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
            <label htmlFor="orderStatusFilter" onClick={() =>
              setOrderStatusDropdownVisible(!orderStatusDropdownVisible)
            }>Order Status</label>
            <div className="custom-dropdown input_area" ref={orderStatus}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("orderStatus")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderStatus}
                </span>
                <img
                  src={orderStatusDropdownVisible ? UpArrow : DownIcon}
                  alt="Dropdown Icon"
                  className="w-6 h-6"
                />
              </div>
              {orderStatusDropdownVisible && (
                <div className="dropdown-content">
                  <div
                    className={selectedOrderStatus === "New" ? "dropdown-item active" : "dropdown-item"}
                    
                    onClick={() => handleOptionClick("New", "orderStatus")}
                  >
                    New
                  </div>
                  <div
                    className={selectedOrderStatus === "Closed" ? "dropdown-item active" : "dropdown-item"}
                    onClick={() => handleOptionClick("Closed", "orderStatus")}
                  >
                    Closed
                  </div>
                  <div
                    className={selectedOrderStatus === "Failed" ? "dropdown-item active" : "dropdown-item"}
                    onClick={() => handleOptionClick("Failed", "orderStatus")}
                  >
                    Failed
                  </div>
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
