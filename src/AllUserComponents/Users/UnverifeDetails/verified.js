import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getVerifiedMerchant } from "../../../Redux/features/user/verifiedMerchantSlice";
import {
  getUnVerifiedMerchant,
  handleMoveDash,
} from "../../../Redux/features/user/unverifiedMerchantSlice";
import { getAuthInvalidMessage } from "../../../Redux/features/Authentication/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "js-cookie";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import { Grid } from "@mui/material";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import View from "../../../Assests/VerifiedMerchant/View.svg";
import Edit from "../../../Assests/VerifiedMerchant/Edit.svg";
import Delete from "../../../Assests/VerifiedMerchant/Delete.svg";
import DisLike from "../../../Assests/VerifiedMerchant/DisLike.svg";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { BASE_URL, DELETE_SINGLE_STORE } from "../../../Constants/Config";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "./Pagination";

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


export default function Verified() {
 
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);


  const tableRef = useRef(null);

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VerifiedMerchantList = useSelector(
    (state) => state.verifiedMerchantRecord.verifiedMerchantData
  );
  const [VerifiedMerchantListState, setVerifiedMerchantListState] = useState(
    []
  );

  useEffect(() => {
    if (!VerifiedMerchantList.loading && VerifiedMerchantList.length >= 1) {
      setVerifiedMerchantListState(VerifiedMerchantList);
      setFilteredMerchants(VerifiedMerchantList);
      setTotalCount(VerifiedMerchantList.length);
    }
  }, [VerifiedMerchantList, VerifiedMerchantList.loading]);


  const indexOfLastMerchant = currentPage * rowsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - rowsPerPage;
  const currentMerchants = filteredMerchants.slice(
    indexOfFirstMerchant,
    indexOfLastMerchant
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log("VerifiedMerchantList: ", VerifiedMerchantList);
  const data = { type: "approve" };
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    dispatch(getVerifiedMerchant({ type: "approve", ...userTypeData }));
  }, []);
  // ====================================
  const [searchRecord, setSearchRecord] = useState("");

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);

    const filteredAdminRecord =
      VerifiedMerchantListState && Array.isArray(VerifiedMerchantListState)
        ? VerifiedMerchantListState.filter(
            (result) =>
              (result.owner_name &&
                result.owner_name
                  .toLowerCase()
                  .includes(searchRecord.toLowerCase())) ||
              (result.name &&
                result.name
                  .toLowerCase()
                  .includes(searchRecord.toLowerCase())) ||
              (result.email &&
                result.email
                  .toLowerCase()
                  .includes(searchRecord.toLowerCase())) ||
              (result.phone && result.phone.includes(searchRecord)) ||
              (result.a_state && result.a_state.includes(searchRecord))
          )
        : [];

    setVerifiedMerchantListState(filteredAdminRecord);
  };

  // ====================================
  const handleEditMerchant = (data) => {
    console.log("handleEditMerchant ", data);
    // Assuming 'result' is the data you want to pass to the editMerchant route
    // Navigate to the editMerchant route and pass 'result' as state
    navigate(`/users/editMerchant/${data}`);
  };
  const handleDeleteMerchant = async (tableData) => {
    console.log("handleDeleteMer", tableData);
    // const tempArray = tableData.split(",");
    // console.log("tempArray : ", tempArray);
    try {
      const { token, ...otherUserData } = userTypeData;
      // const [idFormTable, MerchantIdFromTable] = tempArray;

      const delVendor = {
        merchant_id: tableData.merchant_id,
        id: tableData.id,
        ...otherUserData,
      };

      const response = await axios.post(
        BASE_URL + DELETE_SINGLE_STORE,
        delVendor,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        const updatedVendorDetails = VerifiedMerchantListState.filter(
          (vendor) => vendor.id !== tableData.id
        );
        setVerifiedMerchantListState(updatedVendorDetails);

        // alert(response.data.message);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetVerifiedMerchant = (merchant_id) => {
    let data = {
      merchant_id: merchant_id,
      ...userTypeData,
    };
    // const formdata = new FormData();

    dispatch(handleMoveDash(data)).then((result) => {
      if (result?.payload?.status == true) {
        if (result?.payload?.final_login == 1) {
          navigate(`/`);
        } else {
          console.log("store page called");
        }
      } else {
        console.log("hhhhhh");
        Cookies.remove("loginDetails");
        Cookies.remove("user_auth_record");
        // Cookies.remove('token_data');
        dispatch(getAuthInvalidMessage(result?.payload?.msg));
        navigate("/login");
      }
    });
  };
  // $.DataTable = require("datatables.net");
  // useEffect(() => {
  //   const modifiedData = Object.entries(VerifiedMerchantListState).map(
  //     ([key, data], i) => {
  //       return {
  //         StoreInfo: `
  //         <div class="flex">
  //           <div class="text-[#000000] order_method capitalize">${
  //             data.name.length < 18
  //               ? data.name
  //               : data.name.slice(0, 18) + `...` || ""
  //           }</div>
  //           <div class="mx-2 ">State(${data.a_state})</div>
  //         </div>
  //         <div class="text-[#818181] lowercase">${data.email || ""}</div>
  //         <div class="text-[#818181]">${data.a_phone || ""}</div>
  //         `,
  //         OwnerName: `<div class="text-[#000000] order_method capitalize">${
  //           data.owner_name || ""
  //         }</div>`,
  //         MerchantID: `<div class="text-[#000000] order_method capitalize">${
  //           data.merchant_id || ""
  //         }</div>`,
  //         View: `<div class="flex" >
  //                 <img class="mx-1 view " data-id="${
  //                   data.merchant_id
  //                 }" src=${View} alt="View"/>
  //                 <img class="mx-1 edit"  data-id="${
  //                   data.id
  //                 }"  src=${Edit} alt="Edit"/>
  //                 <img class="mx-1 delete" data-id="${[
  //                   data.id,
  //                   data.merchant_id,
  //                 ]}" src=${Delete} alt="Delete" />
  //                 <img class="mx-1" src=${DisLike} alt="DisLike"/>
  //               </div>`,
  //       };
  //     }
  //   );

  //   const table = $("#OnlineStoreTable").DataTable({
  //     data: modifiedData,
  //     columns: [
  //       { title: "Store Info", data: "StoreInfo", orderable: false },
  //       { title: "Owner Name", data: "OwnerName", orderable: false },
  //       { title: "Merchant ID", data: "MerchantID", orderable: false },
  //       { title: " ", data: "View", orderable: false },
  //     ],
  //     destroy: true,
  //     searching: true,
  //     dom: "<'row 'l<'col-sm-12'b>><'row'<'col-sm-7 mt-2'p><'col-sm-5'>>",
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
  // }, [VerifiedMerchantListState]);
  $(tableRef.current).on("click", "img.delete", function () {
    const data = $(this).data("id");
    handleDeleteMerchant(data);
  });
  $(tableRef.current).on("click", "img.view", function () {
    const merchantId = $(this).data("id");
    handleGetVerifiedMerchant(merchantId);
  });
  $(tableRef.current).on("click", "img.edit", function () {
    const merchantId = $(this).data("id");
    handleEditMerchant(merchantId);
  });

  //  ====================================
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
                <span>Verified Merchant</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <div className="flex q-category-bottom-header ">
                    <p className="me-2">Export Last Transaction</p>
                  </div>
                </Grid>
                <Grid
                  style={{
                    borderLeft: "1px solid #E8E8E8",
                    height: "30px",
                  }}
                ></Grid>
                <Grid item>
                  <Link
                    to="/users/addMerchant"
                    className="flex q-category-bottom-header "
                  >
                    <p className="me-2">ADD</p>
                    <img src={AddIcon} />
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
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <Pagination 
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={rowsPerPage}
                onPageChange={paginate}
              
              />
            </Grid>
          </Grid>
          <Grid container>
            <TableContainer>
              <StyledTable
               initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  {/* {TableRow.map((row) => (
                    <StyledTableCell>{row}</StyledTableCell>
                  ))} */}
                  <StyledTableCell>Store Info</StyledTableCell>
                  <StyledTableCell>Owner Name</StyledTableCell>
                  <StyledTableCell>Merchant ID</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableHead>
                <TableBody>
                  {currentMerchants.map((data, index) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <div class="flex">
                          <div class="text-[#000000] order_method capitalize">
                            {data.name.length < 18
                              ? data.name
                              : data.name.slice(0, 18) + `...` || ""}
                          </div>
                          <div class="mx-2 ">(State{data.a_state})</div>
                        </div>
                        <div class="text-[#818181] lowercase">
                          {data.email || ""}
                        </div>
                        <div class="text-[#818181]">{data.a_phone || ""}</div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div class="text-[#000000] order_method capitalize">
                          {data.owner_name || ""}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div class="text-[#000000] order_method capitalize">
                          {data.merchant_id || ""}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="flex">
                          <img
                            className="mx-1 view "
                            data-id="${data.merchant_id}"
                            onClick={() =>
                              handleGetVerifiedMerchant(data.merchant_id)
                            }
                            src={View}
                            alt="View"
                          />
                          <img
                            className="mx-1 edit"
                            data-id="${data.id}"
                            onClick={() => handleEditMerchant(data.id)}
                            src={Edit}
                            alt="Edit"
                          />
                          <img
                            class="mx-1 delete"
                            data-id="${[data.id,data.merchant_id,]}"
                            onClick={() => handleDeleteMerchant(data)}
                            src={Delete}
                            alt="Delete"
                          />
                          <img class="mx-1" src={DisLike} alt="DisLike" />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
          {/* <Grid container sx={{ padding: 0 }}>
            <Grid item xs={12}>
              <table id="OnlineStoreTable" ref={tableRef}></table>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>

      {/* <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_div">
            <div className="qvrow">
              <div className="col-qv-8">
                <div className="btn-area">
                  <Link to="/users/addMerchant" className="blue_btn">
                    ADD
                  </Link>
                </div>
              </div>
              <div className="col-qv-4">
                <div className="seacrh_area">
                  <div className="input_area">
                    <input
                      className=""
                      type="text"
                      value={searchRecord}
                      onInput={handleSearchInputChange}
                      placeholder="Search..."
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="table_main_area">
              <div className="table_header_sticky">
                <div className="table_header_top">
               
                </div>
                <div className="table_header">
                  <p className="table12">Owner Name</p>
                  <p className="table12">Name</p>
                  <p className="table19">Email</p>
                  <p className="table10">Phone</p>
                  <p className="table5">State</p>
                  <p className="table12">Payment Mode</p>
                  <p className="table10">Merchant ID</p>
                  <p className="table10">OTP</p>
                  <p className="table10">Action</p>
                </div>
              </div>
              <div className="table_body">
                {Array.isArray(VerifiedMerchantList) &&
                  VerifiedMerchantList &&
                  filteredAdminRecord.map((result, index) => {
                 
                    return (
                      <div className="table_row" key={index}>
                        <p className="table12">{result.owner_name}</p>
                        <p className="table12">{result.name}</p>
                        <p className="table19 txt_ellipsis">{result.email}</p>
                        <p className="table10">{result.a_phone}</p>
                        <p className="table5">{result.a_state}</p>
                        <p className="table12">{result.paymentmode}</p>
                        <p className="table10">{result.merchant_id}</p>
                        <p className="table10">{result.ver_code}</p>

                        <div className="table10">
                          <div className="verifiedTableIcon">
                       
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Action
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={""}
                                label="Age"
                                onChange={""}
                              >
                                <MenuItem
                                  value={10}
                                  onClick={() =>
                                    handleGetVerifiedMerchant(
                                      result.merchant_id
                                    )
                                  }
                                >
                                  view
                                </MenuItem>
                                <MenuItem value={20}>
                                  <div
                             
                                    onClick={() =>
                                      handleEditMerchant(result.id)
                                    }
                                  >
                                    <img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img>
                                  </div>
                                </MenuItem>
                                <MenuItem value={30}>
                                  <Link>
                                    <img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img>
                                  </Link>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                     </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
