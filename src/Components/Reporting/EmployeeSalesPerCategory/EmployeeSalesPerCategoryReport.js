import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalePersonData } from "../../../Redux/features/SalesByPerson/SalesByPersonSlice";
import { fetchEmployeeSalesPerCategoryData } from "../../../Redux/features/Reports/EmployeeSalesPerCategory/EmployeeSalesPerCategorySlice";

import { Link, useNavigate } from "react-router-dom";

import { useAuthDetails } from "../../../Common/cookiesHelper";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { priceFormate } from "../../../hooks/priceFormate";
import SortIconW from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";
import Skeleton from "react-loading-skeleton";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
// ==================== TABLE STYLE ADDED ===================================================
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium",
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

  "& td, & th": {
    border: "none",
  },
}));
// ==================== END TABLE STYLE ADDED ===================================================

const EmployeeSalesPerCategoryReport = (props) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  const dispatch = useDispatch();
  const [allEmployeeSalesPerCategoryData, setallEmployeeSalesPerCategoryData] = useState("");
  const AllEmployeeSalesPerCategoryDataState = useSelector(
    (state) => state.EmployeeSalesPerCategoryList
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [totalRecord, setTotalRecord] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getSalePersonData();
  }, [props]);
  const getSalePersonData = async () => {
    try {
      if (props && props.selectedDateRange) {
        let data = {
          merchant_id,
          start_date:props.selectedDateRange.start_date,
          end_date:props.selectedDateRange.end_date,
          category_id:props.SelectCatListData,
          employee_id:props.SelectEmpListData,
          ...userTypeData,
        };
        if (data) {
          await dispatch(fetchEmployeeSalesPerCategoryData(data)).unwrap();
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
      !AllEmployeeSalesPerCategoryDataState.loading &&
      AllEmployeeSalesPerCategoryDataState.EmployeeSalesPerCategoryData
    ) {
      setallEmployeeSalesPerCategoryData(AllEmployeeSalesPerCategoryDataState.EmployeeSalesPerCategoryData);
    } else {
      setallEmployeeSalesPerCategoryData("");
    }
  }, [
    AllEmployeeSalesPerCategoryDataState,
    AllEmployeeSalesPerCategoryDataState.loading,
    AllEmployeeSalesPerCategoryDataState.EmployeeSalesPerCategoryData,
  ]);

  useEffect(() => {
    console.log(allEmployeeSalesPerCategoryData);
  }, [allEmployeeSalesPerCategoryData]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };

  let grandTotal = 0;
  Object.keys(allEmployeeSalesPerCategoryData).map((EmpData, index) => {
    const totalAmount = allEmployeeSalesPerCategoryData[EmpData]?.reduce(
      (total, SalesData) => {
        return total + (parseFloat(SalesData?.total_sales) || 0);
      },
      0
    );
    grandTotal += totalAmount;
  });

  const sortByItemName = (type, name) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";

    const updatedCategorySale = Object.fromEntries(
      Object.entries(allEmployeeSalesPerCategoryData).map(([EmpData, items]) => {
        const { sortedItems } = SortTableItemsHelperFun(
          items,
          type,
          name,
          sortOrder
        );
        return [EmpData, sortedItems];
      })
    );

    setallEmployeeSalesPerCategoryData(updatedCategorySale);
    setSortOrder(newOrder);
  };
  return (
    <>
      {AllEmployeeSalesPerCategoryDataState.loading ? (
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">
                <Skeleton />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <SkeletonTable columns={["Order ID", "Date", "Total"]} />
          </Grid>
        </Grid>
      ) : Object.entries(allEmployeeSalesPerCategoryData).length > 0 ? (
        Object.entries(allEmployeeSalesPerCategoryData).map(([EmpData, items]) => (
          <>
            <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                <div className="q-category-bottom-header">
                  <div className="q_details_header ml-2">
                    Employee Name: {EmpData}
                  </div>
                </div>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("id", "order_id")}
                        >
                          <p>Order ID</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() =>
                            sortByItemName("date", "merchant_time")
                          }
                        >
                          <p>Date</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <button
                          className=""
                          onClick={() => sortByItemName("num", "amt")}
                        >
                          <div className="flex items-center">
                            {" "}
                            <p>Total</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </div>
                        </button>
                      </StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {items?.map((SalesData, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell sx={{ width: "33%" }}>
                            <span
                              className="cursor-pointer text-[#0A64F9]"
                              onClick={() =>
                                navigate(
                                  `/order/store-reporting/order-summary/${merchant_id}/${SalesData.order_id}`
                                )
                              }
                            >
                              {SalesData.order_id}
                            </span>
                            {/* </Link> */}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              borderRight: "1px solid #E3E3E3",
                              width: "33%",
                            }}
                          >
                            <p>{formatDateTime(SalesData.merchant_time)}</p>
                          </StyledTableCell>
                          <StyledTableCell align="center" sx={{ width: "33%" }}>
                            <p> ${priceFormate(SalesData.amt)}</p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow className="trBG_Color">
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center">
                          <div className=" totalReport">
                            <div>Total </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div className="totalReport">
                            <div>
                              {`$${priceFormate(
                                allEmployeeSalesPerCategoryData[EmpData].reduce(
                                  (total, SalesData) => {
                                    return (
                                      total + (parseFloat(SalesData?.amt) || 0)
                                    );
                                  },
                                  0
                                ).toFixed(2)
                              )}`}
                            </div>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              </Grid>
            </Grid>
          </>
        ))
      ) : (
        <Grid sx={{pt:2.5}}>
          <NoDataFound />
        </Grid>
        
      )}

      {Object.entries(allEmployeeSalesPerCategoryData).length > 0 && (
        <StyledTable
          sx={{ minWidth: 500 }}
          aria-label="customized table"
          style={{ marginBottom: "1rem", transform: "translate(0rem, -1rem)" }}
        >
          <StyledTableRow className="trBG_Color">
            <StyledTableCell sx={{ width: "33%" }}></StyledTableCell>
            <StyledTableCell align="center" sx={{ width: "33%" }}>
              <div className="q-category-bottom-report-listing">
                <div>
                  <p className="totalReport">Grand Total</p>
                </div>
              </div>
            </StyledTableCell>
            <StyledTableCell align="center">
              <div className="q-category-bottom-report-listing">
                <div>
                  <p className="totalReport">${priceFormate(grandTotal.toFixed(2))}</p>
                </div>
              </div>
            </StyledTableCell>
          </StyledTableRow>
        </StyledTable>
      )}
    </>
  );
};

export default EmployeeSalesPerCategoryReport;
