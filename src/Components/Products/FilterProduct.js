import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import DownIcon from "../../Assests/Dashboard/Down.svg"
import CategoryListDropDown from "../../CommonComponents/CategoryListDropDown";

const FilterProduct = ({handleOptionClick, toggleDropdown,selectedEmployee,employeeDropdownVisible,selectedStatus,selectedStatusValue,
  transactionDropdownVisible,selectedCategory,categoryDropdownVisible,selectedListingType,listingTypesDropdownVisible,handleCategoryChange}) => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const handleFilter = (filterType) => {
    console.log('Selected filter:', filterType);
   
  };
  

  const handleSearch = () => {
    console.log("Search ID:", searchId);
   
  };
  
  // useEffect(()=> {
  //   console.log('sa');
  // });
  

  return (
    <>
     <div className="q-attributes-bottom-detail-section bg-white">
      <div className=" p-4 mb-3  rounded-md">
        <div className="flex border  rounded-md overflow-hidden mt-6 mr-9">
          <input
            type="text"
            placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full px-4 py-2 border-none focus:outline-none"
          />
 
          <button
            onClick={handleSearch}
            className="text-black px-4 py-2 focus:outline-none text-2xl"
          >
            <AiOutlineSearch className="h- w-8  text-[#231F20]" />
          </button>
        </div>
      </div>

      <div className=" p-4 rounded-md">
      <div className="mb-4">
        <h3 className="text-[20px] font-normal opacity-100 text-black admin_medium">Filter By</h3>
      </div>

      

      <div className="q-order-page-container">
          {/* Employee Dropdown */}
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
                <div className="dropdown-content ">
                  <div onClick={() => handleOptionClick("All", "employee")}>All</div>
                  <div onClick={() => handleOptionClick("employee1", "employee")}>employee1</div>
                  <div onClick={() => handleOptionClick("employee2", "employee")}>employee2</div>
                  {/* ... (other employee options) ... */}
                </div>
              )}
            </div>
          </div>

          {/* status Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="statusFilter">
            Product Status
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("status")}
              >
                <span className="selected-option mt-1">{selectedStatusValue === 'all' ? 'ALL' : selectedStatusValue}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {transactionDropdownVisible && (
                <div className="dropdown-content ">
                  <div onClick={() => handleOptionClick("all", "status","All")}>All</div>
                  <div onClick={() => handleOptionClick("1", "status","Approved")}>Approved</div>
                  <div onClick={() => handleOptionClick("0", "status","Pending")}>Pending</div>
                  <div onClick={() => handleOptionClick("2", "status","Rejected")}>Rejected</div>
                  {/* ... (other status options) ... */}
                </div>
              )}
            </div>
          </div>

          {/* Order Status Dropdown */}
          <CategoryListDropDown type="category" onCategoryChange={handleCategoryChange} />
          
        </div>
        <div className="q-order-page-filter w-[31.2%]">
            <label className="q-details-page-label" htmlFor="ListingFilter">
            Listing Type
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("listingType")}
              >
                <span className="selected-option mt-1">{selectedListingType}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {listingTypesDropdownVisible && (
                <div className="dropdown-content ">
                  {/* <div onClick={() => handleOptionClick("All", "listingtype")}>All</div> */}
                  <div onClick={() => handleOptionClick(0, "listingType","Product listing")}>Product listing</div>
                  <div onClick={() => handleOptionClick(1, "listingType","Variant listing")}>Variant listing</div>
                  {/* ... (other order status options) ... */}
                </div>
              )}
            </div>
          </div>
     
    </div>
      <div>
        
      </div>
      </div>
    </>
  );
};

export default FilterProduct;
