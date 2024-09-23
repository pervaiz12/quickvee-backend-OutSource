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
import React, { useEffect, useState } from "react";
import sortIcon from "../../Assests/Category/SortingW.svg";
import { useSelector } from "react-redux";
import NoDataFound from "../../reuseableComponents/NoDataFound";
import { Link } from "react-router-dom";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
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
  { type: "str", name: "title", label: "Lottery Name" },
  { type: "num", name: "quantity", label: "Quantity" },
  { type: "num", name: "upc", label: "UPC" },
  { type: "num", name: "price", label: "Price" },
];
export default function LotteryList() {
  const ProductsListDataState = useSelector((state) => state.productsListData);
  const [arr, setArr] = React.useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  // Use useEffect to update arr whenever ProductsListDataState changes
  useEffect(() => {
    setArr(
      ProductsListDataState?.productsData?.filter(
        (product) => product?.is_lottery == "1"
      )
    );
  }, [ProductsListDataState]);
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder, sortIcon } = SortTableItemsHelperFun(
      arr,
      type,
      name,
      sortOrder
    );
    setArr(sortedItems);
    setSortOrder(newOrder);
  };
  console.log(ProductsListDataState);
  return (
    <>
      {ProductsListDataState?.loading || ProductsListDataState?.productsData.length === 0 && !arr?.length === 0 ? (
        <SkeletonTable columns={tableRow.map((item) => item.label)} />
      ) : (
        <TableContainer>
          <StyledTable aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                {tableRow.map((item, index) => (
                  <StyledTableCell key={index}>
                    <button
                      className="flex items-center"
                      onClick={() => sortByItemName(item.type, item.name)}
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
              {arr?.length > 0 &&
                arr?.map(
                  (product, index) =>
                    product?.is_lottery === "1" && (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Link
                            to={`/inventory/lottery/update-lottery/${product?.id}`}
                          >
                            <span className="text-[#0A64F9] ">{product?.title}</span>
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
      )}
      {!ProductsListDataState?.loading && !arr.length && <NoDataFound  />} 
    </>
  );
}
