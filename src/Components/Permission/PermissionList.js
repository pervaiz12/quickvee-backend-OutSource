import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/EmployeeList/employeeList.css";

import AddPermissionModal from "./AddPermissionModal";
import EditPermissionModal from "./EditPermissionModal";

import Delete from "../../Assests/Category/deleteIcon.svg";

import DeleteModal from "../../reuseableComponents/DeleteModal";

import {
  fetchPermissionData,
  deletePermission,
} from "../../Redux/features/Permission/PermissionSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import {
  Grid,
  Pagination,
  TableContainer,
  TableHead,
  tableCellClasses,
  TableCell,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import PasswordShow from "./../../Common/passwordShow";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../reuseableComponents/NoDataFound";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const PermissionList = () => {
  const navigate = useNavigate();
  const [allpermission, setAllPermission] = useState([]);

  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [VerifiedMerchantListState, setVerifiedMerchantListState] = useState(
    []
  );

  const AllPermissionDataState = useSelector((state) => state.permissionRed);
  const { userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();

  useEffect(() => {
    getpermissionData();
  }, []);
  const getpermissionData = async () => {
    try {
      let data = {
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchPermissionData(userTypeData)).unwrap();
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

  useEffect(() => {
    if (
      !AllPermissionDataState.loading &&
      AllPermissionDataState.permissionData
    ) {
      setAllPermission(AllPermissionDataState.permissionData);
    }
  }, [AllPermissionDataState.loading, AllPermissionDataState.permissionData]);



  const [deletePermissionId, setDeletePermissionId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeletePermission = (id) => {
    setDeletePermissionId(id);
    setDeleteModalOpen(true);
  };
  const confirmDeleteCategory = async () => {
    try {
      if (deletePermissionId) {
        const data = {
          id: deletePermissionId,
          ...userTypeData,
        };
        if (data) {
          await dispatch(deletePermission(data)).unwrap();
        }
      }
      setDeletePermissionId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  // const handleSearchInputChange = (value) => {
  //   console.log(value);
  //   setSearchRecord(value);

  //   const filteredAdminRecord =
  //     filteredMerchants && Array.isArray(filteredMerchants)
  //       ? filteredMerchants.filter(
  //           (result) =>
  //             (result.owner_name &&
  //               result.permission
  //                 .toLowerCase()
  //                 .includes(searchRecord.toLowerCase())) ||
  //             (result.name &&
  //               result.sub_permission
  //                 .toLowerCase()
  //                 .includes(searchRecord.toLowerCase())) ||
  //             (result.email &&
  //               result.email.toLowerCase().includes(searchRecord.toLowerCase()))
  //         )
  //       : [];

  //   console.log("filteredAdminRecord", filteredAdminRecord);
  //   setVerifiedMerchantListState(filteredAdminRecord);
  // };

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);

    if (value === "") {
      // If search input is empty, display the entire dataset
      setAllPermission(AllPermissionDataState?.permissionData);
    } else {
      // Filter managerList.ManagerRecord based on search term
      const filteredRecords = AllPermissionDataState?.permissionData?.filter(
        (record) => {
          // Convert search term to lowercase for case-insensitive search
          const searchTerm = value.toLowerCase();
          // Check if any of the fields contain the search term
          return (
            record?.purmission?.toLowerCase().includes(searchTerm) ||
            record?.sub_permission?.toLowerCase().includes(searchTerm)
          );
        }
      );

      // Update the managerTable state with filtered records
      setAllPermission(filteredRecords);
    }
  };

  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <div className="q-attributes-bottom-header">
              <span>Permission</span>

              <AddPermissionModal />
            </div>
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
            {/* <Grid container sx={{ padding: 2.5 }}>
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
            </Grid> */}
            <Grid container>
              {AllPermissionDataState.loading ? (
                <SkeletonTable columns={["Sub Permission","Permission","",""]}/>
              ) : (
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      {/* {TableRow.map((row) => (
                     <StyledTableCell>{row}</StyledTableCell>
                   ))} */}
                      <StyledTableCell>Sub Permission</StyledTableCell>
                      <StyledTableCell>Permission</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {allpermission?.length
                        ? allpermission?.map((data, index) => {
                            return (
                              <StyledTableRow>

                                <StyledTableCell>
                                  <div class="text-[#000000] order_method ">
                                    {data?.sub_permission}
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div class="text-[#000000] order_method capitalize">
                                    {data?.permission?.length < 18
                                      ? data?.permission
                                      : data?.permission?.slice(0, 18) +
                                          `...` || ""}
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <EditPermissionModal selected={data} />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <img
                                    class="delete cursor-pointer"
                                    data-id="${[data.id,data.merchant_id,]}"
                                    onClick={() =>
                                      handleDeletePermission(data?.id)
                                    }
                                    src={Delete}
                                    alt="Delete"
                                  />
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })
                        : ""}
                    </TableBody>
                  </StyledTable>
                  {!allpermission?.length && <NoDataFound />}
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Grid>
        <DeleteModal
          headerText="Permission"
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
          onConfirm={confirmDeleteCategory}
        />

      </div>
    </>
  );
};

export default PermissionList;
