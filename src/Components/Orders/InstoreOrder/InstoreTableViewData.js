import React, { useEffect, useState } from "react";
import DefaultPagination from "./DefaultPagination";
import { fetchInStoreOrderData } from "../../../Redux/features/Orders/inStoreOrderSlice";
import { useSelector, useDispatch } from "react-redux";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { Link, useNavigate } from "react-router-dom";
import { renderToString } from "react-dom/server";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";

import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { saveBulkInstantPo } from "./../../../Redux/features/Product/ProductSlice";
import Pagination from "../../../AllUserComponents/Users/UnverifeDetails/Pagination";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";

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

const InstoreTableViewData = (props, searchId) => {
  // console.log(props)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [inStoreOrder, setAllInStoreOrders] = useState([]);
  console.log("inStoreOrder ", inStoreOrder);
  const AllInStoreDataState = useSelector((state) => state.inStoreOrder);
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };
  const numberOptions = [];
  for (let i = 1; i <= 50; i++) {
    numberOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      if (props?.selectedDateRange?.start_date) {
        let data = {
          merchant_id: "MAL0100CA",
          order_type: "Offline",
          trans_type: props.OrderSourceData,
          start_date: props.selectedDateRange?.start_date,
          end_date: props.selectedDateRange?.end_date,
          emp_id: props?.EmployeeIDData,
          search_by: props?.OffSearchIdData,
          // page: currentPage,
          // entriesPerPage: 10,
        };
        console.log("date data", data);
        if (data) {
          dispatch(fetchInStoreOrderData(data));
        }
      }
    };
    fetchData();
  }, [dispatch, props, searchId,props.selectedDateRange]);

  useEffect(() => {
    if (!AllInStoreDataState.loading && AllInStoreDataState.inStoreOrderData) {
      setAllInStoreOrders(AllInStoreDataState.inStoreOrderData);
    }
  }, [AllInStoreDataState.loading, AllInStoreDataState.inStoreOrderData]);

  // console.log("AllInStoreDataState",AllInStoreDataState)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // for table start
  // $.DataTable = require("datatables.net");
  // console.log(inStoreOrder)
  // useEffect(() => {
  //   const modifiedData = inStoreOrder.map((data) => ({
  //     Customer: `<span class="text-[#000000] order_method">${
  //       data.billing_name || ""
  //     }</span><br><span class="text-[#818181]">${
  //       data.delivery_phn || ""
  //     }</span>`,
  //     Order: `<span class="text-[#000000] order_method">${
  //       data.order_id || ""
  //     }</span><br><span class="text-[#818181]">${
  //       data.merchant_time || ""
  //     }</span><br><span class="text-[#818181]">${
  //       data.order_method || ""
  //     }</span>`,
  //     Amount: `${
  //       data.amt || ""
  //     }<br><span class="text-[#1EC26B]">${capitalizeFirstLetter(
  //       data.order_status || ""
  //     )}</span>`,

  //     // "Status": `<span class="text-[#000000]">${data.order_status || ""}</span>`,
  //     View: `<a href="/store-reporting/order-summary/${data.order_id}" class="view_details_order">View Details</a>`,
  //   }));

  //   const table = $("#InstoreTable").DataTable({
  //     data: modifiedData,
  //     columns: [
  //       { title: "Customer", data: "Customer", orderable: false },
  //       { title: "Order", data: "Order", orderable: false },
  //       { title: "Amount", data: "Amount", orderable: false },
  //       // { title: "Status", data: "Status", orderable: false },
  //       { title: " ", data: "View", orderable: false },
  //     ],
  //     destroy: true,
  //     searching: true,
  //     dom: "<'row'l<'col-sm-12'b>><'row'<'col-sm-12 mt-2'p><'col-sm-12'>>",
  //     lengthMenu: [10, 20, 50],
  //     lengthChange: true,
  //     ordering: false,
  //     language: {
  //       paginate: {
  //         previous: "<",
  //         next: ">",
  //       },
  //     },
  //   });

  //   $("#searchInput").on("input", function () {
  //     table.search(this.value).draw();
  //   });

  //   return () => {
  //     table.destroy();
  //   };
  // }, [inStoreOrder]);

  // for table End

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const tableRow = ["Customer", "Order", "Amount", ""];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <Pagination
              // currentPage={currentPage}
              // totalItems={totalCount}
              // itemsPerPage={rowsPerPage}
              // onPageChange={paginate}
              // rowsPerPage={rowsPerPage}
              // setRowsPerPage={setRowsPerPage}
              // setCurrentPage={setCurrentPage}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {AllInStoreDataState.loading ? (
                <SkeletonTable columns={tableRow} />
              ) : (
                <>
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        {tableRow.map((item, index) => (
                          <StyledTableCell key={item}>{item}</StyledTableCell>
                        ))}
                      </TableHead>
                      <TableBody>
                        {inStoreOrder &&
                        Array.isArray(inStoreOrder) &&
                        inStoreOrder.length > 0 ? (
                          inStoreOrder?.map((data, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <p className="text-[#000000] order_method">
                                  {data.billing_name || ""}
                                </p>
                                <p className="text-[#818181]">
                                  {data.delivery_phn || ""}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p class="text-[#000000] order_method">
                                  {data.order_id || ""}
                                </p>
                                <p class="text-[#818181]">
                                  {data.merchant_time || ""}
                                </p>
                                <p class="text-[#818181]">
                                  {data.order_method || ""}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p> Amount: { "$"+ data.amt || ""}</p>
                                <p class="text-[#1EC26B]">
                                  {capitalizeFirstLetter(
                                    data.order_status || ""
                                  )}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p
                                onClick={()=>navigate(`/order/store-reporting/order-summary/${"MAL0100CA"}/${data.order_id}`)}
                                  // href="/store-reporting/order-summary/${data.order_id}"
                                  className="view_details_order"
                                >
                                  View Details
                                </p>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <><p className="px-5 py-4">No Data Found</p></>
                        )}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <table className="" id="InstoreTable"></table>
        </div>
      </div> */}
    </>
  );
};

export default InstoreTableViewData;
