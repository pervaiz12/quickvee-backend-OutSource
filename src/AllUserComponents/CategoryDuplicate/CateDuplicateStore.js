import React, { useState } from "react";
import Select from "react-select";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import DeleteIcon from "../../Assests/Dashboard/cross.svg"
const CateDuplicateStore = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
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
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "category3", label: "Category 3" },
  ];
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  


  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handleSelectBlur = () => {
    setIsSelectClicked(false);
  };
  // const handleCancelClick = () => {
  //   setSelectedCategories([]);
  // };
  const handleCancelClick = (removedValue) => {
    const newSelectedCategories = selectedCategories.filter(
      (category) => category.value !== removedValue
    );
    setSelectedCategories(newSelectedCategories);
  };


  return (
    <>
      <div className="q-order-main-page">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span>
              <span>Category Duplicate</span>
            </span>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">
            {/* Employee Dropdown */}
            <div className="col-qv-6 mt-6">
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Copy from this store
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("employee")}
                >
                  <span className="selected-option mt-1">
                    {selectedEmployee}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {employeeDropdownVisible && (
                  <div className="dropdown-content">
                    <div onClick={() => handleOptionClick("All", "employee")}>
                      All
                    </div>
                    <div onClick={() => handleOptionClick("employee1", "employee")}>
                      employee1
                    </div>
                    <div onClick={() => handleOptionClick("employee2", "employee")}>
                      employee2
                    </div>
                  </div>
                )}
              </div>
              {/* Multiple Select Categories */}
              <div className={`py-4 ${isSelectClicked ? 'select-clicked' : ''}`}>
      <label className="q-details-page-label mt-2" htmlFor="categoryFilter">
        Select Categories
      </label>

      <Select
        className="py-2"
        isMulti
        value={selectedCategories}
        onChange={handleCategoryChange}
        options={categoryOptions}
        isCreatable={true}
        onClick={handleSelectClick}
        onBlur={handleSelectBlur}
        components={{
          MultiValue: ({ data, innerProps }) => (
            <div className="css-wsp0cs-MultiValueGeneric" {...innerProps}>
              {data.label}
              <button
                type="button"
                className="cancel-button "
                onClick={() => handleCancelClick(data.value)}
              >
             <img src={DeleteIcon} alt="" className="w-4 h-4 ml-6" />
              </button>
            </div>
          ),
          IndicatorsContainer: ({ children }) => (
            <div className="css-1xc3v61-indicatorContainer">
              {children}
            </div>
          ),
          Control: ({ children, innerProps }) => (
            <div className={`css-13cymwt-control ${isSelectClicked ? 'select-clicked' : ''}`} {...innerProps}>
              {children}
            </div>
          ),
        }}
      />
    </div>

              <div className="">
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
                      <div onClick={() => handleOptionClick("Source1", "orderSource")}>
                        Source1
                      </div>
                      <div onClick={() => handleOptionClick("Source2", "orderSource")}>
                        Source2
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="q-order-page-filter mt-6"></div>

          <div className="q-add-inventory-section-header mx-2">
            <div class="qv_checkbox">
              <label class="qv_checkbox_add_checkmark_label">
                Want to Replicate UPC's for inventory
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  value="true"
                />
                <span class="qv_add_checkmark"></span>
              </label>
            </div>
          </div>

          <div
            className="q-add-categories-section-middle-footer "
            style={{ justifyContent: "start" }}
          >
            <button className="quic-btn quic-btn-save">
              Duplicate Inventory
            </button>
            <button className="quic-btn quic-btn-cancle">
              Duplicate setting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CateDuplicateStore;
