import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import {
  fetchpurchaseData,
  getPurchaseOrderCount,
} from "../../Redux/features/PurchaseOrder/purchaseOrderSlice";
import { useSelector, useDispatch } from "react-redux";
import sortIcon from "../../Assests/Category/SortingW.svg";
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
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import useDebounce from "../../hooks/useDebouncs";
import { useAuthDetails } from "../../Common/cookiesHelper";
import Pagination from "../../AllUserComponents/Users/UnverifeDetails/Pagination";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import { priceFormate } from "../../hooks/priceFormate";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "./../../Common/passwordShow";
import NoDataFound from "../../reuseableComponents/NoDataFound";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
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
    // border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const PurchaseTable = ({ seVisible }) => {
  // for list Purchase Order
  const navigate = useNavigate();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const [searchId, setSearchId] = useState(""); // State to track search ID
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const debouncedValue = useDebounce(searchId);
  const [allPurchaseData, setAllPurchaseData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const AllpurchaseDataState = useSelector((state) => state.purchase);
  const dispatch = useDispatch();

  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();

  // getting Purchase Order data
  const getPurchaseOrderData = async () => {
    try {
      const data = {
        ...userTypeData,
        perpage: rowsPerPage,
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        page: currentPage,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      };
      await dispatch(fetchpurchaseData(data)).unwrap();
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
    getPurchaseOrderData();
  }, [currentPage, debouncedValue, rowsPerPage]);

  // only when user searches to update the total count
  const getPurchaseOrderDataCount = async () => {
    try {
      await dispatch(
        getPurchaseOrderCount({
          ...userTypeData,
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
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
    getPurchaseOrderDataCount();
  }, [debouncedValue]);

  // on load setting count of Verified Merchant list & on every change...
  useEffect(() => {
    if (!AllpurchaseDataState.loading && AllpurchaseDataState) {
      setTotalCount(AllpurchaseDataState?.purchaseDataCount);
      const updatedList = AllpurchaseDataState?.purchaseData?.map((item) => {
        let status, textColor, icon;
        if (item.is_void === "1") {
          status = "Void";
          textColor = "text-[#F90A0A]";
          icon = "";
        } else if (item.is_draft === "1") {
          status = "Draft";
          textColor = "text-[#646464]";
          icon = "";
        } else if (item.received_status === "0") {
          status = "Active";
          textColor = "text-[#0A64F9]";
          icon = ActiveIcon;
        } else if (item.received_status === "1") {
          status = "Partial";
          textColor = "text-[#FF8800]";
          icon = VoicIcon;
        } else if (item.received_status === "2") {
          status = "Received";
          textColor = "text-[#17B11D]";
          icon = ResciveIcon;
        } else {
          status = "Active";
          textColor = "text-[#0A64F9]";
          icon = ActiveIcon;
        }
        return {
          ...item,
          status: status,
          textColor: textColor,
          icon: icon,
          due: item.stock_date === "0000-00-00" ? "-" : item.stock_date,
          lastUpdate:
            item.updated_at === "0000-00-00 00:00:00"
              ? item.created_at
              : item.updated_at,
          receviedAt:
            item.received_status === "2" &&
            item.received_at !== "0000-00-00 00:00:00"
              ? item.received_at
              : "-",
        };
      });
      setAllPurchaseData(updatedList);
    }
  }, [
    AllpurchaseDataState.purchaseDataCount,
    AllpurchaseDataState?.purchaseData,
  ]);

  const handleSearchInputChange = (value) => {
    setSearchId(value);
    setCurrentPage(1);
  };

  const tableRow = [
    { type: "id", name: "po_number", label: "Order#" },
    { type: "str", name: "status", label: "Status" },
    { type: "str", name: "status", label: "Received" },
    { type: "num", name: "total_qty", label: "Total Qty" },
    { type: "str", name: "vendor_name", label: "Vendor Name" },
    { type: "num", name: "total_cost", label: "Total Cost" },
    { type: "str", name: "due", label: "Due" },
    { type: "date", name: "lastUpdate", label: "Last Update" },
    { type: "str", name: "receviedAt", label: "Received At" },
  ];

  // const tableRow = [
  //   "Order#",
  //   "Status",
  //   "Received",
  //   "Total Qty",
  //   "Vendor Name",
  //   "Total Cost",
  //   "Due",
  //   "Last Update",
  //   "Received At",
  // ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      allPurchaseData,
      type,
      name,
      sortOrder
    );
    setAllPurchaseData(sortedItems);
    setSortOrder(newOrder);
  };
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
            <p onClick={() => navigate("/purchase-data/add")}>
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
                showEntries={true}
                data={allPurchaseData}
              />
            </Grid>
          </Grid>
          <Grid container>
            {AllpurchaseDataState.loading ? (
              <SkeletonTable columns={tableRow.map((item) => item.label)} />
            ) : (
              <>
                {allPurchaseData &&
                Array.isArray(allPurchaseData) &&
                allPurchaseData.length >= 1 ? (
                  <TableContainer
                    sx={{ borderTopRightRadius: "0", borderTopLeftRadius: "0" }}
                    component={Paper}
                  >
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          {tableRow.map((item, index) => (
                            <StyledTableCell align="center" key={index}>
                              <button
                                className="flex items-center"
                                onClick={() =>
                                  sortByItemName(item.type, item.name)
                                }
                              >
                                <p>{item.label}</p>
                                {item.name ? (
                                  <img src={sortIcon} alt="" className="pl-1" />
                                ) : (
                                  ""
                                )}
                              </button>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {console.log(
                          "purchaseData: ",
                          AllpurchaseDataState.purchaseData
                        )} */}
                        {allPurchaseData &&
                          allPurchaseData.length > 0 &&
                          allPurchaseData.map((purchaseData, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                <Link
                                  to={
                                    purchaseData.is_draft === "1"
                                      ? `/purchase-data/edit/${purchaseData.id}`
                                      : `/purchase-data/${purchaseData.id}`
                                  }
                                  className={"text-[#0A64F9]"}
                                >
                                  {purchaseData.po_number}
                                </Link>
                              </StyledTableCell>

                              <StyledTableCell>
                                <div className="flex">
                                  {/* {purchaseData.is_void === "1" ? (
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
                                  )} */}
                                  <p
                                    className={`purchase-data-sort  ${purchaseData.textColor}`}
                                  >
                                    {purchaseData.status}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                {/* <div className="flex justify-center">
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
                                 
                                </div> */}
                                <div>
                                  {purchaseData.icon ? (
                                    <p className="purchase-data-sort">
                                      <img
                                        src={purchaseData.icon}
                                        alt={purchaseData.status}
                                      />
                                    </p>
                                  ) : (
                                    <p className="purchase-data-sort"></p>
                                  )}
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex ">
                                  <p className="purchase-data-sort purchaseData ">
                                    {priceFormate(
                                      Number(purchaseData.total_qty)
                                    )}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex">
                                  <p className="  purchaseData text-center">
                                    {purchaseData.vendor_name}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex">
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
                                <div className="flex">
                                  <p className="purchaseData">
                                    {purchaseData.stock_date === "0000-00-00"
                                      ? "-"
                                      : new Date(
                                          purchaseData.stock_date
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                {/* <div className="flex justify-center">
                                  <p className=" purchaseData ">
                                    {purchaseData.updated_at ===
                                    "0000-00-00 00:00:00"
                                      ? new Date(
                                          purchaseData.created_at
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      : new Date(
                                          purchaseData.updated_at
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                  </p>
                                </div> */}
                                <div className="flex">
                                  <p className="purchaseData">
                                    {new Date(
                                      purchaseData.lastUpdate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell>
                                <div className="flex">
                                  <p className=" purchaseData">
                                    {purchaseData.received_status === "2" &&
                                    purchaseData.received_at !==
                                      "0000-00-00 00:00:00"
                                      ? new Date(
                                          purchaseData.received_at
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      : "-"}
                                  </p>
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                 ""
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
                data={allPurchaseData}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {!AllpurchaseDataState.loading && !allPurchaseData?.length && <NoDataFound />}
    </>
  );
};

export default PurchaseTable;
