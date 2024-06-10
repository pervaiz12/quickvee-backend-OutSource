import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import {
  fetchpurchaseData,
  getPurchaseOrderCount,
} from "../../Redux/features/PurchaseOrder/purchaseOrderSlice";
import { useSelector, useDispatch } from "react-redux";

import ResciveIcon from "../../Assests/Dashboard/rescived.svg";
import VoicIcon from "../../Assests/Dashboard/void.svg";
import ActiveIcon from "../../Assests/Dashboard/active.svg";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import useDebounce from "../../hooks/useDebouncs";
import { useAuthDetails } from "../../Common/cookiesHelper";
import Pagination from "../../AllUserComponents/Users/UnverifeDetails/Pagination";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
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

const PurchaseTable = ({ seVisible }) => {
  // for list Purchase Order
  const [searchId, setSearchId] = useState(""); // State to track search ID
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const debouncedValue = useDebounce(searchId);

  const AllpurchaseDataState = useSelector((state) => state.purchase);
  const dispatch = useDispatch();

  const { userTypeData } = useAuthDetails();

  // getting Purchase Order data
  useEffect(() => {
    const data = {
      ...userTypeData,
      perpage: rowsPerPage,
      merchant_id: "MAL0100CA",
      page: currentPage,
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
    };
    dispatch(fetchpurchaseData(data));
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches to update the total count
  useEffect(() => {
    dispatch(
      getPurchaseOrderCount({
        ...userTypeData,
        merchant_id: "MAL0100CA",
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      })
    );
  }, [debouncedValue]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    setTotalCount(AllpurchaseDataState.purchaseDataCount);
  }, [AllpurchaseDataState.purchaseDataCount]);

  const handleSearchInputChange = (value) => {
    setSearchId(value);
    setCurrentPage(1);
  };

  const tableRow = [
    "Order#",
    "Status",
    "Received",
    "Total Qty",
    "Vendor Name",
    "Total Cost",
    "Due",
    "Last Update",
    "Received At",
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="q-category-main-page">
        <div className="box">
          <div className="box_shadow_input">
            <Grid container className="py-5">
              <Grid item xs={12} className="px-5 ">
                <InputTextSearch
                  type="text"
                  placeholder="Search Purchase Order"
                  value={searchId}
                  handleChange={handleSearchInputChange}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      <div className="box_shadow_div">
        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-header">
            <span>Purchase Order</span>
            <p onClick={() => seVisible("AddPo")}>
              Add New PO <img src={AddIcon} alt="add-icon" />{" "}
            </p>
          </div>
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
            {AllpurchaseDataState.loading ? (
              <SkeletonTable columns={tableRow} />
            ) : (
              <>
                {AllpurchaseDataState.purchaseData &&
                Array.isArray(AllpurchaseDataState.purchaseData) &&
                AllpurchaseDataState.purchaseData.length >= 1 ? (
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          {tableRow.map((item, index) => (
                            <StyledTableCell align="center" key={item}>
                              {item}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {AllpurchaseDataState.purchaseData.map(
                          (purchaseData, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">
                                <Link
                                  to={`/purchase-data/${purchaseData.id}`}
                                  className={"text-[#0A64F9]"}
                                >
                                  {purchaseData.po_number}
                                </Link>
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                <div className="flex justify-center">
                                  {purchaseData.is_void === "1" ? (
                                    <p className="purchase-data-sort  text-[#F90A0A]">
                                      Void
                                    </p>
                                  ) : purchaseData.is_draft === "1" ? (
                                    <p className="purchase-data-sort  text-[#646464]">
                                      Draft
                                    </p>
                                  ) : purchaseData.received_status === "0" ? (
                                    <p className="purchase-data-sort  text-[#0A64F9]">
                                      Active
                                    </p>
                                  ) : purchaseData.received_status === "1" ? (
                                    <p className="purchase-data-sort  text-[#FF8800]">
                                      Partial
                                    </p>
                                  ) : purchaseData.received_status === "2" ? (
                                    <p className="purchase-data-sort  text-[#17B11D]">
                                      Received
                                    </p>
                                  ) : (
                                    <p className="purchase-data-sort   text-[#0A64F9]">
                                      Active
                                    </p>
                                  )}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <div className="flex justify-center">
                                  {purchaseData.is_void === "1" ? (
                                    <p className="purchase-data-sort "></p>
                                  ) : purchaseData.is_draft === "1" ? (
                                    <p className="purchase-data-sort "></p>
                                  ) : purchaseData.received_status === "0" ? (
                                    <p className="purchase-data-sort ">
                                      <img src={ActiveIcon} alt="Active" />
                                    </p>
                                  ) : purchaseData.received_status === "1" ? (
                                    <p className="purchase-data-sort ">
                                      <img src={VoicIcon} alt="Partial" />
                                    </p>
                                  ) : purchaseData.received_status === "2" ? (
                                    <p className="purchase-data-sort ">
                                      <img
                                        src={ResciveIcon}
                                        alt="ResciveIcon"
                                      />
                                    </p>
                                  ) : (
                                    <p className="purchase-data-sort ">
                                      <img src={ActiveIcon} alt="ActiveIcon" />
                                    </p>
                                  )}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <div className="flex justify-center">
                                  <p className="purchase-data-sort purchaseData ">
                                    {purchaseData.total_qty}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align="">
                                <div className="flex justify-center">
                                  <p className="  purchaseData text-center">
                                    {purchaseData.vendor_name}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex justify-center">
                                  <p className=" purchaseData ">
                                    {purchaseData.total_cost !== null
                                      ? `$${Number(
                                          purchaseData.total_cost
                                        ).toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}`
                                      : "$0.00"}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex justify-center">
                                  <p className="purchaseData">
                                    {purchaseData.stock_date === "0000-00-00"
                                      ? "-"
                                      : new Date(purchaseData.stock_date).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex justify-center">
                                  <p className=" purchaseData ">
                                    {purchaseData.updated_at ===
                                    "0000-00-00 00:00:00"
                                      ? new Date(purchaseData.created_at).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })
                                      : new Date(purchaseData.updated_at).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex justify-center">
                                  <p className=" purchaseData">
                                    {purchaseData.received_status === "2"
                                      ? purchaseData.received_at !==
                                        "0000-00-00 00:00:00"
                                        ? new Date(purchaseData.received_at).toLocaleDateString("en-US", {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        })
                                        : "11/30/-0001"
                                      : "-"}
                                  </p>
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <p className="px-5 py-4">No Data Found</p>
                )}
              </>
            )}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default PurchaseTable;
