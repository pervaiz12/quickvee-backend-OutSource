import React, { useState } from "react";
import DownIcon from "../../Assests/Dashboard/Down.svg";

const MainInvDuplicates = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] = useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] = useState(false);

  const [replicateUPCs, setReplicateUPCs] = useState(false); // State for the checkbox

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      // Add cases for other dropdowns if needed
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
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
        break;
      // Add cases for other dropdowns if needed
      default:
        break;
    }
  };

  const handleCheckboxChange = () => {
    setReplicateUPCs(!replicateUPCs);
  };

  return (
    <>
      <div className='q-order-main-page'>
        <div className='q-add-categories-section'>
          <div className='q-add-categories-section-header'>
            <span>
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Duplicate Menu</span>
            </span>
          </div>

          <div className="q-order-page-container mb-4 ml-8">
            {/* Employee Dropdown */}
            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Copy from this store
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
                Paste to this store
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
            <span class="search_btn mt-4 md:mt-0 md:ml-6"><button class="save_btn">Search</button></span>
          </div>
      
        

          {/* Add Captcha component or placeholder here */}

          <div className='q-add-categories-section-middle-footer'>
            <button className='quic-btn quic-btn-save'>
              Duplicate Inventory
            </button>
            <button className='quic-btn quic-btn-cancle'>
              Duplicate setting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainInvDuplicates;
