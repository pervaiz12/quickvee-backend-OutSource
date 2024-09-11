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

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#f5f5f9",
    "&::before": {
      border: "1px solid #dadde9",
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(16),
    border: "1px solid #dadde9",
  },
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


  const SalesByTenderAndCardTypeList = [
    {
      name: "Credit",
      amount: "$2,216.00",
      number: 52,
    },
    {
      name: "Debit",
      amount: "$249.33",
      number: 12,
    },
    {
      name: "Cash",
      amount: "$335.00",
      number: 18,
    },
    {
      name: "Food EBT",
      amount: "$200.00",
      number: 16,
    },
    {
      name: "Cash EBT",
      amount: "$200.00",
      number: 15,
    },
    {
      name: "Gift Card",
      amount: "$100.00",
      number: 5,
    },
    {
      name: "Store Credit",
      amount: "$200.00",
      number: 6,
    },
    {
      name: "Total",
      amount: "$200.00",
      number: 124,
    },
  ];

  const PayoutsTypeList = [
    {
      name: "Cash Back",
      amount: "$160.00",
      number: 5,
    },
    {
      name: "Lottery",
      amount: "$75.00",
      number: 3,
    },
    {
      name: "Lottery - Non-Scratchers",
      amount: "$300.00",
      number: 120,
    },
    {
      name: "Vendor Payout",
      amount: "$250.00",
      number: 4,
    },
    {
      name: "Checks Cashed",
      amount: "$785.00",
      number: 3,
    },
    {
      name: "Total",
      amount: "$1,570",
      number: 135,
    },
  ];


  const GrossSaleList = [
    {
      name: "Loyalty Points Redeemed",
      amount: "-100.00",
    },
    {
      name: "Discounts",
      amount: "-100.00",
    },
    {
      name: "Refunds",
      amount: "-100.00",
    },
    {
      name: "Net Sales",
      amount: "3,000.00",
    },
  ];

  const OtherFeeList = [
    {
      name: "Services Charges",
      amount: "-$82.58",
    },
    {
      name: "Non Cash Adjustment Fees",
      amount: "-$75.00",
    },
    {
      name: "Cash Back Fees",
      amount: "-$50.00",
    },
    {
      name: "Tips",
      amount: "-$20.00",
    },
    {
      name: "Check Cashing Fees",
      amount: "-$35.00",
    },
    {
      name: "Total Other Fees",
      amount: "$262.58",
    },
  ];

  const TaxesList = [
    {
      taxesR1: "",
      taxesR2: <b>Current Rate</b>,
      taxesR3: <b>Taxable Amount</b>,
      taxesR4: <b>Estimated Sales Tax Due</b>,
    },
    {
      taxesR1: "Sales Tax",
      taxesR2: "8.25%",
      taxesR3: "$2500.00",
      taxesR4: "$206.25",
    },
    {
      taxesR1: "Refunds",
      taxesR2: "8.25%",
      taxesR3: "-$200.00",
      taxesR4: "-$16.50",
    },
    {
      taxesR1: "Total",
      taxesR2: "",
      taxesR3: "$2,300.00",
      taxesR4: "$189.75",
    },
    {
      taxesR1: "",
      taxesR2: "",
      taxesR3: "",
      taxesR4: "",
    },
    {
      taxesR1: "",
      taxesR2: <b>Current Rate</b>,
      taxesR3: <b>Taxable Amount</b>,
      taxesR4: <b>Estimated Sales Tax Due</b>,
    },
    {
      taxesR1: "Sales Tax 2",
      taxesR2: "12%",
      taxesR3: "$500.00",
      taxesR4: "$60.00",
    },
    {
      taxesR1: "Refunds",
      taxesR2: "12%",
      taxesR3: "-$100.00",
      taxesR4: "-$12.00",
    },
    {
      taxesR1: "Total",
      taxesR2: "",
      taxesR3: "$400.00",
      taxesR4: "$48.00",
    },
    {
      taxesR1: "",
      taxesR2: "",
      taxesR3: <b>Total Tax Collected</b>,
      taxesR4: "$237.75",
    },
    {
      taxesR1: "",
      taxesR2: "",
      taxesR3: <b>Non-Taxable Sales</b>,
      taxesR4: "$500.00",
    },
  ];

  const lastList = [
    {
      name: "Cash Collected",
      amount: "$335.00",
    },
    {
      name: "Total Payout",
      amount: "$1,570.00",
    },
    {
      name: "Remaining Cash",
      amount: "-$1,235 = Cash Collected - Total Payout",
    },

  ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getTextColor = (value) => {
    return value < 0 ? { color: "red" } : {};
  };

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

      {/* for New Order Summay start  */}

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
                      <StyledTableCell sx={{ width: "16.66%" }}>$3,400.00</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {GrossSaleList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Net Sales" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""} BORBodyRight`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`} >
                          <div className={`q_sales_trading_data p-0 ${item.name === "Net Sales" ? "totalReport" : ""}`}>
                              <p className={getClassName(item.amount)}>{formatCurrency(item.amount)}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Net Sales" ? "trBG_Color" : ""}`}></StyledTableCell>
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
                    <TableHead>
                      <StyledTableCell sx={{ width: "8.33%" }}>
                        Taxes
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "8.33%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {TaxesList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""}`}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.taxesR1}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""} `}></StyledTableCell>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                          <div className={`q_sales_trading_data p-0 ${item.taxesR1 === "Total" ? "totalReport" : ""}`}>
                              <p>{item.taxesR2}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                          <div className={`q_sales_trading_data p-0 ${item.taxesR1 === "Total" ? "totalReport" : ""}`}>
                              <p>{item.taxesR3}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""}`}>
                            <div className={`q_sales_trading_data p-0 ${item.taxesR1 === "Total" ? "totalReport" : ""}`}>
                              <p>{item.taxesR4}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.taxesR1 === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                        </StyledTableRow>
                      ))}
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
                      <StyledTableCell  sx={{ width: "16.66%" }}>$3,400.00</StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell  sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {OtherFeeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""}`}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total Other Fees" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""} BORBodyRight`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""}`}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total Other Fees" ? "totalReport" : ""}`}>
                              <p>{item.amount}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total Other Fees" ? "trBG_Color" : ""}`}></StyledTableCell>
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
                      <StyledTableCell sx={{ width: "16.66%" }}>Total Amount Collected</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className="BORBodyRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "33.32%" }}>$3,500.33 = Net Sales + Taxes + Other Fees</StyledTableCell>
                      {/* <StyledTableCell sx={{ width: "16.66%" }} align="left">= Net Sales + Taxes + Other Fees</StyledTableCell> */}
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
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
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight">
                        Sales by Tender
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}># of Transactions</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {SalesByTenderAndCardTypeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.amount}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} `}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                            <p>
                              {priceFormate(item.number)}
                            </p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                        </StyledTableRow>
                      ))}
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
                      <StyledTableCell sx={{ width: "16.66%" }} className=" BORHeaderRight">
                        Payouts
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}  className=" BORHeaderRight"></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}># of Transactions</StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                      <StyledTableCell sx={{ width: "16.66%" }}></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {PayoutsTypeList?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.amount}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                            <p>
                              {priceFormate(item.number)}
                            </p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`}></StyledTableCell>
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
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`} sx={{ width: "16.66%" }}>
                            <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.name}</p>
                            </div>
                          </StyledTableCell>
                          
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""} BORBodyRight`} sx={{ width: "16.66%" }}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`} sx={{ width: "33.32%" }}>
                          <div className={`q_sales_trading_data p-0 ${item.name === "Total" ? "totalReport" : ""}`}>
                              <p>{item.amount}</p>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`} sx={{ width: "16.66%" }}></StyledTableCell>
                          <StyledTableCell className={` ${item.name === "Total" ? "trBG_Color" : ""}`} sx={{ width: "16.66%" }}></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
          </Grid>
      </Grid>
     

      {/* for New Order Summay End */}
    </>
  );
};

export default SalesReportList;
