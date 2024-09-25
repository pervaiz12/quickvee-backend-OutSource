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
import { Grid, Tooltip, tooltipClasses } from "@mui/material";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";

import { priceFormate } from "../../../hooks/priceFormate";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
import { LuInfo } from "react-icons/lu";

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
      };

      if (data) {
        try {
          await dispatch(fetchSalesReportData(data)).unwrap();
        } catch (error) {
          if (error?.status == 401 || error?.response?.status === 401) {
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
  const taxesAndFees =
    (SalesReportData?.remain_default_tax
      ? parseFloat(SalesReportData?.remain_default_tax)
      : 0) + parseFloat(SalesReportData?.remain_other_tax);
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

  const NetTaxableSale = parseFloat(SalesReportData.taxable_net_sale) || 0;
  const NonNetTaxableSale =
    parseFloat(SalesReportData.non_taxable_net_sale) || 0;


    // for new Data Array Start 

    // for GrossSales 
    const LoyaltyPointsRedeemed = parseFloat(SalesReportData?.gross_sales?.loyalty_points_redeemed) || 0;
    const Discounts = parseFloat(SalesReportData?.gross_sales?.discount) || 0;
    const NetSales = parseFloat(SalesReportData?.gross_sales?.net_sales) || 0;
    const Refunds = parseFloat(SalesReportData?.gross_sales?.refund) || 0;
    const GrossSalesubtotal = parseFloat(SalesReportData?.gross_sales?.subtotal) || 0;
    
    // for  TotalAmountCollected
    const TotalAmountCollected = parseFloat(SalesReportData?.total_amount_collected) || 0;

    // for Taxes 
    const NONTaxable = parseFloat(SalesReportData?.non_taxable_total) || 0;
    const TotalEstimate = SalesReportData?.taxes?.reduce((sum, tax) => sum + (parseFloat(tax.total_collected_tax || 0) - parseFloat(tax.total_refunded_tax || 0)), 0)



    // for payouts
    // const Payoutcashback = parseFloat(SalesReportData?.payouts?.cash_back) || 0;
    // const Payoutlottery= parseFloat(SalesReportData?.payouts?.lottery) || 0;
    // const Payoutlottery_non_scrach= parseFloat(SalesReportData?.payouts?.lottery_non_scrach) || 0;
    // const Payoutvendor_payments= parseFloat(SalesReportData?.payouts?.vendor_payments) || 0;

    const PayoutCashback = {
      pay_out: parseFloat(SalesReportData?.payouts?.cash_back?.pay_out) || 0,
      transactions: parseInt(SalesReportData?.payouts?.cash_back?.transactions) || 0
    };

    const Payoutlottery = {
      pay_out: parseFloat(SalesReportData?.payouts?.lottery?.pay_out) || 0,
      transactions: parseInt(SalesReportData?.payouts?.lottery?.transactions) || 0
    };

    const Payoutlottery_non_scrach = {
      pay_out: parseFloat(SalesReportData?.payouts?.lottery_non_scrach?.pay_out) || 0,
      transactions: parseInt(SalesReportData?.payouts?.lottery_non_scrach?.transactions) || 0
    };

    const Payoutvendor_payments = {
      pay_out: parseFloat(SalesReportData?.payouts?.vendor_payments?.pay_out) || 0,
      transactions: parseInt(SalesReportData?.payouts?.vendor_payments?.transactions) || 0
    };

    // for sales_by_tender_type
    const sales_by_tender_type= SalesReportData?.sales_by_tender_type || {};
    const totalCollected = Object.values(sales_by_tender_type)?.reduce((acc, tender) => acc + (parseFloat(tender.collected  || 0) ) - (parseFloat(tender.refunds  || 0) ) , 0);
    const totalTransactions = Object.values(sales_by_tender_type)?.reduce((acc, tender) => acc + (tender.transactions || 0), 0);
    const CashCollectedL = (sales_by_tender_type?.cash?.collected - sales_by_tender_type?.cash?.refunds) || 0;

    // for OtherFeeList
    const ServicesCharges = parseFloat(SalesReportData?.other_fees?.breakdown?.convenience_fee) || 0;
    const DeliveryFees = parseFloat(SalesReportData?.other_fees?.breakdown?.delivery_fee) || 0;
    const NonCashAdjustmentFees = parseFloat(SalesReportData?.other_fees?.breakdown?.cash_discounting) || 0;
    const Tip = parseFloat(SalesReportData?.other_fees?.breakdown?.tip) || 0;
    const Cashbackfee = parseFloat(SalesReportData?.other_fees?.breakdown?.cash_back_fee) || 0;

    // for new Data Array End


  const PayoutsTypeList = [
    {
      name: "Cash Back",
      amount: PayoutCashback?.pay_out,
      number: PayoutCashback?.transactions,
    },
    {
      name: "Lottery",
      amount: Payoutlottery?.pay_out,
      number: Payoutlottery?.transactions,
    },
    {
      name: "Lottery - Non-Scratchers",
      amount: Payoutlottery_non_scrach?.pay_out,
      number: Payoutlottery_non_scrach?.transactions,
    },
    {
      name: "Vendor Payout",
      amount: Payoutvendor_payments,
      amount: Payoutvendor_payments?.pay_out,
      number: Payoutvendor_payments?.transactions,
    },
    // {
    //   name: "Checks Cashed",
    //   amount: "785.00",
    //   number: 3,
    // },
    {
      name: "Total",
      amount: (PayoutCashback?.pay_out+Payoutlottery?.pay_out+Payoutlottery_non_scrach?.pay_out+Payoutvendor_payments?.pay_out),
      number: (PayoutCashback?.transactions+Payoutlottery?.transactions+Payoutlottery_non_scrach?.transactions+Payoutvendor_payments?.transactions),
    },
  ];


  const GrossSaleList = [
    {
      name: "Loyalty Points Redeemed",
      amount: LoyaltyPointsRedeemed,
    },
    {
      name: "Discounts",
      amount: Discounts,
    },
    {
      name: "Refunds",
      amount: Refunds,
    },
    {
      name: "Net Sales",
      amount: NetSales,
    },
  ];


  const OtherFeeList = [
    {
      name: "Services Charges",
      amount: ServicesCharges+DeliveryFees,
    },
    // {
    //   name: "Delivery Fees",
    //   amount: DeliveryFees,
    // },
    {
      name: "Non Cash Adjustment Fees",
      amount: NonCashAdjustmentFees,
    },
    {
      name: "Cash Back Fees",
      amount: Cashbackfee,
    },
    {
      name: "Tips",
      amount: Tip,
    },
    // {
    //   name: "Check Cashing Fees",
    //   amount: "-$35.00",
    // },
    {
      name: "Total Other Fees",
      amount: (ServicesCharges+DeliveryFees+NonCashAdjustmentFees+Tip+Cashbackfee),
    },
  ];

  const lastTotalIndexs = SalesReportData?.taxes?.map(item => item.taxesR1).lastIndexOf();


  const lastList = [
    {
      name: "Cash Collected",
      amount: CashCollectedL,
    },
    {
      name: "Total Payout",
      amount: (PayoutCashback?.pay_out+Payoutlottery?.pay_out+Payoutlottery_non_scrach?.pay_out+Payoutvendor_payments?.pay_out),
    },
    {
      name: "Remaining Cash",
      amount: CashCollectedL - (PayoutCashback?.pay_out+Payoutlottery?.pay_out+Payoutlottery_non_scrach?.pay_out+Payoutvendor_payments?.pay_out),
    },

  ];

  const formatCurrency = (amount) => {
    const formattedAmount = Math.abs(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return amount < 0 ? `-${formattedAmount}` : formattedAmount;
  };

  const getClassName = (value) => {
    return value < 0 ? "error-message" : "";
  };
  return (
    <>

      {SalesReportDataState.loading ? (
        <>
          {/* Gross Sales */}
          <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                    <TableContainer>
                      <StyledTable
                        sx={{ minWidth: 500 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <StyledTableCell sx={{ width: "16.66%" }}>
                            Gross Sales
                          </StyledTableCell>
                          <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                          <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                          <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                          <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                          <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                        </TableHead>
                        <TableBody>

                            <StyledTableRow >
                              <StyledTableCell className={` BORBodyRight`} colSpan={2}>
                                <div className={`q_sales_trading_data p-0 `}>
                                  <p><Skeleton /></p>
                                </div>
                              </StyledTableCell>

                              <StyledTableCell className={` `} >
                              <div className={`q_sales_trading_data p-0 `}>
                                  <p ><Skeleton /></p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell className={` `}colSpan={3} ></StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                      </StyledTable>
                    </TableContainer>
    
              </Grid>
          </Grid>

        {/* Taxes */}
        <Grid container className="box_shadow_div">
            <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead className="TaxesTable">
                      <StyledTableCell colSpan={2} sx={{ width: "33.32%" }}>
                        Taxes
                      </StyledTableCell>
                      <StyledTableCell  colSpan={2} className="TaxesTableHead">
                        Non-Taxable Sales</StyledTableCell>
                    </TableHead>
                    <TableBody>
                          <StyledTableRow >
                              <StyledTableCell  className="BORBodyRight"></StyledTableCell>
                              <StyledTableCell  className="BORBodyRight "> <p className="font-bold">Current Rate</p></StyledTableCell>
                              <StyledTableCell  className="BORBodyRight"><p className="font-bold">Taxable Amount</p></StyledTableCell>
                              <StyledTableCell  ><p className="font-bold">Estimated Sales Tax Due</p></StyledTableCell>
                          </StyledTableRow >

                          <StyledTableRow>
                            <StyledTableCell  className="BORBodyRight" ><Skeleton /></StyledTableCell>
                            <StyledTableCell className="BORBodyRight"><Skeleton /></StyledTableCell>
                            <StyledTableCell className="BORBodyRight">
                              <p >
                              <Skeleton />
                              </p>
                            </StyledTableCell>
                            <StyledTableCell  >
                              <p >
                              <Skeleton />
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow >
                              <StyledTableCell className="BORBodyRight">Refunds</StyledTableCell>
                              <StyledTableCell  className="BORBodyRight"><Skeleton /></StyledTableCell>
                              <StyledTableCell  className="BORBodyRight">
                                <p className="error-message" >
                                <Skeleton /> 
                                </p>
                              </StyledTableCell>
                              <StyledTableCell >
                              <p >
                              <Skeleton />
                                </p>
                              </StyledTableCell>
                          </StyledTableRow >

                          <StyledTableRow className="trBG_Color totalBORDERDOWN">
                            <StyledTableCell  colSpan={2} className="BORBodyRight">
                            <div className={`q_sales_trading_data p-0  totalReport`}>
                              <p>Total</p>
                            </div>
                            </StyledTableCell>
                            <StyledTableCell className="BORBodyRight">
                             <div className={`q_sales_trading_data p-0  totalReport ` }>
                              <p><Skeleton /></p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell  >
                             <div className={`q_sales_trading_data p-0  totalReport `}>
                              <p><Skeleton /></p>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow >

                
                      <StyledTableRow className=" ">
                            <StyledTableCell  colSpan={2}  className="BORBodyRight"></StyledTableCell>
                            <StyledTableCell className="BORBodyRight"><p className="font-bold">Total Tax Collected</p></StyledTableCell>
                            <StyledTableCell  ><p className="font-bold"><Skeleton /></p></StyledTableCell>
                      </StyledTableRow >

                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
        </Grid>

      {/* Other Fees */}
      <Grid container className="box_shadow_div">
          <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell  sx={{ width: "16.66%" }}>
                        Other Fees
                      </StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow >
                          <StyledTableCell  colSpan={2}><Skeleton /></StyledTableCell>
                          <StyledTableCell  colSpan={4}><Skeleton /></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
          </Grid>
      </Grid>

      {/* Total Amount Collected */}
      <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <TableContainer>
                <StyledTable >
                    <TableHead className="totalAmountCollected">
                      <StyledTableCell sx={{ width: "33.32%" }} className="BORBodyRight">Total Amount Collected</StyledTableCell>
                      <StyledTableCell sx={{ width: "49.98%" }} ><Skeleton/> </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                </StyledTable>
            </TableContainer>
          </Grid>
      </Grid>

      {/* Sales by Tender */}
      <Grid container className="box_shadow_div">
            <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell sx={{ width: "16.66%" }} >
                        Sales by Tender
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "33.32%" }}># of Transactions</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>

                        <StyledTableRow >
                          <StyledTableCell className={`  `}>
                          <Skeleton/> 
                          </StyledTableCell>
                          <StyledTableCell  className="BORBodyRight"></StyledTableCell>
                          <StyledTableCell className={`  BORBodyRight`}>
                          <Skeleton/> 
                          </StyledTableCell>
                          
                          <StyledTableCell >
                          <Skeleton/> 
                          </StyledTableCell>
                          <StyledTableCell  colSpan={3}></StyledTableCell>
                        </StyledTableRow>

                      <StyledTableRow >
                          <StyledTableCell className="trBG_Color">
                            <div className={`q_sales_trading_data p-0 totalReport`}>
                                Total
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className="BORBodyRight trBG_Color"></StyledTableCell>
                          <StyledTableCell className="BORBodyRight trBG_Color">
                            <Skeleton/> 
                          </StyledTableCell>
                          <StyledTableCell className="trBG_Color">
                          <Skeleton/> 
                          </StyledTableCell>
                          <StyledTableCell  colSpan={3} className="trBG_Color"></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
      </Grid>

      {/* Payouts */}
      <Grid container className="box_shadow_div">
            <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" ">
                        Payouts
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}  className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "33.32%" }}># of Transactions</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {PayoutsTypeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell ><Skeleton/></StyledTableCell>
                          <StyledTableCell ></StyledTableCell>
                          <StyledTableCell ><Skeleton/></StyledTableCell>
                          <StyledTableCell ><Skeleton/> </StyledTableCell>
                          <StyledTableCell  colSpan={3}></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
      </Grid>

        {/* Last List  */}
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <TableContainer>
                <StyledTable >
                <TableBody>
                        <StyledTableRow >
                          <StyledTableCell sx={{ width: "33.32%" }}><Skeleton/></StyledTableCell>
                          <StyledTableCell sx={{ width: "49.98%" }}><Skeleton/></StyledTableCell>
                          <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
       
        </>
      ) : SalesReportData && GrossSalesubtotal> 0 ? (
        <>
        
      {/* Gross Sales */}
      <Grid container className="box_shadow_div">
          <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell sx={{ width: "16.66%" }}>
                        Gross Sales
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} ><p className={getClassName(GrossSalesubtotal)}>{formatCurrency(GrossSalesubtotal)}</p></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} ></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {GrossSaleList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""} BORBodyRight`} colSpan={2}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Net Sales" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`} >
                          <div className={`q_sales_trading_data p-0 ${item.name === "Net Sales" ? "totalReport" : ""}`}>
                              <p className={getClassName(item.amount)}>{formatCurrency(item.amount)}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`}colSpan={3} ></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
          </Grid>
      </Grid>

      {/* Taxes */}
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead className="TaxesTable">
                      <StyledTableCell colSpan={2} sx={{ width: "33.32%" }}>
                        Taxes
                      </StyledTableCell>
                      <StyledTableCell  colSpan={2} className="TaxesTableHead">
                       {formatCurrency(NONTaxable)} Non-Taxable Sales</StyledTableCell>
                    </TableHead>
                    <TableBody>
                        {SalesReportData?.taxes?.map((item, index) => {
                        let TaxableAmountsum = +item.total_taxable_amount - (+item.total_refunded_taxable_amount);
                        let EstimatedTax = +item.total_collected_tax - (+item.total_refunded_tax);
                          return (
                        <>
                          <StyledTableRow >
                              <StyledTableCell  className="BORBodyRight"></StyledTableCell>
                              <StyledTableCell  className="BORBodyRight "> <p className="font-bold">Current Rate</p></StyledTableCell>
                              <StyledTableCell  className="BORBodyRight"><p className="font-bold">Taxable Amount</p></StyledTableCell>
                              <StyledTableCell  ><p className="font-bold">Estimated Sales Tax Due</p></StyledTableCell>
                          </StyledTableRow >

                          <StyledTableRow key={index}>
                            
                            <StyledTableCell  className="BORBodyRight" >{item.tax_type}</StyledTableCell>
                            <StyledTableCell className="BORBodyRight">{!!item.tax_rate  ? parseFloat(item.tax_rate).toFixed(3) : "0.000"} %</StyledTableCell>
                            <StyledTableCell className="BORBodyRight">
                              <p className={ getClassName(item.total_taxable_amount)}>
                              {formatCurrency(item.total_taxable_amount)}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell >
                              <p className={getClassName(item.total_collected_tax)}>
                                {formatCurrency(item.total_collected_tax)}
                                </p>
                              </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow >
                              <StyledTableCell className="BORBodyRight">Refunds</StyledTableCell>
                              <StyledTableCell  className="BORBodyRight">{ !!item.tax_rate  ? parseFloat(item.tax_rate).toFixed(3) : "0.000" } %</StyledTableCell>
                              <StyledTableCell  className="BORBodyRight">
                                <p className={getClassName(item.total_refunded_taxable_amount)}>
                                {formatCurrency(item.total_refunded_taxable_amount)} 
                                </p>
                              </StyledTableCell>
                              
                              <StyledTableCell  >
                              <p className={getClassName(item.total_refunded_tax)}>
                              {formatCurrency(item.total_refunded_tax)}
                              </p>
                            </StyledTableCell>
                          </StyledTableRow >

                          <StyledTableRow className="trBG_Color totalBORDERDOWN">
                            <StyledTableCell  colSpan={2} className="BORBodyRight">
                            <div className={`q_sales_trading_data p-0  totalReport`}>
                              <p>Total</p>
                            </div>
                            </StyledTableCell>
                            <StyledTableCell className="BORBodyRight">
                             <div className={`q_sales_trading_data p-0  totalReport ${getClassName(TaxableAmountsum)}` }>
                              <p>{formatCurrency(TaxableAmountsum)}</p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell  >
                             <div className={`q_sales_trading_data p-0  totalReport ${getClassName(EstimatedTax)}`}>
                              <p>{formatCurrency(EstimatedTax)}</p>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow >
                          { index != lastTotalIndexs && (
                            <StyledTableRow key={`blank-${index}`} className="totalBORDERUPDOWN">
                              <StyledTableCell colSpan={7}>&nbsp;</StyledTableCell>
                            </StyledTableRow>
                          )}
                          
                        </>
                      )})}
                      <StyledTableRow className=" ">
                            <StyledTableCell  colSpan={2}  className="BORBodyRight"></StyledTableCell>
                            <StyledTableCell className="BORBodyRight"><p className="font-bold">Total Tax Collected</p></StyledTableCell>
                            <StyledTableCell  ><p className="font-bold">{formatCurrency(TotalEstimate)}</p></StyledTableCell>
                      </StyledTableRow >

                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
      </Grid>

      {/* Other Fees */}
      <Grid container className="box_shadow_div">
          <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell  sx={{ width: "16.66%" }}>
                        Other Fees
                      </StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {OtherFeeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""} BORBodyRight`} colSpan={2}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total Other Fees" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""}`} colSpan={4}>
                          <div className={`q_sales_trading_data p-0 
                          ${item.name === "Total Other Fees" ? "totalReport" : ""} 
                          ${getClassName(item.amount)}`}>
                              <p>{formatCurrency(item.amount)}</p>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
          </Grid>
      </Grid>

      {/* Total Amount Collected */}
      <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <TableContainer>
                <StyledTable >
                    <TableHead className="totalAmountCollected">
                      <StyledTableCell sx={{ width: "33.32%" }} className="BORBodyRight">Total Amount Collected</StyledTableCell>
                      <StyledTableCell sx={{ width: "49.98%" }} >
                        <p> 
                          <span className={getClassName(TotalAmountCollected)}>{formatCurrency(TotalAmountCollected)} </span> 
                          = Net Sales + Taxes + Other Fees 
                        </p>
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                </StyledTable>
            </TableContainer>
          </Grid>
      </Grid>

      {/* Sales by Tender */}
      <Grid container className="box_shadow_div">
            <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell sx={{ width: "16.66%" }} >
                        Sales by Tender
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "33.32%" }}># of Transactions</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                        {Object.entries(sales_by_tender_type)?.map(([key, value]) => (
                        <StyledTableRow key={key}>
                          <StyledTableCell className={`  `}>
                            <div className={`q_sales_trading_data p-0 capitalize`}>
                            {/* {key?.replace('_', ' ')} */}
                            {key?.split('_')[0].concat(' ' ,key?.split('_')[1] &&  key?.split('_')[1]?.trim()?.toLowerCase() === "ebt"  ?  key?.split('_')[1].toUpperCase() : key?.split('_')[1] ?  key?.split('_')[1]?.charAt(0)?.toUpperCase() + key?.split('_')[1]?.slice(1):'')}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell  className="BORBodyRight"></StyledTableCell>
                          <StyledTableCell className={`  BORBodyRight`}>
                          <div className={`q_sales_trading_data p-0 ${getClassName(value.collected-value.refunds)}`}>
                              <p>{formatCurrency(value.collected-value.refunds)}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={`  `}>
                          <div className={`q_sales_trading_data p-0 `}>
                            <p>
                              {value.transactions}
                            </p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell  colSpan={3}></StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow >
                          <StyledTableCell className="trBG_Color">
                            <div className={`q_sales_trading_data p-0 totalReport`}>
                                Total
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className="BORBodyRight trBG_Color"></StyledTableCell>
                          <StyledTableCell className="BORBodyRight trBG_Color">
                          <div className={`q_sales_trading_data p-0 totalReport ${getClassName(totalCollected)}`}>
                              <p>{formatCurrency(totalCollected)}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className="trBG_Color">
                          <div className={`q_sales_trading_data p-0 totalReport`}>
                            <p>
                              {priceFormate(totalTransactions)}
                            </p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell  colSpan={3} className="trBG_Color"></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
      </Grid>
          
      {/* Payouts */}
      <Grid container className="box_shadow_div">
            <Grid item xs={12}>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" ">
                        Payouts
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}  className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "33.32%" }}># of Transactions</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {PayoutsTypeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} `}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""} ${getClassName(item.amount)}`}>
                              <p>{formatCurrency(item.amount)}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                            <p>
                              {priceFormate(item.number)}
                            </p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`} colSpan={3}></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
      </Grid>

      {/* Last List  */}

      <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <TableContainer>
                <StyledTable >
                <TableBody>
                      {lastList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className=" BORBodyRight" sx={{ width: "33.32%" }}>
                            <div className={`q_sales_trading_data p-0  `}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={` `} sx={{ width: "49.98%" }}>
                          <div className={`q_sales_trading_data p-0 `}>
                              <p>
                                <span className={`${getClassName(item.amount)} ` }>{formatCurrency(item.amount)}</span> 
                                {item.name === "Remaining Cash" ? " = Cash Collected - Total Payout": "" }  </p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`} sx={{ width: "16.66%" }}></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
          </Grid>
      </Grid>

        </>
      ) : (
        <NoDataFound />
      )}

    </>
  );
};

export default SalesReportList;