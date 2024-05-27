
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

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "../Users/UnverifeDetails/Pagination";


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
    console.log(props);
    const dispatch = useDispatch();
    // const [allStoreOrderData, setallStoreOrderData] = useState("");
    const [allStoreOrderData, setallStoreOrderData] = useState([]);
    const AllStoreOrderDataState = useSelector((state) => state.StoreOrderList);
    const [page, setPage] = useState(1);
    const [perpage, setPerpage] = useState(500);

    const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const indexOfLastMerchant = currentPage * rowsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - rowsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const {userTypeData} = useAuthDetails();
    useEffect(() => {
        if (props && props.OrderStatusData && props.OrderTypeData) 
        {
            let data = {
                pay_status: props.OrderStatusData,
                order_env: props.OrderTypeData,
                page:page,
                perpage:perpage,
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
            setTotalCount(AllStoreOrderDataState.StoreOrderData.length)
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

      const [searchRecord, setSearchRecord] = useState("");
   
      const handleSearchInputChange = (value) => {
          setSearchRecord(value);
          if(value === ""){
            setallStoreOrderData(AllStoreOrderDataState.StoreOrderData)
            setTotalCount(AllStoreOrderDataState.StoreOrderData.length)
          }else{
            const filteredAdminRecord =
            allStoreOrderData && Array.isArray(allStoreOrderData)
            ? allStoreOrderData.filter(
                (result) =>
                  (result.cname &&
                    result.cname
                      .toLowerCase()
                      .includes(searchRecord.toLowerCase())) ||
                  (result.email &&
                    result.email
                      .toLowerCase()
                      .includes(searchRecord.toLowerCase())) ||
                  (result.delivery_phn && result.delivery_phn.includes(searchRecord)) ||
                  (result.failResult && result.failResult.includes(searchRecord)) ||
                  (result.merchant_id && result.merchant_id.includes(searchRecord))
              ): [];

            setallStoreOrderData(filteredAdminRecord);
            setTotalCount(filteredAdminRecord.length);
          }
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
          {/* <Grid container sx={{ padding: 2.5 }}>
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
          </Grid> */}

            {/* for ajinkya tabe; starrt  */}

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
                />
              </Grid>
            </Grid>


            <Grid container>
              <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Store Order Info</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell>Order Status</StyledTableCell>
                  <StyledTableCell>Order Status</StyledTableCell>
                  <StyledTableCell>Merchant</StyledTableCell>

                </TableHead>
                <TableBody>

                {allStoreOrderData && allStoreOrderData.length >= 1 && allStoreOrderData.slice(indexOfFirstMerchant,indexOfLastMerchant).map((StoreData, index) => (
                          <StyledTableRow>
                          <StyledTableCell>
                            <div class="flex">
                            <div class="text-[#000000] order_method capitalize">{
                              StoreData.cname.length < 18
                                ? StoreData.cname
                                : StoreData.cname.slice(0, 18) + `...` || ""
                            }</div>
                          </div>
                          <div class="text-[#818181]">ID - {StoreData.id}</div>
                          <div class="text-[#818181] lowercase">{StoreData.email || ""}</div>
                          <div class="text-[#818181]">{StoreData.delivery_phn || ""}</div>
                          </StyledTableCell>
                          <StyledTableCell><div class="text-[#000000] order_method capitalize">{StoreData.date_time}</div></StyledTableCell>
                          <StyledTableCell><div class="text-[#000000] capitalize">{StoreData.order_id}</div></StyledTableCell>
                          <StyledTableCell><div class="text-[#000000] order_method capitalize">{StoreData.order_status}</div></StyledTableCell>
                          <StyledTableCell><div class="text-[#000000] order_method capitalize">{StoreData.failResult}</div></StyledTableCell>
                          <StyledTableCell><div class="text-[#000000] order_method capitalize">{StoreData.merchant_id}</div></StyledTableCell>
                          </StyledTableRow>
                    ))}

                </TableBody>
                </StyledTable>

              </TableContainer>
            </Grid>

            {/* for ajinkya tabe; End */}



        </Grid>
      </Grid>
        </>
    );
};

export default StoreOrderList;
