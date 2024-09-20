import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import sortIcon from "../../Assests/Category/SortingW.svg";
import { useSelector } from "react-redux";
import NoDataFound from "../../reuseableComponents/NoDataFound";
import { Link } from "react-router-dom";
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
  { type: "", name: "", label: "Lottery Name" },
  { type: "", name: "", label: "Quantity" },
  { type: "", name: "", label: "UPC" },
  { type: "", name: "", label: "Price" },
];
export default function LotteryList() {
  const ProductsListDataState = useSelector((state) => state.productsListData);
  const filteredData = ProductsListDataState?.productsData?.filter(
    (product) => product?.is_lottery === "1"
  );
  console.table("filteredData: ", filteredData);
  return (
    <>
      <TableContainer>
        <StyledTable aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              {tableRow.map((item, index) => (
                <StyledTableCell key={index}>
                  <button
                    className="flex items-center"
                    //   onClick={() => sortByItemName(item.type, item.name)}
                  >
                    <p>{item.label}</p>
                    <img src={sortIcon} alt="" className="pl-1" />
                  </button>
                  {}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {ProductsListDataState?.productsData?.length > 0 &&
              ProductsListDataState?.productsData?.map(
                (product, index) =>
                  product?.is_lottery === "1" && (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Link
                          state={{
                            EditProductData: {
                              title: product?.title,
                              price: product?.price,
                              quantity: product?.quantity,
                              collection: [product?.cotegory],
                              upc: product?.upc,
                              trackqnty: product?.trackqnty,
                              is_lottery: "1",
                            },
                          }}
                          to={"/inventory/lottery/add-lottery"}
                        >
                          <p>{product?.title}</p>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{product?.quantity}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{product?.upc}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{product?.price}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
              )}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
}
