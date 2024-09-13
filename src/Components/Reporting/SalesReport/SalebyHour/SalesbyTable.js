import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSalesByHours } from "../../../../Redux/features/Reports/SalesByHours/SalesByHoursSlice";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import { priceFormate } from "../../../../hooks/priceFormate";

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
    backgroundColor: "#253338",
    fontWeight: 'bold',
    color:"#FFFFFF"
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
  // borderRight: "1px solid #444E51 !important;"
}));

const StickyTableCellR = styled(StyledTableCell)(({ theme }) => ({
    position: 'sticky',
    right: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    // borderLeft: "1px solid #444E51 !important;"
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SalesbyTable = (props) => {
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
        dispatch(fetchSalesByHours(data));
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
          
        <div>
        </div>
      </div>

       <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <Table sx={{ minWidth: 500 }} aria-label="shift summary table">
          <TableHead >
            <TableRow >
                <StickyTableCell className="whitespace-nowrap salebyhourHeading BORHeaderRight" >Hours</StickyTableCell>
                    <StyledTableCell  className="whitespace-nowrap  ">12AM - 1AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">1AM - 2AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">2AM - 3AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">3AM - 4AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">4AM - 5AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">4AM - 5AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">5AM - 6AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">6AM - 7AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">7AM - 8AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">8AM - 9AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">9AM - 10AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">10AM - 11AM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">11AM - 12PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">12PM - 1PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">1PM - 2PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">2PM - 3PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">3PM - 4PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">4PM - 5PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">5PM - 6PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">6PM - 7PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">7PM - 8PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">8PM - 9PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">9PM - 10PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">10PM - 11PM</StyledTableCell>
                    <StyledTableCell className="whitespace-nowrap">11PM - 12AM</StyledTableCell>
                    <StickyTableCellR className="whitespace-nowrap BORHeaderLeft">Total</StickyTableCellR>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow>
                    <StickyTableCell className="whitespace-nowrap BORBodyRight">Sales Count</StickyTableCell>
                    {Array(25).fill(100).map((value, index) => (
                            <StyledTableCell key={index} className="whitespace-nowrap">
                                {value}
                            </StyledTableCell>
                        ))}
                    <StickyTableCellR className="whitespace-nowrap BORBodyLeft">4</StickyTableCellR>
                </TableRow>
                <TableRow>
                    <StickyTableCell className="whitespace-nowrap BORBodyRight">Net Sales </StickyTableCell>
                    {Array(25).fill(100).map((value, index) => (
                            <StyledTableCell key={index} className="whitespace-nowrap">
                                {value}
                            </StyledTableCell>
                        ))}
                    <StickyTableCellR className="whitespace-nowrap BORBodyLeft">$1945.40</StickyTableCellR>
                </TableRow>
                <TableRow>
                    <StickyTableCell className="whitespace-nowrap BORBodyRight">Cost of good sold</StickyTableCell>
                    {Array(25).fill(100).map((value, index) => (
                            <StyledTableCell key={index} className="whitespace-nowrap">
                                {100}
                            </StyledTableCell>
                        ))}
                    <StickyTableCellR className="whitespace-nowrap BORBodyLeft">$940.40</StickyTableCellR>
                </TableRow>
                <TableRow>
                    <StickyTableCell className="whitespace-nowrap BORBodyRight">Gross profit</StickyTableCell>
                    {Array(25).fill(100).map((value, index) => (
                            <StyledTableCell key={index} className="whitespace-nowrap">
                                {value}
                            </StyledTableCell>
                        ))}
                    <StickyTableCellR className="whitespace-nowrap BORBodyLeft">$1014.40</StickyTableCellR>
                </TableRow>
                <TableRow>
                    <StickyTableCell className="whitespace-nowrap BORBodyRight">Margin (%)</StickyTableCell>
                    {Array(25).fill(100).map((value, index) => (
                            <StyledTableCell key={index} className="whitespace-nowrap">
                                {value}
                            </StyledTableCell>
                        ))}
                    <StickyTableCellR className="whitespace-nowrap BORBodyLeft">50%</StickyTableCellR>
                </TableRow>
                <TableRow>
                    <StickyTableCell className="whitespace-nowrap BORBodyRight">Tax</StickyTableCell>
                    {Array(25).fill(100).map((value, index) => (
                            <StyledTableCell key={index} className="whitespace-nowrap">
                                {value}
                            </StyledTableCell>
                        ))}

                    <StickyTableCellR className="whitespace-nowrap BORBodyLeft">$0.00</StickyTableCellR>
                </TableRow>
          </TableBody>
        </Table>
      </div>
    </TableContainer>
    </>
  );
};

export default SalesbyTable;