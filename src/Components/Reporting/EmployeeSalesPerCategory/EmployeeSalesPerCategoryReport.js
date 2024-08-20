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
import useDelayedNodata from "../../../hooks/useDelayedNoData";
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
  const showNoData = useDelayedNodata(Object.keys(allEmployeeSalesPerCategoryData))
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
  let itemSoldTotal = 0;
  let qtyTotal = 0;
  Object.keys(allEmployeeSalesPerCategoryData).map((EmpData, index) => {
    const totalAmount = allEmployeeSalesPerCategoryData[EmpData]?.reduce(
      (total, SalesData) => {
        return total + (parseFloat(SalesData?.total_sales) || 0);
      },
      0
    );
    grandTotal += totalAmount;
  });
  Object.keys(allEmployeeSalesPerCategoryData).map((EmpData, index) => {
    const totalAmountitemsold = allEmployeeSalesPerCategoryData[EmpData]?.reduce(
      (total, SalesData) => {
        return total + (parseFloat(SalesData?.total_items_sold) || 0);
      },
      0
    );
    itemSoldTotal += totalAmountitemsold;
  });
  Object.keys(allEmployeeSalesPerCategoryData).map((EmpData, index) => {
    const totalAmountqyt = allEmployeeSalesPerCategoryData[EmpData]?.reduce(
      (total, SalesData) => {
        return total + (parseFloat(SalesData?.total_quantity) || 0);
      },
      0
    );
    qtyTotal += totalAmountqyt;
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
            <SkeletonTable columns={["Category Name", "Item Sold", "Quantity", "Amount"]} />
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
                          onClick={() => sortByItemName("str", "category_name")}
                        >
                          <p>Category Name</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() =>
                            sortByItemName("num", "total_items_sold")
                          }
                        >
                          <p>Item Sold</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() =>
                            sortByItemName("num", "total_quantity")
                          }
                        >
                          <p>Quantity</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell >
                        <button
                          className=""
                          onClick={() => sortByItemName("num", "total_sales")}
                        >
                          <div className="flex items-center">
                            {" "}
                            <p>Amount</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </div>
                        </button>
                      </StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {items?.map((SalesData, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell >
                          <p>{SalesData.category_name}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>{SalesData.total_items_sold}</p>
                          </StyledTableCell>
                          <StyledTableCell >
                            <p>{SalesData.total_quantity}</p>
                          </StyledTableCell>
                          <StyledTableCell >
                            <p> ${priceFormate(SalesData.total_sales)}</p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow className="trBG_Color">
                        <StyledTableCell>
                          <div className=" totalReport">
                            <div>Total </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="totalReport">
                            <div>
                              {`${ allEmployeeSalesPerCategoryData[EmpData].reduce(
                                  (total, SalesData) => {
                                    return (
                                      total + (parseFloat(SalesData?.total_items_sold) || 0)
                                    );
                                  },
                                  0
                              )}`}
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell >
                        <div className="totalReport">
                            <div>
                            {`${
                                allEmployeeSalesPerCategoryData[EmpData].reduce(
                                  (total, SalesData) => {
                                    return (
                                      total + (parseFloat(SalesData?.total_quantity) || 0)
                                    );
                                  },
                                  0
                              )}`}
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell >
                          <div className="totalReport">
                            <div>
                              {`$${priceFormate(
                                allEmployeeSalesPerCategoryData[EmpData].reduce(
                                  (total, SalesData) => {
                                    return (
                                      total + (parseFloat(SalesData?.total_sales) || 0)
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
        <Grid sx={{pt:3}}>
         {showNoData && <NoDataFound />} 
        </Grid>
        
      )}

      {Object.entries(allEmployeeSalesPerCategoryData).length > 0 && (
        <StyledTable
          sx={{ minWidth: 500 }}
          aria-label="customized table"
          style={{ marginBottom: "1rem", transform: "translate(0rem, -1rem)" }}
        >
          <StyledTableRow className="trBG_Color grandTotal">
            <StyledTableCell sx={{ width: "32%" }} >
              <div className="">
                  <p className="totalReport">Grand Total</p>
              </div>
            </StyledTableCell>
            <StyledTableCell sx={{ width: "23.5%" }} >
              <div className="">
                  <p className="totalReport">{itemSoldTotal}</p>
              </div>
            </StyledTableCell>
            <StyledTableCell sx={{ width: "23%" }}>
              <div className="">
                  <p className="totalReport">{qtyTotal}</p>
              </div>
            </StyledTableCell>
            <StyledTableCell  >
              <div className="">
                  <p className="totalReport">${priceFormate(grandTotal.toFixed(2))}</p>
              </div>
            </StyledTableCell>
          </StyledTableRow>
        </StyledTable>
      )}
    </>
  );
};

export default EmployeeSalesPerCategoryReport;
