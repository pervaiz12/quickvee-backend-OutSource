import * as React from "react";
import { useEffect, useState } from "react";
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
import { priceFormate } from "../../../../hooks/priceFormate";

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

export default function DashboardTables(props) {
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState({
    soldQty: 0,
    costItem: 0.0,
    totalSelling: 0.0,
    sellingPrice: 0.0,
    profit: 0.0,
    profitPercentage: 0.0,
  });
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
      const { sold, costTotal, sellingTotal, profitTotal } =
        props.getItemRecord.reduce(
          (acc, item) => {
            const soldQty = item?.total_qty || 0;
            const costItem = (parseFloat(item?.cost_price) || 0) * soldQty;
            const sellingPrice = (parseFloat(item?.price) || 0) * soldQty;
            const profit = sellingPrice - costItem;

            return {
              sold: parseInt(acc.sold) + parseInt(soldQty),
              costTotal: acc.costTotal + costItem,
              sellingTotal: acc.sellingTotal + sellingPrice,
              profitTotal: acc.profitTotal + profit,
            };
          },
          { sold: 0, costTotal: 0, sellingTotal: 0, profitTotal: 0 }
        );
      // soldQty: 0,
      // costItem: 0.0,
      // totalSelling: 0.0,
      // sellingPrice: 0.0,
      // profit: 0.0,
      // profitPercentage: 0.0,

      const profitPercentage = (profitTotal / sellingTotal) * 100 || 0;
      setTotalCost({
        soldQty: sold,
        costItem: costTotal.toFixed(2),
        totalSelling: sellingTotal.toFixed(2),
        profit: profitTotal.toFixed(2),
        profitPercentage: profitPercentage.toFixed(2),
      });

      // console.log("Sold:", sold);
      // console.log("Cost Total:", costTotal.toFixed(2));
      // console.log("Selling Total:", sellingTotal.toFixed(2));
      // console.log("Total Profit:", profitTotal.toFixed(2));
      // console.log("Profit Percentage:", profitPercentage.toFixed(2));

      // Uncomment and use the following line if you need to set these values in a state
      // setTotals({ costTotal: costTotal.toFixed(2), sellingTotal: sellingTotal.toFixed(2), profitPercentage: profitPercentage.toFixed(2) });
    } else {
      console.log("No report data available");
    }
  };

  // const getDiscountRecord = () => {
  //   if (Array.isArray(props.getItemRecord) && props.getItemRecord.length > 0) {
  //     const { sold, costTotal, priceTotal, profit } =
  //       props.getItemRecord.reduce(
  //         (acc, item) => {
  //           const Sold = item?.total_qty;
  //           const costPrice =
  //             parseFloat(item?.cost_price * item?.total_qty) || 0;
  //           const price = parseFloat(item?.price) || 0;
  //           const itemProfit = price - costPrice;
  //           return {
  //             Sold: acc.sold + Sold,
  //             costTotal: acc.costTotal + costPrice,
  //             priceTotal: acc.priceTotal + price,
  //             profit: acc.profit + itemProfit,
  //           };
  //         },
  //         { costTotal: 0, priceTotal: 0, profit: 0 }
  //       );
  //     console.log("sold:", sold);
  //     console.log("Cost Total:", costTotal.toFixed(2));

  //     console.log("Price Total:", priceTotal.toFixed(2));
  //     console.log("profit Total:", profit.toFixed(2));
  //     // setTotals({
  //     //   costTotal: costTotal.toFixed(2),
  //     //   priceTotal: priceTotal.toFixed(2),
  //     // });
  //   } else {
  //     console.log("No report data available");
  //   }
  // };

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
                    {!!item?.category ? item?.category : "Deleted"}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item?.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.total_qty}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`$${priceFormate(parseFloat(item?.cost_price * item?.total_qty).toFixed(
                      2
                    ))}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`$${priceFormate(parseFloat(item?.price * item?.total_qty).toFixed(2))}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {(() => {
                      const cost_item = item?.cost_price * item?.total_qty;
                      const selling_price = item?.price * item?.total_qty;
                      if (selling_price === 0) {
                        return "0.00%";
                      }
                      const profit_per =
                        ((selling_price - cost_item) / selling_price) * 100;
                      return `${profit_per.toFixed(2)}%`;
                    })()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`$${priceFormate((
                      (item?.price - item?.cost_price) *
                      item?.total_qty
                    ).toFixed(2))}`}
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
                <StyledTableCell align="center">
                  {priceFormate(totalCost?.soldQty)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`$${priceFormate(totalCost?.costItem)}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`$${priceFormate(totalCost?.totalSelling)}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${totalCost?.profitPercentage}%`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`$${priceFormate(totalCost?.profit)}`}
                </StyledTableCell>
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
