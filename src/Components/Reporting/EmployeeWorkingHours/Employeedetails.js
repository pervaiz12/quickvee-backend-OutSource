import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../Styles/EmployeeWorking.css";
import { fetchemployeewrkhrs } from "../../../Redux/features/Reports/EmployeeWorkinghrs/EmployeeWorkinghrsSlice";
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
import PasswordShow from "../../../Common/passwordShow";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import Skeleton from "react-loading-skeleton";

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
    fontFamily: "CircularSTDBook",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    
  },
  "& td, & th": {
    border: "none",
  },
}));
const Employeedetails = (props) => {
  
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [allEmpWorkingHrsData, setallEmpWorkingHrsData] = useState("");
  const AllEmpWorkingHrsDataState = useSelector(
    (state) => state.EmpWorkinghrsList
  );
  
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  let merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  useEffect(() => {
    getEmployeewrkhrs();
  }, [props]);
  const getEmployeewrkhrs = async () => {
    try {
      if (props && props.selectedDateRange) {
        let data = {
          merchant_id,
          start_date: props.selectedDateRange.start_date,
          end_date: props.selectedDateRange.end_date,
          employee_id: props.EmpId,
          ...userTypeData,
        };
        if (data) {
          await dispatch(fetchemployeewrkhrs(data)).unwrap();
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
      !AllEmpWorkingHrsDataState.loading &&
      AllEmpWorkingHrsDataState?.employeewrkhrstData
    ) {
      setallEmpWorkingHrsData(AllEmpWorkingHrsDataState.employeewrkhrstData);
    } else {
      setallEmpWorkingHrsData("");
    }
  }, [
    AllEmpWorkingHrsDataState,
    AllEmpWorkingHrsDataState.loading,
    AllEmpWorkingHrsDataState.ItemSalesData,
  ]);
  
  const convertSecondsToHours = (seconds) => {
    
    const hours = seconds / 3600;
    return hours;
  };

  const calTotalWork = (totalworkdata) => {
    if (!Array.isArray(totalworkdata)) {
      return 0;
    }
    return totalworkdata.reduce((total, workData) => {
      const parsedSeconds = parseFloat(workData.total_seconds_worked);
      const validSeconds = isNaN(parsedSeconds) ? 0 : parsedSeconds;
      const totalNew = total + convertSecondsToHours(validSeconds);

      return totalNew;
    }, 0);
  };

  const calTotalBreak = (totalbreakdata) => {
    if (!Array.isArray(totalbreakdata)) {
      return 0;
    }
    return totalbreakdata.reduce(
      (total, workData) =>
        total + convertSecondsToHours(parseFloat(workData.total_seconds_break)),
      0
    );
  };
  const calTotalActualWork = (totalactualworkdata) => {
    if (!Array.isArray(totalactualworkdata)) {
      return 0;
    }

    return totalactualworkdata.reduce((total, workData) => {
      const parsedSeconds = parseFloat(workData.effective_seconds_worked);
      const validSeconds = isNaN(parsedSeconds) ? 0 : parsedSeconds;
      return total + convertSecondsToHours(validSeconds);
    }, 0); // Initial value of the accumulator is 0
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
      <div className="box">
        {AllEmpWorkingHrsDataState.loading ? (
          <>
            <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                <div className="q-attributes-bottom-header">
                  <span>
                    <Skeleton />
                  </span>
                </div>
              </Grid>
              <SkeletonTable
                columns={[
                  "Date Worked",
                  "Clock In",
                  "Clock Out",
                  "Total Worked (Hr)",
                  "Total Break (Hr)",
                  "Actual Worked (Hr)",
                ]}
              />
            </Grid>
          </>
        ) : (
          <>
            {allEmpWorkingHrsData &&
              Object.keys(allEmpWorkingHrsData).map((employeeName, index) => (
                <>
                  <Grid container className="box_shadow_div">
                    <Grid item xs={12}>
                      <div className="q-attributes-bottom-header">
                        <span>{employeeName}</span>
                      </div>
                      <TableContainer>
                        <StyledTable
                          sx={{ minWidth: 500 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <StyledTableCell>Date Worked</StyledTableCell>
                            <StyledTableCell>Clock In</StyledTableCell>
                            <StyledTableCell>Clock Out</StyledTableCell>
                            <StyledTableCell>Total Worked (Hr)</StyledTableCell>
                            <StyledTableCell>Total Break (Hr)</StyledTableCell>
                            <StyledTableCell>
                              Actual Worked (Hr)
                            </StyledTableCell>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(
                              allEmpWorkingHrsData[employeeName]
                            ) && allEmpWorkingHrsData[employeeName].length &&
                              allEmpWorkingHrsData[employeeName].map(
                                (workData, dataIndex) => (
                                  <>
                                    <StyledTableRow>
                                      <StyledTableCell>
                                        <p>{formatDate(workData.work_date)}</p>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <p>{workData.first_check_in_time}</p>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <p>{workData.last_check_out_time}</p>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <p>
                                          {priceFormate(
                                            (
                                              parseFloat(
                                                convertSecondsToHours(
                                                  workData.total_seconds_worked
                                                )
                                              ) || 0
                                            ).toFixed(2)
                                          )}
                                        </p>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <p>
                                          {priceFormate(
                                            (
                                              parseFloat(
                                                convertSecondsToHours(
                                                  workData.total_seconds_break
                                                )
                                              ) || 0
                                            ).toFixed(2)
                                          )}
                                        </p>
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <p>
                                          {priceFormate(
                                            (
                                              parseFloat(
                                                convertSecondsToHours(
                                                  workData.effective_seconds_worked
                                                )
                                              ) || 0
                                            ).toFixed(2)
                                          )}
                                        </p>
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  </>
                                )
                              )}
                            {Array.isArray(
                              allEmpWorkingHrsData[employeeName]
                            ) && (
                              <StyledTableRow className="trBG_Color">
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>
                                  <p className=" totalReport">
                                    Total
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className=" totalReport">
                                    {priceFormate(
                                      calTotalWork(
                                        allEmpWorkingHrsData[employeeName]
                                      ).toFixed(2)
                                    )}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className=" totalReport">
                                    {priceFormate(
                                      parseFloat(
                                        calTotalBreak(
                                          allEmpWorkingHrsData[employeeName]
                                        )
                                      ).toFixed(2)
                                    )}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className=" totalReport">
                                    {priceFormate(
                                      parseFloat(
                                        calTotalActualWork(
                                          allEmpWorkingHrsData[employeeName]
                                        )
                                      ).toFixed(2)
                                    )}
                                  </p>
                                </StyledTableCell>
                              </StyledTableRow>
                            )}
                            {!Array.isArray(
                              allEmpWorkingHrsData[employeeName]
                            ) && (
                              <Grid container sx={{ padding: 2.5 }}>
                                <Grid item xs={12}>
                                  <p>No. Data found.</p>
                                </Grid>
                              </Grid>
                            )}
                          </TableBody>
                        </StyledTable>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default Employeedetails;
