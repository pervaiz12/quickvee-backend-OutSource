import React, { useState } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const SalesPersonFilter = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);

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
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false);
        break;
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
        break;
      case "orderType":
        setSelectedOrderType(option);
        setOrderTypeDropdownVisible(false);
        break;
    }
  };

  return (
    <div>
      <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">Report By Sales Person</div>
          </div>
          <div className="q_details_header ml-8">Filter by</div>
        </div>

        <div className="q-order-page-container ml-8">
          {/* Employee Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
          Select Employee
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("employee")}
              >
                <span className="selected-option mt-1">{selectedEmployee}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {employeeDropdownVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "employee")}>
                    All
                  </div>
                  <div
                    onClick={() => handleOptionClick("employee1", "employee")}
                  >
                    employee1
                  </div>
                  <div
                    onClick={() => handleOptionClick("employee2", "employee")}
                  >
                    employee2
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Source Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="orderSourceFilter">
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
                  <div onClick={() => handleOptionClick("All", "orderSource")}>
                    All
                  </div>
                  <div
                    onClick={() => handleOptionClick("Source1", "orderSource")}
                  >
                    Source1
                  </div>
                  <div
                    onClick={() => handleOptionClick("Source2", "orderSource")}
                  >
                    Source2
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Type Dropdown */}
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
                  <div onClick={() => handleOptionClick("Type1", "orderType")}>
                    Type1
                  </div>
                  <div onClick={() => handleOptionClick("Type2", "orderType")}>
                    Type2
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPersonFilter;
