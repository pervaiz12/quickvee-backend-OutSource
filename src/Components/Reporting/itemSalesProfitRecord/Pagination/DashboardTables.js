import * as React from "react";
import { useEffect } from "react";
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
import { Grid } from "@mui/material";

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

const isJsonObject = (data) => {
  return data && typeof data === "object" && !Array.isArray(data);
};
export default function DashboardTables(props) {
  const navigate = useNavigate();
  //   const [totalRecord, setTotalRecord] = React.useState("");
  // const handleSummeryPage = (order_id) => {
  //   navigate("/store-reporting/order-summary", {
  //     state: { merchantId: props.merchant_id, order_id: order_id },
  //   });
  // };
  //   useEffect(() => {
  //     console.log(props.EmployeeFilterData);
  //     if (props.EmployeeFilterData) {
  //       console.log("yes");
  //       getDiscountRecord();
  //     }
  //   }, [props.EmployeeFilterData]);

  //   const getDiscountRecord = () => {
  //     let grandTotal = 0; // Initialize grand total

  //     if (props.EmployeeFilterData?.report_data) {
  //       Object.entries(props.EmployeeFilterData.report_data).forEach(
  //         ([key, result]) => {
  //           if (Array.isArray(result)) {
  //             const total = result.reduce((acc, item) => {
  //               return acc + (parseFloat(item?.discount) || 0);
  //             }, 0);

  //             grandTotal += total; // Add total to grand total
  //             console.log(total);
  //           }
  //         }
  //       );
  //     } else {
  //       console.log("No report data available");
  //     }

  //     console.log("Grand Total:", grandTotal.toFixed(2));
  //     // Log the grand total
  //     setTotalRecord(grandTotal.toFixed(2));
  //     return grandTotal; // Return the overall grand total
  //   };

  return (
    <TableContainer component={Paper}>
      <TableContainer sx={{}} aria-label="customized table">
        <StyledTable>
          <TableHead>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">#Sold</StyledTableCell>
            <StyledTableCell align="center">Cost of Item</StyledTableCell>
            <StyledTableCell align="center">Selling Price</StyledTableCell>
            <StyledTableCell align="center">Profit Percent</StyledTableCell>
            <StyledTableCell align="center">Profit amount</StyledTableCell>
          </TableHead>
          <TableBody>
            {!props.getItemRecord ? (
              ""
            ) : (
              <StyledTableCell>{props.getMessageRecord}</StyledTableCell>
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </TableContainer>
  );
}
