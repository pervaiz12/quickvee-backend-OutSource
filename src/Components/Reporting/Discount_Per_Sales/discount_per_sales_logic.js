import React, { useEffect } from "react";
import {
  BASE_URL,
  EMPLOYEE_LIST,
  DISCOUNT_PER_PERSON,
} from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "./../../../Common/cookiesHelper";

export default function Discount_per_sales_logic() {
  const [allEmployee, setAllEmployee] = React.useState([]);
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const [EmployeeFilterData, setEmployeeFilterData] = React.useState([]);
  const [selectedoption, setSelectedOption] = React.useState("All");
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  let merchant_id = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
  };
  const getAllEmployeeData = () => {
    try {
      let response = axios
        .post(BASE_URL + EMPLOYEE_LIST, merchant_id, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setAllEmployee(res?.data?.result);
          // Array.isArray(res?.data?.result)
        });
    } catch (error) {
      console.error("Error fetching Employee List:", error);
    }
  };
  useEffect(() => {
    getAllEmployeeData();
    // console.log(LoginGetDashBoardRecordJson?.data?.merchant_id);
  }, []);

  const handleOptionClick = (option, dropdown) => {
    if (option == "All") {
      setSelectedEmployee("all");
      setSelectedOption("All");
    } else if (option?.title !== "") {
      setSelectedEmployee(option?.id);
      setSelectedOption(option?.f_name);
    }
  };
  const onDateRangeChange = (data) => {
    const { token, ...newData } = userTypeData;
    const { start_date, end_date } = data;

    let pakect = {
      start_date,
      end_date,
      ...newData,
      employee_id: selectedEmployee == "" ? "all" : selectedEmployee,
      ...merchant_id,
    };
    try {
      axios
        .post(BASE_URL + DISCOUNT_PER_PERSON, pakect, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        })
        .then((res) => {
          if (res?.data?.status == true) {
            setEmployeeFilterData(res?.data);
          }
        });
    } catch (error) {
      console.error("Error fetching Employee List:", error);
    }

    // console.log(newData);
  };
  return {
    onDateRangeChange,
    allEmployee,
    handleOptionClick,
    selectedoption,
    EmployeeFilterData,
  };
}
