import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchshiftsummaryData } from "../../../Redux/features/Reports/ShiftSummary/ShiftSummarySlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { priceFormate } from "../../../hooks/priceFormate";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StickyTableCell = styled(StyledTableCell)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SiftSummaryDetails = (props) => {
  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [allshiftsummary, setAllShiftSummary] = useState([]);
  const allshiftsummaryDataState = useSelector(
    (state) => state.ShiftSummarylist
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id,
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        shift_assign: props.SelectEmpListData,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchshiftsummaryData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (
      !allshiftsummaryDataState?.loading &&
      allshiftsummaryDataState?.shiftsummaryData
    ) {
      setAllShiftSummary(allshiftsummaryDataState.shiftsummaryData);
    }
  }, [allshiftsummaryDataState]);
  console.log(allshiftsummary);

  return (
    <>
      <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-sort">Cashier/Station Name</p>
          <p className="report-sort">Open Time</p>
          <p className="report-sort">Close Time</p>
          <p className="report-sort">Open Drawer ($)</p>
          <p className="report-sort">Total Sale ($)</p>
          <p className="report-sort">Total Refund ($)</p>
          <p className="report-sort">Total Tip ($)</p>
          <p className="report-sort">Total Vendor Payout ($)</p>
          <p className="report-sort">Cash Drop ($)</p>
          <p className="report-sort">Total Cash Sale ($)</p>
          <p className="report-sort">Total Debit+Credit Sale ($)</p>
          <p className="report-sort">Expected Cash ($)</p>
          <p className="report-sort">Drawer Over/Short ($)</p>
          <p className="report-sort">Actual Cash Deposited ($)</p>
        </div>
        <div>
          {Object.keys(allshiftsummary).map((date) => (
            <div key={date}>
              
              {allshiftsummary[date] &&
                allshiftsummary[date].length >= 1 &&
                allshiftsummary[date].map((shift, index) => (
                  <div
                    key={index}
                    className="q-category-bottom-categories-listing"
                  >
                    {shift.map((shiftDetail, shiftIndex) => (
                      <div
                        key={shiftIndex}
                        className="q-category-bottom-categories-single-category"
                      >
                        <p className="report-sort">{shiftDetail.device_name}</p>
                        <p className="report-sort">{shiftDetail.in_time}</p>
                        <p className="report-sort">{shiftDetail.out_time}</p>
                        <p className="report-sort">{priceFormate(shiftDetail.drawer_cash)}</p>
                        <p className="report-sort">
                          {priceFormate(shiftDetail.expected_amt)}
                        </p>
                        <p className="report-sort">{priceFormate(shiftDetail.actual_amt)}</p>
                        <p className="report-sort">{priceFormate(shiftDetail.drop_cash)}</p>

                        <p className="report-sort">{priceFormate(shiftDetail.shift_type)}</p>

                        <p className="report-sort">
                          {priceFormate(shiftDetail.total_refund)}
                        </p>

                        <p className="report-sort">
                          {priceFormate(shiftDetail.total_vendor_payout)}
                        </p>
                        <p className="report-sort">{priceFormate(shiftDetail.total_sale)}</p>
                        <p className="report-sort">{priceFormate(shiftDetail.refunds)}</p>
                        <p className="report-sort">{priceFormate(shiftDetail.tip)}</p>
                        <p className="report-sort">
                          {priceFormate(shiftDetail.card_collected_wr)}
                        </p>
                        <p className="report-sort">
                          {priceFormate(shiftDetail.cash_collected_wr)}
                        </p>
                        <p className="report-sort">{priceFormate(shiftDetail.cash_drop)}</p>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

       <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <div style={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="shift summary table">
          <TableHead>
            <TableRow>
              <StickyTableCell className="whitespace-nowrap">Cashier/Station Name</StickyTableCell>
              <StyledTableCell className="whitespace-nowrap">Open Time</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Close Time</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Open Drawer ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Total Sale ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Total Refund ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Total Tip ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Total Vendor Payout ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Cash Drop ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Total Cash Sale ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Total Debit+Credit Sale ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Expected Cash ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Drawer Over/Short ($)</StyledTableCell>
              <StyledTableCell className="whitespace-nowrap">Actual Cash Deposited ($)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(allshiftsummary).map((date) =>
              allshiftsummary[date] &&
              allshiftsummary[date].length >= 1 &&
              allshiftsummary[date].map((shift, index) => (
                <React.Fragment key={index}>
                  {shift.map((shiftDetail, shiftIndex) => (
                    <StyledTableRow key={shiftIndex}>
                      <StickyTableCell>{shiftDetail.device_name}</StickyTableCell> 
                      <StyledTableCell>{shiftDetail.in_time}</StyledTableCell>
                      <StyledTableCell>{shiftDetail.out_time}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.drawer_cash)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.expected_amt)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.actual_amt)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.drop_cash)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.shift_type)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.total_refund)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.total_vendor_payout)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.total_sale)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.refunds)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.tip)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.card_collected_wr)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.cash_collected_wr)}</StyledTableCell>
                      <StyledTableCell>{priceFormate(shiftDetail.cash_drop)}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
    </>
  );
};

export default SiftSummaryDetails;
