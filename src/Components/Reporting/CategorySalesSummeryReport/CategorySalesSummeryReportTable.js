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
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  // ===============
  const showNoData = useDelayedNodata(props.getCategorySalesReport)
  const calculatePrice = (dailyreport) => {
    const { variant_cpi, product_cpi, total_sale_qty } = dailyreport;

    if (!total_sale_qty) return "0.0";
    if (variant_cpi) return (total_sale_qty * variant_cpi).toFixed(2);
    if (!variant_cpi && product_cpi)
      return (total_sale_qty * product_cpi).toFixed(2);

    return "0.0";
  };

  const renderSalesReport = (salesReport) => {
    return salesReport.map((dailyreport, index) => (
      <StyledTableRow key={index}>
        <StyledTableCell>
          <p className="report-sort">
            {dailyreport?.category_name || "Deleted"}
          </p>
        </StyledTableCell>
        <StyledTableCell>
          <p className="report-title">{dailyreport?.total_sale_qty || 0}</p>
        </StyledTableCell>
        <StyledTableCell>
          {`$${priceFormate(
            Number(
              dailyreport?.total_sale_price
                ? dailyreport?.total_sale_price.toLocaleString("en-US", {
                    useGrouping: false,
                  })
                : 0.0
            ).toFixed(2)
          )}`}
        </StyledTableCell>
        <StyledTableCell>
          {`$${priceFormate(
            Number(calculatePrice(dailyreport)).toLocaleString("en-US", {
              useGrouping: false,
            })
          )}`}
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

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
                        <>{renderSalesReport(props.getCategorySalesReport)}</>
                      ) : (
                        ""
                      )}
                      {Array.isArray(props.getCategorySalesReport) &&
                      props.getCategorySalesReport.length > 0 ? (
                        <StyledTableRow className="trBG_Color">
                          <StyledTableCell className="trBG_Color">
                            <p className=" totalReport ">Total</p>
                          </StyledTableCell>
                          <StyledTableCell className="trBG_Color">
                            <p className=" totalReport">
                              {priceFormate(props.totalCost?.unitsold)}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell className="trBG_Color">
                            <p className=" totalReport">{`$${priceFormate(
                              props.totalCost?.totalSales
                            )}`}</p>
                          </StyledTableCell>
                          <StyledTableCell className="trBG_Color">
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
                  showNoData && !props.TableLoader && <NoDataFound />
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
