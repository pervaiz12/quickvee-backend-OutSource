import React, { useEffect, useMemo, useState } from "react";
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
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../Assests/Category/SortingW.svg";

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

const tableRow = [
  { type: "str", name: "name", label: "Products" },
  { type: "num", name: "total_price", label: "Revenue" },
  { type: "num", name: "total_qty", label: "Items sold" },
  { type: "num", name: "discount_amt", label: "Discounted" },
];

export const ProductsSold = ({ itemSalesList }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const items =
      itemSalesList &&
      itemSalesList.ItemSalesData &&
      itemSalesList.ItemSalesData[0];

    setAllProducts(items || []);
  }, [itemSalesList]);

  const sortProductsByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      allProducts,
      type,
      name,
      sortOrder
    );
    setAllProducts(sortedItems);
    setSortOrder(newOrder);
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <div className="q-attributes-bottom-header bg-[#ffffff]">
            <span>Products sold</span>
          </div>
        </Grid>
        <TableContainer component={Paper} sx={{ borderRadius: "0px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableRow.map((item) => (
                  <StyledTableCell key={item.name}>
                    <button
                      className="flex items-center"
                      onClick={() =>
                        sortProductsByItemName(item.type, item.name)
                      }
                    >
                      <p>{item.label}</p>
                      <img src={sortIcon} alt="" className="pl-1" />
                    </button>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Skeleton Loading */}
              {itemSalesList.loading &&
                [1, 2, 3, 4, 5].map((row) => (
                  <StyledTableRow key={row}>
                    {tableRow.map((item) => (
                      <StyledTableCell key={item.name} sx={{ padding: "16px" }}>
                        <Skeleton />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}

              {/* Actual Table Body */}
              {!itemSalesList.loading &&
                allProducts &&
                allProducts?.length > 0 &&
                allProducts.map((item) => (
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
          {!itemSalesList.loading &&
            (!allProducts || allProducts?.length <= 0) && (
              <NoDataFound table={true} />
            )}
        </TableContainer>
      </Grid>
    </>
  );
};
