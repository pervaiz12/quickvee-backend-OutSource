import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDate } from "../../Constants/utils";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

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
    border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const PrintPurchaseOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state.data) {
      ToastifyAlert("Sorry, couldn't find Purchase Order details!", "error");
      navigate(-1);
    }
    window.print();
    navigate(-1);
  }, [location]);

  const purchaseOrderDetails = useMemo(() => {
    return location?.state?.data;
  }, [location]);

  const total = (type) => {
    const sum =
      purchaseOrderDetails &&
      purchaseOrderDetails?.orderItems &&
      purchaseOrderDetails?.orderItems?.length > 0
        ? purchaseOrderDetails?.orderItems?.reduce(
            (acc, curr) => (acc += parseFloat(curr[type])),
            0
          )
        : 0;
    return type === "required_qty" ? sum : sum.toFixed(2);
  };

  return (
    <>
      <Grid container p={4}>
        <Grid container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Grid item>
              <p className="text-lg font-semibold">Vape Store</p>
            </Grid>
            <Grid item>
              <p className="text-lg font-semibold">Purchase Order</p>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Grid item>
              <p className="text-sm font-semibold">Ship / Bill to</p>
              <p className="text-sm font-light">Vape Store</p>
              <p className="text-sm font-light">
                {purchaseOrderDetails?.merchant?.a_address_line_1}
                {purchaseOrderDetails?.merchant?.a_address_line_2},{" "}
                {purchaseOrderDetails?.merchant?.a_city},{" "}
                {purchaseOrderDetails?.merchant?.a_state}{" "}
                {purchaseOrderDetails?.merchant?.a_zip}
              </p>
            </Grid>
            <Grid item>
              <p className="text-sm font-semibold">
                Order Number: {purchaseOrderDetails?.orderNumber}
              </p>
              <p className="text-sm font-semibold">
                Issue Date:{" "}
                {purchaseOrderDetails?.issueDate
                  ? formatDate(purchaseOrderDetails?.issueDate)
                  : ""}
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>UPC</StyledTableCell>
                <StyledTableCell>Qty</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Total (USD)</StyledTableCell>
              </TableHead>
              <TableBody>
                {purchaseOrderDetails?.orderItems &&
                purchaseOrderDetails?.orderItems?.length > 0
                  ? purchaseOrderDetails?.orderItems?.map((item) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell>{item?.item_fullname}</StyledTableCell>
                        <StyledTableCell>
                          {item.upc ? item.upc : "-"}
                        </StyledTableCell>
                        <StyledTableCell>{item?.required_qty}</StyledTableCell>
                        <StyledTableCell>
                          ${item?.cost_per_item}
                        </StyledTableCell>
                        <StyledTableCell>
                          ${item?.total_pricing}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : null}
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell colSpan={2}>Total Units</StyledTableCell>
                  <StyledTableCell>{total("required_qty")}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
                  <StyledTableCell>${total("total_pricing")}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell colSpan={2}>Total (USD)</StyledTableCell>
                  <StyledTableCell>${total("total_pricing")}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <p className="text-lg font-semibold">Supplier: </p>
            <p className="text-sm font-light">
              {purchaseOrderDetails?.vendorName}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PrintPurchaseOrder;
