import React, { useEffect, useState } from "react";
import {
  BASE_URL,
  EMPLOYEE_LIST,
  DISCOUNT_PER_PERSON,
} from "../../../Constants/Config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "./../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";

import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";

export default function Discount_per_sales_logic() {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [allEmployee, setAllEmployee] = React.useState([]);
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const [EmployeeFilterData, setEmployeeFilterData] = React.useState([]);
  const [selectedoption, setSelectedOption] = React.useState("All");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [loader, setLoader] = useState(false);
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_new_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  let merchant_id = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    token_id: userTypeData?.token_id,
    login_type: userTypeData?.login_type,
  };
  const getAllEmployeeData = async () => {
    try {
      const response = await axios.post(BASE_URL + EMPLOYEE_LIST, merchant_id, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      if (response) {
        setAllEmployee(response?.data?.result);
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };
  useEffect(() => {
    getAllEmployeeData();
    
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
  const onDateRangeChange = async (data) => {
    const { token, ...newData } = userTypeData;
    const { start_date, end_date } = data;

    let pakect = {
      start_date,
      end_date,
      ...newData,
      employee_id: selectedEmployee == "" ? "all" : selectedEmployee,
      ...merchant_id,
    };
    setLoader(true);
    try {
      const res = await axios.post(BASE_URL + DISCOUNT_PER_PERSON, pakect, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly if available
        },
      });

      setLoader(false);

      if (res?.data?.status === true) {
        const updatedList = Object.fromEntries(
          Object.entries(res.data?.report_data).map(([key, value]) => {
            const updatedValue = value.map((item) => {
              return {
                ...item,
                fullName: item?.f_name + " " + item?.l_name,
              };
            });
            return [key, updatedValue];
          })
        );

        setEmployeeFilterData(updatedList);
      }
    } catch (error) {
      setLoader(false);

      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  
  
















































  const sortByItemName = (type, name) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const updatedList = Object.fromEntries(
      Object.entries(EmployeeFilterData).map(([key, value]) => {
        const { sortedItems } = SortTableItemsHelperFun(
          value,
          type,
          name,
          sortOrder
        );
        return [key, sortedItems];
      })
    );
    setEmployeeFilterData(updatedList);
    setSortOrder(newOrder);
  };

  return {
    onDateRangeChange,
    allEmployee,
    handleOptionClick,
    selectedoption,
    EmployeeFilterData,
    loader,
    merchant_new_id,
    sortByItemName,
  };
}
