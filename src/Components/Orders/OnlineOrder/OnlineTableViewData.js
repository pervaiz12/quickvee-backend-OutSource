import "../../../Styles/TableOrderPage.css";
import React, { useEffect, useState } from "react";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
// import Pagination from "react-js-pagination";
// import DefaultPagination from "../onlineStoreOrder/DefaultPagination";
import {
  fetchOnlieStoreOrderData,
  fetchOrderChangeStatusData,
} from "../../../Redux/features/Orders/onlineStoreOrderSlice";
import { useSelector, useDispatch } from "react-redux";
// import DownIcon from "../../../Assests/Dashboard/Down.svg";
import axios from "axios";
import { BASE_URL, CLOSE_ORDER_COLLECT_CASH } from "../../../Constants/Config";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

import UpArrow from "../../../Assests/Dashboard/Up.svg";

import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const OnlineTableViewData = (props) => {
  // console.log(props)
  const [allOnlineStoreOrder, setAllOnlineStoreOrders] = useState([]);
  const AllInStoreDataState = useSelector((state) => state.onlineStoreOrder);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = async () => {
      if (props?.OrderTypeData) {
        let data = {
          merchant_id: "MAL0100CA",
          order_type: props.OrderTypeData,
          trans_type: props.OrderSourceData,
          start_date: props.selectedDateRange?.start_date,
          end_date: props.selectedDateRange?.end_date,
          customer_id: "0",
        };

        if (data) {
          dispatch(fetchOnlieStoreOrderData(data));
        }
      }
    };
    fetchData();
  }, [dispatch, props]);

  useEffect(() => {
    if (
      !AllInStoreDataState.loading &&
      AllInStoreDataState.onlineStoreOrderData
    ) {
      setAllOnlineStoreOrders(AllInStoreDataState.onlineStoreOrderData);
    }
  }, [AllInStoreDataState.loading, AllInStoreDataState.onlineStoreOrderData]);

  // for New order dropdown start.
  useEffect(() => {
    const handleSelectChange = (event) => {
      const target = event.target;
      if (target.classList.contains("custom-selecttable")) {
        const orderId = target.getAttribute("data-order-id");
        const selectedOption = target.value;
        console.log(`Order ID: ${orderId}, Selected Option: ${selectedOption}`);
        var success = window.confirm("Are you sure you want to change status");
        if (success == true) {
          const FormData = {
            merchant_id: "MAL0100CA",
            order_id: orderId,
            m_status: selectedOption,
          };
          if (FormData) {
            // console.log("API call hogai");
            dispatch(fetchOrderChangeStatusData(FormData));
          }
        }
      }
    };
    const onlineStoreTable = document.getElementById("OnlineStoreTable");
    onlineStoreTable.addEventListener("change", handleSelectChange);

    return () => {
      onlineStoreTable.removeEventListener("change", handleSelectChange);
    };
  }, []);
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
  useEffect(() => {
    const handleSelectclick = (event) => {
      const target = event.target;
      if (target.classList.contains("edit_center")) {
        const NeworderId = target.getAttribute("order-id");
        const Neworderamt = target.getAttribute("order-amt");
        setShowPricModal(true);
        setNewOrderId(NeworderId);
        setNewOrderAmount(Neworderamt);
      }
    };
    const onlineStoreTable = document.getElementById("OnlineStoreTable");
    onlineStoreTable.addEventListener("click", handleSelectclick);

    return () => {
      onlineStoreTable.removeEventListener("click", handleSelectclick);
    };
  }, []);
  // for closed order edit button end.

  const changeReceivingAmount = (event) => {
    const inputValue = event.target.value;
    setNewReceivingAmount(inputValue);
  };

  const handleAddReceivingAmount = async () => {
    const newItem = {
      merchant_id: "MAL0100CA",
      order_id: newOrderId,
      cash_collected: newReceivingAmount,
      order_amt: newOrderAmount,
    };
    const data = newItem;
    console.log(data);
    const response = await axios.post(
      BASE_URL + CLOSE_ORDER_COLLECT_CASH,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);

    if (response?.data?.status == false) {
      setErrorMessage(response.data.message);
    } else {
      setErrorMessage("");
      setShowPricModal(false);
    }
  };

  $.DataTable = require("datatables.net");


  useEffect(() => {
    const modifiedData = Object.entries(allOnlineStoreOrder).map(
      ([key, data], i) => {
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
              status = "Cash-Paid";
            } else {
              status = "Cash-Pending";
            }
          } else {
            status = "Online-Paid";
          }
        }

        let PayStatus = "";
        let OrderStatus = "";

        if (data.m_status == 5) {
          OrderStatus = "Cancelled";
        } else if (data.payment_id == "Cash") {
          OrderStatus = "Cash";
        } else {
          OrderStatus = "Online-Paid";
        }

        if (props?.OrderTypeData == "Closed") {
          if (
            OrderStatus == "Cash" &&
            parseFloat(data?.cash_collected)?.toFixed(2) !=
              parseFloat(data?.amt)?.toFixed(2)
          ) {
            PayStatus = `<a href="#">
            <img class="edit_center" order-id="${data.order_id}" order-amt="${data.amt}" src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg" alt="Edit">
            </a>`;
          } else if (OrderStatus == "Cancelled") {
            PayStatus = "Cancelled";
          } else {
            PayStatus = "Paid";
          }
        } else if (props?.OrderTypeData == "New") {
          let cancelOption = "";
          if (data.payment_id === "Cash") {
            cancelOption = `<option value="5">Cancel</option>`;
          }
          if (data.order_method == "pickup") {
            PayStatus = `<select class="custom-selecttable w-52" data-order-id="${data.order_id}">
              <option value="1">Accepted</option>
              <option value="2">Packing</option>
              <option value="3">Ready</option>
              <option value="4">Completed</option>
              ${cancelOption}
            </select>`;
          } else {
            PayStatus = `<select class="custom-selecttable w-52" data-order-id="${data.order_id}">
              <option value="1">Accepted</option>
              <option value="2">Packing</option>
              <option value="6">Ready</option>
              <option value="3">Out for Delivery</option>
              <option value="4">Delivered</option>
              ${cancelOption}
            </select>`;
          }
        }

        return {
          Customer: `${data.name || ""}<br>${data.delivery_phn || ""}`,
          Order: `${data.order_id || ""}<br>${data.merchant_time || ""}<br>${
            data.order_method || ""
          }`,
          Amount: `${"$" + data.amt || ""}<br>${data.order_status || ""}`,
          Status: status,
          OrderStatus: PayStatus,
          View: `<ahref="/store-reporting/order-summary/${data.order_id}">View Details</ahref=>`,
        };
      }
    );

    const table = $("#OnlineStoreTable").DataTable({
      data: modifiedData,
      columns: [
        { title: "Customer", data: "Customer", orderable: false },
        { title: "Order", data: "Order", orderable: false },
        { title: "Amount", data: "Amount", orderable: false },
        { title: "Status", data: "Status", orderable: false },
        { title: "Order Status", data: "OrderStatus", orderable: false },
        { title: " ", data: "View", orderable: false },
      ],
      destroy: true,
      searching: true,
      dom: "<'row 'l<'col-sm-12'b>><'row'<'col-sm-7 mt-5'p><'col-sm-5'>>",
      lengthMenu: [10, 20, 50],
      lengthChange: true,
      ordering: false,
      language: {
        paginate: {
          previous: "<",
          next: ">",
        },
      },
    });

    $("#searchInput").on("input", function () {
      table.search(this.value).draw();
    });

    return () => {
      table.destroy();
    };
  }, [allOnlineStoreOrder, props]);

  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <table className="" id="OnlineStoreTable"></table>
        </div>
      </div>

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
    </>
  );
};

export default OnlineTableViewData;
