import React, { useState } from "react";
import { Grid } from "@mui/material";
import { SkeletonTable } from "../../../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../../../reuseableComponents/NoDataFound";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SortIconW from "../../../../Assests/Category/SortingW.svg";
import { Link, useNavigate } from "react-router-dom";
import { priceFormate } from "../../../../hooks/priceFormate";
import { SortTableItemsHelperFun } from "../../../../helperFunctions/SortTableItemsHelperFun";

import Skeleton from "react-loading-skeleton";

function LotteryPayoutTable(props) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
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
  const sortByItemName = (type, name) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const updatedCategorySale = props.getAllLatteryData?.map(
      (employeeData, index) => {
        const sortedLotteryData = SortTableItemsHelperFun(
          employeeData.lottery_data,
          type,
          name,
          sortOrder
        );
        return {
          ...employeeData,
          lottery_data: sortedLotteryData.sortedItems,
        };
      }
    );

    props.setAllLatteryData(updatedCategorySale);
    setSortOrder(newOrder);
  };

  return (
    <>
      {props?.apiLoader ? (
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">
                <Skeleton />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {/* <SkeletonTable columns={["Order ID", "Date", "Total"]} /> */}
            <SkeletonTable columns={["Order ID", "Payout Amt", "Change Deu"]} />
          </Grid>
        </Grid>
      ) : Array.isArray(props.getAllLatteryData) &&
        props.getAllLatteryData.length > 0 ? (
        props.getAllLatteryData.map((res, index) => {
          return (
            <Grid container className="box_shadow_div" key={index}>
              <Grid item xs={12}>
                <div className="q-category-bottom-header">
                  <div className="q_details_header ml-2">
                    {res?.f_name
                      ? `Employee Name: ${res.f_name} ${res.l_name}`
                      : ""}
                  </div>
                </div>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              sortByItemName("id", "order_id", index)
                            }
                          >
                            <p>Order ID</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              sortByItemName("num", "payout_amt", index)
                            }
                          >
                            <p>Payout Amt</p>
                            <img src={SortIconW} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <button
                            className=""
                            onClick={() =>
                              sortByItemName("num", "change_deu", index)
                            }
                          >
                            <div className="flex items-center">
                              <p>Change Deu</p>
                              <img src={SortIconW} alt="" className="pl-1" />
                            </div>
                          </button>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {
                        Array.isArray(
                          props.getAllLatteryData[index]?.lottery_data
                        ) &&
                        props.getAllLatteryData[index]?.lottery_data.length > 0
                          ? props.getAllLatteryData[index]?.lottery_data?.map(
                              (res, index) => {
                                console.log("res", res);
                                return (
                                  <>
                                    <StyledTableRow key={index}>
                                      <StyledTableCell sx={{ width: "33%" }}>
                                        <a
                                          className="cursor-pointer text-[#0A64F9]"
                                          href={`/order/store-reporting/order-summary/${props.merchant_id}/${res?.order_id}`}
                                          target="_blank" // Opens in a new tab
                                          rel="noopener noreferrer" // Security measure for new tabs
                                        >
                                          {!!res?.order_id ? res?.order_id : ""}
                                        </a>
                                        {/* </Link> */}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        sx={{
                                          borderRight: "1px solid #E3E3E3",
                                          width: "33%",
                                        }}
                                      >
                                        {!!res?.payout_amt
                                          ? `$${priceFormate(res?.payout_amt)}`
                                          : "0.0"}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        align="center"
                                        sx={{
                                          borderRight: "1px solid #E3E3E3",
                                          width: "33%",
                                        }}
                                      >
                                        {!!res?.change_deu
                                          ? `$${priceFormate(res?.change_deu)}`
                                          : "0.0"}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  </>
                                );
                              }
                            )
                          : ""
                        // <Grid sx={{ pt: 2.5 }}>
                        //   <NoDataFound />
                        // </Grid>
                      }
                      <StyledTableRow className="trBG_Color">
                        <StyledTableCell>
                          <div className=" totalReport">
                            <div>Total </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="">
                          <div className="totalReport">
                            <div>
                              {`$${priceFormate(
                                props.getAllLatteryData[index]?.lottery_data
                                  .reduce((total, SalesData) => {
                                    return (
                                      total +
                                      (parseFloat(SalesData?.payout_amt) || 0)
                                    );
                                  }, 0)
                                  .toFixed(2)
                              )}`}
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div className="totalReport">
                            <div>
                              {`$${priceFormate(
                                props.getAllLatteryData[index]?.lottery_data
                                  .reduce((total, SalesData) => {
                                    return (
                                      total +
                                      (parseFloat(SalesData?.change_deu) || 0)
                                    );
                                  }, 0)
                                  .toFixed(2)
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
          );
        })
      ) : (
        <Grid sx={{ pt: 2.5 }}>
          <NoDataFound />
        </Grid>
      )}
    </>
  );
}

export default LotteryPayoutTable;
