import {
    Grid,
    styled,
    Table,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
  import sortIcon from "../../../Assests/Category/SortingW.svg";
  import { useSelector } from "react-redux";
  import { priceFormate } from "../../../hooks/priceFormate";
  import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
  import NoDataFound from "../../../reuseableComponents/NoDataFound";
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
  
  export default function DetailedLoyaltyReportTable({
    totalValueIssued,
    totalValueRedeemed,
    outStandingsBalance,
    setTotalValueIssued,
    setTotalValueRedeemed,
    setOutStandingsBalance,
  }) {
    const DetailedLoyaltyPointsReduxState = useSelector(
      (state) => state.DetailedLoyaltyPointsReport
    );
    const [dataArr, setDataArr] = useState([]);
  
    const [sortOrder, setSortOrder] = useState("asc");
    useEffect(() => {
      if (
        !DetailedLoyaltyPointsReduxState.loading &&
        DetailedLoyaltyPointsReduxState.DetailedLoyaltyPointsReportArr
      ) {
        setTotalValueIssued(
          DetailedLoyaltyPointsReduxState.DetailedLoyaltyPointsReportArr.reduce(
            (acc, curr) => acc + parseFloat(curr.total_credit_points),
            0
          )
        );
        setTotalValueRedeemed(
          DetailedLoyaltyPointsReduxState.DetailedLoyaltyPointsReportArr.reduce(
            (acc, curr) => acc + parseFloat(curr.total_debit_points),
            0
          )
        );
        setOutStandingsBalance(
          DetailedLoyaltyPointsReduxState.DetailedLoyaltyPointsReportArr.reduce(
            (acc, curr) => acc + parseFloat(curr.available_lp),
            0
          )
        );
        setDataArr(
          DetailedLoyaltyPointsReduxState.DetailedLoyaltyPointsReportArr
        );
      }
    }, [
      DetailedLoyaltyPointsReduxState,
      DetailedLoyaltyPointsReduxState.DetailedLoyaltyPointsReportArr,
    ]);
    // console.log(dataArr);
    const tableRow = [
      { type: "str", name: "customer_name", label: "Customer Name" },
      { type: "num", name: "total_credit_amount", label: "Total Issued" },
      { type: "num", name: "total_debit_amount", label: "Total Redeemed" },
      { type: "num", name: "available_balance", label: "Balance" },
    ];
    const sortByItemName = (type, name) => {
      const { sortedItems, newOrder } = SortTableItemsHelperFun(
        dataArr,
        type,
        name,
        sortOrder
      );
      setDataArr(sortedItems);
      setSortOrder(newOrder);
    };
    return (
      <>
        <Grid container className="box_shadow_div">
          {/* {StoreCreditReportReduxState.loading ||
            (StoreCreditReportReduxState.status && !dataArr.length) ?
            
            (
              <SkeletonTable columns={tableRow.map((item) => item.label)} />
            ) : ( */}
          <Grid container>
            <Grid item xs={12}>
              <TableContainer>
                <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                  <TableHead>
                    {tableRow.map((item, index) => (
                      <StyledTableCell key={index}>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName(item.type, item.name)}
                        >
                          <p>{item.label}</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {dataArr.length > 0 &&
                      dataArr?.map((item, index) => (
                        <>
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p>{item.customer_name}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{priceFormate(item.total_credit_points)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{priceFormate(item.total_debit_points)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{priceFormate(item.available_lp)}</p>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                    {dataArr.length > 0 && (
                      <StyledTableRow>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-sort totalReport">Total</p>
                        </StyledTableCell>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-title totalReport">
                            {priceFormate(totalValueIssued?.toFixed(2))}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-title totalReport">
                            {priceFormate(totalValueRedeemed?.toFixed(2))}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell className="trBG_Color">
                          <p className="report-title totalReport">
                            {priceFormate(outStandingsBalance?.toFixed(2))}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </StyledTable>
                {!dataArr.length && <NoDataFound />}
              </TableContainer>
            </Grid>
          </Grid>
          {/* )} */}
        </Grid>
      </>
    );
  }
  