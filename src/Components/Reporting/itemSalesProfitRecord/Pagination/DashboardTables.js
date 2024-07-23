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

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { priceFormate } from "../../../../hooks/priceFormate";
import { SkeletonTable } from "../../../../reuseableComponents/SkeletonTable";
import sortIcon from "../../../../Assests/Category/SortingW.svg";
import NoDataFound from "../../../../reuseableComponents/NoDataFound";
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
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
  "& td, & th": {
    border: "none",
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
              costTotal: parseFloat(acc.costTotal) + costItem,
              sellingTotal: parseFloat(acc.sellingTotal) + sellingPrice,
              profitTotal: acc.profitTotal + profit,
            };
          },
          { sold: 0, costTotal: 0, sellingTotal: 0, profitTotal: 0 }
        );

      const profitPercentage = (profitTotal / sellingTotal) * 100 || 0;
      setTotalCost({
        soldQty: sold,
        costItem: costTotal.toFixed(2),
        totalSelling: sellingTotal.toFixed(2),
        profit: profitTotal.toFixed(2),
        profitPercentage: profitPercentage.toFixed(2),
      });
    } else {
      console.log("No report data available");
    }
  };

  const tableRow = [
    { type: "str", name: "category", label: "Category" },
    { type: "str", name: "name", label: "Name" },
    { type: "num", name: "total_qty", label: "Sold" },
    { type: "num", name: "costOfItem", label: "Cost of Item" },
    { type: "num", name: "sellingPrice", label: "Selling Price" },
    { type: "num", name: "profitMargin", label: "Profit Margin" },
    { type: "num", name: "profitAmmount", label: "Profit amount" },
  ];
  const formatCurrency = (amount) => {
    const formattedAmount = Math.abs(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return amount < 0 ? `-${formattedAmount}` : formattedAmount;
  };
  return (
    <TableContainer component={Paper}>
      {props.loading ? (
        <SkeletonTable columns={tableRow.map((item) => item.label)} />
      ) : (
        <TableContainer sx={{}} aria-label="customized table">
          <StyledTable>
            <TableHead>
              {tableRow.map((item, index) => (
                <StyledTableCell key={index}>
                  <button
                    className="flex items-center"
                    onClick={() => props.sortByItemName(item.type, item.name)}
                  >
                    <p>{item.label}</p>
                    <img src={sortIcon} alt="" className="pl-1" />
                  </button>
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {Array.isArray(props.getItemRecord) &&
              props.getItemRecord.length > 0
                ? props.getItemRecord.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        {!!item?.category ? item?.category : "Deleted"}
                      </StyledTableCell>
                      <StyledTableCell>{item?.name}</StyledTableCell>
                      <StyledTableCell>{item?.total_qty}</StyledTableCell>
                      <StyledTableCell>
                        <p>{formatCurrency(item?.costOfItem)}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{formatCurrency(item?.sellingPrice)}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{`${item?.profitMargin} %`}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{formatCurrency(item?.profitAmmount)}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : ""}

              {Array.isArray(props.getItemRecord) &&
              props.getItemRecord.length > 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={2}>
                    <p style={{ color: "#0A64F9" }}>Total</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p style={{ color: "#0A64F9" }}>
                      {priceFormate(totalCost?.soldQty)}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p style={{ color: "#0A64F9" }}>{`$${priceFormate(
                      totalCost?.costItem
                    )}`}</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p style={{ color: "#0A64F9" }}>{`$${priceFormate(
                      totalCost?.totalSelling
                    )}`}</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p
                      style={{ color: "#0A64F9" }}
                    >{`${totalCost?.profitPercentage}%`}</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p style={{ color: "#0A64F9" }}>{`$${priceFormate(
                      totalCost?.profit
                    )}`}</p>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                ""
              )}
            </TableBody>
          </StyledTable>
          {!props.getItemRecord.length && <NoDataFound />}
        </TableContainer>
      )}
    </TableContainer>
  );
}
