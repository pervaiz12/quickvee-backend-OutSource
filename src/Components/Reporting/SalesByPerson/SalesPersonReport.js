import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalePersonData } from "../../../Redux/features/SalesByPerson/SalesByPersonSlice";
import { Link } from "react-router-dom";
import OrderSummaryDetails from "./MainOrderSumaaryDetails/OrderSummaryDetails";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";

// ==================== TABLE STYLE ADDED ===================================================
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
    color: "#818181",
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
  // "&:last-child td, &:last-child th": {
  //   backgroundColor:"#F5F5F5"
  // },
}));
// ==================== END TABLE STYLE ADDED ===================================================

const SalesPersonReport = (props) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  // console.log(props);
  const dispatch = useDispatch();
  const [allSalesByPersonData, setallSalesByPersonData] = useState("");
  const AllSalesByPersonDataState = useSelector(
    (state) => state.SalesByPersonList
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id,
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        order_typ: props.OrderTypeData,
        order_env: props.OrderSourceData,
        employee_id: props.SelectEmpListData,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchSalePersonData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (
      !AllSalesByPersonDataState.loading &&
      AllSalesByPersonDataState.SalePersonData
    ) {
      // console.log(AllSalesByPersonDataState.SalePersonData)
      setallSalesByPersonData(AllSalesByPersonDataState.SalePersonData);
    } else {
      setallSalesByPersonData("");
    }
  }, [
    AllSalesByPersonDataState,
    AllSalesByPersonDataState.loading,
    AllSalesByPersonDataState.ItemSalesData,
  ]);

  useEffect(() => {
    console.log(allSalesByPersonData);
  }, [allSalesByPersonData]);

  if (!allSalesByPersonData ||  Object.keys(allSalesByPersonData).length === 0) {
    return (
      <>
        <Grid container sx={{ padding: 2.5 }} className="box_shadow_div ">
          <Grid item xs={12}>
            No data Found.
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      {allSalesByPersonData &&
        Object.keys(allSalesByPersonData).map((EmpData, index) => (
          <>
            <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                <div className="q-category-bottom-header">
                  <div className="q_details_header ml-2">
                    Employee Name: {EmpData}
                  </div>
                </div>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell>Order ID</StyledTableCell>
                      <StyledTableCell>Date Time</StyledTableCell>
                      <StyledTableCell align="center">Total</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {allSalesByPersonData[EmpData]?.map(
                        (SalesData, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell sx={{ width: "33%" }}>
                              <Link
                                to={`/store-reporting/order-summary/${SalesData.order_id}`}
                              >
                                <p>{SalesData.order_id}</p>
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                borderRight: "1px solid #E3E3E3",
                                width: "33%",
                              }}
                            >
                              <p>{SalesData.merchant_time}</p>
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              sx={{ width: "33%" }}
                            >
                              <p> ${SalesData.amt}</p>
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      )}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              </Grid>
            </Grid>
            {/* <div key={index} className="q-attributes-bottom-detail-section">
              <div className="q-category-bottom-header">
                <div className="q_details_header ml-2">
                  Employee Name: {EmpData}
                </div>
              </div>

              <div className="q-attributes-bottom-attriButes-header">
                <p className="q-sales-item">Order ID</p>
                <p className="q-sales-in ">Date Time</p>
                <p className="q-sales-total ">Total</p>
              </div>
              {allSalesByPersonData[EmpData].map((SalesData, index1) => (
                <div
                  key={index1}
                  className="q-attributes-bottom-attriButes-listing "
                >
                  <div className="q-employee-bottom-attriButes-single-attributes text-center ">
                    <Link
                      to={`/store-reporting/order-summary/${SalesData.order_id}`}
                    >
                      <p className="q-sales-item">{SalesData.order_id}</p>
                    </Link>
                    <p className="q-sales-in">{SalesData.merchant_time}</p>
                    <p className="q-sales-total"> ${SalesData.amt}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </>
        ))}
    </>
  );
};

export default SalesPersonReport;
