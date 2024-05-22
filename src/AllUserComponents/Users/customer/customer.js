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
import $ from "jquery";

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  $.DataTable = require("datatables.net");
  const customerRecord = useSelector((state) => state.customerRecord);
  const [managerTable, setManagerTable] = useState([]);

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let data = { type: 2, ...userTypeData };

  useEffect(() => {
    dispatch(CustomerFunction(data));
  }, []);

  // ------------------------------------
  const [selectedAction, setSelectedAction] = useState("");
  const [searchRecord, setSearchRecord] = useState("");

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

      const table = $(tableRef.current).DataTable({
        data: modifiedData,
        columns: [
          { title: "Name", data: "Name", orderable: false },
          { title: "Email", data: "Email", orderable: false },
          { title: "Phone", data: "Phone", orderable: false },
          { title: "User Type", data: "UserType", orderable: false },
        ],
        destroy: true,
        searching: true,
        dom: "<'row 'l<'col-sm-5'><'col-sm-7'>f<'col-sm-12't>><'row'i<'col-sm-7 mt-5'>p<'col-sm-5'>>",
        lengthMenu: [10, 20, 50],
        lengthChange: true,
        ordering: false,
        language: {
          paginate: {
            previous: '<img src="' + Left + '" alt="left" />',
            next: '<img src="' + Right + '" alt="right" />',
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
  // ----------------------------------
  const handleSearchInputChange = (e) => {
    setSearchRecord(e.target.value);
  };
  // const filteredAdminRecord =
  //   customerRecord &&
  //   customerRecord.CustomerRecord &&
  //   Array.isArray(customerRecord && customerRecord.CustomerRecord)
  //     ? customerRecord.CustomerRecord.filter(
  //         (result) =>
  //           (result.name &&
  //             result.name.toLowerCase().includes(searchRecord.toLowerCase())) ||
  //           (result.email &&
  //             result.email
  //               .toLowerCase()
  //               .includes(searchRecord.toLowerCase())) ||
  //           (result.phone && result.phone.includes(searchRecord))
  //       )
  //     : [];

  // const{customerRecord,handleEditCustomer,handleDeleteCustomer}=CustomerFunction()
  return (
    // <div className="q-order-main-page">
    //   <div className="box">
    //     <div className="box_shadow_div">
    //       <div className="qvrow">
    //         <div className="col-qv-8">
    //           <div className="btn-area">
    //             <Link to="/users/addMerchant" className="blue_btn">
    //               ADD
    //             </Link>
    //           </div>
    //         </div>
    //         <div className="col-qv-4">
    //           <div className="seacrh_area">
    //             <div className="input_area">
    //               <input
    //                 className=""
    //                 type="text"
    //                 value={searchRecord}
    //                 onInput={handleSearchInputChange}
    //                 placeholder="Search..."
    //                 autoComplete="off"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="table_main_area">
    //         {/* <PaginationTable filteredAdminRecord={filteredAdminRecord} /> */}
    //         <div className="table_header_sticky">
    //           <div className="table_header">
    //             <p className="table25">Name</p>
    //             <p className="table30">Email</p>
    //             <p className="table20">Phone</p>
    //             <p className="table20">User Type</p>
    //             <p className="table5">Action</p>
    //           </div>
    //         </div>
    //         <div className="table_body">
    //           {Array.isArray(customerRecord && customerRecord.CustomerRecord) &&
    //             filteredAdminRecord.map((result, index) => {
    //               return (
    //                 <div className="table_row" key={index}>
    //                   <p className="table25">{result.name}</p>
    //                   <p className="table30">{result.email}</p>
    //                   <p className="table20">{result.phone}</p>
    //                   <p className="table20">{result.user_type}</p>
    //                   <div className="table5">
    //                     <div>
    //                       <div className="verifiedTableIcon">
    //                         <Link to={`/users/editCustomer/${result.id}`}>
    //                           <img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img>
    //                         </Link>{" "}
    //                         <Link>
    //                           <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
    //                         </Link>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="box">
      <div className="box_shadow_div">
        <table id="ManagerTable" ref={tableRef}></table>
      </div>
    </div>
  );
};
export default Customer;
