import {
  capitalize,
  Grid,
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
import { useSelector } from "react-redux";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
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

export default function NewCustomersAddedReportTable() {
  const NewCustomersAddedReportReduxState = useSelector(
    (state) => state.NewCustomersAddedReport
  );
  const [dataArr, setDataArr] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    if (
      !NewCustomersAddedReportReduxState.loading &&
      NewCustomersAddedReportReduxState?.NewCustomersAddedReportArr
    ) {
      setDataArr(
        NewCustomersAddedReportReduxState?.NewCustomersAddedReportArr.map(
          (item) => ({
            ...item,
            fullName: item?.f_name + " " + item?.l_name,
          })
        )
      );
    } else {
      setDataArr([]);
    }
  }, [
    NewCustomersAddedReportReduxState,
    NewCustomersAddedReportReduxState?.NewCustomersAddedReportArr,
  ]);
  const tableRow = [
    { type: "str", name: "name", label: "Customer Name" },
    { type: "str", name: "email", label: "Email Id" },
    { type: "num", name: "phone", label: "Phone No." },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      dataArr,
      type,
      name,
      sortOrder
    );
    setDataArr(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        {NewCustomersAddedReportReduxState.loading ||
        (NewCustomersAddedReportReduxState.status && !dataArr.length) ? (
          <SkeletonTable columns={tableRow.map((item) => item.label)} />
        ) : (
          <>
            <Grid container>
              <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      {tableRow.map((item, index) => (
                        <StyledTableCell key={index}>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName(item.type, item.name)}
                          >
                            <p>{item.label}</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                      ))}
                    </TableHead>
                    <TableBody>
                      {dataArr.length > 0 &&
                        dataArr?.map((item, index) => (
                          <>
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <p>{capitalize(item?.name)}</p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>{item?.email}</p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p>{item?.phone}</p>
                              </StyledTableCell>
                            </StyledTableRow>
                          </>
                        ))}
                    </TableBody>
                  </StyledTable>
                  {!dataArr.length && <NoDataFound />}
                </TableContainer>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
