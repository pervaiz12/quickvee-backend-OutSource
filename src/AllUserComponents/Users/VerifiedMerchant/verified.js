import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import CircularProgress from "@mui/material/CircularProgress";

import {
  getVerifiedMerchant,
  getVerifiedMerchantCount,
} from "../../../Redux/features/user/verifiedMerchantSlice";
import { handleMoveDash } from "../../../Redux/features/user/unverifiedMerchantSlice";
import { getAuthInvalidMessage } from "../../../Redux/features/Authentication/loginSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import View from "../../../Assests/VerifiedMerchant/View.svg";
import Edit from "../../../Assests/VerifiedMerchant/Edit.svg";
import Delete from "../../../Assests/VerifiedMerchant/Delete.svg";
import DisLike from "../../../Assests/VerifiedMerchant/DisLike.svg";
import {
  BASE_URL,
  DELETE_SINGLE_STORE,
  UNAPPROVE_SINGLE_STORE,
  EXPORTCSV,
} from "../../../Constants/Config";
import Pagination from "../UnverifeDetails/Pagination";
import useDebounce from "../../../hooks/useDebouncs";
import DeleteModal from "../../../reuseableComponents/DeleteModal";
import DislikeModal from "../../../reuseableComponents/DislikeModal";
import emailLogo from "../../../Assests/Dashboard/email.svg"
import phoneLogo from "../../../Assests/Dashboard/phone.svg"
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

export default function Verified({setVisible,setMerchantId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");
  const [storename, setStorename] = useState();
  const [submitmessage, setsubmitmessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const verifiedMerchantList = useSelector(
    (state) => state.verifiedMerchantRecord
  );

  const [VerifiedMerchantListState, setVerifiedMerchantListState] = useState(
    []
  );

  const { userTypeData } = useAuthDetails();
  const debouncedValue = useDebounce(searchRecord);

  // only when user changes Page number, Page size & searches something
  const data_verified = {
    type: "approve",
    ...userTypeData,
    perpage: rowsPerPage,
    page: currentPage,
    search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
  };
  useEffect(() => {
    dispatch(getVerifiedMerchant(data_verified));
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches VerifiedMerchantListState
  useEffect(() => {
    dispatch(
      getVerifiedMerchantCount({
        type: "approve",
        ...userTypeData,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      })
    );
  }, [debouncedValue]);

  // on load setting the verified merchant list and whenever the List changes.
  // useEffect(() => {
  //   if (verifiedMerchantList.verifiedMerchantData?.length >= 1) {
  //     setVerifiedMerchantListState(verifiedMerchantList.verifiedMerchantData);
  //     setFilteredMerchants(verifiedMerchantList.verifiedMerchantData);
  //   }
  // }, [verifiedMerchantList.verifiedMerchantData]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    setTotalCount(verifiedMerchantList.verifiedMerchantCount);
  }, [verifiedMerchantList.verifiedMerchantCount]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // when user searches
  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    // setFilteredMerchants(VerifiedMerchantList);
    setCurrentPage(1);
  };

  const handleEditMerchant = (data) => {
    console.log("handleEditMerchant",data);
    setMerchantId(data)
    setVisible("editVerirmedMerchant")
    // navigate(`/users/editMerchant/${data}`);
  };

  const [deleteTableId, setDeleteTableId] = useState(null);
  const [deleteMerchantId, setDeleteMerchantId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dislikeModalOpen, setDislikeModalOpen] = useState(false);
  const handleDeleteMerchant = async (tableData) => {
    setDeleteTableId(tableData);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCategory = async ( ) => {
    if(deleteTableId){
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
            // const updatedVendorDetails =
            //   verifiedMerchantList.verifiedMerchantData.filter(
            //     (vendor) => vendor.id !== tableData.id
            //   );
            // setVerifiedMerchantListState(updatedVendorDetails);
            // setFilteredMerchants(updatedVendorDetails);
            setDeleteLoader(false);
            setDeletedId("");
            dispatch(getVerifiedMerchant(data_verified));
          } else {
            setDeleteLoader(false);
            setDeletedId("");
            console.error(response);
          }
      } catch (error) {
        console.error(error);
      }
    }
    setDeleteModalOpen(false);
    setDeleteTableId(null);
  };  

  const confirmDislikeStore = async () => {
    if(deleteMerchantId){
      try {
          const { token, ...otherUserData } = userTypeData;
          const delVendor = {
            id: deleteMerchantId,
            ...otherUserData,
          };
  
          const response = await axios.post(
            BASE_URL + UNAPPROVE_SINGLE_STORE,
            delVendor,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response) {
            dispatch(getVerifiedMerchant(data_verified));
          } else {
            console.error(response);
          }
      } catch (error) {
        console.error(error);
      }
      setDeleteMerchantId(null)
      setDislikeModalOpen(false)

    }
  };

  const handleGetVerifiedMerchant = (merchant_id) => {
    let data = {
      merchant_id: merchant_id,
      ...userTypeData,
    };

    dispatch(handleMoveDash(data)).then((result) => {
      if (result?.payload?.status == true) {
        if (result?.payload?.final_login == 1) {
          navigate(`/`);
        } else {
          console.log("store page called");
        }
      } else {
        Cookies.remove("loginDetails");
        Cookies.remove("user_auth_record");
        dispatch(getAuthInvalidMessage(result?.payload?.msg));
        navigate("/login");
      }
    });
  };

  const hadleDislikeMerchant = async (merchant_id) => {
    setDeleteMerchantId(merchant_id)
    setDislikeModalOpen(true);
    /*
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to unapprove this store"
      );
      if (userConfirmed) {
        const { token, ...otherUserData } = userTypeData;
        const delVendor = {
          id: merchant_id,
          ...otherUserData,
        };

        const response = await axios.post(
          BASE_URL + UNAPPROVE_SINGLE_STORE,
          delVendor,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          // const updatedVendorDetails =
          //   verifiedMerchantList.verifiedMerchantData.filter(
          //     (vendor) => vendor.id !== merchant_id
          //   );
          // setVerifiedMerchantListState(updatedVendorDetails);
          // setFilteredMerchants(updatedVendorDetails);
          dispatch(getVerifiedMerchant(data_verified));
        } else {
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }*/
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
      console.error(error);
    }
  };

  const columns = ["Store Info", "Owner Name", "Merchant ID", ""];

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
                  <div
                    onClick={() => {
                      handleExportTransaction(2);
                    }}
                    className="flex q-category-bottom-header"
                  >
                    <span className="quic-btn-save excelLoader">
                      {loader ? <CircularProgress /> : ""}
                    </span>
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
                    state={{ from: "/users/view/approve", heading: "Merchant" }}
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
            {verifiedMerchantList.loading ? (
              <>
                <SkeletonTable columns={columns} />
              </>
            ) : (
              <>
                {verifiedMerchantList.verifiedMerchantData &&
                Array.isArray(verifiedMerchantList.verifiedMerchantData) &&
                verifiedMerchantList.verifiedMerchantData?.length > 0 ? (
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>Store Info</StyledTableCell>
                        <StyledTableCell>Owner Name</StyledTableCell>
                        <StyledTableCell>Merchant ID</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {verifiedMerchantList.verifiedMerchantData?.map(
                          (data, index) => (
                            <StyledTableRow key={data.id}>
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
                                {data.email && <img src={emailLogo} className="pe-1" />}   <p>{data.email || ""}</p> 
                                </div>
                                <div className="text-[#818181] flex">
                                {data.a_phone && <img src={phoneLogo} className="pe-1" />}  <p> {data.a_phone || ""}</p> 
                                 
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {data.owner_name || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method ">
                                  {data.merchant_id || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
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
                                  {data.id == deletedId && deleteLoader ? (
                                    <CircularProgress />
                                  ) : (
                                    <img
                                      className="mx-1 delete cursor-pointer"
                                      onClick={() => handleDeleteMerchant(data)}
                                      src={Delete}
                                      alt="Delete"
                                    />
                                  )}
                                  <img
                                    className="mx-1 cursor-pointer"
                                    onClick={() =>
                                      hadleDislikeMerchant(data.id)
                                    }
                                    src={DisLike}
                                    alt="DisLike"
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
      <DeleteModal
            headerText="Verified Merchant"
            otherMSG="Once The store is deleted Inventory and settings cannot be restored."
            open={deleteModalOpen}
            onClose={() => {setDeleteModalOpen(false)}}
            onConfirm={confirmDeleteCategory}
          />
          <DislikeModal
          headerText="Are you sure you want to Disapprove this store"
          open={dislikeModalOpen}
          onClose={() => {setDislikeModalOpen(false)}}
          onConfirm={confirmDislikeStore}
          />
    </>
  );
}
