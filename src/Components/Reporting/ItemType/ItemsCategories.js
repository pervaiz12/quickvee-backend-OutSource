import React, { useState } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const ItemsCategories = () => {
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");


  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] = useState(false);


  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
     
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
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
            <div className='q_details_header ml-2'>Order Type</div>
          </div>
          <div className='q_details_header ml-8'>Filter by</div>
        </div>

        <div className="q-order-page-container ml-8">
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
                <span className="selected-option mt-1">{selectedOrderSource}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderSourceDropdownVisible && (
                <div className="dropdown-content ">
                  <div onClick={() => handleOptionClick("All", "orderSource")}>All</div>
                  <div onClick={() => handleOptionClick("Online Order", "orderSource")}>Online Order</div>
                  <div onClick={() => handleOptionClick("Store Order", "orderSource")}>Store Order</div>
                
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter"></div>
          <div className="q-order-page-filter"></div>
        

          
        </div>
      </div>
    </>
  );
};

export default ItemsCategories;

