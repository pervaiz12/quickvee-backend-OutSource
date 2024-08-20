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

import { priceFormate } from "../../../hooks/priceFormate";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
import { Grid } from "@mui/material";
import useDelayedNodata from "../../../hooks/useDelayedNoData";


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
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));
const tableRow = [
  { type: "str", name: "title", lable: "Title" },
  { type: "str", name: "category_name", lable: "Category" },
  { type: "num", name: "costperItem", lable: "Cost Per Item" },
  { type: "num", name: "price", lable: "Price" },
  { type: "num", name: "margin", lable: "Margin" },
  { type: "num", name: "profit", lable: "Profit" },
];
let columns = [
  "Title",
  "Category",
  "Cost Per Item",
  "Price",
  "Margin",
  "Profit",
];
export default function Pagination(props) {
  const showNoData = useDelayedNodata(props.searchProduct)
  const categoryName = (str) => {
    const temp = str?.split(",");
    return temp?.join(", ");
  };
  const renderLoader = () => {
    return (
      <TableContainer>
        <StyledTable aria-label="customized table">
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
              <StyledTableRow key={row}>
                {["", "", "", ""].map((col) => (
                  <StyledTableCell key={col}>
                    <Skeleton />
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    );
  };
  return (
    <>
      {props.loader ? (
        <>
          <SkeletonTable columns={columns} />
        </>
      ) : (
        <TableContainer>
          <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              {tableRow.map((row) => (
                <StyledTableCell key={row.name}>
                  <button
                    className="flex items-center"
                    onClick={() => props.sortByItemName(row.type, row.name)}
                  >
                    <p>{row.lable}</p>
                    <img src={sortIcon} alt="" className="pl-1" />
                  </button>
                </StyledTableCell>
              ))}
            </TableHead>

            <TableBody>
              {props.searchProduct.length > 0 ? (
                props.searchProduct?.map((result, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell sx={{ width: "30%" }}>
                      <p>{result?.title}</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "20%" }}>
                      <p>{categoryName(result?.category_name)}</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "20%" }}>
                      <p>{`$${priceFormate(
                        !!result?.costperItem ? result?.costperItem : "0.00"
                      )}`}</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "10%" }}>
                      <p>{`$${priceFormate(
                        !!result?.price ? result?.price : "0.00"
                      )}`}</p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: "10%" }}>
                      <p>{`${result?.margin}%`}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p>{`$${priceFormate(
                        !!result?.profit ? result?.profit : "0.00"
                      )}`}</p>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                ""
              )}
            </TableBody>
          </StyledTable>
          {props.searchProduct.length ? (
            props.laodMoreData ? (
              renderLoader()
            ) : !props.endOfDataList ? (
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
            )
          ) : (
            // <Grid container>
            //   <Grid item sx={{ p: 2.5 }}>
            //     <p>No Data Available</p>
            //   </Grid>
            // </Grid>
            showNoData && <NoDataFound />
          )}
        </TableContainer>
      )}
    </>
  );
}
