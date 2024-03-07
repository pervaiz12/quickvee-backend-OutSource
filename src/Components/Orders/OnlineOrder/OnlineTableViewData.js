import "../../../Styles/TableOrderPage.css";
import React, { useEffect, useState } from "react";
// import Pagination from "react-js-pagination";
// import DefaultPagination from "../onlineStoreOrder/DefaultPagination";
import { fetchOnlieStoreOrderData } from "../../../Redux/features/Orders/onlineStoreOrderSlice";
import { useSelector, useDispatch } from "react-redux";
// import DownIcon from "../../../Assests/Dashboard/Down.svg";

import $ from 'jquery'
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const OnlineTableViewData = (props) => {
  // console.log(props)
  const [allOnlineStoreOrder, setAllOnlineStoreOrders] = useState([]);
  const AllInStoreDataState = useSelector((state) => state.onlineStoreOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (props?.OrderTypeData) 
      {
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
    if (!AllInStoreDataState.loading && AllInStoreDataState.onlineStoreOrderData) {
      setAllOnlineStoreOrders(AllInStoreDataState.onlineStoreOrderData);
    }
  }, [AllInStoreDataState.loading, AllInStoreDataState.onlineStoreOrderData]);

  $.DataTable = require('datatables.net') 
  
  useEffect(() => {
    const modifiedData = Object.entries(allOnlineStoreOrder).map(([key, data], i) => {
      let status = "";
      if (props?.OrderTypeData == 'Failed') {
        if (data.is_tried == '0') {
          status = "Incomplete order";
        } else {
          status = "Failed payment";
        }
      } else {
        if (data.payment_id === 'Cash') {
          if (data.m_status === '4') {
            status = "Cash-Paid";
          } else {
            status = "Cash-Pending";
          }
        } else {
          status = "Online-Paid";
        }
      }

      return {
        "Customer": `${data.name || ""}<br>${data.delivery_phn || ""}`,
        "Order": `${data.order_id || ""}<br>${data.merchant_time || ""}<br>${data.order_method || ""}`,
        "Amount": `${"$"+data.amt || ""}<br>${data.order_status || ""}`,
        "Status": status,
        "View": `<a href="/store-reporting/order-summary/${data.order_id}">View Details</a>`,
      };
    });

    const table = $('#OnlineStoreTable').DataTable({
      data: modifiedData,
      columns: [
        { title: "Customer", data: "Customer", orderable: false },
        { title: "Order", data: "Order", orderable: false },
        { title: "Amount", data: "Amount", orderable: false },
        { title: "Status", data: "Status", orderable: false },
        { title: " ", data:"View", orderable: false },
      ],
      destroy: true,
      searching: true,
      dom: "<'row 'l<'col-sm-12'b>><'row'<'col-sm-7 mt-5'p><'col-sm-5'>>",
      lengthMenu: [ 10, 20, 50],
      lengthChange: true,
      ordering: false,
      language: {
        paginate: {
          previous: '<',
          next: '>'
        }
      }
    });

    $('#searchInput').on('input', function () {
      table.search(this.value).draw();
    });

    return () => {
      table.destroy();
    }
  }, [allOnlineStoreOrder, props]);

  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <table className="" id="OnlineStoreTable"></table>
        </div>
      </div>
    </>
  );
};

export default OnlineTableViewData;
