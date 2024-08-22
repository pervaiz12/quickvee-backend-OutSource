import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTipReportData } from "../../../Redux/features/Reports/TipReport/TipReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { priceFormate } from "../../../hooks/priceFormate";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
import useDelayedNodata from "../../../hooks/useDelayedNoData";
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

const TipReportList = (props) => {

  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [tipReportData, setTipReportData] = useState([]);
  const showNoData = useDelayedNodata(tipReportData)
  const [sortOrder, setSortOrder] = useState("asc");
  const tipReportDataState = useSelector((state) => state.TipReportList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      const startDateData = props.selectedDateRange.start_date;
      const endDateData = props.selectedDateRange.end_date;

      let data = {
        merchant_id,
        start_date: startDateData,
        end_date: endDateData,
        ...userTypeData,
      };

      if (data) {
        dispatch(fetchTipReportData(data));
      }
    }
  }, [props, dispatch]);

  // useEffect(() => {
  //   if (!tipReportDataState.loading && tipReportDataState.TipReportData) {
  //     setTipReportData(tipReportDataState.TipReportData);
  //   } else {
  //     setTipReportData([]);
  //   }
  // }, [tipReportDataState.loading, tipReportDataState.TipReportData]);
  // let totalNetTip = 0;
  // tipReportData?.forEach((tipData) => {
  //   totalNetTip += parseFloat(tipData.net_tip);
  // });
  useEffect(() => {
    if (!tipReportDataState.loading && Array.isArray(tipReportDataState.TipReportData)) {
      setTipReportData(tipReportDataState.TipReportData);
    } else {
      setTipReportData([]);
    }
  }, [tipReportDataState.loading, tipReportDataState.TipReportData]);

  let totalNetTip = 0;
  if (Array.isArray(tipReportData)) {
    totalNetTip = tipReportData.reduce((acc, tipData) => acc + parseFloat(tipData.net_tip), 0);
  }
  const tableRow = [
    // { type: "num", name: "employee_id", label: "Employee ID" },
    { type: "str", name: "f_name", label: "Employee Name" },
    // { type: "str", name: "l_name", label: "Last Name" },
    { type: "num", name: "net_tip", label: "Net Tip" },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      tipReportData,
      type,
      name,
      sortOrder
    );
    setTipReportData(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {tipReportDataState.loading  || tipReportDataState.status &&  !tipReportData.length ? (
            <SkeletonTable columns={tableRow.map((item) => item.label)} />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  {tableRow.map((item) => (
                    <StyledTableCell>
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
                {/* <TableBody>
                  {tipReportData.length > 0 &&
                    tipReportData.map((tipData, index) => (
                      <>
                        <StyledTableRow key={index}>
                           <StyledTableCell>
                            {tipData?.f_name || tipData?.l_name ? (
                              <p>{tipData?.f_name || ""} {tipData?.l_name || ""}</p>
                            ) :""}
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              $
                              {priceFormate(
                                parseFloat(tipData.net_tip).toFixed(2)
                              )}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  {tipReportData.length > 0 && (
                    <StyledTableRow className="trBG_Color">

                      <StyledTableCell>
                        <p style={{ color: "#0A64F9" }} className="totalReport">Grand Total</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p
                          className="report-title totalReport"
                          style={{ color: "#0A64F9" }}
                        >
                          ${priceFormate(totalNetTip.toFixed(2))}
                        </p>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {!tipReportData.length > 0 && (
                    <div className="box">
                      <div className="q-category-bottom-categories-single-category">
                        <p>No data found</p>
                      </div>
                    </div>
                  )}
                </TableBody> */}

                <TableBody>
                {Array.isArray(tipReportData) && tipReportData.length > 0 ? (
                  tipReportData.map((tipData, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <p>{`${tipData.f_name || ""} ${tipData.l_name || ""}`}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>${priceFormate(parseFloat(tipData.net_tip).toFixed(2))}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (""
                )}
                {Array.isArray(tipReportData) && tipReportData.length > 0 && (
                  <StyledTableRow className="trBG_Color">
                    <StyledTableCell>
                      <p style={{ color: "#0A64F9" }} className="totalReport">Grand Total</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="report-title totalReport" style={{ color: "#0A64F9" }}>
                        ${priceFormate(totalNetTip.toFixed(2))}
                      </p>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
              </StyledTable>
              {showNoData && !tipReportData.length && <NoDataFound />}
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TipReportList;
