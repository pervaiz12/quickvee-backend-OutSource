import React, { useState, useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const SiftSetting = ({ onFilterDataChange }) => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, value) => {
    setSelectedEmployee(option);
    setEmployeeDropdownVisible(false);
    onFilterDataChange(value); 
  };

  return (
    <div>
      <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="">
            <div className="q-category-bottom-header">
              <div className='q_details_header ml-2'>Shift Summary</div>
            </div>
            <div className='q_details_header ml-8'>Filter by</div>
          </div>

          <div className="q-order-page-container ml-8">
            {/* Employee Dropdown */}
            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Shift Setting Type
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
                    <div onClick={() => handleOptionClick("Don’t Track Shifts", 1, "employee")}>Don’t Track Shifts</div>
                    <div onClick={() => handleOptionClick("Track Shifts by Cashier", 2, "employee")}>Track Shifts by Cashier</div>
                    <div onClick={() => handleOptionClick("Track Shifts by Station", 3, "employee")}>Track Shifts by Station</div>
                  </div>
                )}
              </div>
            </div>
            <div className="q-order-page-filter"></div>
            <div className="q-order-page-filter"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiftSetting;
