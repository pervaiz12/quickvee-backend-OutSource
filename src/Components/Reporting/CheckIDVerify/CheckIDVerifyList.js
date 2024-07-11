import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCheckIDVerifyData } from "../../../Redux/features/Reports/CheckIDVerify/CheckIDVerifySlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";

import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import { Link } from "react-router-dom";
import PasswordShow from "../../../Common/passwordShow";
const orderEnv = (type) => {
  if (type === "Online Order") {
    return "Online";
  }
  if (type === "Store Order") {
    return "Offline";
  } else {
    return type;
  }
};

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const CheckIDVerifyList = (props) => {
  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [allCheckIDVerifyData, setallCheckIDVerifyData] = useState("");
  const AllCheckIDVerifyDataState = useSelector(
    (state) => state.CheckIDVerifyList
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    getCheckIDVerifyData();
  }, [props]);
  const getCheckIDVerifyData = async () => {
    try {
      if (props && props.selectedDateRange) {
        let data = {
          merchant_id,
          start_date: props.selectedDateRange.start_date,
          end_date: props.selectedDateRange.end_date,
          order_typ: props.OrderTypeData,
          order_env: orderEnv(props.OrderSourceData),
          ...userTypeData,
        };
        if (data) {
          await dispatch(fetchCheckIDVerifyData(data)).unwrap();
        }
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
    if (
      !AllCheckIDVerifyDataState.loading &&
      AllCheckIDVerifyDataState.CheckIDVerifyData
    ) {
      // console.log(AllCheckIDVerifyDataState.CheckIDVerifyData);
      setallCheckIDVerifyData(AllCheckIDVerifyDataState.CheckIDVerifyData);
    } else {
      setallCheckIDVerifyData("");
    }
  }, [
    AllCheckIDVerifyDataState,
    AllCheckIDVerifyDataState.loading,
    AllCheckIDVerifyDataState.CheckIDVerifyData,
  ]);

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const tableRow = [
    { type: "date", name: "merchant_date", label: "Date" },
    { type: "time", name: "merchant_time", label: "Time" },
    { type: "str", name: "full_name", label: "Employee" },
    { type: "id", name: "order_id", label: "Order ID" },
    { type: "str", name: "name", label: "Item Name" },
  ];
  const [sortOrder, setSortOrder] = useState("asc");
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      allCheckIDVerifyData,
      type,
      name,
      sortOrder
    );
    setallCheckIDVerifyData(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <div className="mb-10">
        {AllCheckIDVerifyDataState.loading ? (
          <SkeletonTable columns={tableRow.map((item) => item.label)} />
        ) : (
          <>
            <TableContainer
              sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
            >
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  {tableRow.map((item) => (
                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName(item.type, item.name)}
                      >
                        <p>{item.label}</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {allCheckIDVerifyData &&
                    allCheckIDVerifyData.length >= 1 &&
                    allCheckIDVerifyData.map((CheckData, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <p>{formatDate(CheckData.merchant_date)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{formatTime(CheckData.merchant_time)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="">{CheckData.full_name}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Link
                            to={`/order/store-reporting/order-summary/${merchant_id}/${CheckData.order_id}`}
                            // onClick={() => handleSummeryPage(row.order_id)}
                            target="_blank"
                          >
                            <p className="text-[#0A64F9]">
                              {CheckData?.order_id}
                            </p>
                          </Link>
                          {/* <p className="">{CheckData.order_id}</p> */}
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="">{CheckData.name}</p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
            {!allCheckIDVerifyData.length >= 1 && (
              <div className="box_shadow_div" style={{ margin: 0 }}>
                <div className="q-category-bottom-categories-single-category">
                  <p>No data found</p>
                </div>
              </div>
            )}
            {/* <div className="box">
            <div className="q-daily-report-bottom-report-header">
              <p className="report-sort">Date</p>
              <p className="report-sort">Time</p>
              <p className="report-sort">Employee</p>
              <p className="report-sort">Order ID</p>
              <p className="report-sort">Item Name</p>
            </div>
          </div>

          {allCheckIDVerifyData && allCheckIDVerifyData.length >= 1 ? (
            allCheckIDVerifyData.map((CheckData, index) => (
              <div className="box">
                <div
                  key={index}
                  className="q-category-bottom-categories-listing"
                  style={{ borderRadius: "unset" }}
                >
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-title">
                      {formatDate(CheckData.merchant_date)}
                    </p>
                    <p className="report-title">
                      {formatTime(CheckData.merchant_time)}
                    </p>
                    <p className="report-title">{CheckData.full_name}</p>
                    <p className="report-title">{CheckData.order_id}</p>
                    <p className="report-title">{CheckData.name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div style={{ margin: 0 }} className="box_shadow_div">
                <p className="px-5 py-4">No Data Found</p>
              </div>
            </>
          )} */}
          </>
        )}
      </div>
    </>
  );
};

export default CheckIDVerifyList;
