import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Loader from "../../../CommonComponents/Loader";
import { priceFormate } from "../../../hooks/priceFormate";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularMedium !important",
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
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));
export default function Pagination(props) {
  let columns = ["Title", "Category", "Quantity", "Price"];
  return (
    <>
      {props.loader ? (
        // <Loader />
        <>
          <SkeletonTable columns={columns} />
        </>
      ) : (
        <TableContainer>
          <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <StyledTableCell>
                <button
                  className="flex items-center"
                  onClick={() => props.sortByItemName("str", "title")}
                >
                  <p>Title</p>
                  <img src={sortIcon} alt="" className="pl-1" />
                </button>
              </StyledTableCell>
              <StyledTableCell>
                <button
                  className="flex items-center"
                  onClick={() => props.sortByItemName("str", "category_name")}
                >
                  <p>Category</p>
                  <img src={sortIcon} alt="" className="pl-1" />
                </button>
              </StyledTableCell>
              <StyledTableCell>
                <button
                  className="flex items-center"
                  onClick={() => props.sortByItemName("num", "quantity")}
                >
                  <p>Quantity</p>
                  <img src={sortIcon} alt="" className="pl-1" />
                </button>
              </StyledTableCell>
              <StyledTableCell>
                <button
                  className="flex items-center"
                  onClick={() => props.sortByItemName("num", "price")}
                >
                  <p>Price</p>
                  <img src={sortIcon} alt="" className="pl-1" />
                </button>
              </StyledTableCell>
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
                      <p>{`$${priceFormate(result?.price)}`}</p>
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
              // <div>
              //   <button
              //     className="btn btn-outline"
              //     onClick={props.handleLoadMore}
              //   >
              //     Load More
              //   </button>
              // </div>
              <Stack spacing={2} direction="row">
                <Button
                  sx={{ fontFamily: "CircularMedium" }}
                  variant="outlined"
                  className="button-load"
                  onClick={props.handleLoadMore}
                >
                  Load More
                </Button>
              </Stack>
            ) : (
              ""
            )}
          </StyledTable>
        </TableContainer>
      )}
    </>
  );
}
