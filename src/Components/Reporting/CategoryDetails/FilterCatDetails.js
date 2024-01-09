import React, { useState , useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const FilterCatDetails = ({onFilterDataChange, title}) => {
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedSelectCategory, setSelectedSelectCategory] = useState("All");

  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] = useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] = useState(false);
  const [selectCategoryDropdownVisible, setSelectCategoryDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      case "orderType":
        setOrderTypeDropdownVisible(!orderTypeDropdownVisible);
        break;
      case "selectCategory":
        setSelectCategoryDropdownVisible(!selectCategoryDropdownVisible);
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
      case "orderType":
        setSelectedOrderType(option);
        setOrderTypeDropdownVisible(false);
        break;
      case "selectCategory":
        setSelectedSelectCategory(option);
        setSelectCategoryDropdownVisible(false);
        break;
      default:
        break;
    }
  };

useEffect(() => {
  onFilterDataChange(selectedOrderSource , selectedOrderType , selectedSelectCategory)
}, [selectedOrderSource , selectedOrderType , selectedSelectCategory]);

  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-header">
            <div className='q_details_header ml-2'>{title}</div>
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
                  {/* ... (other order source options) ... */}
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
                <span className="selected-option mt-1">{selectedOrderType}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderTypeDropdownVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "orderType")}>All</div>
                  <div onClick={() => handleOptionClick("Pickup", "orderType")}>Pickup</div>
                  <div onClick={() => handleOptionClick("Delivery", "orderType")}>Delivery</div>
                  {/* ... (other order type options) ... */}
                </div>
              )}
            </div>
          </div>

          {/* Select Category Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="selectCategoryFilter">
              Select Category
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("selectCategory")}
              >
                <span className="selected-option mt-1">{selectedSelectCategory}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {selectCategoryDropdownVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "selectCategory")}>All</div>
                  <div onClick={() => handleOptionClick("category1", "selectCategory")}>category1</div>
                  <div onClick={() => handleOptionClick("category2", "selectCategory")}>category2</div>
                  {/* ... (other select category options) ... */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCatDetails;
