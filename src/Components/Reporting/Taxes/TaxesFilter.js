import React, { useState } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const TaxesFilter = () => {
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [orderSourceVisible, setOrderSourdeDropdownVisible] = useState(false);
  const [orderTypeVisible, setOrderTypeDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "odersource":
        setOrderSourdeDropdownVisible(!orderSourceVisible);
        break;
      case "ordertype":
        setOrderTypeDropdownVisible(!orderTypeVisible);
        break;
    }
  };
  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "odersource":
        setSelectedOrderSource(option);
        setOrderSourdeDropdownVisible(false);
        break;
      case "ordertype":
        setSelectedOrderType(option);
        setOrderTypeDropdownVisible(false);
        break;
    }
  };
  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">Taxes</div>
          </div>
          <div className="q_details_header ml-8">Filter by</div>
        </div>
        <div className="q-order-page-container ml-8">
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Order Source
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("odersource")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderSource}
                </span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderSourceVisible && (
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

          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Order Type
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("ordertype")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderType}
                </span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderTypeVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "order source")}>
                    All
                  </div>
                  <div
                    onClick={() =>
                      handleOptionClick("order source", "order source")
                    }
                  >
                    order source
                  </div>
                  <div
                    onClick={() =>
                      handleOptionClick("order source", "order source")
                    }
                  >
                    order source2
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter"></div>
        </div>
      </div>
    </>
  );
};

export default TaxesFilter;
