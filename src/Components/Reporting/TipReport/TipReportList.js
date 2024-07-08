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
import sortIcon from "../../../Assests/Category/SortingW.svg"
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
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
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
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

  useEffect(() => {
    if (!tipReportDataState.loading && tipReportDataState.TipReportData) {
      setTipReportData(tipReportDataState.TipReportData);
    } else {
      setTipReportData([]);
    }
  }, [tipReportDataState.loading, tipReportDataState.TipReportData]);

  let totalNetTip = 0;

  tipReportData?.forEach((tipData) => {
    totalNetTip += parseFloat(tipData.net_tip);
  });
  const tableRow = [
    { type: "num", name: "employee_id", label: "Employee ID" },
    { type: "str", name: "f_name", label: "First Name" },
    { type: "str", name: "l_name", label: "Last Name" },
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
  }
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {tipReportDataState.loading ? (
            <SkeletonTable columns={tableRow.map((item) => item.label)} />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                
                <TableHead>
                  {tableRow.map((item)=><StyledTableCell>
                    <button
                    className="flex items-center"
                    onClick={()=>sortByItemName(item.type,item.name)}
                    >
                      <p>{item.label}</p>
                      <img src={sortIcon} alt="" className="pl-1" />
                    </button>
                  </StyledTableCell>)}
                </TableHead>
                <TableBody>
                  {tipReportData.length > 0 &&
                    tipReportData.map((tipData, index) => (
                      <>
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <p>{priceFormate(tipData.employee_id)}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>{tipData.f_name}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>{tipData.l_name}</p>
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
                    <StyledTableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>
                        <p style={{ color: "#0A64F9" }}>Grand Total</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p
                          className="report-title"
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
                </TableBody>
              </StyledTable>
            </TableContainer>
          )}
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-title">Employee ID</p>
          <p className="report-title">First Name</p>
          <p className="report-title">Last Name</p>
          <p className="report-title">Net Tip</p>
   
        </div>
        {tipReportData.length > 0 ? (
          tipReportData.map((tipData, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{tipData.employee_id}</p>
                <p className="report-title">{tipData.f_name}</p>
                <p className="report-title">{tipData.l_name}</p>
                <p className="report-title">
                  ${parseFloat(tipData.net_tip).toFixed(2)}
                </p>
           
              </div>
            </div>
          ))
        ) : (
          <div className="q-category-bottom-categories-listing">
            <div className="q-category-bottom-categories-single-category">
              <p className="report-title">No data found</p>
            </div>
          </div>
        )}
        <div className="q-category-bottom-categories-listing">
          <div className="q-category-bottom-categories-single-category">
            <p className="report-title"></p>
            <p className="report-title"></p>
  
            <p className="report-title">Grand Total:</p>
            <p className="report-title">${totalNetTip.toFixed(2)}</p>
          </div>
        </div>
        <br></br>
      </div> */}
    </>
  );
};

export default TipReportList;
