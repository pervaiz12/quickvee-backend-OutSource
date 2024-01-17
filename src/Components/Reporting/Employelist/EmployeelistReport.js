import React, { useEffect, useState } from "react";
import { fetchEmployeeListData } from "../../../Redux/features/EmployeeList/EmployeeListSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../../Styles/EmployeeList/employeeList.css";

const EmployeelistReport = () => {
  const [employeeData, setAllEmployeeData] = useState([]);

  const AllEmployeeListState = useSelector((state) => state.employeeDataList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let data = {
        merchant_id: "MAL0100CA",
      };

      if (data) {
        dispatch(fetchEmployeeListData(data));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (
      !AllEmployeeListState.loading &&
      AllEmployeeListState.employeeListData
    ) {
      setAllEmployeeData(AllEmployeeListState.employeeListData);
    }
  }, [AllEmployeeListState.loading, AllEmployeeListState.employeeListData]);

  useEffect(() => {
    if (
      !AllEmployeeListState.loading &&
      AllEmployeeListState.employeeListData
    ) {
      // console.log(AllInventoryAccessState.employeeListData)
      setAllEmployeeData(AllEmployeeListState.employeeListData);
    }
  }, [AllEmployeeListState.loading]);

  // console.log(employeeData)

  return (
    <>


       <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Employee List</span>
          </div>
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Employee Name</p>
            <p className="report-title">Contact</p>
            <p className="report-title">Email</p>
            <p className="report-title">Address</p>
          </div>
          <div className="q-category-bottom-categories-listing">
            {employeeData &&
              employeeData.length >= 1 &&
              employeeData.map((employee, index) => (
                <div
                  className="q-category-bottom-categories-listing"
                  key={index}
                >
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-sort">{employee.f_name} {employee.l_name}</p>
                    <p className="report-title">{employee.phone}</p>
                    <p className="report-title">{employee.email}</p>
                    <p className="report-title">{employee.address}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div> 
    </>
  );
};

export default EmployeelistReport;

