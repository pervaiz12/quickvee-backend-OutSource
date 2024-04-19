import React, { useState, useEffect, useRef } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import SearchIcon from "../../../Assests/Filter/Search.svg";
import UpArrow from "../../../Assests/Dashboard/Up.svg";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";

const FilterEmp = ({ onFilterEmpDataChange}) => {
  const [searchId, setSearchId] = useState("");
  const [isTablet, setIsTablet] = useState(false);
  //const [selectedEmployee, setSelectedEmployee] = useState("All");

  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
  const [filteredData, setFilteredData] = useState({ emp_id: "all" });

  const [selectedTransaction, setSelectedTransaction] = useState("Both");
  // const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] = useState(false);
  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };
  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "transaction":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      default:
        break;
    }
  };

  const dropdownContentClass = Object.values(filteredData.emp_id).length > 2 ? "dropdown-content scrollable" : "dropdown-content";
  const lengthOfArray = Object.values(filteredData.emp_id).length;
  // console.log("Length of array:", lengthOfArray);

  console.log((filteredData.emp_id).lengt)

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        if (option === "All") {
          setSelectedEmployee("All");
          setSelectedEmployeeID("All");
          setEmployeeDropdownVisible(false);
          setFilteredData({
            ...filteredData,
            emp_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const emp_id = option.id;
          setSelectedEmployee(option.title);
          setSelectedEmployeeID(option.id);
          setEmployeeDropdownVisible(false);
          setFilteredData({
            ...filteredData,
            emp_id,
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        }
        break;
      case "transaction":
        setSelectedTransaction(option);
        setTransactionDropdownVisible(false);
        break;
      // case "orderStatus":
      //   setSelectedOrderStatus(option);
      //   setOrderStatusDropdownVisible(false); 
      //   break;
      default:
        break;
        
    }
  };



  const dropdownRef = useRef(null);
  const transactionRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEmployeeDropdownVisible(false);
      }
    
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);



  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (transactionRef.current && !transactionRef.current.contains(event.target)) {
        setTransactionDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [employeeList, setemployeeList] = useState([]);
  const [loadingEmpList, setLoadingEmpList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + EMPLOYEE_LIST,
          { merchant_id: "MAL0100CA" },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const EmpList = response.data.result;

        const mappedOptions = EmpList.map((empdata) => ({
          id: empdata.id,
          title: empdata.f_name + " " + empdata.l_name,
        }));

        setemployeeList(mappedOptions);
        setLoadingEmpList(false);
      } catch (error) {
        console.error("Error fetching Employee List:", error);
        setLoadingEmpList(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    onFilterEmpDataChange(selectedTransaction, selectedEmployeeID);
  }, [selectedTransaction, selectedEmployeeID]);

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

  return (
    <>
      <div className="q_main_data_range">
        <div className="q_searchBar">
          <div className="flex border  rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-2 border-none focus:outline-none place_text_search"
            />
            <button
              onClick={handleSearch}
              className="text-black px-4 py-2 focus:outline-none text-2xl"
            >
              <img src={SearchIcon} alt="" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt_card_header q_dashbaord_netsales">
          <h1 className="">Filter By</h1>
        </div>

        <div className="qvrow">
          <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
            <label
              htmlFor="employeeFilter"
              onClick={() =>
                setEmployeeDropdownVisible(!employeeDropdownVisible)
              }
            >
              Employee
            </label>
            <div className="custom-dropdown input_area" ref={dropdownRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("employee")}
              >
                <span className="selected-option mt-1">{selectedEmployee}</span>
                <img
                  src={employeeDropdownVisible ? UpArrow : DownIcon}
                  alt="Dropdown Icon"
                  className="w-6 h-6"
                />
              </div>
              {employeeDropdownVisible && (
                <div className={dropdownContentClass}>
                  <div onClick={() => handleOptionClick("All", "employee")}>
                    All
                  </div>
                  {employeeList.map((option, key) => (
                    <div
                      key={key}
                      onClick={() => handleOptionClick(option, "employee")}
                    >
                      {option.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
            <label
              htmlFor="transactionFilter"
              onClick={() =>
                setTransactionDropdownVisible(!transactionDropdownVisible)
              }
            >
              Transactions
            </label>
            <div className="custom-dropdown input_area" ref={transactionRef}>
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("transaction")}
              >
                <span className="selected-option mt-1">
                  {selectedTransaction}
                </span>
                <img
                  src={transactionDropdownVisible ? UpArrow : DownIcon}
                  alt="Dropdown Icon"
                  className="w-6 h-6"
                />
              </div>
              {transactionDropdownVisible && (
                <div className="dropdown-content">
                  <div
                    className="all"
                    onClick={() => handleOptionClick("Both", "transaction")}
                  >
                    Both
                  </div>
                  <div
                    className="all"
                    onClick={() => handleOptionClick("Cash", "transaction")}
                  >
                    Cash
                  </div>
                  <div
                    className="all"
                    onClick={() => handleOptionClick("Online", "transaction")}
                  >
                    Online
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterEmp;
