import React, { useState } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const MainEmployee = () => {
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

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">
              Employee Working Hours (Clock In/Out)
            </div>
          </div>
          {/* <div className='q_details_header ml-8'>Filter by</div> */}
        </div>

        <div className="q-order-page-container ml-8">
          {/* Order Source Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Employee
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
                <div className="dropdown-content ml-2">
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
                  {/* ... (other employee options) ... */}
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter">.</div>

          <div className="q-order-page-filter"></div>
        </div>
      </div>
    </>
  );
};

export default MainEmployee;