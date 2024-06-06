import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "../../../CommonComponents/Loader";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));
export default function Pagination(props) {
  return (
    <>
      {props.loader ? (
        <Loader />
      ) : (
        <TableContainer>
          <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <StyledTableCell>Title </StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Price </StyledTableCell>
            </TableHead>
            <TableBody>
              {props.searchProduct.length > 0 ? (
                props.searchProduct?.map((result, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <p>{result?.title}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p>{result?.category_name}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p>{result?.quantity}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p>{`$${result?.price}`}</p>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell>
                    <p>{props.message}</p>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
            {props.laodMoreData ? (
              <div>
                <button
                  className="btn btn-outline"
                  onClick={props.handleLoadMore}
                >
                  Load More
                </button>
              </div>
            ) : (
              ""
            )}
          </StyledTable>
        </TableContainer>
      )}
    </>
  );
}
