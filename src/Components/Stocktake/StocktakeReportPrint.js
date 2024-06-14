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
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.table}`]: {
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

const StocktakeReportPrint = () => {
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

  const singleStocktakeState = useMemo(() => {
    // console.log("po data: ", location?.state?.data);
    return location?.state?.data;
  }, [location]);

  const tableRow = [
    "Item Name",
    "Current Qty",
    "New Qty",
    "Discrepency",
    "Discrepency Cost",
    "UPC",
  ];
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
              <p className="text-lg font-semibold">Stocktake</p>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            p={1}
          >
            
            <Grid item>
              <p className="text-sm font-semibold">
                Stocktake Number: {singleStocktakeState.id}
              </p>
             
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ py: 2.5 }}>
            <Grid item xs={12}>
              <TableContainer>
                <StyledTable aria-label="customized table">
                  <TableHead>
                    {tableRow.map((title) => (
                      <StyledTableCell>{title}</StyledTableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {singleStocktakeState?.stocktake_item.map((item, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{item.product_name}</StyledTableCell>
                        <StyledTableCell>{item.current_qty}</StyledTableCell>
                        <StyledTableCell>{item.new_qty}</StyledTableCell>
                        <StyledTableCell>{item.discrepancy}</StyledTableCell>
                        <StyledTableCell>
                          {item.discrepancy_cost}
                        </StyledTableCell>
                        <StyledTableCell>{item.upc}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                    <StyledTableRow>
                      <StyledTableCell>
                        <p className="text-[#0A64F9]">Total Discrepency</p>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[#0A64F9]">
                          {singleStocktakeState.total_discrepancy}
                        </p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[#0A64F9]">
                          {singleStocktakeState.total_discrepancy_cost}
                        </p>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </Grid>
        <Grid container>
          <Grid item xs={6}>
            <p className="text-lg font-semibold">Supplier: </p>
            <p className="text-sm font-light">
              {/* {purchaseOrderDetails?.vendorName} */}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StocktakeReportPrint;
