import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
 import DownIcon from '../../../Assests/Dashboard/Down.svg';


const FilterEmp = () => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const handleFilter = (filterType) => {
    console.log('Selected filter:', filterType);
   
  };

  const handleSearch = () => {
    console.log("Search ID:", searchId);
   
  };
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event, filterType) => {
    // Clear selected filter for other options
    document.getElementById('employeeFilter').selectedIndex = 0;
    document.getElementById('transactionFilter').selectedIndex = 0;
    document.getElementById('orderStatusFilter').selectedIndex = 0;

    // Set the selected filter for the current option
    setSelectedFilter(filterType);

   
  };


  return (
    <>
      <div className="bg-white p-4 mb-3 rounded-md">
        <div className="flex border border-[#E1E1E1] rounded-md overflow-hidden">
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

      <div className="bg-white p-4 rounded-md">
      <div className="mb-4">
        <h3 className="text-[20px] font-normal opacity-100 text-black ml-4 admin_medium">Filter By</h3>
      </div>

      

      <div class="q-order-page-container">
      <div className="q-order-page-filter">
      <label className="q-order-page-label" htmlFor="employeeFilter">
        Employee
      </label>
      <select id="employeeFilter" className="custom-text-input">
        <option value="">Select an option</option>
        <option value="allEmployees">All Employees</option>
      </select>
      <span className="q-order-page-dropdown-arrow">
        <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
      </span>
    </div>

  <div class="q-order-page-filter">
    <label class="q-order-page-label" for="transactionFilter">Transaction</label>
    <select id="transactionFilter" class="custom-text-input">
      <option value="" >Select an option</option>
      <option value="allTransactions">All Transactions</option>
      
 
    </select>
    <span className="q-order-page-dropdown-arrow">
        <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
      </span>
  </div>

  <div class="q-order-page-filter">
    <label class="q-order-page-label" for="orderStatusFilter">Order Status</label>
    <select id="orderStatusFilter" class="custom-text-input">
      <option value="" >Select an option</option>
      <option value="orderStatus">Order Status</option>
      
    </select>
    <span className="q-order-page-dropdown-arrow">
        <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
      </span>
  </div>
</div>

    </div>
      <div>
        
      </div>
    </>
  );
};

export default FilterEmp;
