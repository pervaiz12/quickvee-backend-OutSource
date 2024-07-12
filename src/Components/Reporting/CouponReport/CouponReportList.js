import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCouponReportData } from "../../../Redux/features/Reports/CouponReport/CouponReportSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { priceFormate } from "../../../hooks/priceFormate";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";

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
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const CouponReportList = (props) => {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [CouponReportData, setCouponReportData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const CouponReportDataState = useSelector((state) => state.CouponReportList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getCouponReportData();
  }, [props, dispatch]);
  const getCouponReportData = async () => {
    if (props && props.selectedDateRange) {
      try {
        const startDateData = props.selectedDateRange.start_date;
        const endDateData = props.selectedDateRange.end_date;
        let data = {
          merchant_id,
          start_date: startDateData,
          end_date: endDateData,
          ...userTypeData,
        };

        if (data) {
          await dispatch(fetchCouponReportData(data)).unwrap();
        }
      } catch (error) {
        console.log(error);
        if (error.status == 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        }
      }
    }
  };

  useEffect(() => {
    if (
      !CouponReportDataState.loading &&
      CouponReportDataState.CouponReportData
    ) {
      const uodatedList = Array.isArray(CouponReportDataState?.CouponReportData)
        ? CouponReportDataState?.CouponReportData?.map((item) => {
            return {
              ...item,
              couponName:
                item.coupon_type === "Discount"
                  ? "Direct Discount By App"
                  : item.coupon_type,
            };
          })
        : "";
      setCouponReportData(uodatedList);
    } else {
      setCouponReportData([]);
    }
  }, [CouponReportDataState.loading, CouponReportDataState.CouponReportData]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  const tableRow = [
    { type: "date", name: "date", label: "Date" },
    { type: "str", name: "couponName", label: "Coupon Name" },
    { type: "num", name: "total_coupons_used", label: "Total Coupon Used" },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      CouponReportData,
      type,
      name,
      sortOrder
    );
    setCouponReportData(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {CouponReportDataState.loading ? (
            <SkeletonTable columns={tableRow.map((item) => item.label)} />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  {tableRow.map((item, index) => (
                    <StyledTableCell key={index}>
                      <button
                        className="flex items-center"
                        onClick={() => sortByItemName(item.type, item.name)}
                      >
                        <p>{item.label}</p>
                        <img src={sortIcon} alt="" className="pl-1" />
                      </button>
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {CouponReportData.length > 0 &&
                    CouponReportData.map((couponData, index) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <p className="report-title">
                            {formatDate(couponData.date)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          {/* <p className="report-title">
                            {couponData.coupon_type === "Discount"
                              ? "Direct Discount By App"
                              : couponData.coupon_type}
                          </p> */}
                          <p>{couponData.couponName}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">
                            {priceFormate(couponData.total_coupons_used)}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  {!CouponReportData.length > 0 && (
                    <div className="box">
                      <div className="q-category-bottom-categories-single-category">
                        <p>No data found</p>
                      </div>
                    </div>
                  )}
                </TableBody>
              </StyledTable>
            </TableContainer>
          )}
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-title">Date</p>
          <p className="report-title">Coupon Type</p>
          <p className="report-title">Total Coupon Used</p>
   
        </div>
        {CouponReportData.length > 0 ? (
          CouponReportData.map((couponData, index) => (
            <div className="q-category-bottom-categories-listing" key={index}>
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{couponData.date}</p>
                <p className="report-title">
                  {couponData.coupon_type === "Discount"
                    ? "Direct Discount By App"
                    : couponData.coupon_type}
                </p>
                <p className="report-title">{couponData.total_coupons_used}</p>
     
              </div>
            </div>
          ))
        ) : (
          <div className="q-category-bottom-categories-listing">
            <div className="q-category-bottom-categories-single-category">
              <p className="report-title">No data found</p>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default CouponReportList;
