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

// ==================== TABLE STYLE ADDED ===================================================
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// ==================== END TABLE STYLE ADDED ===================================================

const DailyReportList = ({ data }) => {
  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  // ====================== STATE DECLARED ==================================
  const [dailyreport, setdailyreport] = useState([]);

  // ====================== END STATE DECLARED ==================================
  const dailyreportDataState = useSelector((state) => state.dailyreport);

  // ==================== USEEFFECT ===========================================
  useEffect(() => {
    let newData = { ...data, ...userTypeData };
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchdailyreportData(newData));
  }, [dispatch, data]);

  useEffect(() => {
    if (!dailyreportDataState.loading && dailyreportDataState.dailyreportData) {
      setdailyreport(dailyreportDataState.dailyreportData);
    }
  }, [
    dailyreportDataState,
    dailyreportDataState.loading,
    dailyreportDataState.dailyreportData,
  ]);

  // ==================== END USEEFFECT ===========================================

  if (!data || data.length === 0) {
    return (
      <>
        <Grid container sx={{ padding: 2.5 }} className="box_shadow_div ">
          <Grid item xs={12}>
            No data Found.
          </Grid>
        </Grid>
      </>
    );
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  const renderDataTable = () => {
    // console.log(dailyreport)
    if (
      dailyreport.status === "Failed" &&
      dailyreport.msg === "No. Data found."
    ) {
      return <div className="empty-div box">No data available</div>;
    } else if (dailyreport && dailyreport.length >= 1) {
      const totalAmt = dailyreport.reduce(
        (total, report) => total + parseFloat(report.amt),
        0
      );
      return (
        <>
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Total</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {dailyreport.map((dailyreport, index) => (
                          <StyledTableRow>
                            <StyledTableCell>
                              <p className="report-sort">
                                {formatDate(dailyreport.merchant_time)}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p className="report-title">${dailyreport.amt}</p>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                        <StyledTableCell>
                          <div className="q-category-bottom-report-listing">
                            <div>
                              <p className="report-sort">Grand Total</p>
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="q-category-bottom-report-listing">
                            <div>
                              <p className="report-title">
                                ${totalAmt.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </StyledTableCell>
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>

          {/* <div className="box">
            <div className="q-daily-report-bottom-report-header">
              <p className="report-sort">Date</p>
              <p className="report-title">Total</p>
            </div>
            {dailyreport.map((dailyreport, index) => (
              <div className="q-category-bottom-categories-listing" key={index}>
                <div className="q-category-bottom-categories-single-category">
                  <p className="report-sort">
                    {formatDate(dailyreport.merchant_time)}
                  </p>
                  <p className="report-title">${dailyreport.amt}</p>
                </div>
              </div>
            ))}
            <div className="q-category-bottom-report-listing">
              <div className="q-category-bottom-categories-single-category">
                <p className="report-sort">Grand Total</p>
                <p className="report-title">${totalAmt.toFixed(2)}</p>
              </div>
            </div>
          </div> */}
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default DailyReportList;
