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
import { getOrderListCount } from "../../../Redux/features/Orders/inStoreOrderSlice";
import useDebounce from "../../../hooks/useDebouncs";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";

import PasswordShow from "../../../Common/passwordShow";
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
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
  "& td, & th": {
    border: "none",
  },
}));

const InstoreTableViewData = (props, searchId) => {
  // console.log(props)
  const navigate = useNavigate();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [inStoreOrder, setAllInStoreOrders] = useState([]);
  // console.log("inStoreOrder totalCount", totalCount);
  const AllInStoreDataState = useSelector((state) => state.inStoreOrder);
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(props?.OffSearchIdData);
  // console.log("debouncedValue", debouncedValue);
  const handleChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };
  // const numberOptions = [];
  // for (let i = 1; i <= 50; i++) {
  //   numberOptions.push(
  //     <option key={i} value={i}>
  //       {i}
  //     </option>
  //   );
  // }
  useEffect(() => {
    setCurrentPage(1);
    const transactionType = (type) => {
      if (type === "Cash Payment") {
        return "Cash";
      }
      if (type === "Card Payment") {
        return "Online";
      } else {
        return type;
      }
    };
    dispatch(
      getOrderListCount({
        merchant_id: props.merchant_id, //
        order_type: "Offline",
        search_by:
          props?.OffSearchIdData !== "" ? props?.OffSearchIdData : null,
        trans_type: transactionType(props.OrderSourceData), //
        start_date: props.selectedDateRange?.start_date, //
        end_date: props.selectedDateRange?.end_date, //
        order_method: props.order_method ? props.order_method : "All",
        ...props.userTypeData, //
      })
    );
  }, [
    props.selectedDateRange?.start_date,
    props.selectedDateRange?.end_date,
    debouncedValue,
    props.order_method,
    // props.OrderSourceData,

    // AllInStoreDataState.OrderListCount,
    // AllInStoreDataState.inStoreOrderData,
  ]);

  useEffect(() => {
    fetchData();
  }, [
    // dispatch,
    // props,
    debouncedValue,
    props.selectedDateRange,
    currentPage,
    rowsPerPage,
    // AllInStoreDataState.OrderListCount,
  ]);
  const fetchData = async () => {
    const transactionType = (type) => {
      if (type === "Cash Payment") {
        return "Cash";
      }
      if (type === "Card Payment") {
        return "Online";
      } else {
        return type;
      }
    };
    if (props?.selectedDateRange?.start_date) {
      let data = {
        merchant_id: props.merchant_id,
        order_type: "Offline",
        trans_type: transactionType(props.OrderSourceData),
        start_date: props.selectedDateRange?.start_date,
        end_date: props.selectedDateRange?.end_date,
        emp_id: props?.EmployeeIDData,
        search_by:
          props?.OffSearchIdData !== "" ? props?.OffSearchIdData : null,
        perpage: rowsPerPage,
        page: debouncedValue === "" ? currentPage : "1",
        order_method: props.order_method ? props.order_method : "All",
      };
      // console.log("date data", data);
      if (data) {
        try {
          await dispatch(fetchInStoreOrderData(data)).unwrap();
        } catch (error) {
          if (error.status == 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        }
      }
    }
  };

  useEffect(() => {
    setTotalCount(AllInStoreDataState.OrderListCount);
    // console.log("AllInStoreDataState.OrderListCount", AllInStoreDataState)
  }, [AllInStoreDataState.OrderListCount]);

  useEffect(() => {
    props.setIsLoading(AllInStoreDataState.loading);
    if (!AllInStoreDataState.loading && AllInStoreDataState.inStoreOrderData) {
      setAllInStoreOrders(AllInStoreDataState.inStoreOrderData);
    }
  }, [AllInStoreDataState.loading, AllInStoreDataState.inStoreOrderData]);

  // console.log("AllInStoreDataState",AllInStoreDataState)
  const handlePageChange = (newPage) => {
    // setCurrentPage(newPage);
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

  function capitalizeFirstLetter(
    string,
    m_status,
    payment_id,
    pax_details,
    is_split_payment
  ) {
    // return string.charAt(0).toUpperCase() + string.slice(1);
    return payment_id !== "Cash" && payment_id !== "" && is_split_payment == "0"
      ? "Pax-Pad"
      : payment_id == "Cash"
        ? "Cash-Paid"
        : is_split_payment == "1"
          ? "Split-Paid"
          : "";
  }
  const tableRow = ["Customer", "Order", "Amount", ""];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      inStoreOrder,
      type,
      name,
      sortOrder
    );
    setAllInStoreOrders(sortedItems);
    setSortOrder(newOrder);
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
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
                        {/* {tableRow.map((item, index) => (
                          <StyledTableCell key={item}>{item}</StyledTableCell>
                        ))}
                         */}
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              sortByItemName("str", "billing_name")
                            }
                          >
                            <p className="whitespace-nowrap">Customer</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "order_id")}
                          >
                            <p>Order</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("num", "amt")}
                          >
                            <p>Amount</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {inStoreOrder &&
                        Array.isArray(inStoreOrder) &&
                        inStoreOrder.length > 0 ? (
                          inStoreOrder?.map((data, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {data.billing_name || data.delivery_phn ? (
                                  <>
                                    <p className="text-[#000000] order_method">
                                      {data.billing_name || ""}
                                    </p>
                                    <p className="text-[#818181]">
                                      {data.email || ""}
                                    </p>
                                    <p className="text-[#818181]">
                                      {data.delivery_phn || ""}
                                    </p>
                                  </>
                                ) : (
                                  <div>
                                    <p>-</p>
                                  </div>
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="text-[#000000] order_method">
                                  {data.order_id || ""}
                                </p>
                                <p className="text-[#818181]">
                                  {data.merchant_time || ""}
                                </p>
                                <p className="text-[#818181]">
                                  {data.order_method || ""}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p> {"$" + data.amt || ""}</p>
                                <p className="text-[#1EC26B]">
                                  {capitalizeFirstLetter(
                                    data.order_status || "",
                                    data.m_status || "",
                                    data.payment_id || "",
                                    data.pax_details || "",
                                    data.is_split_payment || ""
                                  )}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                {/* <p
                                  onClick={() =>
                                    navigate(
                                      `/order/store-reporting/order-summary/${"MAL0100CA"}/${data.order_id}`
                                    )
                                  }
                                  // href="/store-reporting/order-summary/${data.order_id}"
                                  className="view_details_order"
                                >
                                  View Details
                                </p> */}
                                <Link
                                  className="whitespace-nowrap text-[#0A64F9]"
                                  to={`/order/store-reporting/order-summary/${props.merchant_id}/${data?.order_id}`}
                                  // onClick={() => handleSummeryPage(row.order_id)}
                                  target="_blank"
                                >
                                  View Details
                                  {/* Order Summery */}
                                  {/* <img src={Summery} alt="" className="pl-1" /> */}
                                </Link>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <>
                            <p className="px-5 py-4">No Data Found</p>
                          </>
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
