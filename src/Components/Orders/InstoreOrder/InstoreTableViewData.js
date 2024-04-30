import React, { useEffect, useState } from "react";
import DefaultPagination from "./DefaultPagination";
import { fetchInStoreOrderData } from "../../../Redux/features/Orders/inStoreOrderSlice";
import { useSelector, useDispatch } from "react-redux";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { Link } from "react-router-dom";
import { renderToString } from 'react-dom/server';


import $ from 'jquery'
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const InstoreTableViewData = (props) => {
  // console.log(props)
  const [currentPage, setCurrentPage] = useState(1);
  const [inStoreOrder, setAllInStoreOrders] = useState([]);
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
      if (props?.selectedDateRange?.start_date)
      {
        let data = {
          merchant_id: "MAL0100CA",
          order_type: "Offline",
          trans_type: props.OrderSourceData,
          start_date: props.selectedDateRange?.start_date,
          end_date: props.selectedDateRange?.end_date,
          emp_id: props?.EmployeeIDData,
          // page: currentPage,
          // entriesPerPage: 10,
        };
        if (data) {
          dispatch(fetchInStoreOrderData(data));
        }
      }
    };
    fetchData();
  }, [dispatch, props]);

  useEffect(() => {
    if (!AllInStoreDataState.loading && AllInStoreDataState.inStoreOrderData) {
      setAllInStoreOrders(AllInStoreDataState.inStoreOrderData);
    }
  }, [AllInStoreDataState.loading, AllInStoreDataState.inStoreOrderData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // for table start
  $.DataTable = require('datatables.net') 

  useEffect(() => {
    const modifiedData = inStoreOrder.map(data => ({
      "Customer": `<span class="text-[#000000] order_method">${data.name || ""}</span><br><span class="text-[#818181]">${data.delivery_phn || ""}</span>`,
      "Order": `<span class="text-[#000000] order_method">${data.order_id || ""}</span><br><span class="text-[#818181]">${data.merchant_time || ""}</span><br><span class="text-[#818181]">${data.order_method || ""}</span>`,
      "Amount": `${data.amt || ""}<br><span class="text-[#1EC26B]">${capitalizeFirstLetter(data.order_status || "")}</span>`,
    

      // "Status": `<span class="text-[#000000]">${data.order_status || ""}</span>`,
      "View": `<a href="/store-reporting/order-summary/${data.order_id}" class="view_details_order">View Details</a>`,
    }));

    const table = $('#InstoreTable').DataTable({
      data: modifiedData,
      columns: [
        { title: "Customer", data: "Customer", orderable: false },
        { title: "Order", data: "Order", orderable: false },
        { title: "Amount", data: "Amount", orderable: false },
        // { title: "Status", data: "Status", orderable: false },
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
  }, [inStoreOrder]);

  // for table End

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <table className="" id="InstoreTable"></table>
        </div>
      </div>
    </>
  );
};

export default InstoreTableViewData;
