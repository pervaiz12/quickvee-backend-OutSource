import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCouponReportData } from "../../../Redux/features/Reports/CouponReport/CouponReportSlice";
import { fetchPayinReportData } from "../../../Redux/features/Reports/PayInReport/PayInReportSlice";
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
import NoDataFound from "../../../reuseableComponents/NoDataFound";

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

const PayInList = (props) => {
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
      settotal(
        CouponReportDataState?.CouponReportData?.length > 0
          ? CouponReportDataState?.CouponReportData?.reduce(
              (total, report) => total + parseFloat(report.total_coupons_used),
              0
            )
          : 0
      );

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
    { type: "num", name: "total_coupons_used", label: "Amount" },
  ];
//    const tableRow = [
//     { type: "date", name: "date", label: "Transaction Date" },
//     { type: "num", name: "amount", label: "Amount" },
//   ];


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


  const [total, settotal] = useState(0);

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
                {CouponReportData.length > 0 ? (
                        <>
                  {CouponReportData.length > 0 &&
                    CouponReportData.map((couponData, index) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <p className="report-title">
                            {formatDate(couponData.date)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">
                            ${priceFormate(parseFloat( couponData.total_coupons_used ).toFixed(2))}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    <StyledTableCell className="trBG_Color">
                            <div className="q-category-bottom-report-listing">
                              <div>
                                <p className="report-sort totalReport">Total</p>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell  className="trBG_Color">
                            <div className="q-category-bottom-report-listing">
                              <div>
                                <p className="report-title totalReport">
                                  ${priceFormate(total.toFixed(2))}
                                </p>
                              </div>
                            </div>
                          </StyledTableCell>
                          </>
                      ) : (
                        ""
                      )}
                </TableBody>
              </StyledTable>
              {!CouponReportData.length  && <NoDataFound />}
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PayInList;
