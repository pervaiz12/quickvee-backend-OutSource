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
import Pagination from "./Pagination";
import useDebounce from "../../../hooks/useDebouncs";

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

  const verifiedMerchantList = useSelector(
    (state) => state.verifiedMerchantRecord
  );

  const [VerifiedMerchantListState, setVerifiedMerchantListState] = useState(
    []
  );

  const { userTypeData } = useAuthDetails();
  const debouncedValue = useDebounce(searchRecord);

  // only when user changes Page number, Page size & searches something
  useEffect(() => {
    const data = {
      type: "approve",
      ...userTypeData,
      perpage: rowsPerPage,
      page: currentPage,
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
    };

    dispatch(getVerifiedMerchant(data));
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches
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
    navigate(`/users/editMerchant/${data}`);
  };

  const handleDeleteMerchant = async (tableData) => {
    try {
      const { token, ...otherUserData } = userTypeData;
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
        const updatedVendorDetails =
          verifiedMerchantList.verifiedMerchantData.filter(
            (vendor) => vendor.id !== tableData.id
          );
        setVerifiedMerchantListState(updatedVendorDetails);
        setFilteredMerchants(updatedVendorDetails);
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
    try {
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
        const updatedVendorDetails =
          verifiedMerchantList.verifiedMerchantData.filter(
            (vendor) => vendor.id !== merchant_id
          );
        setVerifiedMerchantListState(updatedVendorDetails);
        setFilteredMerchants(updatedVendorDetails);
      } else {
        console.error(response);
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
                        <StyledTableCell></StyledTableCell>
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
                                <div className="text-[#818181] lowercase">
                                  {data.email || ""}
                                </div>
                                <div className="text-[#818181]">
                                  {data.a_phone || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {data.owner_name || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="text-[#000000] order_method capitalize">
                                  {data.merchant_id || ""}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex">
                                  <img
                                    className="mx-1 view "
                                    onClick={() =>
                                      handleGetVerifiedMerchant(
                                        data.merchant_id
                                      )
                                    }
                                    src={View}
                                    alt="View"
                                  />
                                  <img
                                    className="mx-1 edit"
                                    onClick={() => handleEditMerchant(data.id)}
                                    src={Edit}
                                    alt="Edit"
                                  />
                                  <img
                                    className="mx-1 delete"
                                    onClick={() => handleDeleteMerchant(data)}
                                    src={Delete}
                                    alt="Delete"
                                  />
                                  <img
                                    className="mx-1"
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
    </>
  );
}
