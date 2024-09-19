import React, { useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NoDataFound from "../../reuseableComponents/NoDataFound";
import { Grid } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { priceFormate } from "../../hooks/priceFormate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // paddingTop: "12px",
    // paddingLeft: "12px",
    // paddingRight: "1px",
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
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const columns = ["Products", "Revenue", "Items sold", "Discounted"];

export const TopProducts = ({ itemSalesList }) => {
  console.log("here itemSalesList: ", itemSalesList);
  const itemsList = useMemo(() => {
    if (itemSalesList.ItemSalesData && itemSalesList.ItemSalesData[0]) {
      const items = itemSalesList.ItemSalesData[0];
      //   console.log("items: ", items);
      const temp = items.toSorted(
        (a, b) => parseFloat(b.total_price) - parseFloat(a.total_price)
      );

      return temp.slice(0, 5) || [];
    }
  }, [itemSalesList]);
  console.log("itemsList: ", itemsList);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <div className="q-attributes-bottom-header bg-[#ffffff]">
            <span>Top Products</span>
          </div>
        </Grid>
        <TableContainer component={Paper} sx={{ borderRadius: "0px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <StyledTableCell className="whitespace-nowrap" key={col}>
                    {col}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Skeleton Loading */}
              {itemSalesList.loading &&
                [1, 2, 3, 4, 5].map((row) => (
                  <StyledTableRow key={row}>
                    {columns.map((col) => (
                      <StyledTableCell key={col} sx={{ padding: "16px" }}>
                        <Skeleton />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}

              {/* Actual Table Body */}
              {!itemSalesList.loading &&
                itemsList &&
                itemsList?.length > 0 &&
                itemsList.map((item) => (
                  <StyledTableRow key={item}>
                    <StyledTableCell sx={{ padding: "16px" }}>
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "16px" }}>
                      ${priceFormate(item.total_price)}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "16px" }}>
                      {item.total_qty}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "16px" }}>
                      ${priceFormate(item.discount_amt)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          {/* No Data found */}
          {!itemSalesList.loading && (!itemsList || itemsList?.length <= 0) && (
            <NoDataFound table={true} />
          )}
        </TableContainer>
      </Grid>
    </>
  );
};
