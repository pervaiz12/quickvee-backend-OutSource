import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ManagerRecord,
  getManagerRecordCount,
} from "../../../Redux/features/user/managerSlice";
import ViewMerchant from "./viewMerchantModel";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useDebounce from "../../../hooks/useDebouncs";
import Pagination from "../UnverifeDetails/Pagination";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import PasswordShow from "../../../Common/passwordShow";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
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

export default function Manager() {
  const dispatch = useDispatch();
  const managerList = useSelector((state) => state.managerRecord);
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();

  // ========================= DEFIENED STATES ========================================
  const [managerTable, setManagerTable] = useState([]);
  const [searchRecord, setSearchRecord] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const debouncedValue = useDebounce(searchRecord);

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const getManagerData = async (data) => {
    try {
      await dispatch(ManagerRecord(data)).unwrap();
    } catch (error) {
      getUnAutherisedTokenMessage();
      handleCoockieExpire();
    }
  };

  useEffect(() => {
    const data = {
      ...userTypeData,
      perpage: rowsPerPage,
      page: currentPage,
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
    };
    getManagerData(data);
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches to update the total count
  useEffect(() => {
    dispatch(
      getManagerRecordCount({
        ...userTypeData,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      })
    );
  }, [debouncedValue]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    if (!managerList.loading && managerList) {
      setTotalCount(managerList?.managerRecordsCount);
      setManagerTable(managerList?.ManagerRecord);
    }
  }, [managerList?.managerRecordsCount, managerList?.ManagerRecord]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = ["Name", "Email", "Phone", "View"];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      managerTable,
      type,
      name,
      sortOrder
    );
    setManagerTable(sortedItems);
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
                <span>Manager List</span>
              </div>
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
            {managerList.loading ? (
              <>
                <SkeletonTable columns={columns} />
              </>
            ) : (
              <>
                {managerList.ManagerRecord &&
                managerTable.length > 0 &&
                Array.isArray(managerTable) ? (
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
                      </TableHead>
                      <TableBody>
                        {managerTable?.length
                          ? managerTable?.map((data, index) => {
                              return (
                                <StyledTableRow key={data.id}>
                                  <StyledTableCell>
                                    <div className="text-[#000000] order_method capitalize">
                                      {data?.name}
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <div className="text-[#000000] order_method">
                                      {data?.email}
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <div className="text-[#000000] order_method capitalize">
                                      {data?.phone}
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <ViewMerchant
                                      userTypeData={userTypeData}
                                      data={data}
                                    />
                                  </StyledTableCell>
                                </StyledTableRow>
                              );
                            })
                          : ""}
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
