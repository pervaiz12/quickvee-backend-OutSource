import React, { useEffect, useState } from "react";
// import { fetchdailyreportData } from "../../../Redux/features/DailyReport/dailyreportSlice";

import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import PasswordShow from "../../../Common/passwordShow";
import { getAuthInvalidMessage } from "../../../Redux/features/Authentication/loginSlice";
import { priceFormate } from "../../../hooks/priceFormate";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    backgroundColor: "#F5F5F5",
  },
  "& td, & th": {
    border: "none",
  },
}));
// ==================== END TABLE STYLE ADDED ===================================================

const CategorySalesSummeryReportTable = (props) => {
  //   const [sortOrder, setSortOrder] = useState("asc");
  //   const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  // ====================== STATE DECLARED ==================================
  //   const [dailyreport, setdailyreport] = useState([]);
  //   const [total, settotal] = useState(0);
  // ====================== END STATE DECLARED ==================================
  //   const dailyreportDataState = useSelector((state) => state.dailyreport);
  //   let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  // ==================== USEEFFECT ===========================================
  //   useEffect(() => {
  //     getAllDailyReport();
  //   }, [dispatch, data]);
  //   const getAllDailyReport = async () => {
  //     try {
  //       let newData = { ...data, ...userTypeData, merchant_id };
  //       await dispatch(fetchdailyreportData(newData)).unwrap();
  //     } catch (error) {
  //       if (error.status == 401 || error.response.status === 401) {
  //         getUnAutherisedTokenMessage();
  //         handleCoockieExpire();
  //       } else if (error.status == "Network Error") {
  //         getNetworkError();
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     if (!dailyreportDataState.loading && dailyreportDataState.dailyreportData) {
  //       setdailyreport(dailyreportDataState.dailyreportData);
  //       settotal(
  //         dailyreportDataState.dailyreportData.length > 0
  //           ? dailyreportDataState.dailyreportData.reduce(
  //               (total, report) => total + parseFloat(report.amt),
  //               0
  //             )
  //           : 0
  //       );
  //     }
  //   }, [
  //     dailyreportDataState,
  //     dailyreportDataState.loading,
  //     dailyreportDataState.dailyreportData,
  //   ]);

  // ==================== END USEEFFECT ===========================================

  //   const sortByItemName = (type, name) => {
  //     const { sortedItems, newOrder, sortIcon } = SortTableItemsHelperFun(
  //       dailyreport,
  //       type,
  //       name,
  //       sortOrder
  //     );
  //     setdailyreport(sortedItems);
  //     setSortOrder(newOrder);
  //   };         <SkeletonTable columns={props?.rowSkelton} />

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <>
      {props.TableLoader ? (
        <SkeletonTable columns={props?.rowHeader} />
      ) : (
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                {/* {dailyreportDataState.loading ? (
                <SkeletonTable columns={["Date", "Total"]} />
              ) : ( */}
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() =>
                            props.sortByItemName("str", "category_name")
                          }
                        >
                          <p className="whitespace-nowrap">Name of Category</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() =>
                            props.sortByItemName("num", "total_sale_qty")
                          }
                        >
                          <p className="whitespace-nowrap">Units Sold</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() =>
                            props.sortByItemName("num", "total_sale_price")
                          }
                        >
                          <p className="whitespace-nowrap">Total Sales</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          // onClick={() =>
                          //   props.sortByItemName(
                          //     "num",
                          //     "dailyreport?.variant_cpi"
                          //   )
                          // }
                        >
                          <p className="whitespace-nowrap"> Total Cost</p>
                          {/* <img src={sortIcon} alt="" className="pl-1" /> */}
                        </button>
                      </StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(props.getCategorySalesReport) &&
                      props.getCategorySalesReport.length > 0 ? (
                        <>
                          {props.getCategorySalesReport?.map(
                            (dailyreport, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell>
                                  <p className="report-sort">
                                    {!!dailyreport?.category_name
                                      ? dailyreport?.category_name
                                      : "Deleted"}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className="report-title">
                                    {!!dailyreport?.total_sale_qty
                                      ? dailyreport?.total_sale_qty
                                      : 0}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  {`$${priceFormate(
                                    Number(
                                      !!dailyreport?.total_sale_price
                                        ? dailyreport?.total_sale_price.toLocaleString(
                                            "en-US",
                                            { useGrouping: false }
                                          )
                                        : 0.0
                                    ).toFixed(2)
                                  )}`}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {`$${priceFormate(
                                    Number(
                                      !!dailyreport?.variant_cpi
                                        ? !!dailyreport?.total_sale_qty
                                          ? (
                                              dailyreport?.total_sale_qty *
                                              dailyreport?.variant_cpi
                                            ).toFixed(2)
                                          : dailyreport?.variant_cpi ==
                                                (null || undefined) &&
                                              dailyreport?.product_cpi ==
                                                (null || undefined)
                                            ? "0.0"
                                            : dailyreport?.variant_cpi ==
                                                  (null || undefined) &&
                                                !!dailyreport?.product_cpi
                                              ? dailyreport?.product_cpi *
                                                dailyreport?.total_sale_qty
                                              : !!dailyreport?.variant_cpi &&
                                                  !!dailyreport?.product_cpi
                                                ? dailyreport?.variant_cpi *
                                                  dailyreport?.variant_cpi
                                                : "0.0"
                                        : "0.0"
                                    ).toLocaleString("en-US", {
                                      useGrouping: false,
                                    })
                                  )}`}
                                </StyledTableCell>
                              </StyledTableRow>
                            )
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {Array.isArray(props.getCategorySalesReport) &&
                      props.getCategorySalesReport.length > 0 ? (
                        <StyledTableRow className="trBG_Color">
                          <StyledTableCell>
                            <p className=" totalReport">Total</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p className=" totalReport">
                              {priceFormate(props.totalCost?.unitsold)}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p className=" totalReport">{`$${priceFormate(
                              props.totalCost?.totalSales
                            )}`}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p className=" totalReport">{`$${priceFormate(
                              props.totalCost?.totalCost
                            )}`}</p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : (
                        ""
                      )}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
                {Array.isArray(props.getCategorySalesReport) &&
                props.getCategorySalesReport.length <= 0 ? (
                  <NoDataFound />
                ) : (
                  ""
                )}
                {/* )} */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CategorySalesSummeryReportTable;
