import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDropCashReportData } from "../../../Redux/features/Reports/DropCashReport/DropCashReportSlice";
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
import useDelayedNodata from "../../../hooks/useDelayedNoData";

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

const DropCashReportList = (props) => {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [DropCashReportData, setDropCashReportData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const DropCashReportDataState = useSelector((state) => state.DropCashReportList);
  const showNoData = useDelayedNodata(DropCashReportData)
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
          await dispatch(fetchDropCashReportData(data)).unwrap();
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
      !DropCashReportDataState.loading &&
      DropCashReportDataState.DropCashReportData
    ) {
      const uodatedList = Array.isArray(DropCashReportDataState?.DropCashReportData)
        ? DropCashReportDataState?.DropCashReportData?.map((item) => {
            return {
              ...item,
            };
          })
        : [];
      setDropCashReportData(uodatedList);
      settotal(
        DropCashReportDataState?.DropCashReportData?.length > 0
          ? DropCashReportDataState?.DropCashReportData?.reduce(
              (total, report) => total + parseFloat(report.amount ?? 0),
              0
            )
          : 0
      );

    } else {
      setDropCashReportData([]);
    }
  }, [DropCashReportDataState.loading, DropCashReportDataState.DropCashReportData]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };
  const tableRow = [
    { type: "str", name: "f_name", label: "Employee Name" },
    { type: "date", name: "created_at", label: "Transaction Date" },
    { type: "str", name: "reason", label: "Reason" },
    { type: "num", name: "amount", label: "Amount" },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      DropCashReportData,
      type,
      name,
      sortOrder
    );
    setDropCashReportData(sortedItems);
    setSortOrder(newOrder);
  };
  const [total, settotal] = useState(0);
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {DropCashReportDataState.loading ? (
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
                {DropCashReportData.length > 0 ? (
                        <>
                  {DropCashReportData.length > 0 &&
                    DropCashReportData.map((data, index) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <p>{data.f_name ?? ""} {data.l_name ?? ""}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">
                            {formatDateTime(data.created_at)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{data.reason}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">
                            ${priceFormate(parseFloat( data.amount ?? 0 ).toFixed(2))}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                   
                    <StyledTableCell className="trBG_Color">
                            <div className="">
                              <div>
                                <p className="report-sort totalReport">Total</p>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className="trBG_Color"></StyledTableCell>
                          <StyledTableCell className="trBG_Color"></StyledTableCell>
                          <StyledTableCell  className="trBG_Color">
                            <div className="">
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
              {  showNoData &&  !DropCashReportData.length  && <NoDataFound />}
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DropCashReportList;
