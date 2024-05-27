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
import {
  BASE_URL,
  DELETE_SINGLE_STORE,
  UNAPPROVE_SINGLE_STORE,
  EXPORTCSV,
} from "../../../Constants/Config";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");
  const [storename, setStorename] = useState();
  const [submitmessage, setsubmitmessage] = useState("");
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
  // const currentMerchants =  VerifiedMerchantListState.slice(indexOfFirstMerchant, indexOfLastMerchant);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getVerifiedMerchant({ type: "approve", ...userTypeData }));
  }, []);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    if (value === "") {
      setFilteredMerchants(VerifiedMerchantListState);
      setTotalCount(VerifiedMerchantListState.length);
    } else {
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
                (result.a_phone && result.a_phone.includes(searchRecord)) ||
                (result.a_state && result.a_state.includes(searchRecord))
            )
          : [];
          setFilteredMerchants(filteredAdminRecord);
      setTotalCount(filteredAdminRecord.length);
    }
  };

  const handleEditMerchant = (data) => {
    // console.log("handleEditMerchant ", data);

    navigate(`/users/editMerchant/${data}`);
  };
  const handleDeleteMerchant = async (tableData) => {
    // console.log("handleDeleteMer", tableData);

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
        const updatedVendorDetails = VerifiedMerchantListState.filter(
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
        const updatedVendorDetails = VerifiedMerchantListState.filter(
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
                  <div
                    onClick={() => {
                      handleExportTransaction(2);
                    }}
                    className="flex q-category-bottom-header "
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
                    state={{ from: "/users/view/approve" }}
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
              />
            </Grid>
          </Grid>
          <Grid container>
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
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
                  {filteredMerchants?.slice(
                    indexOfFirstMerchant,
                    indexOfLastMerchant
                  )?.map((data, index) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <div class="flex">
                          <div class="text-[#000000] order_method capitalize">
                            {data.name.length < 18
                              ? data.name
                              : data.name.slice(0, 18) + `...` || ""}
                          </div>
                          <div class="mx-2 ">(State: {data.a_state})</div>
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
                            onClick={() =>
                              handleGetVerifiedMerchant(data.merchant_id)
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
                            class="mx-1 delete"
                            onClick={() => handleDeleteMerchant(data)}
                            src={Delete}
                            alt="Delete"
                          />
                          <img
                            class="mx-1"
                            onClick={() => hadleDislikeMerchant(data.id)}
                            src={DisLike}
                            alt="DisLike"
                          />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
