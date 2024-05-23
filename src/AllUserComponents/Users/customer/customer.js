import React, { useEffect, useState, useRef } from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';cls

import { CustomerFunction } from "../../../Redux/features/user/customerSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../../Common/cookiesHelper";
// import PaginationTable from "./paginationTable";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Left from "../../../Assests/Taxes/Left.svg";
import Right from "../../../Assests/Taxes/Right.svg";
import { Grid } from "@mui/material";
import $ from "jquery";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import AddIcon from "../../../Assests/Category/addIcon.svg";

const Customer = () => {
  $.DataTable = require("datatables.net");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  const customerRecord = useSelector((state) => state.customerRecord);
  const [managerTable, setManagerTable] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [searchRecord, setSearchRecord] = useState("");

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let data = { type: 2, ...userTypeData };

  useEffect(() => {
    dispatch(CustomerFunction(data));
  }, []);

  // const handleSelectChange = (e) => {
  //   const selectedUrl = e.target.value;
  //   const urlParts = selectedUrl.split('/');
  //   if(urlParts[2]=="editCustomer"){
  //     navigate(`${selectedUrl}`);

  //   }else {
  //     console.log('hello delet')
  //   }
  // };
  useEffect(() => {
    if (!customerRecord.loading && customerRecord.CustomerRecord) {
      setManagerTable(customerRecord.CustomerRecord);
    }
  }, [customerRecord.loading, customerRecord.CustomerRecord]);

  useEffect(() => {
    if (managerTable.length && tableRef.current) {
      const modifiedData = managerTable.map((user) => ({
        Name: user.name || "",
        Email: user.email || "",
        Phone: user.phone || "",
        UserType: user?.user_type,
      }));

      $(tableRef.current).on("click", "span.viewMerchant", function () {
        const merchantId = $(this).data("id");
        const merchantName = $(this).data("name");
        // handleViewMerchant(merchantId, merchantName, userTypeData);
      });

      const table = $("#OnlineStoreTable").DataTable({
        data: modifiedData,
        columns: [
          { title: "Name", data: "Name", orderable: false },
          { title: "Email", data: "Email", orderable: false },
          { title: "Phone", data: "Phone", orderable: false },
          { title: "User Type", data: "UserType", orderable: false },
        ],
        destroy: true,
        searching: true,
        // dom: "<'row 'l<'col-sm-5'><'col-sm-7'>p<'col-sm-12't>><'row'<'col-sm-7 mt-5'><'col-sm-5'>>",
        dom: "<'row 'l<'col-sm-12'b>><'row'<'col-sm-7 mt-2'p><'col-sm-5'>>",
        lengthMenu: [10, 20, 50],
        lengthChange: true,
        ordering: false,
        language: {
          paginate: {
            previous: "<",
            next: ">",
          },
          search: "_INPUT_",
          searchPlaceholder: " Search...",
        },
      });

      $("#searchInput").on("input", function () {
        table.search(this.value).draw();
      });

      return () => {
        table.destroy();
      };
    }
  }, [managerTable]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              borderBottom: "1px solid #E8E8E8",
            }}
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Customer ok</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Link
                    to="/users/addMerchant"
                    className="flex q-category-bottom-header "
                  >
                    <p className="me-2">ADD</p>
                    <img src={AddIcon} alt="" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
              <table id="OnlineStoreTable" ref={tableRef}></table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Customer;
