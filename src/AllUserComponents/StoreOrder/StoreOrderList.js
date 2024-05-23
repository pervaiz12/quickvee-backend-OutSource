
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStoreOrderData } from "../../Redux/features/StoreOrder/StoreOrderSlice";
import "../../Styles/StoreOrder.css";
import { useAuthDetails } from './../../Common/cookiesHelper';
import { Grid } from "@mui/material";
import $ from "jquery";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Left from "../../Assests/Taxes/Left.svg";
import Right from "../../Assests/Taxes/Right.svg";

const StoreOrderList = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    // const [allStoreOrderData, setallStoreOrderData] = useState("");
    const [allStoreOrderData, setallStoreOrderData] = useState([]);
    const AllStoreOrderDataState = useSelector((state) => state.StoreOrderList);

    const {userTypeData} = useAuthDetails();
    useEffect(() => {
        if (props && props.OrderStatusData && props.OrderTypeData) 
        {
            let data = {
                pay_status: props.OrderStatusData,
                order_env: props.OrderTypeData,
                page:1,
                ...userTypeData
            };
            if (data) {
                dispatch(fetchStoreOrderData(data));
            }

        }
    }, [props.OrderStatusData,props.OrderTypeData,]);

    useEffect(() => {
        if (!AllStoreOrderDataState.loading && AllStoreOrderDataState.StoreOrderData)
        {
            console.log("kbkzsxdbv",AllStoreOrderDataState.StoreOrderData)
            setallStoreOrderData(AllStoreOrderDataState.StoreOrderData);
        }
        else
        {
            setallStoreOrderData([]);
        }
    }, [
        AllStoreOrderDataState,
        AllStoreOrderDataState.loading,
        AllStoreOrderDataState.StoreOrderData,
    ]);

    $.DataTable = require('datatables.net')
    const tableRef = useRef(null);




      useEffect(() => {
        const modifiedData = allStoreOrderData.map(data => ({
            // "StoreInfo": `${data.id || ""} ${data.cname || ""} ${data.email || ""} ${data.delivery_phn || ""}`,
            "StoreInfo": `
          <div class="flex">
            <div class="text-[#000000] order_method capitalize">${
              data.cname.length < 18
                ? data.cname
                : data.cname.slice(0, 18) + `...` || ""
            }</div>
          </div>
          <div class="text-[#818181]">ID - ${data.id}</div>
          <div class="text-[#818181] lowercase">${data.email || ""}</div>
          <div class="text-[#818181]">${data.delivery_phn || ""}</div>
          `,
            "Date": `${data.date_time || ""}`,
            "OrderId": `${data.order_id || ""}`,
            "OrderStatus": `${data.order_status || ""}`,
            "FailResult": `${data.failResult || ""}`,
            "Merchant": `${data.merchant_id || ""}`,
          }));
    
        const table = $('#storeOrderTable').DataTable({
          data: modifiedData,
          columns: [
            { title: "Store Order Info", data: "StoreInfo", orderable: false },
            { title: "Date", data: "Date", orderable: false },
            { title: "Order Id", data: "OrderId", orderable: false },
            { title: "Order Status", data: "OrderStatus", orderable: false },
            { title: "Fail Result", data: "FailResult", orderable: false },
            { title: "Merchant", data: "Merchant", orderable: false },
          ],
          destroy: true,
          searching: true,
          dom: "<'row 'l<'col-sm-5'><'col-sm-7'p><'col-sm-12't>><'row'i<'col-sm-7 mt-5'><'col-sm-5'>>",
        //   dom: "<'row 'l<'col-sm-12'b>><'row'<'col-sm-7 mt-2'p><'col-sm-5'>>",
          lengthMenu: [ 10, 20, 50],
          lengthChange: true,
          ordering: false,
          language: {
            paginate: {
              previous: '<img src="'+Left+'" alt="left" />',
              next: '<img src="'+Right+'" alt="right" />',
            },
            search: '_INPUT_',
              searchPlaceholder: ' Search...'
          }
        });
    
        // $('#searchInput').on('input', function () {
        //   table.search(this.value).draw();
        // });
    
        return () => {
          table.destroy();
        }
      }, [allStoreOrderData]);

      const [searchRecord, setSearchRecord] = useState([]);
   
      const handleSearchInputChange = (value) => {
          setSearchRecord(value);
        };

      useEffect(() => {
        const table = $('#storeOrderTable').DataTable();
        table.search(searchRecord).draw();
      }, [searchRecord]);


    return (
        <>
        {/* <div className="box">
            <div className="box_shadow_div">
            <div className="store_order_div">
                <h4>Store Order</h4>
                <table className="so_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Order Id</th>
                            <th>Order Status</th>
                            <th>Fail Result</th>
                            <th>Merchant</th>
                        </tr>
                    </thead>

                    {allStoreOrderData && allStoreOrderData.length >= 1 && allStoreOrderData.map((StoreData, index) => (
                        <tbody>
                            <tr key={index} >
                                <td>{StoreData.id}</td>
                                <td>{StoreData.cname}</td>
                                <td>{StoreData.email}</td>
                                <td>{StoreData.delivery_phn}</td>
                                <td>{StoreData.date_time}</td>
                                <td>{StoreData.order_id}</td>
                                <td>{StoreData.order_status}</td>
                                <td>{StoreData.failResult}</td>
                                <td>{StoreData.merchant_id}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            </div>
            </div> */}


            <Grid container className="box_shadow_div">
        <Grid item xs={12}>

            {/* <Grid item>
              <div className="q-category-bottom-header">
                <span>Store Order</span>
              </div>
            </Grid> */}
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
          <Grid container sx={{ padding: 0 }}>
            <Grid item xs={12}>
              <table id="storeOrderTable" ref={tableRef}></table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        </>
    );
};

export default StoreOrderList;
