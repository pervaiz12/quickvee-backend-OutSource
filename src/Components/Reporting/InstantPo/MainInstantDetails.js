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
import { priceFormate } from "../../../hooks/priceFormate";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import PasswordShow from "../../../Common/passwordShow";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
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
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));

const MainInstantDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [instantactivity, setinstantactivity] = useState([]);
  const instantactivityDataState = useSelector(
    (state) => state.instantactivity
  );
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const getInstantActivityData = async () => {
    try {
      if (data?.merchant_id) {
        await dispatch(fetchinstantactivityData(data));
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
    getInstantActivityData();
  }, [dispatch, data]);

  useEffect(() => {
    if (
      !instantactivityDataState.loading &&
      Array.isArray(instantactivityDataState.instantactivityData)
    ) {
      const AfterAdjustQtyAddedList =
        instantactivityDataState.instantactivityData.map((item) => {
          const AfterAdjustQty =
            parseInt(item.current_qty, 10) + parseInt(item.qty, 10);

          const calculatedTotal =
            parseFloat(item.qty, 10) * parseFloat(item.price,10);

          return {
            ...item,
            afterAdjustQty: AfterAdjustQty,
            calculatedTotal: calculatedTotal.toFixed(2),
          };
        });
      console.log("AfterAdjustQtyAddedList", AfterAdjustQtyAddedList);
      setinstantactivity(AfterAdjustQtyAddedList);
    } else {
      setinstantactivity([]);
    }
  }, [instantactivityDataState, instantactivityDataState.instantactivityData]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    return `${formattedDate}`;
  };
  const [sortOrder, setSortOrder] = useState("asc");
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      instantactivity,
      type,
      name,
      sortOrder
    );
    console.log(sortedItems);
    setinstantactivity(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {instantactivityDataState.loading ||
          (instantactivityDataState.status && !instantactivity.length) ? (
            <>
              <SkeletonTable
                columns={[
                  "Instant PO Info",
                  "	Source",
                  "Before Adjust Qty",
                  "Adjust Qty",
                  "After Adjust Qty",
                  "Per Item Cost",
                  "Total Cost",
                ]}
              />
            </>
          ) : (
            <>
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("date", "created_at")}
                      >
                        <p>Instant PO Info</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>

                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("str", "emp_name")}
                      >
                        <p>Source</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>

                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("num", "current_qty")}
                      >
                        <p>Before Adjust Qty</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("num", "qty")}
                      >
                        <p>Adjust Qty</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("num", "qty")}
                      >
                        <p>After Adjust Qty</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("num", "price")}
                      >
                        <p>Per Item Cost</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName("num", "calculatedTotal")}
                      >
                        <p>Total Cost</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {instantactivity && instantactivity.length >= 1
                      ? instantactivity.map((instantactivity, index) => {
                          const AfterAdjustQty =
                            parseInt(instantactivity.current_qty, 10) +
                            parseInt(instantactivity.qty);
                          const calculatedTotal =
                            parseInt(instantactivity.qty) *
                            parseFloat(instantactivity.price);
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <div>
                                  <p>{instantactivity.title}</p>
                                  <p
                                    style={{
                                      color: "#0A64F9",
                                    }}
                                  >
                                    {instantactivity.variant}
                                  </p>
                                  <div className="flex ">
                                    <p
                                      style={{
                                        color: "#818181",
                                      }}
                                      className="me-3"
                                    >
                                      {formatDateTime(
                                        instantactivity.created_at
                                      )}
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
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </StyledTableCell>

                              <StyledTableCell>
                                <p>
                                  {instantactivity.emp_name === null ||
                                  instantactivity.emp_name === ""
                                    ? "Online"
                                    : instantactivity.emp_name}
                                </p>
                              </StyledTableCell>

                              <StyledTableCell>
                                <p>
                                  {priceFormate(instantactivity.current_qty)}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>{priceFormate(instantactivity.qty)}</p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>
                                  {priceFormate(
                                    isNaN(instantactivity.afterAdjustQty)
                                      ? 0
                                      : instantactivity.afterAdjustQty
                                  )}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>${priceFormate(instantactivity.price)}</p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>
                                  $
                                  {priceFormate(
                                    isNaN(instantactivity.calculatedTotal)
                                      ? 0
                                      : instantactivity.calculatedTotal
                                  )}
                                </p>
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })
                      : ""}
                  </TableBody>
                </StyledTable>
                {!instantactivity.length && <NoDataFound />}
              </TableContainer>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MainInstantDetails;
