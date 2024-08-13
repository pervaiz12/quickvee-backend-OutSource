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

const SalesByHoursReportTable = (props) => {
  //   const [sortOrder, setSortOrder] = useState("asc");
  //   const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  <SkeletonTable columns={props?.rowSkelton} />;

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
                {props.TableLoader ? (
                  <SkeletonTable columns={props?.rowHeader} />
                ) : (
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
                              props.sortByItemName("str", "interval_start")
                            }
                          >
                            <p className="whitespace-nowrap">Interval Start</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              props.sortByItemName("str", "interval_end")
                            }
                          >
                            <p className="whitespace-nowrap">Interval End</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              props.sortByItemName("num", "total_amount")
                            }
                          >
                            <p className="whitespace-nowrap">Total Amount</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(props.SalesHoursData) &&
                        props.SalesHoursData.length > 0 ? (
                          <>
                            {props.SalesHoursData?.map((dailyreport, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell>
                                  <p>
                                    {!!dailyreport?.interval_start
                                      ? dailyreport?.interval_start
                                      : ""}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p>
                                    {!!dailyreport?.interval_end
                                      ? dailyreport?.interval_end
                                      : ""}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  {`$${priceFormate(
                                    !!dailyreport?.total_amount
                                      ? dailyreport?.total_amount
                                      : 0.0
                                  )}`}
                                </StyledTableCell>
                                {/* <StyledTableCell>
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
                              </StyledTableCell> */}
                              </StyledTableRow>
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                        {Array.isArray(props.SalesHoursData) &&
                        props.SalesHoursData.length > 0 ? (
                          <StyledTableRow>
                            <StyledTableCell colspan="2" className="trBG_Color">
                              {/* <p className=" totalReport">
                                {priceFormate(`$${props.totalCost?.unitsold}`)}
                              </p> */}
                              <p className=" totalReport">Total</p>
                            </StyledTableCell>
                            <StyledTableCell className="trBG_Color">
                              <p className=" totalReport">
                                {priceFormate(`$${props.totalCost?.unitsold}`)}
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>
                        ) : (
                          ""
                        )}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                )}

                {Array.isArray(props.SalesHoursData) &&
                props.SalesHoursData.length <= 0 ? (
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

export default SalesByHoursReportTable;
