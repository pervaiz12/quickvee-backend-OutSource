import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  CustomerFunction,
  getCustomersCount,
} from "../../../Redux/features/user/customerSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import Pagination from "../UnverifeDetails/Pagination";
import Edit from "../../../Assests/VerifiedMerchant/Edit.svg";
import Delete from "../../../Assests/VerifiedMerchant/Delete.svg";
import useDebounce from "../../../hooks/useDebouncs";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states
  const [searchRecord, setSearchRecord] = useState("");
  // const [customersDataState, setCustomersDataState] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const customerRecord = useSelector((state) => state.customerRecord);
  const customerRecordCount = useSelector(
    (state) => state.customerRecord.CustomerRecordCount
  );

  // const indexOfLastMerchant = currentPage * rowsPerPage;
  // const indexOfFirstMerchant = indexOfLastMerchant - rowsPerPage;
  // const currentCustomers = searchRecord
  //   ? customersDataState
  //   : customersDataState.slice(indexOfFirstMerchant, indexOfLastMerchant);

  const debouncedValue = useDebounce(searchRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // useEffect(() => {
  //   if (customerRecord.CustomerRecord?.length >= 1) {
  //     setCustomersDataState(customerRecord.CustomerRecord);
  //   }
  // }, [customerRecord.CustomerRecord]);

  // on load setting count of Customers list & on every change...
  useEffect(() => {
    setTotalCount(customerRecordCount);
  }, [customerRecordCount]);

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

  const { userTypeData } = useAuthDetails();

  // only when user changes Page number, Page size & searches something
  useEffect(() => {
    const data = {
      type: 2,
      ...userTypeData,
      perpage: rowsPerPage,
      page: currentPage,
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
    };

    dispatch(CustomerFunction(data));
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches
  useEffect(() => {
    dispatch(
      getCustomersCount({
        ...userTypeData,
        type: 2,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      })
    );
  }, [debouncedValue]);

  // useEffect(() => {
  //   if (customerRecord.CustomerRecord) {
  //     const filteredData = Boolean(searchRecord.trim())
  //       ? customerRecord?.CustomerRecord?.filter((customer) =>
  //           customer?.name?.toLowerCase().includes(searchRecord.toLowerCase())
  //         )
  //       : customerRecord?.CustomerRecord;

  //     console.log("filteredData: ", filteredData);

  //     const data =
  //       Array.isArray(filteredData) && filteredData.length > 0
  //         ? filteredData
  //         : [];

  //     setManagerTable(data);
  //   }
  // }, [customerRecord, searchRecord]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
  };

  const columns = ["Customer Name", "Email", "Phone", "User Type", ""];

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
                <span>Customer</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Link
                    to="/users/addMerchant"
                    className="flex q-category-bottom-header"
                    state={{ from: "/users/customer", heading: "Customer" }}
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
            {customerRecord.loading ? (
              <>
                <SkeletonTable columns={columns} />
              </>
            ) : (
              <>
                {customerRecord.CustomerRecord &&
                Array.isArray(customerRecord.CustomerRecord) &&
                customerRecord.CustomerRecord?.length > 0 ? (
                  <TableContainer>
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>Customer Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Phone</StyledTableCell>
                        <StyledTableCell>User Type</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableHead>
                      <TableBody>
                        {customerRecord.CustomerRecord?.map((data, index) => (
                          <StyledTableRow key={data.id}>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data.name.length < 18
                                  ? data.name
                                  : data.name.slice(0, 18) + `...` || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data.email || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data.phone || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data.user_type || ""}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="flex">
                                <img
                                  title="Edit"
                                  className="mx-1 edit cursor-pointer"
                                  onClick={() =>
                                    navigate(`/users/editCustomer/${data.id}`)
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
};
export default Customer;
