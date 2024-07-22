import React, { useEffect, useState } from "react";

// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalesReportData } from "../../../Redux/features/Reports/SalesReport/SalesReportSlice";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";

import { priceFormate } from "../../../hooks/priceFormate";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import Skeleton from "react-loading-skeleton";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium",
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
    backgroundColor: "#F8F8F8",
  },
  "& td, & th": {
    border: "none",
  },
  // hide last border
}));

const SalesReportList = (props) => {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [SalesReportData, setSalesReportData] = useState({});
  const SalesReportDataState = useSelector((state) => state.SalesReportList);
  
  useEffect(() => {
    getAllRecord();
  }, [props, dispatch]);

  const getAllRecord = async () => {
    if (props && props.selectedDateRange) {
      const StartDateData = props.selectedDateRange.start_date;
      const EndDateData = props.selectedDateRange.end_date;

      let data = {
        merchant_id: merchant_id,
        start_date: StartDateData,
        end_date: EndDateData,
        order_env: 9,
        order_typ: "both",
      };
      
      if (data) {
        try {
          await dispatch(fetchSalesReportData(data)).unwrap();
        } catch (error) {
          if (error.status == 401 || error.response.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!SalesReportDataState.loading && SalesReportDataState.SalesReportData) {
      
      setSalesReportData(SalesReportDataState.SalesReportData);
    } else {
      setSalesReportData({});
    }
  }, [SalesReportDataState.loading, SalesReportDataState.SalesReportData]);

  const { data } = SalesReportData;

  const gross_sale = parseFloat(SalesReportData.subtotal);

  const discount = parseFloat(SalesReportData.discount);
  const total_gift_card_amount = parseFloat(
    SalesReportData.total_gift_card_amount
  );
  const total_loyalty_point_spent = parseFloat(
    SalesReportData.total_loyalty_point_spent
  );

  

  const discount1 =
    parseFloat(discount) -
    (parseFloat(total_gift_card_amount) +
      parseFloat(total_loyalty_point_spent));

  const loyaltyPoint =
    parseFloat(SalesReportData.total_loyalty_point_spent) -
    parseFloat(SalesReportData.loyality_amt_refunded);
  const refunds =
    parseFloat(SalesReportData.net_refund) +
    parseFloat(SalesReportData.net_refund1) -
    parseFloat(SalesReportData.refunded_all_tax);
  const netSales =
    parseFloat(gross_sale) -
    (parseFloat(discount1) + parseFloat(refunds)) -
    parseFloat(SalesReportData.giftcard_amt_collected) -
    parseFloat(SalesReportData.loyality_amt_collected);
  const taxesAndFees = (SalesReportData?.remain_default_tax ?  parseFloat(SalesReportData?.remain_default_tax) : 0) +
    parseFloat(SalesReportData?.remain_other_tax);
  const tip = parseFloat(SalesReportData.tip);
  const serviceCharges =
    parseFloat(SalesReportData.con_fee) + parseFloat(SalesReportData.del_fee);
  const cashDiscounting = parseFloat(SalesReportData.cash_discounting);
  const amountCollected =
    parseFloat(SalesReportData.card_collected) +
    parseFloat(SalesReportData.cash_collected) +
    parseFloat(SalesReportData.cash_ebt_collected) +
    parseFloat(SalesReportData.food_ebt_collected) +
    parseFloat(SalesReportData.cash_back_fee) +
    parseFloat(SalesReportData.cash_back_amt);

  const cashbackfee = parseFloat(SalesReportData.cash_back_fee) || 0;

  const CardCollected =
    parseFloat(SalesReportData.card_collected) +
    parseFloat(SalesReportData.cash_back_fee) +
    parseFloat(SalesReportData.cash_back_amt);

  const CashCollected =
    parseFloat(SalesReportData.cash_collected) -
    parseFloat(SalesReportData.cash_back_amt);
  
    
  const SalesSummeryList = [
    {
      name: "Gross Sale",
      amount: gross_sale,
    },
    {
      name: "Loyalty Point Redeemed",
      amount: loyaltyPoint,
    },
    {
      name: "Gift Card Amount Redeemed",
      amount: SalesReportData.giftcard_amt_collected,
    },
    {
      name: "Discount",
      amount: discount1,
    },
    {
      name: "Refunds",
      amount: refunds,
    },
    {
      name: "Net Sales",
      amount: Math.abs(netSales),
    },
    {
      name: "Taxes",
      amount: taxesAndFees,
    },
    {
      name: "Tips",
      amount: tip,
    },
    {
      name: "Services Charges",
      amount: serviceCharges,
    },
    {
      name: "Non Cash Adjustment Fees",
      amount: cashDiscounting,
    },
    {
      name: "Cashback Fees",
      amount: cashbackfee,
    },
  ];

  const SalesByTenderAndCardTypeList = [
    {
      name: "Credit Cards + Debit Cards",
      amount: CardCollected,
    },
    {
      name: "Cash",
      amount: CashCollected,
    },
    {
      name: "Food EBT Card Collected",
      amount: SalesReportData.food_ebt_collected,
    },
    {
      name: "Cash EBT Card Collected",
      amount: SalesReportData.cash_ebt_collected,
    },
    {
      name: "Amount Collected",
      amount: amountCollected,
    },
  ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      {SalesReportDataState.loading ? (
        <>
          <Grid container sx={{ padding: 0 }} spacing={2}>
            <Grid item xs={4}>
              <div className="box_shadow_div mt_card_header">
                <div className="text-[#707070] font-normal lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
                  <Skeleton />
                </div>
                <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                  <Skeleton />
                  
                  
                </div>
                
                


              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="box_shadow_div mt_card_header">
                <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
                  <Skeleton />
                </div>
                <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                  <Skeleton />
                </div>
                
                


              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="box_shadow_div mt_card_header">
                <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
                  <Skeleton />
                </div>
                <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                  <Skeleton />
                </div>
                
                


              </div>
            </Grid>
          </Grid>
          <Grid sx={{ pt: 2.5 }}>
            <SkeletonTable columns={[""]} />
          </Grid>
        </>
      ) : SalesReportData && SalesReportData.subtotal > 0 ? (
        <>
          <Grid container sx={{ padding: 0 }} spacing={2}>
            <Grid item xs={4}>
              <div className="box_shadow_div mt_card_header">
                <div className="text-[#707070] font-normal lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
                  <b>Gross Sale</b>
                </div>
                <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                  ${priceFormate(parseFloat(gross_sale).toFixed(2))}
                  
                  
                </div>
               
               


              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="box_shadow_div mt_card_header">
                <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
                  <b>Net Sale</b>
                </div>
                <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                  ${priceFormate(parseFloat(Math.abs(netSales)).toFixed(2))}
                </div>
                
                


              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="box_shadow_div mt_card_header">
                <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
                  <b>Amount Collected</b>
                </div>
                <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                  ${priceFormate(parseFloat(amountCollected).toFixed(2))}
                </div>
                
                

                
              </div>
            </Grid>
          </Grid>
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              {SalesReportDataState.loading ? (
                <SkeletonTable columns={["Sales Summary"]} />
              ) : (
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell>Sales Summary</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {SalesSummeryList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            sx={{
                              fontWeight:
                                item.name === "Gross Sale" ||
                                item.name === "Net Sales"
                                  ? "bold"
                                  : "normal",
                              borderRight: "1px solid #E3E3E3",
                              width: 400,
                              color:
                                item.name === "Gross Sale" ||
                                item.name === "Net Sales"
                                  ? "#0A64F9"
                                  : "",
                            }}
                          >
                            <div className="q_sales_trading_data p-0">
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            sx={{
                              fontWeight:
                                item.name === "Gross Sale" ||
                                item.name === "Net Sales"
                                  ? "bold"
                                  : "normal",
                              color:
                                item.name === "Gross Sale" ||
                                item.name === "Net Sales"
                                  ? "#0A64F9"
                                  : "",
                            }}
                          >
                            <p>
                              $
                              {priceFormate(parseFloat(item.amount).toFixed(2))}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              )}
            </Grid>
          </Grid>
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              {SalesReportDataState.loading ? (
                <SkeletonTable columns={[" Sales by Tender and Card Type"]} />
              ) : (
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell>
                        Sales by Tender and Card Type
                      </StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {SalesByTenderAndCardTypeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            sx={{
                              fontWeight:
                                item.name === "Amount Collected"
                                  ? "bold"
                                  : "normal",
                              borderRight: "1px solid #E3E3E3",
                              width: 400,
                              color:
                                item.name === "Amount Collected"
                                  ? "#0A64F9"
                                  : "",
                            }}
                          >
                            <div className="q_sales_trading_data p-0">
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            sx={{
                              fontWeight:
                                item.name === "Amount Collected"
                                  ? "bold"
                                  : "normal",
                              color:
                                item.name === "Amount Collected"
                                  ? "#0A64F9"
                                  : "",
                            }}
                          >
                            <p>
                              $
                              {priceFormate(parseFloat(item.amount).toFixed(2))}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid sx={{ padding: 2.5, margin: 0 }} className="box_shadow_div">
          <Grid item xs={12}>
            <p>No record found.</p>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SalesReportList;
