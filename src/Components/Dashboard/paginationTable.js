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
import { priceFormate } from "../../hooks/priceFormate";
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

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  return `${formattedDate} ${formattedTime}`;
};

export default function DashboardTables(props) {
  const navigate = useNavigate();
  // const handleSummeryPage = (order_id) => {
  //   navigate("/store-reporting/order-summary", {
  //     state: { merchantId: props.merchant_id, order_id: order_id },
  //   });
  // };

  const getCustomerName = (deliverName, billingName) => {
    if (deliverName && deliverName !== '') {
      return deliverName;
    } else if (billingName && billingName !== '') {
      return billingName;
    } else {
      return 'N/A';
    }
  };
  
  const getStatus = (orderMethod, mStatus) => {
    if (orderMethod === "pickup") {
      switch (mStatus) {
        case "1":
          return "Accepted";
        case "2":
          return "Packing";
        case "3":
          return "Ready";
        case "4":
          return "Completed";
        case "5":
          return "Cancel";
        case "7":
          return "Refunded";
        default:
          return "Accepted";
      }
    } else {
      switch (mStatus) {
        case "1":
          return "Accepted";
        case "2":
          return "Packing";
        case "3":
          return "Out for Delivery";
        case "4":
          return "Delivered";
        case "5":
          return "Cancel";
        case "6":
          return "Ready";
        case "7":
          return "Refunded";
        default:
          return "Accepted";
      }
    }
  };

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
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Order Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dashboardRecord && Array.isArray(props.dashboardRecord)
            ? props.dashboardRecord.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{getCustomerName(row.deliver_name, row.billing_name)}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.delivery_phn}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDateTime(row.date_time)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.order_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.order_method}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {getStatus(row.order_method, row.m_status)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{`$${priceFormate(row.amt)}`}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      to={`/order/store-reporting/order-summary/${props.merchant_id}/${row.order_id}`}
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
