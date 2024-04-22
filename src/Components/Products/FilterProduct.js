import React, { useEffect, useState , useRef} from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import DownIcon from "../../Assests/Dashboard/Down.svg"
import CategoryListDropDown from "../../CommonComponents/CategoryListDropDown";
import UpArrow from "../../Assests/Dashboard/Up.svg";

const FilterProduct = ({ handleOptionClick, toggleDropdown, selectedEmployee, del_picDropdownVisible, selectedStatus, selectedStatusValue,
  transactionDropdownVisible, setTransactionDropdownVisible, selectedCategory, categoryDropdownVisible, selectedListingType, listingTypesDropdownVisible, setlistingTypesDropdownVisible ,handleCategoryChange, handleSearch, searchId, setSearchId }) => {

  
  const handleFilter = (filterType) => {
    console.log('Selected filter:', filterType);

  };
  
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const dropdownContentClass = Object.values(filteredData.emp_id).length > 2 ? "dropdown-content scrollable" : "dropdown-content";
  // const lengthOfArray = Object.values(filteredData.emp_id).length;


  // const handleSearch = () => {
  //   console.log("Search ID:", searchId);

  // };

  // useEffect(()=> {
  //   console.log('sa');
  // });

 
const prodcutstatus = useState(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (prodcutstatus.current && !prodcutstatus.current.contains(event.target)) {
        setlistingTypesDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  
  return (
    <>


    <div className="box">

      <div className="q-attributes-bottom-detail-section bg-white">
          <div className="q_main_data_range">
            <div className="mt-3 mx-6 overflow-hidden bg-[#FFFFFF]" style={{ display: "flex", border:"1px solid #E1E1E1", borderRadius:"4px"}}>
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
            <div className="mt_card_header q_dashbaord_netsales mx-6">
              <h1 className="">Filter By</h1>
          

              <div className="qvrow">

                <CategoryListDropDown type="category" onCategoryChange={handleCategoryChange} />

                {/* status Dropdown */}
              <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
                  <label className="q-details-page-label" htmlFor="statusFilter"
                    onClick={() =>
                      selectedStatusValue(!selectedStatus)
                    }>
                    Product Status
                  </label>
                  <div className="custom-dropdown input_area" ref={prodcutstatus}>
                    <div
                      className="custom-dropdown-header"
                      onClick={() => toggleDropdown("status")}
                    >
                      <span className="selected-option mt-1">{selectedStatusValue === 'all' ? 'All' : selectedStatusValue}</span>
                      <img src={transactionDropdownVisible ? UpArrow : DownIcon}
                      alt="Dropdown Icon"
                      className="w-6 h-6"
            />
                    </div>
                    {transactionDropdownVisible && (
                      <div className="dropdown-content ">
                        <div className={selectedStatus === "all" ? "dropdown-item active" : "dropdown-item"} onClick={() => handleOptionClick("all", "status", "All")}>All</div>
                        <div className={selectedStatus === "1" ? "dropdown-item active" : "dropdown-item"} onClick={() => handleOptionClick("1", "status", "Approved")}>Approved</div>
                        <div className={selectedStatus === "0" ? "dropdown-item active" : "dropdown-item"} onClick={() => handleOptionClick("0", "status", "Pending")}>Pending</div>
                        <div className={selectedStatus === "2" ? "dropdown-item active" : "dropdown-item"}  onClick={() => handleOptionClick("2", "status", "Rejected")}>Rejected</div>
                      
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Status Dropdown */}
              <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
                  <label className="q-details-page-label" htmlFor="ListingFilter"
                    onClick={() => setlistingTypesDropdownVisible(!listingTypesDropdownVisible)} >
                    Listing Type
                  </label>
                  <div className="custom-dropdown input_area">
                    <div
                      className="custom-dropdown-header"
                      onClick={() => toggleDropdown("listingType")}
                    >
                      <span className="selected-option mt-1">{selectedListingType}</span>
                      <img
                        src={listingTypesDropdownVisible ? UpArrow : DownIcon}
                        alt="Dropdown Icon"
                        className="w-6 h-6"
                      />
                    </div>
                    {listingTypesDropdownVisible && (
                      <div className="dropdown-content ">
                        {/* <div onClick={() => handleOptionClick("All", "listingtype")}>All</div> */}
                        <div  onClick={() => handleOptionClick(0, "listingType", "Product listing")}>Product listing</div>
                        <div onClick={() => handleOptionClick(1, "listingType", "Variant listing")}>Variant listing</div>
                        {/* ... (other order status options) ... */}
                      </div>
                    )}
                  </div>
                </div>
                {/* Employee Dropdown */}
                <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
                  <label className="q-details-page-label" htmlFor="employeeFilter">
                    
                    Enable Product for Delivery/Pickup
                  </label>
                  <div className="custom-dropdown input_area">
                    <div
                      className="custom-dropdown-header"
                      onClick={() => toggleDropdown("del_pic")}
                    >
                      <span className="selected-option mt-1">{selectedEmployee}</span>
                      <img
                        src={del_picDropdownVisible ? UpArrow : DownIcon}
                        alt="Dropdown Icon"
                        className="w-6 h-6"
                      />
                    </div>
                    {del_picDropdownVisible && (
                      <div className="dropdown-content ">
                        <div onClick={() => handleOptionClick("1", "del_pic", "Enable All")}>Enable All</div>
                        <div onClick={() => handleOptionClick("2", "del_pic", "Enable Pickup All")}>Enable Pickup All</div>
                        <div onClick={() => handleOptionClick("5", "del_pic", "Disable Pickup All")}>Disable Pickup All</div>
                        <div onClick={() => handleOptionClick("3", "del_pic", "Enable Delivery All")}>Enable Delivery All</div>
                        <div onClick={() => handleOptionClick("6", "del_pic", "Disable Delivery All")}>Disable Delivery All</div>
                        <div onClick={() => handleOptionClick("4", "del_pic", "Disable All")}>Disable All</div>
                        {/* ... (other employee options) ... */}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              
             


              </div>

            </div>
        </div>

      </div>

        <div>

        </div>
      

 
    </>
  );
};

export default FilterProduct;