import React, { useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../../reuseableComponents/NoDataFound";
import { Grid } from "@mui/material";

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
    // border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const columns = [
  "User",
  "Revenue",
  "Sales count",
  "Items sold",
  "Avg. sales value",
  "Avg. items per sale",
];

export const TopEmployees = ({ salesByPersonList }) => {
  //   const data = useMemo(() => {}, [salesByPersonList]);

  //   useEffect(() => {
  //     console.log("salesByPersonList: ", salesByPersonList);
  //   }, [salesByPersonList]);
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <div className="q-attributes-bottom-header bg-[#ffffff]">
            <span>Top sales people</span>
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
              {salesByPersonList.loading &&
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
              {/* {!salesByPersonList.loading && salesByPersonList.SalePersonData.length > 0 &&
                salesByPersonList.SalePersonData.map((person) => (
                  <StyledTableRow key={person}>
                      <StyledTableCell sx={{ padding: "16px" }}>
                        {person.}
                      </StyledTableCell>
                      <StyledTableCell sx={{ padding: "16px" }}>
                        {person.}
                      </StyledTableCell>
                      <StyledTableCell sx={{ padding: "16px" }}>
                        {person.}
                      </StyledTableCell>
                      <StyledTableCell sx={{ padding: "16px" }}>
                        {person.}
                      </StyledTableCell>
                      <StyledTableCell sx={{ padding: "16px" }}>
                        {person.}
                      </StyledTableCell>
                      <StyledTableCell sx={{ padding: "16px" }}>
                        {person.}
                      </StyledTableCell>
                    
                  </StyledTableRow>
                ))} */}
            </TableBody>
          </Table>

          {/* No Data found */}
          {/* &&
            salesByPersonList?.SalePersonData?.length <= 0 */}
          {!salesByPersonList.loading && <NoDataFound table={true} />}
        </TableContainer>
      </Grid>
    </>
  );
};
