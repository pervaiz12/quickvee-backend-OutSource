import React, { useEffect, useState } from "react";
import "../../../Styles/EmployeeWorking.css";
import { fetchinstantactivityData } from "../../../Redux/features/InstantActivity/instantactivitySlice";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
    fontFamily: "CircularSTDMedium",
    // color: "#818181",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
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

const MainInstantDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [instantactivity, setinstantactivity] = useState([]);
  const instantactivityDataState = useSelector(
    (state) => state.instantactivity
  );

  useEffect(() => {
    dispatch(fetchinstantactivityData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (
      !instantactivityDataState.loading &&
      instantactivityDataState.instantactivityData
    ) {
      setinstantactivity(instantactivityDataState.instantactivityData);
    }
  }, [
    instantactivityDataState,
    instantactivityDataState.loading,
    instantactivityDataState.instantactivityData,
  ]);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Date</StyledTableCell>
                {/* <StyledTableCell>Time</StyledTableCell> */}
                <StyledTableCell>Source</StyledTableCell>
                {/* <StyledTableCell>Product Name</StyledTableCell> */}
                {/* <StyledTableCell>Variants Name</StyledTableCell> */}
                <StyledTableCell>Before Adjust Qty</StyledTableCell>
                <StyledTableCell>Adjust Qty</StyledTableCell>
                <StyledTableCell>After Adjust Qty</StyledTableCell>
                <StyledTableCell>Per Item Cost</StyledTableCell>
                <StyledTableCell>Total Cost</StyledTableCell>
              </TableHead>
              <TableBody>
                {instantactivity && instantactivity.length >= 1 ? (
                  instantactivity.map((instantactivity, index) => {
                    const AfterAdjustQty =
                      parseInt(instantactivity.current_qty, 10) +
                      parseInt(instantactivity.qty, 10);
                    const calculatedTotal =
                      parseInt(instantactivity.qty, 10) *
                      parseFloat(instantactivity.price);
                    return (
                      <StyledTableRow>
                        <StyledTableCell>
                          <div>
                            <p>{instantactivity.title}</p>
                            <p
                              style={{
                                color:"#0A64F9"
                              }}
                            >{instantactivity.variant}</p>
                            <div className="flex ">
                              <p
                                style={{
                                  color: "#818181",
                                }}
                                className="me-3"
                              >
                                {new Date(instantactivity.created_at)
                                  .toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })
                                  .split("/")
                                  .join("-")}
                              </p>
                              <p
                                style={{
                                  color: "#818181",
                                }}
                              >
                                {new Date(
                                  instantactivity.created_at
                                ).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                })}
                              </p>
                            </div>
                          </div>
                        </StyledTableCell>
                        {/* <StyledTableCell>
                          <p>
                            {new Date(
                              instantactivity.created_at
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </StyledTableCell> */}
                        <StyledTableCell>
                          <p>
                            {instantactivity.emp_name === null ||
                            instantactivity.emp_name === ""
                              ? "Online"
                              : instantactivity.emp_name}
                          </p>
                        </StyledTableCell>
                        {/* <StyledTableCell>
                         <p>{instantactivity.title}</p>
                        </StyledTableCell> */}
                        {/* <StyledTableCell>
                          <p>{instantactivity.variant}</p>
                        </StyledTableCell> */}
                        <StyledTableCell>
                          <p>{instantactivity.current_qty}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{instantactivity.qty}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{AfterAdjustQty}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{instantactivity.price}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>
                            {calculatedTotal % 1 !== 0
                              ? calculatedTotal.toFixed(2)
                              : calculatedTotal}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <>
                    <Grid container sx={{ padding: 2.5 }}>
                      <Grid item xs={12}>
                        <p style={{ whiteSpace: "nowrap" }}>No. Data found.</p>
                      </Grid>
                    </Grid>
                  </>
                )}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default MainInstantDetails;
