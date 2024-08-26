import React, { useEffect, useState } from "react";
import {
  Grid,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import sortIcon from "../../Assests/Category/SortingW.svg";
import Pagination from "../Users/UnverifeDetails/Pagination";
import { priceFormate } from "../../hooks/priceFormate";
import { Link } from "react-router-dom";
import ConfirmModal from "../../reuseableComponents/ConfirmModal";
import axios from "axios";
import { BASE_URL, REFUND_EMAIL_STATUS_CHANGE } from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from '../../CommonComponents/ToastifyAlert';
import NoDataFound from "../../reuseableComponents/NoDataFound";
import { fetchRefundRequestArr,fetchRefundRequestArrCount } from "../../Redux/features/RefundRequest/RefundRequestSlice";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
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
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));
export default function RefundRequestTable({
  currentPage,
  totalCount,
  rowsPerPage,
  paginate,
  setRowsPerPage,
  setCurrentPage,
  setTotalCount,
  dataArr,
  setDataArr,
  debouncedValue,
  setOption,
  refundDropDownOptions,
  getUnAutherisedTokenMessage,
  handleCoockieExpire


}) {
  const RefundRequestReduxState = useSelector(
    (state) => state.RefundRequestList
  );
  const dispatch = useDispatch()
  const [sortOrder, setSortOrder] = useState("asc");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  useEffect(() => {
    if (
      !RefundRequestReduxState.loading &&
      RefundRequestReduxState.RefundRequestArr
    ) {
      setDataArr(RefundRequestReduxState.RefundRequestArr);
    } else {
      setDataArr([]);
    }
  }, [RefundRequestReduxState, RefundRequestReduxState.RefundRequestArr]);

  useEffect(() => {
    if (
      !RefundRequestReduxState.loading &&
      RefundRequestReduxState.RefundRequestCount
    ) {
      setTotalCount(RefundRequestReduxState.RefundRequestCount);
    } else {
      setTotalCount(0);
    }
  }, [RefundRequestReduxState, RefundRequestReduxState.RefundRequestCount]);
  const tableRow = [
    { type: "str", name: "merchant_name", label: "Merchant Name" },
    { type: "date", name: "order_date_time", label: "Order Date And Time" },
    { type: "str", name: "merchant_id", label: "Merchat Id" },
    { type: "num", name: "refund_amt", label: "Refund Amount" },
    { type: "", name: "", label: "Status" },

    { type: "str", name: "order_id", label: "Order Id" },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      dataArr,
      type,
      name,
      sortOrder
    );
    setDataArr(sortedItems);
    setSortOrder(newOrder);
  };
  const confirmfun = async (id, status) => {
    const { token, ...otherData } = userTypeData;
    try {
      const data = {
        status: status === 0 ? "1" : "0",
        id: id,
        ...otherData,
      };
      const response = await axios.post(
        BASE_URL + REFUND_EMAIL_STATUS_CHANGE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.status ===true){
        setDataArr(prevState => prevState.filter(item => item.id !== id))
          // setTotalCount((prevCount) => prevCount - 1); // Decrement total count
          try {
            let data = {
              perpage: rowsPerPage,
              page: currentPage,
              search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
              is_close: setOption(refundDropDownOptions),
              ...userTypeData,
            };
            if (data) {
              await dispatch(fetchRefundRequestArr(data)).unwrap();
              await dispatch(fetchRefundRequestArrCount(data)).unwrap();
            }
          } catch (error) {
            console.log(error);
            if (error.status == 401) {
              getUnAutherisedTokenMessage();
              handleCoockieExpire();
            }
          }
        ToastifyAlert("Updated Successfully","success")
      }
      else if(response.data.status ===false){
        ToastifyAlert(response.data.status.message,"error")
      }
    } catch (error) {}
    setConfirmModalOpen(false);
  };
  const handleHeaderCheckboxChange = (id, status) => {
    setSelectedItem({ id, status });
    setConfirmModalOpen(true);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        {RefundRequestReduxState.loading ||
        (RefundRequestReduxState.status && !dataArr.length) ? (
          <SkeletonTable columns={tableRow.map((item) => item.label)} />
        ) : (
          <>
            <Grid item xs={12}>
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
                    data={dataArr}
                  />
                </Grid>
              </Grid>

              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    {tableRow.map((item, index) => (
                      <StyledTableCell key={index}>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName(item.type, item.name)}
                          disabled={item.name === ""}
                        >
                          <p>{item.label}</p>
                          {item.name !== "" ? (
                            <img src={sortIcon} alt="" className="pl-1" />
                          ) : (
                            ""
                          )}
                        </button>
                      </StyledTableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {dataArr.length > 0 &&
                      dataArr?.map((item, index) => (
                        <>
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p>{item.merchant_name}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{item.order_date_time}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{item.merchant_id}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>${priceFormate(item.refund_amt)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div
                                className="category-checkmark-div defaultCheckbox-div"
                                style={{ width: "unset !important" }}
                              >

                                <label className="category-checkmark-label">
                                  <input
                                    type="checkbox"
                                    id="selectAll"
                                    checked={parseInt(item.status)}
                                    onChange={() =>
                                      handleHeaderCheckboxChange(
                                        item.id,
                                        parseInt(item.status)
                                      )
                                    }
                                  />
                                  <span
                                    className="category-checkmark"
                                    style={{
                                      left: "1rem",
                                      transform: "translate(0px, -10px)",
                                    }}
                                  ></span>
                                </label>
                              </div>{" "}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Link
                                className="whitespace-nowrap text-[#0A64F9]"
                                to={`/order/store-reporting/order-summary/${item.merchant_id}/${item?.order_id}`}
                                // onClick={() => handleSummeryPage(row.order_id)}
                                target="_blank"
                              >
                                <p>{item.order_id}</p>
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      ))}
                  </TableBody>
                </StyledTable>
                {!dataArr.length && <NoDataFound />}
              </TableContainer>
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
                    data={dataArr}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      {selectedItem && (
        <ConfirmModal
          headerText="Confirm Change Status"
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={() => confirmfun(selectedItem.id, selectedItem.status)}
        />
      )}
    </>
  );
}
