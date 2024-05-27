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
import { Grid } from "@mui/material";
import $ from "jquery";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import { styled } from "@mui/material/styles";
import Pagination from "../UnverifeDetails/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Edit from "../../../Assests/VerifiedMerchant/Edit.svg";
import Delete from "../../../Assests/VerifiedMerchant/Delete.svg";

const Customer = () => {
  $.DataTable = require("datatables.net");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  const customerRecord = useSelector((state) => state.customerRecord);
  const [managerTable, setManagerTable] = useState([]);
  const [searchRecord, setSearchRecord] = useState("");
  const [customersDataState, setCustomersDataState] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const indexOfLastMerchant = currentPage * rowsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - rowsPerPage;
  const currentCustomers = searchRecord
    ? customersDataState
    : customersDataState.slice(indexOfFirstMerchant, indexOfLastMerchant);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!customerRecord.loading && customerRecord.CustomerRecord.length >= 1) {
      setCustomersDataState(customerRecord.CustomerRecord);
      setTotalCount(customerRecord.CustomerRecord.length);
    }
  }, [customerRecord.CustomerRecord, customerRecord.loading]);

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
  let data = { type: 2, ...userTypeData };

  useEffect(() => {
    dispatch(CustomerFunction(data));
  }, []);

  useEffect(() => {
    if (customerRecord.CustomerRecord) {
      const filteredData = Boolean(searchRecord.trim())
        ? customerRecord?.CustomerRecord?.filter((customer) =>
            customer?.name?.toLowerCase().includes(searchRecord.toLowerCase())
          )
        : customerRecord?.CustomerRecord;

      console.log("filteredData: ", filteredData);

      const data =
        Array.isArray(filteredData) && filteredData.length > 0
          ? filteredData
          : [];

      setManagerTable(data);
    }
  }, [customerRecord, searchRecord]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
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
              />
            </Grid>
          </Grid>
          <Grid container>
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>User Type</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableHead>
                <TableBody>
                  {currentCustomers?.map((data, index) => (
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
                            className="mx-1 edit"
                            // onClick={() => handleEditMerchant(data.id)}
                            src={Edit}
                            alt="Edit"
                          />
                          <img
                            class="mx-1 delete"
                            // onClick={() => handleDeleteMerchant(data.id)}
                            src={Delete}
                            alt="Delete"
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
};
export default Customer;
