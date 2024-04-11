import React, { useState, useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";

const MainEmployee = ({ onFilterDataChange }) => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [employeeList, setemployeeList] = useState([]);
  const [loadingEmpList, setLoadingEmpList] = useState(true);
  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
  const [filteredEmpData, setFilteredEmpData] = useState({ category_id: "all" });

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
        if (option === "All") {
          setSelectedEmployee("All");
          setSelectedEmployeeID("All");
          setEmployeeDropdownVisible(false);
          setFilteredEmpData({
            ...filteredEmpData,
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
          setFilteredEmpData({
            ...filteredEmpData,
            emp_id,
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        }
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + EMPLOYEE_LIST,
          {
            merchant_id: "MAL0100CA",
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // Assuming the API response has a data property containing the category list
        const EmpList = response.data.result;
        // Extracting category IDs and view titles
        const mappedOptions = EmpList.map((empdata) => ({
          id: empdata.id,
          title: empdata.f_name+' '+empdata.l_name,
        }));

        setemployeeList(mappedOptions);
        setLoadingEmpList(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingEmpList(false);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    onFilterDataChange(selectedEmployeeID)
  }, [selectedEmployeeID]);

  return (
    <>
    <div className="box">
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
                <div className="dropdown-content">
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

          <div className="q-order-page-filter">.</div>

          <div className="q-order-page-filter"></div>
        </div>
      </div>
      </div>
    </>
  );
};

export default MainEmployee;