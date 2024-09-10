import "../../../Styles/TableOrderPage.css";
import React, { useEffect, useState } from "react";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import {
  fetchOnlieStoreOrderData,
  fetchOrderChangeStatusData,
  getOrderListCount,
} from "../../../Redux/features/Orders/onlineStoreOrderSlice";
import { useSelector, useDispatch } from "react-redux";
// import DownIcon from "../../../Assests/Dashboard/Down.svg";
import axios from "axios";
import { BASE_URL, CLOSE_ORDER_COLLECT_CASH } from "../../../Constants/Config";

import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import Pagination from "../../../AllUserComponents/Users/UnverifeDetails/Pagination";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import { useNavigate, Link } from "react-router-dom";

import { CurrencyInputHelperFun } from "../../../Constants/utils";
import useDebounce from "../../../hooks/useDebouncs";
import AskConform from "../../../reuseableComponents/AskConform";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import NoDataFound from "../../../reuseableComponents/NoDataFound";

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
const orderType = (type) => {
  if (type === "Completed") {
    return "Closed";
  } else {
    return type;
  }
};
const OnlineTableViewData = (props) => {
  const navigate = useNavigate();
  // console.log(props)
  const [allOnlineStoreOrder, setAllOnlineStoreOrders] = useState([]);
  // console.log("allOnlineStoreOrder", allOnlineStoreOrder);
  const AllInStoreDataState = useSelector((state) => state.onlineStoreOrder);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const debouncedValue = useDebounce(props?.OnlSearchIdData);
  const [buttonLoader, setButtonLoader] = useState(false);
  // console.log("debouncedValue", debouncedValue);
  const dispatch = useDispatch();
  // const debouncedValue = useDebounce(searchId);
  useEffect(() => {
    const transactionType = (type) => {
      if (type === "Cash") {
        return "Cash";
      } else if (type === "Credit Card") {
        return "Online";
      } else if(type==="Cash & Credit Card"){
        return "Both";
      }else{
        return type
      }
    };
    const fetchData = async () => {
      if (props?.selectedDateRange?.start_date) {
        let data = {
          merchant_id: props.merchant_id,
          order_type: orderType(props.OrderTypeData),
          trans_type: transactionType(props.OrderSourceData),
          start_date: props.selectedDateRange?.start_date,
          end_date: props.selectedDateRange?.end_date,
          customer_id: "0",
          search_by:
            props?.OnlSearchIdData !== "" ? props?.OnlSearchIdData : null,
          perpage: rowsPerPage,
          page: debouncedValue === "" ? currentPage : "1",
          order_method: props.order_method ? props.order_method : "All",
          // search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
          ...props.userTypeData,
        };

        if (data) {
          dispatch(fetchOnlieStoreOrderData(data));
        }
      }
    };
    fetchData();
  }, [
    dispatch,
    //  props,
    props.selectedDateRange, //
    debouncedValue, //
    currentPage, //
    rowsPerPage, //
    props?.OrderTypeData,
    // AllInStoreDataState.OrderListCount,
  ]);

  useEffect(() => {
    setCurrentPage(1);
    const transactionType = (type) => {
      if (type === "Cash") {
        return "Cash";
      } else if (type === "Credit Card") {
        return "Online";
      } else if(type==="Cash & Credit Card"){
        return "Both";
      }else{
        return type
      }
    };

    dispatch(
      getOrderListCount({
        merchant_id: props.merchant_id, //
        order_type: orderType(props.OrderTypeData),
        search_by:
          props?.OnlSearchIdData !== "" ? props?.OnlSearchIdData : null,
        trans_type: transactionType(props.OrderSourceData), //
        start_date: props.selectedDateRange?.start_date, //
        end_date: props.selectedDateRange?.end_date, //
        order_method: props.order_method ? props.order_method : "All",
        ...props.userTypeData, //
      })
    );
  }, [
    dispatch,
    props.selectedDateRange,
    props.selectedDateRange?.start_date,
    props.selectedDateRange?.end_date,
    debouncedValue,
    props.order_method,
    props.OrderTypeData,
    // props.OrderSourceData,
    // AllInStoreDataState.OrderListCount,
    // AllInStoreDataState.onlineStoreOrderData,
  ]);

  useEffect(() => {
    setTotalCount(AllInStoreDataState.OrderListCount);
  }, [AllInStoreDataState.OrderListCount]);

  useEffect(() => {
    if (
      !AllInStoreDataState.loading &&
      AllInStoreDataState.onlineStoreOrderData
    ) {
      const picupOrderSortedCanceledList =
        AllInStoreDataState?.onlineStoreOrderData?.filter(
          (order) => order.order_method === "pickup"
        );

      const deleveryOrderSortedList =
        AllInStoreDataState?.onlineStoreOrderData?.filter(
          (order) => order.order_method === "delivery"
        );
      setAllOnlineStoreOrders(
        props?.order_method === "pickup"
          ? picupOrderSortedCanceledList
          : props?.order_method === "delivery"
            ? deleveryOrderSortedList
            : AllInStoreDataState?.onlineStoreOrderData
      );
    }
  }, [AllInStoreDataState.loading, AllInStoreDataState.onlineStoreOrderData]);
  // console.log("AllInStoreDataState.stocktakeListCount",AllInStoreDataState)
  // for New order dropdown start.
  // useEffect(() => {
  //   const handleSelectChange = (event) => {
  //     const target = event.target;
  //     if (target.classList.contains("custom-selecttable")) {
  //       const orderId = target.getAttribute("data-order-id");
  //       const selectedOption = target.value;
  //       // console.log(`Order ID: ${orderId}, Selected Option: ${selectedOption}`);
  //       var success = window.confirm("Are you sure you want to change status");
  //       if (success == true) {
  //         const FormData = {
  //           merchant_id: props.merchant_id,
  //           order_id: orderId,
  //           m_status: selectedOption,
  //           ...props.userTypeData,
  //         };
  //         if (FormData) {
  //           // console.log("API call hogai");
  //           dispatch(fetchOrderChangeStatusData(FormData));
  //         }
  //       }
  //     }
  //   };
  //   const onlineStoreTable = document.getElementById("OnlineStoreTable");
  //   onlineStoreTable.addEventListener("change", handleSelectChange);

  //   return () => {
  //     onlineStoreTable.removeEventListener("change", handleSelectChange);
  //   };
  // }, []);
  // for New order dropdown end.

  const [showPriceModal, setShowPricModal] = useState(false);
  const [newReceivingAmount, setNewReceivingAmount] = useState("");
  const [newOrderId, setNewOrderId] = useState("");
  const [newOrderAmount, setNewOrderAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const openPricModal = () => {
  //   setShowPricModal(true);
  // };

  const closePricModal = () => {
    setErrorMessage("");
    setNewReceivingAmount("");
    setShowPricModal(false);
  };

  // for closed order edit button start.
  // useEffect(() => {
  //   const handleSelectclick = (event) => {
  //     const target = event.target;
  //     if (target.classList.contains("edit_center")) {
  //       const NeworderId = target.getAttribute("order-id");
  //       const Neworderamt = target.getAttribute("order-amt");
  //       setShowPricModal(true);
  //       setNewOrderId(NeworderId);
  //       setNewOrderAmount(Neworderamt);
  //     }
  //   };
  //   const onlineStoreTable = document.getElementById("OnlineStoreTable");
  //   onlineStoreTable.addEventListener("click", handleSelectclick);

  //   return () => {
  //     onlineStoreTable.removeEventListener("click", handleSelectclick);
  //   };
  // }, []);
  // for closed order edit button end.

  const changeReceivingAmount = (event) => {
    const inputValue = CurrencyInputHelperFun(event.target.value);
    setNewReceivingAmount(inputValue);
  };

  const handleAddReceivingAmount = async () => {
    const { token, ...otherUserData } = props.userTypeData;
    const newItem = {
      merchant_id: props.merchant_id,
      order_id: newOrderId,
      cash_collected: newReceivingAmount,
      order_amt: newOrderAmount,
    };
    const data = newItem;
    // console.log(data);
    const response = await axios.post(
      BASE_URL + CLOSE_ORDER_COLLECT_CASH,
      { ...data, ...otherUserData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);

    if (response?.data?.status == false) {
      setErrorMessage(response.data.message);
    } else {
      setErrorMessage("");
      setShowPricModal(false);
    }
  };

  $.DataTable = require("datatables.net");
  function capitalizeFirstLetter(string, payemnt, status) {
    // console.log(payemnt);
    return payemnt == "Cash" && status == "5"
      ? "Cancelled"
      : payemnt == "Cash"
        ? "Cash"
        : "Credit Card";
    // return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const tableRow = ["Customer", "Order", "Amount", "Order Status", ""];
  const pickupStatusList = [
    {
      title: "Accepted",
      value: "1",
    },
    {
      title: "Packing",
      value: "2",
    },
    {
      title: "Ready",
      value: "3",
    },
    {
      title: "Completed",
      value: "4",
    },
  ];
  const deliveryStatusList = [
    {
      title: "Accepted",
      value: "1",
    },
    {
      title: "Packing",
      value: "2",
    },
    {
      title: "Ready",
      value: "6",
    },
    {
      title: "Out for Delivery",
      value: "3",
    },
    {
      title: "Delivered",
      value: "4",
    },
  ];
  const handleDropDownChange = async (option) => {
    setDeleteCategoryId(option);
    setDeleteModalOpen(true);
    console.log("handleDropDownChange", option);

    // Confirming with the user before proceeding
    // var success = window.confirm("Are you sure you want to change status");

    // // Proceed if the user confirms
    // if (success === true) {
    //   // Constructing form data to send to the server

    // }
  };

  const confirmChangeStatus = async () => {
    const FormData = {
      merchant_id: props.merchant_id,
      order_id: deleteCategoryId.orderId,
      m_status: deleteCategoryId.value,
      ...props.userTypeData,
    };

    console.log("confirmDeleteCategory", FormData);

    // Dispatching an action to change the order status
    if (FormData) {
      try {
        setButtonLoader(true);
        const res = await dispatch(fetchOrderChangeStatusData(FormData));
        console.log("setAllOnlineStoreOrders", res);
        // Checking if the API call was successful
        if (res.meta.requestStatus === "fulfilled") {
          // Update the local state with the updated order data
          setAllOnlineStoreOrders((prevState) => {
            // Find the index of the order to update
            const updatedStatusListItem = prevState.find(
              (order) => order.order_id === deleteCategoryId.orderId
            );
            console.log("updateOrder", deleteCategoryId.value);
            if (updatedStatusListItem) {
              let updatedOrders;
              if (
                deleteCategoryId.value === "4" ||
                deleteCategoryId.value === "5"
              ) {
                updatedOrders = prevState.filter(
                  (order) => order.order_id !== deleteCategoryId.orderId
                );
              } else {
                const updatedOrder = {
                  ...updatedStatusListItem,
                  m_status: deleteCategoryId.value,
                };
                updatedOrders = prevState.map((order) =>
                  order.order_id === deleteCategoryId.orderId
                    ? updatedOrder
                    : order
                );
              }
              ToastifyAlert(res.payload, "success");
              return updatedOrders;
            } else {
              ToastifyAlert(res.payload, "error");
              // Order not found, return previous state unchanged
              return prevState;
            }
          });
        } else {
          // Handle other status codes or errors if needed
          console.error("Failed to update order status:", res.statusText);
          // Optionally show an error message or handle the error state
        }
      } catch (error) {
        console.error("Error while updating order status:", error.message);
        // Handle any network or other errors that may occur during the API call
      }
      setButtonLoader(false);
    }

    setDeleteCategoryId(null);
    setDeleteModalOpen(false);
  };

  const orderStatus = (data) => {
    if (props?.OrderTypeData === "New") {
      const currentList =
        data && data.order_method === "pickup"
          ? pickupStatusList
          : deliveryStatusList;
      const cancelOption = {
        title: "Cancel",
        value: "5",
      };
      const withCanceledOption =
        data.payment_id === "Cash"
          ? [...currentList, cancelOption]
          : currentList;
      const selectedItem = currentList.find(
        (item) => item.value === data.m_status
      ) || { title: "" };
      return (
        <SelectDropDown
          listItem={withCanceledOption.map((item) => ({
            ...item,
            orderId: data.order_id,
          }))}
          title={"title"}
          selectedOption={selectedItem.title}
          onClickHandler={handleDropDownChange}
        />
      );
    }

    let PayStatus = "";
    let OrderStatus = "";

    if (data.m_status == 5) {
      OrderStatus = "Cancelled";
    } else if (data.m_status == "7") {
      OrderStatus = "Refunded";
    } else if (data.m_status === "4" && data.order_method === "pickup") {
      OrderStatus = "Completed";
    } else if (data.m_status === "4" && data.order_method == "delivery") {
      OrderStatus = "Delivered";
    } else if (data.payment_id === "Cash") {
      OrderStatus = "Cash";
    } else {
      OrderStatus = "Credit Card";
    }

    if (props?.OrderTypeData === "Completed") {
      // if (
      //   OrderStatus === "Cash" &&
      //   parseFloat(data?.cash_collected)?.toFixed(2) !=
      //     parseFloat(data?.amt)?.toFixed(2)
      // ) {
      //   return (
      //     <>
      //       <EditCashModel
      //         changeReceivingAmount={changeReceivingAmount}
      //         newReceivingAmount={newReceivingAmount}
      //         handleAddReceivingAmount={handleAddReceivingAmount}
      //         data={data}
      //         setNewOrderId={setNewOrderId}
      //         setNewOrderAmount={setNewOrderAmount}
      //       />
      //     </>
      //   );
      // } else
      if (OrderStatus == "Cancelled") {
        return "Cancelled";
      } else if (OrderStatus == "Refunded") {
        return "Refunded";
      } else if (OrderStatus == "Completed") {
        return "Completed";
      } else if (OrderStatus == "Delivered") {
        return "Delivered";
      } else {
        return "Paid";
      }
    }
    if (props?.OrderTypeData === "Failed") {
      console.log("props?.OrderTypeData ");
      if (data.is_tried === "0") {
        // return "Incomplete order";
        return (
          <>
            <p>Incomplete order</p>
            {data.cvvResult && <p>{data.cvvResult}</p>}
          </>
        );
      } else {
        return (
          <>
            <p>Failed payment</p>
            {data.failResult && <p>{data.failResult}</p>}
          </>
        )
        // return "Failed payment";
      }
    }
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      allOnlineStoreOrder,
      type,
      name,
      sortOrder
    );
    setAllOnlineStoreOrders(sortedItems);
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
                showEntries={true}
                data={AllInStoreDataState?.onlineStoreOrderData}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {AllInStoreDataState.loading ? (
                <>
                  <SkeletonTable columns={tableRow} />
                </>
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
                        ))} */}
                      </TableHead>
                      <TableHead>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() =>
                              sortByItemName("str", "deliver_name")
                            }
                          >
                            <p className="whitespace-nowrap">Customer</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("id", "order_id")}
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
                        <StyledTableCell>
                          {/* <button
                            className="flex items-center"
                            onClick={() =>
                              sortByItemName("srt", "m_status")
                            }
                          > */}
                          <p>Order Status</p>
                          {/* <img src={sortIcon} alt="" className="pl-1" /> */}
                          {/* </button> */}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableHead>
                      {/* {console.log(allOnlineStoreOrder)} */}
                      <TableBody>
                        {allOnlineStoreOrder &&
                        Object.entries(allOnlineStoreOrder).length > 0 ? (
                          Object.entries(allOnlineStoreOrder)?.map(
                            ([key, data], index) => {
                              ////////////////////Showing Status///////////////////////////
                              let status = "";
                              if (props?.OrderTypeData == "Failed") {
                                if (data.is_tried == "0") {
                                  status = "Incomplete order";
                                } else {
                                  status = "Failed payment";
                                }
                              } else {
                                if (data.payment_id === "Cash") {
                                  if (data.m_status === "4") {
                                    status = "Cash";
                                  } else {
                                    status = "Cash-Pending";
                                  }
                                } else {
                                  status = "Credit card";
                                }
                              }
                              /////////////////////end of Showing Stat////////////////////////////////

                              ////////////////////////pickup and delovery dropdown//////////////////////////////////////////

                              /////////////////////end pickup and delovery dropdown//////////////////////////////////////////

                              return (
                                <>
                                  <StyledTableRow key={index}>
                                    <StyledTableCell>
                                      <p className="text-[#000000] order_method">
                                        {data.deliver_name || ""}
                                        {data?.customer_type ? (
                                          <span className="existignCustomerData">
                                            ({data?.customer_type})
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                      <p className="text-[#818181]">
                                        {data.users_email || ""}
                                      </p>
                                      <p className="text-[#818181]">
                                        {data.delivery_phn || ""}
                                      </p>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <p className="text-[#000000] order_method">
                                        {data.order_id || ""}
                                      </p>
                                      <p className="text-[#818181]">
                                        {data.merchant_time || ""}
                                      </p>
                                      <p className="text-[#818181] order_method">
                                        {data.order_method || ""}
                                      </p>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <p>{"$" + data.amt || ""}</p>
                                      <p className="existignCustomerData1">
                                        {capitalizeFirstLetter(
                                          data.order_status || "",
                                          data.payment_id || "",
                                          data.m_status
                                        )}
                                      </p>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {orderStatus(data)}
                                    </StyledTableCell>
                                    <StyledTableCell>
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
                                </>
                              );
                            }
                          )
                        ) : (
                          ""
                        )}
                      </TableBody>
                    </StyledTable>
                    {!Object.entries(allOnlineStoreOrder).length && <NoDataFound table={true} />}
                  </TableContainer>
                </>
              )}
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
                showEntries={false}
                data={AllInStoreDataState?.onlineStoreOrderData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showPriceModal && (
        <div className="q-custom-modal-container" id="addtributes_">
          {/* Your modal JSX */}
          <div className="q-custom-modal-content">
            {/* Your modal content */}
            <div className="">
              <p className="q-custom-modal-header ">
                Cash Recieving
                <img
                  src={CrossIcon}
                  alt="icon"
                  className="ml-auto mb-4"
                  onClick={closePricModal}
                />
              </p>
            </div>
            {/* ... other modal content ... */}
            <input
              type="number"
              placeholder="Enter Amount"
              className="q-custom-input-field"
              value={newReceivingAmount}
              onChange={changeReceivingAmount}
            />
            <span className="input-error text-[#cc0000] text-[14px]">
              {errorMessage !== "" ? errorMessage : ""}
            </span>
            <div className="q-add-categories-section-middle-footer">
              <button
                onClick={handleAddReceivingAmount}
                className="quic-btn quic-btn-save"
              >
                Save
              </button>
              <button
                onClick={closePricModal}
                className="quic-btn quic-btn-cancle"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <AskConform
        headerText="change status"
        loader={buttonLoader}
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmChangeStatus}
      />
    </>
  );
};

export default OnlineTableViewData;
