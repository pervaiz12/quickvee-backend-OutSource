import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BASE_URL,
  DELETE_SINGLE_STORE,
  APPROVE_SINGLE_STORE,
  EXPORTCSV,
} from "../../../Constants/Config";
import SmallLoader from "../../../Assests/Loader/loading-Animation.gif";
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
import CircularProgress from "@mui/material/CircularProgress";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import DeleteModal from "../../../reuseableComponents/DeleteModal";
import DislikeModal from "../../../reuseableComponents/DislikeModal";
import emailLogo from "../../../Assests/Dashboard/email.svg";
import phoneLogo from "../../../Assests/Dashboard/phone.svg";
import { setIsStoreActive } from "../../../Redux/features/NavBar/MenuSlice";
import PasswordShow from "../../../Common/passwordShow";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium",
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
  "& td, & th": {
    border: "none",
  },
  // hide last border
}));

export default function Unverified({ setMerchantId, setVisible }) {
  //  ============== DEFINED REDUX STATES ============================
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const UnVerifiedMerchantList = useSelector(
    (state) => state.unverifiedMerchantRecord
  );

  // ============= END DEFINED REDUX STATE =============================

  //  ============== DEFINED STATES =============================
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [unverifiedMerchants, setunverifiedMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");
  const [VerifiedMerchantListState, setVerifiedMerchantListState] = useState(
    []
  );
  const [storename, setStorename] = useState();
  const [submitmessage, setsubmitmessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loaders, setLoaders] = useState({
    view: {
      id: "",
      isLoading: false,
    },
  });

  const debouncedValue = useDebounce(searchRecord);

  const [deleteTableId, setDeleteTableId] = useState(null);
  const [deleteMerchantId, setDeleteMerchantId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dislikeModalOpen, setDislikeModalOpen] = useState(false);
  //  ============= END DEFINED STATES =============================

  // ============================= USEFFECTS ================================

  // ============================= END USEFFECTS =============================

  //  ============================= HANDLIING FUNCTIONS =============================

  const handleDeleteMerchant = async (tableData) => {
    // console.log("handleDeleteMer", tableData);
    setDeleteTableId(tableData);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (deleteTableId) {
      try {
        const { token, ...otherUserData } = userTypeData;
        const delVendor = {
          merchant_id: deleteTableId.merchant_id,
          id: deleteTableId.id,
          ...otherUserData,
        };
        setDeleteModalOpen(false);
        setDeleteLoader(true);
        setDeletedId(deleteTableId.id);

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
          setDeleteLoader(false);
          setDeletedId("");
          ToastifyAlert("Deleted Merchant  Successfully!", "success");
          dispatch(getUnVerifiedMerchant(unverify_data));
        } else {
          setDeleteLoader(false);
          setDeletedId("");
          ToastifyAlert("Merchant not Deleted!", "warn");
          console.error(response);
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      }
    }
    setDeleteModalOpen(false);
    setDeleteTableId(null);
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
  const getUnVerifiedRecord = async () => {
    try {
      await dispatch(getUnVerifiedMerchant(unverify_data)).unwrap();
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };
  useEffect(() => {
    // dispatch(getUnVerifiedMerchant(unverify_data));
    getUnVerifiedRecord();
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches
  const fetchUnverifiedMerchantCount = async () => {
    try {
      await dispatch(
        getUnVerifiedMerchantCount({
          type: "unapprove",
          ...userTypeData,
          search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
        })
      ).unwrap();
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    fetchUnverifiedMerchantCount();
  }, [debouncedValue]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    if (!UnVerifiedMerchantList.loading && UnVerifiedMerchantList) {
      setTotalCount(UnVerifiedMerchantList?.unverifiedMerchantDataCount);
      setunverifiedMerchants(UnVerifiedMerchantList?.unverifiedMerchantData);
    }
  }, [
    UnVerifiedMerchantList.unverifiedMerchantDataCount,
    UnVerifiedMerchantList?.unverifiedMerchantData,
  ]);
  // ====================================

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
  };

  // ====================================
  // ====================================
  const handleEditMerchant = (data) => {
    navigate(`/users/unapprove/editMerchant/${data}`);
  };
  const handleGetVerifiedMerchant = async (merchant_id) => {
    try {
      setLoaders({ view: { id: merchant_id, isLoading: true } });
      let data = {
        merchant_id: merchant_id,
        ...userTypeData,
      };

      await dispatch(handleMoveDash(data)).then((result) => {
        // console.log(result?.payload)
        if (result?.payload?.status == true) {
          if (result?.payload?.final_login == 1) {
            navigate(`/`);
            dispatch(setIsStoreActive(true));
          } else {
            console.log("store page called");
          }
        } else {
          Cookies.remove("loginDetails");
          Cookies.remove("user_auth_record");
          // Cookies.remove('token_data');
          dispatch(getAuthInvalidMessage(result?.payload?.msg));
          navigate("/login");
        }
      });
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    } finally {
      setLoaders({ view: { id: "", isLoading: false } });
    }
  };

  const hadleDislikeMerchant = async (merchant_id) => {
    setDeleteMerchantId(merchant_id);
    setDislikeModalOpen(true);
  };

  const confirmDislikeStore = async () => {
    if (deleteMerchantId) {
      try {
        const { token, ...otherUserData } = userTypeData;
        const delVendor = {
          id: deleteMerchantId,
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
          dispatch(getUnVerifiedMerchant(unverify_data));
        } else {
          console.error(response);
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      }
      setDeleteMerchantId(null);
      setDislikeModalOpen(false);
    }
  };

  const handleExportTransaction = async (type) => {
    try {
      const { token, ...otherUserData } = userTypeData;
      const delVendor = {
        type: type,
        ...otherUserData,
      };
      setLoader(true);

      const response = await axios.post(BASE_URL + EXPORTCSV, delVendor, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setLoader(false);
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
      } else {
        setLoader(false);
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  // ====================== PAGINATION LOGIC =========================================

  const indexOfLastMerchant = currentPage * rowsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - rowsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // ========================= END PAGINATION LOGIC ====================================== "OTP"

  const columns = ["Store Info", "Owner Name", "Merchant ID", "Action"];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      unverifiedMerchants,
      type,
      name,
      sortOrder
    );
    setunverifiedMerchants(sortedItems);
    setSortOrder(newOrder);
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
                    <span className="quic-btn-save excelLoader">
                      {loader ? <CircularProgress /> : ""}
                    </span>{" "}
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
                      from: "/users/unapprove",
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
                showEntries={true}
                data={unverifiedMerchants}
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
                Array.isArray(unverifiedMerchants) &&
                unverifiedMerchants.length > 0 ? (
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "name")}
                          >
                            <p>Store Info</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "owner_name")}
                          >
                            <p>Owner Name</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "merchant_id")}
                          >
                            <p>Merchant ID</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {unverifiedMerchants?.map((data, index) => (
                          <StyledTableRow>
                            <StyledTableCell>
                              <div className="flex">
                                <div className="text-[#000000] order_method capitalize">
                                  {data.name.length < 18
                                    ? data.name
                                    : data.name.slice(0, 18) + `...` || ""}
                                </div>
                                <div className="mx-2 ">
                                  (State: {data.a_state})
                                </div>
                              </div>
                              <div className="text-[#818181] lowercase flex">
                                {data.email && (
                                  <img
                                    src={emailLogo}
                                    alt=""
                                    className="pe-1"
                                  />
                                )}{" "}
                                <p>{data.email || ""}</p>
                              </div>
                              <div className="text-[#818181] flex">
                                {data.a_phone && (
                                  <img
                                    src={phoneLogo}
                                    alt=""
                                    className="pe-1"
                                  />
                                )}{" "}
                                <p> {data.a_phone || ""}</p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data.owner_name.length < 18
                                  ? data?.owner_name
                                  : data?.owner_name.slice(0, 18) + `...` || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method ">
                                {data.merchant_id}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <div className="flex">
                                {loaders.view.id === data.merchant_id &&
                                loaders.view.isLoading ? (
                                  <img src={SmallLoader} alt="loading" />
                                ) : (
                                  <img
                                    className="mx-1 view cursor-pointer"
                                    onClick={() =>
                                      handleGetVerifiedMerchant(
                                        data.merchant_id
                                      )
                                    }
                                    src={View}
                                    alt="View"
                                    title="View"
                                  />
                                )}

                                <img
                                  className="mx-1 edit cursor-pointer"
                                  onClick={() => handleEditMerchant(data.id)}
                                  src={Edit}
                                  alt="Edit"
                                  title="Edit"
                                />

                                {data.id == deletedId && deleteLoader ? (
                                  <img src={SmallLoader} alt="loading" />
                                ) : (
                                  <img
                                    class="mx-1 delete cursor-pointer"
                                    onClick={() => handleDeleteMerchant(data)}
                                    src={Delete}
                                    alt="Delete"
                                    title="Delete"
                                  />
                                )}

                                <img
                                  class="mx-1 cursor-pointer"
                                  onClick={() => hadleDislikeMerchant(data.id)}
                                  src={Like}
                                  alt="Like"
                                  title="Approve"
                                />
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                ) : (
                  <NoDataFound table={true} />
                )}
              </>
            )}
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
                data={unverifiedMerchants}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DeleteModal
        headerText="UnVerified Merchant"
        otherMSG="Once The store is deleted Inventory and settings cannot be restored."
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmDeleteCategory}
      />
      <DislikeModal
        headerText="Are you sure you want to approve this store"
        open={dislikeModalOpen}
        onClose={() => {
          setDislikeModalOpen(false);
        }}
        onConfirm={confirmDislikeStore}
      />
    </>
  );
}
