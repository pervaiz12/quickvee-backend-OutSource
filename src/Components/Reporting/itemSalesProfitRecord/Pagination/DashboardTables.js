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
  useEffect(() => {
    if (props.getItemRecord) {
      getDiscountRecord();
    }
  }, [props.getItemRecord]);

  const getDiscountRecord = () => {
    if (Array.isArray(props.getItemRecord) && props.getItemRecord.length > 0) {
      const { costTotal, priceTotal, profit } = props.getItemRecord.reduce(
        (acc, item) => {
          const costPrice = parseFloat(item?.cost_price) || 0;
          const price = parseFloat(item?.price) || 0;
          const itemProfit = price - costPrice;
          return {
            costTotal: acc.costTotal + costPrice,
            priceTotal: acc.priceTotal + price,
            profit: acc.profit + itemProfit,
          };
        },
        { costTotal: 0, priceTotal: 0, profit: 0 }
      );

      console.log("Cost Total:", costTotal.toFixed(2));
      console.log("Price Total:", priceTotal.toFixed(2));
      console.log("profit Total:", profit.toFixed(2));
      // setTotals({
      //   costTotal: costTotal.toFixed(2),
      //   priceTotal: priceTotal.toFixed(2),
      // });
    } else {
      console.log("No report data available");
    }
  };

  return (
    <TableContainer component={Paper}>
      <TableContainer sx={{}} aria-label="customized table">
        <StyledTable>
          <TableHead>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">#Sold</StyledTableCell>
            <StyledTableCell align="center">Cost of Item</StyledTableCell>
            <StyledTableCell align="center">Selling Price</StyledTableCell>
            <StyledTableCell align="center">Profit Percent</StyledTableCell>
            <StyledTableCell align="center">Profit amount</StyledTableCell>
          </TableHead>
          <TableBody>
            {Array.isArray(props.getItemRecord) &&
            props.getItemRecord.length > 0 ? (
              props.getItemRecord.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {item?.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item?.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.total_qty}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`$${parseFloat(item?.cost_price * item?.total_qty).toFixed(
                      2
                    )}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`$${parseFloat(item?.price * item?.total_qty).toFixed(2)}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {(() => {
                      const price = parseFloat(item?.price) || 0;
                      const totalQty = parseFloat(item?.total_qty) || 0;
                      const costPrice = parseFloat(item?.cost_price) || 0;
                      const totalRevenue = price * totalQty;

                      if (totalRevenue === 0) {
                        return "0.00"; // Return "0.00" to avoid division by zero
                      }

                      const margin =
                        ((totalRevenue - costPrice) / totalRevenue) * 100;
                      return `${margin.toFixed(2)}%`; // Format to two decimal places
                    })()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`$${(
                      (item?.price - item?.cost_price) *
                      item?.total_qty
                    ).toFixed(2)}`}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableCell colSpan={7} align="center">
                {props.getMessageRecord || "No data available"}
              </StyledTableCell>
            )}
            {Array.isArray(props.getItemRecord) &&
            props.getItemRecord.length > 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={2} align="center">
                  Total
                </StyledTableCell>
                <StyledTableCell align="center">23</StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </TableContainer>
  );
}
