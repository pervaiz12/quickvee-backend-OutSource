import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import ViewAdmin from "./viewAdminModal";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import {
  AdminFunction,
  getAdminRecordCount,
} from "../../../Redux/features/user/adminSlice";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import Pagination from "../UnverifeDetails/Pagination";
import Edit from "../../../Assests/VerifiedMerchant/Edit.svg";
import useDebounce from "../../../hooks/useDebouncs";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import PasswordShow from "../../../Common/passwordShow";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";

export default function AdminView({ setVisible, setEditAdminId }) {
  const { userTypeData } = useAuthDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [sortOrder, setSortOrder] = useState("asc");
  // states
  const [searchRecord, setSearchRecord] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [adminsDataState, setAdminsDataState] = useState([]);
  const debouncedValue = useDebounce(searchRecord);
  const AdminRecord = useSelector((state) => state.adminRecord);
  const adminRecordCount = useSelector(
    (state) => state.adminRecord.adminRecordCount
  );

  // only when user changes Page number, Page size & searches something
  const getAdminRecordData = async (data) => {
    try {
      await dispatch(AdminFunction(data)).unwrap();
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
    const data = {
      ...userTypeData,
      perpage: rowsPerPage,
      page: currentPage,
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
    };
    getAdminRecordData(data);
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches to update the total count
  useEffect(() => {
    dispatch(
      getAdminRecordCount({
        ...userTypeData,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      })
    );
  }, [debouncedValue]);

  useEffect(() => {
    if (!AdminRecord.loading && AdminRecord.AdminRecord.length >= 1) {
      setAdminsDataState(AdminRecord.AdminRecord);
      setTotalCount(AdminRecord.AdminRecord.length);
    }
  }, [AdminRecord.AdminRecord]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    setTotalCount(adminRecordCount);
  }, [adminRecordCount]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
  };

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
  }));

  const columns = ["Name", "Email", "Phone", "View", "Action"];
  const handleClick = () => {
    // setVisible("AddAmin")
    navigate("/users/admin/addAdmin");
  };

  const handleEditAdminClick = (id) => {
    setEditAdminId(id);
    setVisible("EditAdmin");
  };

  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      adminsDataState,
      type,
      name,
      sortOrder
    );
    setAdminsDataState(sortedItems);
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
                <span>Admin</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <span
                    onClick={handleClick}
                    // to="/users/addAdmin"
                    className="flex q-category-bottom-header "
                  >
                    <p className="me-2">ADD</p>
                    <img src={AddIcon} alt="" />
                  </span>
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
            {AdminRecord.loading ? (
              <>
                <SkeletonTable columns={columns} />
              </>
            ) : (
              <>
                {AdminRecord &&
                Array.isArray(adminsDataState) &&
                adminsDataState?.length > 0 ? (
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        {/* <StyledTableCell>Owner Name</StyledTableCell> */}
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "name")}
                          >
                            <p>Name</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("str", "email")}
                          >
                            <p>Email</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            className="flex items-center"
                            onClick={() => sortByItemName("num", "phone")}
                          >
                            <p>Phone</p>
                            <img src={sortIcon} alt="" className="pl-1" />
                          </button>
                        </StyledTableCell>
                        <StyledTableCell>View</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {adminsDataState?.map((data, index) => (
                          <StyledTableRow key={data.id}>
                            {/* <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                {data.owner_name?.length < 18
                                  ? data.owner_name
                                  : data.owner_name?.slice(0, 18) + `...` || ""}
                              </div>
                            </StyledTableCell> */}
                            <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                {data.name || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="text-[#000000] order_method">
                                {data.email || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                {data.phone || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <ViewAdmin
                                email={data.email}
                                name={data.name}
                                userTypeData={userTypeData}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="flex">
                                <img
                                  title="Edit"
                                  className="mx-1 edit cursor-pointer"
                                  onClick={() =>
                                    // handleEditAdminClick(data.id)
                                    // setEditAdminId(data.id)
                                    navigate(
                                      `/users/admin/editAdmin/${data.id}`
                                    )
                                  }
                                  src={Edit}
                                  alt="Edit"
                                />
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
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
