import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DashboardTables(props) {
  const navigate = useNavigate();
  // const handleSummeryPage = (order_id) => {
  //   navigate("/store-reporting/order-summary", {
  //     state: { merchantId: props.merchant_id, order_id: order_id },
  //   });
  // };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer No.</StyledTableCell>
            <StyledTableCell align="center">Order Date & Time</StyledTableCell>
            <StyledTableCell align="center">Order Id</StyledTableCell>
            <StyledTableCell align="center">Order Type</StyledTableCell>
            {/* <StyledTableCell align="center">Status</StyledTableCell> */}
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Order Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dashboardRecord && Array.isArray(props.dashboardRecord)
            ? props.dashboardRecord.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.customer_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.date_time}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.order_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.order_method}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    {row.cvvResult}
                  </StyledTableCell> */}
                  <StyledTableCell align="center">{row.amt}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      to={`/store-reporting/order-summary/${props.merchant_id}/${row.order_id}`}
                      // onClick={() => handleSummeryPage(row.order_id)}
                      target="_blank"
                    >
                      Order Summery
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
