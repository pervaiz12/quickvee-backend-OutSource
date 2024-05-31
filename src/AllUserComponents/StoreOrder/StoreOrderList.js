import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStoreOrderData,
  getStoreOrderCount,
} from "../../Redux/features/StoreOrder/StoreOrderSlice";
import "../../Styles/StoreOrder.css";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import Left from "../../Assests/Taxes/Left.svg";
import Right from "../../Assests/Taxes/Right.svg";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "../Users/UnverifeDetails/Pagination";
import useDebounce from "../../hooks/useDebouncs";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";

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

const StoreOrderList = (props) => {
  const dispatch = useDispatch();

  const AllStoreOrderDataState = useSelector((state) => state.StoreOrderList);
  console.log("AllStoreOrderDataState: ",AllStoreOrderDataState)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");

  const debouncedValue = useDebounce(searchRecord);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { userTypeData } = useAuthDetails();

  useEffect(() => {
    if (props && props.OrderStatusData && props.OrderTypeData) {
      let data = {
        pay_status: props.OrderStatusData,
        order_env: props.OrderTypeData,
        page: currentPage,
        perpage: rowsPerPage,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
        ...userTypeData,
      };
      // console.log("data: ", data);
      if (data) {
        dispatch(fetchStoreOrderData(data));
      }
    }
  }, [
    props.OrderStatusData,
    props.OrderTypeData,
    currentPage,
    debouncedValue,
    rowsPerPage,
  ]);

  // only when user searches
  useEffect(() => {
    const data = {
      pay_status: props.OrderStatusData,
      order_env: props.OrderTypeData,
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      ...userTypeData,
    };

    dispatch(getStoreOrderCount(data));
  }, [debouncedValue]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    setTotalCount(AllStoreOrderDataState.storeOrderCount);
  }, [AllStoreOrderDataState.storeOrderCount]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
  };

  const columns = [
    "Store Order Info",
    "Date",
    "Order ID",
    "Order Status",
    "Order Status",
    "Merchant",
  ];

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <InputTextSearch
                className=""
                type="text"
                value={searchRecord}
                handleChange={handleSearchInputChange}
                placeholder="Search..."
                autoComplete="off"
              />
            </Grid>
          </Grid>

          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <Pagination
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={rowsPerPage}
                onPageChange={paginate}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
          </Grid>

          <Grid container>
            {AllStoreOrderDataState.loading ? (
              <>
                <SkeletonTable columns={columns} />
              </>
            ) : (
              <>
                {AllStoreOrderDataState.StoreOrderData &&
                AllStoreOrderDataState.StoreOrderData.length >= 1 &&
                Array.isArray(AllStoreOrderDataState.StoreOrderData) ? (
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>Store Order Info</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Order ID</StyledTableCell>
                        <StyledTableCell>Order Status</StyledTableCell>
                        <StyledTableCell>Order Status</StyledTableCell>
                        <StyledTableCell>Merchant</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {console.log(
                          "AllStoreOrderDataState.StoreOrderData: ",
                          AllStoreOrderDataState?.StoreOrderData
                        )}
                        {AllStoreOrderDataState?.StoreOrderData.map(
                          (StoreData, index) => (
                            <StyledTableRow key={StoreData.id}>
                              <StyledTableCell>
                                <div className="flex">
                                  <div className="text-[#000000] order_method capitalize">
                                    {StoreData.cname.length < 18
                                      ? StoreData.cname
                                      : StoreData.cname.slice(0, 18) + `...` ||
                                        ""}
                                  </div>
                                </div>
                                {/* <div className="text-[#818181]">
                                  ID - {StoreData.id}
                                </div> */}
                                <div className="text-[#818181] lowercase">
                                  {StoreData.email || ""}
                                </div>
                                <div className="text-[#818181]">
                                  {StoreData.delivery_phn || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {StoreData.date_time}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] capitalize">
                                  {StoreData.order_id}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {StoreData.order_status}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {StoreData.failResult}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {StoreData.merchant_name}
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        )}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                ) : (
                  <p className="px-5 py-4">No Data Found</p>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StoreOrderList;
