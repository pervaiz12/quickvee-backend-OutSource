import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [PayinReportData, setPayinReportData] = useState([]);
  const showNoData = useDelayedNodata(PayinReportData)
  const [sortOrder, setSortOrder] = useState("asc");
  const PayInReportDataState = useSelector((state) => state.PayinReportList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getayinReportData();
  }, [props, dispatch]);
  const getayinReportData = async () => {
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
          await dispatch(fetchPayinReportData(data)).unwrap();
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
      !PayInReportDataState.loading &&
      PayInReportDataState.PayinReportData
    ) {
      const uodatedList = Array.isArray(PayInReportDataState?.PayinReportData)
        ? PayInReportDataState?.PayinReportData?.map((item) => {
            return {
              ...item,
            };
          })
        : [];
      setPayinReportData(uodatedList);
      settotal(
        PayInReportDataState?.PayinReportData?.length > 0
          ? PayInReportDataState?.PayinReportData?.reduce(
              (total, report) => total + parseFloat(report.amount ?? 0),
              0
            )
          : 0
      );

    } else {
      setPayinReportData([]);
    }
  }, [PayInReportDataState.loading, PayInReportDataState.PayinReportData]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };
  const tableRow = [
    { type: "date", name: "created_at", label: "Transaction Date" },
    { type: "str", name: "reason", label: "Reason" },
    { type: "num", name: "amount", label: "Amount" },
  ];


  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      PayinReportData,
      type,
      name,
      sortOrder
    );
    setPayinReportData(sortedItems);
    setSortOrder(newOrder);
  };


  const [total, settotal] = useState(0);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {PayInReportDataState.loading ? (
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
                {PayinReportData.length > 0 ? (
                        <>
                  {PayinReportData.length > 0 &&
                    PayinReportData.map((data, index) => (
                      <StyledTableRow>
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
              {showNoData && !PayinReportData.length  && <NoDataFound />}
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PayInList;
