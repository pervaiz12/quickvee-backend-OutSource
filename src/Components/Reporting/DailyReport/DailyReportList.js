import React, { useEffect, useState } from "react";
import { fetchdailyreportData } from "../../../Redux/features/DailyReport/dailyreportSlice";

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

const DailyReportList = ({ data }) => {
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  // ====================== STATE DECLARED ==================================
  const [dailyreport, setdailyreport] = useState([]);
  const [total, settotal] = useState(0);
  // ====================== END STATE DECLARED ==================================
  const dailyreportDataState = useSelector((state) => state.dailyreport);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  // ==================== USEEFFECT ===========================================
  useEffect(() => {
    getAllDailyReport();
  }, [dispatch, data]);
  const getAllDailyReport = async () => {
    try {
      let newData = { ...data, ...userTypeData, merchant_id };
      // Dispatch the action to fetch data when the component mounts

      await dispatch(fetchdailyreportData(newData)).unwrap();
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
    if (!dailyreportDataState.loading && dailyreportDataState.dailyreportData) {
      setdailyreport(dailyreportDataState.dailyreportData);
      settotal(
        dailyreportDataState.dailyreportData.length > 0
          ? dailyreportDataState.dailyreportData.reduce(
              (total, report) => total + parseFloat(report.amt),
              0
            )
          : 0
      );
    }
  }, [
    dailyreportDataState,
    dailyreportDataState.loading,
    dailyreportDataState.dailyreportData,
  ]);

  // ==================== END USEEFFECT ===========================================

  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder, sortIcon } = SortTableItemsHelperFun(
      dailyreport,
      type,
      name,
      sortOrder
    );
    setdailyreport(sortedItems);
    setSortOrder(newOrder);
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
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              {dailyreportDataState.loading ? (
                <SkeletonTable columns={["Date", "Total"]} />
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
                            sortByItemName("date", "merchant_time")
                          }
                        >
                          <p className="whitespace-nowrap">Date</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "amt")}
                        >
                          <p className="whitespace-nowrap">Total</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {dailyreport.length > 0 ? (
                        <>
                          {dailyreport.map((dailyreport, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <p className="report-sort">
                                  {formatDate(dailyreport.merchant_time)}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="report-title">
                                  ${priceFormate(dailyreport.amt)}
                                </p>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                          <StyledTableCell className="trBG_Color">
                            <div className="q-category-bottom-report-listing">
                              <div>
                                <p className="report-sort totalReport">Grand Total</p>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell  className="trBG_Color">
                            <div className="q-category-bottom-report-listing">
                              <div>
                                <p className="report-title totalReport">
                                  ${priceFormate(total.toFixed(2))}
                                </p>
                              </div>
                            </div>
                          </StyledTableCell>
                        </>
                      ) : (
                        ""
                      )}
                    </TableBody>
                  </StyledTable>
                  {!dailyreport.length  && <NoDataFound table={true} />}
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DailyReportList;
