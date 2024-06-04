import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BASE_URL,
  DELETE_SINGLE_STORE,
  APPROVE_SINGLE_STORE,
  EXPORTCSV,
} from "../../../Constants/Config";
import {
  getUnVerifiedMerchant,
  getUnVerifiedMerchantCount,
  handleMoveDash,
} from "../../../Redux/features/user/unverifiedMerchantSlice";
import { getAuthInvalidMessage } from "../../../Redux/features/Authentication/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import Pagination from "./Pagination";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";

import View from "../../../Assests/VerifiedMerchant/View.svg";
import Edit from "../../../Assests/VerifiedMerchant/Edit.svg";
import Delete from "../../../Assests/VerifiedMerchant/Delete.svg";
import Like from "../../../Assests/VerifiedMerchant/Like.svg";
import useDebounce from "../../../hooks/useDebouncs";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";

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
}));

export default function Unverified() {
  //  ============== DEFINED REDUX STATES ============================

  const UnVerifiedMerchantList = useSelector(
    (state) => state.unverifiedMerchantRecord
  );
  // unverifiedMerchantData
  // UnVerifiedMerchantList.unverifiedMerchantDataCount

  // ============= END DEFINED REDUX STATE =============================

  //  ============== DEFINED STATES =============================
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");
  const [VerifiedMerchantListState, setVerifiedMerchantListState] = useState(
    []
  );
  const [storename, setStorename] = useState();
  const [submitmessage, setsubmitmessage] = useState("");

  const debouncedValue = useDebounce(searchRecord);
  //  ============= END DEFINED STATES =============================

  // ============================= USEFFECTS ================================

  // useEffect(() => {
  //   if (UnVerifiedMerchantList.length >= 1) {
  //     setVerifiedMerchantListState(UnVerifiedMerchantList);
  //     setFilteredMerchants(UnVerifiedMerchantList);
  //   }
  // }, [UnVerifiedMerchantList]);

  // ============================= END USEFFECTS =============================

  //  ============================= HANDLIING FUNCTIONS =============================

  const handleDeleteMerchant = async (tableData) => {
    console.log("handleDeleteMer", tableData);

    try {
      const { token, ...otherUserData } = userTypeData;
      const userConfirmed = window.confirm(
        "Are you sure you want to delete? Once The store is deleted Inventory and settings cannot be restored."
      );
      if (userConfirmed) {
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
          setFilteredMerchants(updatedVendorDetails);
          dispatch(getUnVerifiedMerchant(unverify_data));
        } else {
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //  ============================= END HANDLEING FUNCT  ==============================
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  // =======================
  const unverify_data = {
    type: "unapprove",
    ...userTypeData,
    perpage: rowsPerPage,
    page: currentPage,
    search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
  };
  useEffect(() => {
    dispatch(getUnVerifiedMerchant(unverify_data));
  }, [currentPage, debouncedValue, rowsPerPage, VerifiedMerchantListState]);

  // only when user searches
  useEffect(() => {
    dispatch(
      getUnVerifiedMerchantCount({
        type: "unapprove",
        ...userTypeData,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      })
    );
  }, [debouncedValue]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    setTotalCount(UnVerifiedMerchantList.unverifiedMerchantDataCount);
  }, [UnVerifiedMerchantList.unverifiedMerchantDataCount]);
  // ====================================

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
    // if (value === "") {
    //   setFilteredMerchants(VerifiedMerchantListState);
    //   setTotalCount(VerifiedMerchantListState.length);
    // } else {
    //   const filteredAdminRecord =
    //     UnVerifiedMerchantList && Array.isArray(UnVerifiedMerchantList)
    //       ? UnVerifiedMerchantList.filter(
    //           (result) =>
    //             (result.owner_name &&
    //               result.owner_name
    //                 .toLowerCase()
    //                 .includes(searchRecord.toLowerCase())) ||
    //             (result.name &&
    //               result.name
    //                 .toLowerCase()
    //                 .includes(searchRecord.toLowerCase())) ||
    //             (result.email &&
    //               result.email
    //                 .toLowerCase()
    //                 .includes(searchRecord.toLowerCase())) ||
    //             (result.phone && result.phone.includes(searchRecord)) ||
    //             (result.a_state && result.a_state.includes(searchRecord))
    //         )
    //       : [];
    //   setVerifiedMerchantListState(filteredAdminRecord);
    //   setFilteredMerchants(filteredAdminRecord);
    //   setTotalCount(filteredAdminRecord.length);
    // }
  };

  // ====================================
  // ====================================
  const handleEditMerchant = (data) => {
    navigate(`/users/editMerchant/${data}`);
  };
  const handleGetVerifiedMerchant = (merchant_id) => {
    let data = {
      merchant_id: merchant_id,
      ...userTypeData,
    };
    // const formdata = new FormData();

    dispatch(handleMoveDash(data)).then((result) => {
      // console.log(result?.payload)
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

  const hadleDislikeMerchant = async (merchant_id) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want approve this store?"
      );
      if (userConfirmed) {
        const { token, ...otherUserData } = userTypeData;
        const delVendor = {
          id: merchant_id,
          ...otherUserData,
        };

        const response = await axios.post(
          BASE_URL + APPROVE_SINGLE_STORE,
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
            (vendor) => vendor.id !== merchant_id
          );
          setVerifiedMerchantListState(updatedVendorDetails);
          setFilteredMerchants(updatedVendorDetails);
        } else {
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportTransaction = async (type) => {
    try {
      const { token, ...otherUserData } = userTypeData;
      const delVendor = {
        type: type,
        ...otherUserData,
      };

      const response = await axios.post(BASE_URL + EXPORTCSV, delVendor, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        const csvData = response.data;
        // Convert the data to a Blob
        const blob = new Blob([csvData], { type: "text/csv" });

        // Create a URL for the Blob
        const fileUrl = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger a download
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = "Inventory_" + storename + ".csv"; // Name of the downloaded file
        document.body.appendChild(a);
        a.click();

        // Cleanup: remove the anchor element and revoke the Blob URL
        document.body.removeChild(a);
        URL.revokeObjectURL(fileUrl);
        setsubmitmessage("Inventory Exported Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ====================== PAGINATION LOGIC =========================================

  const indexOfLastMerchant = currentPage * rowsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - rowsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // ========================= END PAGINATION LOGIC ====================================== "OTP"

  const columns = ["Store Info", "Owner Name", "Merchant ID", "Action"];

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
                <span>Unverified Merchant</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <div
                    onClick={() => handleExportTransaction(1)}
                    className="flex q-category-bottom-header "
                  >
                    <p className="me-2 ">Export Last Transaction</p>
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
                    state={{
                      from: "/users/view/unapprove",
                      heading: "Merchant",
                    }}
                  >
                    <p className="me-2">ADD</p>
                    <img src={AddIcon} alt="add icon" />
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
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
          </Grid>
          <Grid container>
            {UnVerifiedMerchantList.loading ? (
              <>
                <SkeletonTable columns={columns} />
              </>
            ) : (
              <>
                {UnVerifiedMerchantList.unverifiedMerchantData &&
                Array.isArray(UnVerifiedMerchantList.unverifiedMerchantData) &&
                UnVerifiedMerchantList.unverifiedMerchantData.length > 0 ? (
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>Store Info</StyledTableCell>
                        <StyledTableCell>Owner Name</StyledTableCell>
                        <StyledTableCell>Merchant ID</StyledTableCell>
                        {/* <StyledTableCell>OTP</StyledTableCell> */}
                        <StyledTableCell>Action</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {UnVerifiedMerchantList.unverifiedMerchantData?.map(
                          (data, index) => (
                            <StyledTableRow>
                              <StyledTableCell>
                                <div class="flex">
                                  <div class="text-[#000000] order_method capitalize">
                                    {data.owner_name.length < 18
                                      ? data.owner_name
                                      : data.owner_name.slice(0, 18) + `...` ||
                                        ""}
                                  </div>
                                  <div class="mx-2 ">
                                    (State: {data.a_state})
                                  </div>
                                </div>
                                <div class="text-[#818181] lowercase">
                                  {data.email || ""}
                                </div>
                                <div class="text-[#818181]">
                                  {data.a_phone || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div class="text-[#000000] order_method capitalize">
                                  {data.name.length < 18
                                    ? data.name
                                    : data.name.slice(0, 18) + `...` || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div class="text-[#000000] order_method capitalize">
                                  {data.merchant_id}
                                </div>
                              </StyledTableCell>
                              {/* <StyledTableCell>
                                <div class="text-[#000000] order_method capitalize">
                                  {data.ver_code}
                                </div>
                              </StyledTableCell> */}
                              <StyledTableCell align="right">
                                <div className="flex">
                                  <img
                                    className="mx-1 view cursor-pointer"
                                    onClick={() =>
                                      handleGetVerifiedMerchant(
                                        data.merchant_id
                                      )
                                    }
                                    src={View}
                                    alt="View"
                                  />
                                  <img
                                    className="mx-1 edit cursor-pointer"
                                    onClick={() => handleEditMerchant(data.id)}
                                    src={Edit}
                                    alt="Edit"
                                  />
                                  <img
                                    class="mx-1 delete cursor-pointer"
                                    onClick={() => handleDeleteMerchant(data)}
                                    src={Delete}
                                    alt="Delete"
                                  />
                                  <img
                                    class="mx-1 cursor-pointer"
                                    onClick={() =>
                                      hadleDislikeMerchant(data.id)
                                    }
                                    src={Like}
                                    alt="Like"
                                  />
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        )}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                ) : (
                  <p className="px-5 py-4">No Data Found</p>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
