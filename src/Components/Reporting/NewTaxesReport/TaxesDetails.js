import React, { useEffect, useState } from "react";
import { fetchtaxesreportData } from "../../../Redux/features/TaxesReport/taxesreportSlice";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { priceFormate } from "../../../hooks/priceFormate";
import PasswordShow from "../../../Common/passwordShow";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
import useDelayedNodata from "../../../hooks/useDelayedNoData";
import downloadIcon from "../../../Assests/Dashboard/download.svg";
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

const TaxesDetails = ({ data }) => {
  const dispatch = useDispatch();

  const [taxesreport, settaxesreport] = useState([]);
  const showNoData = useDelayedNodata(Object.keys(taxesreport));
  const taxesreportDataState = useSelector((state) => state.taxesreport);
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    console.log(data.length);
    console.log(data);
    if (data) {
      getAllReportData();
    }
  }, [dispatch, data]);
  const getAllReportData = async () => {
    try {
      await dispatch(fetchtaxesreportData(data)).unwrap();
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
    if (!taxesreportDataState.loading && taxesreportDataState.taxesreportData) {
      settaxesreport(taxesreportDataState.taxesreportData);
    }
  }, [
    taxesreportDataState,
    taxesreportDataState.loading,
    taxesreportDataState.taxesreportData,
  ]);

  // for Taxes
  //   const TotalEstimate = taxesreportDataState.taxesreportData?.reduce((sum, tax) => sum + parseFloat(tax.estimated_tax_due || 0), 0)
  //   const NonTaxableSales = taxesreportDataState.taxesreportData?.filter((item) => item?.tax_type === "Non-Taxable");
  //   const lastTotalIndexs = taxesreportDataState?.taxesreportData?.map(item => item.taxesR1).lastIndexOf();

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

  const TaxesTableList = [
    {
      taxesR1: "8.250",
      taxesR2: "Sales Tax",
      taxesR3: "3275.95",
      taxesR4: "142.66",
    },
    {
      taxesR1: "N/A",
      taxesR2: "Non-Taxable",
      taxesR3: "0",
      taxesR4: "0",
    },
  ];

  
  return (
    <>
      {/* <Grid item xs={12}>
          {taxesreportDataState.loading ? (
            <>

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
                        <StyledTableRow className=" ">
                            <StyledTableCell  colSpan={2}  className="BORBodyRight"></StyledTableCell>
                            <StyledTableCell className="BORBodyRight"><p className="font-bold">Non-Taxable Sales</p></StyledTableCell>
                            <StyledTableCell  ><p className="font-bold"><Skeleton /></p></StyledTableCell>
                      </StyledTableRow >

                        </TableBody>
                    </StyledTable>
                    </TableContainer>
    
                </Grid>
            </Grid>
            </>
          ) : (
            <>

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
                      <StyledTableCell  colSpan={2} ></StyledTableCell>
                    </TableHead>
                    <TableBody>
                        {taxesreportDataState?.taxesreportData?.map((item, index) => {
                        let TaxableAmountsum = +item.taxable_amount - (+item.refunded_taxable_amount);
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
                            <StyledTableCell className="BORBodyRight">{item.tax_rate} %</StyledTableCell>
                            <StyledTableCell className="BORBodyRight">
                              <p className={ getClassName(item.taxable_amount)}>
                              {formatCurrency(item.taxable_amount)}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell  >
                              <p className={getClassName(item.refunded_tax)}>
                              {formatCurrency(item.refunded_tax)}
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow >
                              <StyledTableCell className="BORBodyRight">Refunds</StyledTableCell>
                              <StyledTableCell  className="BORBodyRight">{item.tax_rate} %</StyledTableCell>
                              <StyledTableCell  className="BORBodyRight">
                                <p className={getClassName(item.refunded_taxable_amount)}>
                                {formatCurrency(item.refunded_taxable_amount)} 
                                </p>
                              </StyledTableCell>
                              <StyledTableCell >
                              <p className={getClassName(item.collected_tax)}>
                                {formatCurrency(item.collected_tax)}
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
                             <div className={`q_sales_trading_data p-0  totalReport ${getClassName(item.TaxableAmountsum)}` }>
                              <p>{formatCurrency(TaxableAmountsum)}</p>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell  >
                             <div className={`q_sales_trading_data p-0  totalReport ${getClassName(item.TaxableAmountsum)}`}>
                              <p>{formatCurrency(item.estimated_tax_due)}</p>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow >
                          { index != 2 && (
                            <StyledTableRow key={`blank-${index}`} className="totalBORDERUPDOWN">
                              <StyledTableCell colSpan={7}>&nbsp;</StyledTableCell>
                            </StyledTableRow>
                          )}
                          
                        </>
                      )})}
                      <StyledTableRow className=" ">
                            <StyledTableCell  colSpan={2}  className="BORBodyRight"></StyledTableCell>
                            <StyledTableCell className="BORBodyRight"><p className="font-bold">Total Tax Collected</p></StyledTableCell>
                            <StyledTableCell  ><p className="font-bold">{formatCurrency(100)}</p></StyledTableCell>
                      </StyledTableRow >
                      <StyledTableRow className=" ">
                            <StyledTableCell  colSpan={2}  className="BORBodyRight"></StyledTableCell>
                            <StyledTableCell className="BORBodyRight"><p className="font-bold">Non-Taxable Sales</p></StyledTableCell>
                            <StyledTableCell  ><p className="font-bold">{formatCurrency(100)}</p></StyledTableCell>
                      </StyledTableRow >

                    </TableBody>
                  </StyledTable>
                </TableContainer>
 
            </Grid>
            </Grid>

            </>
          )}
        </Grid> */}

      <Grid container className="box_shadow_div">
        <Grid  item sx={{ display: "flex", alignItems: "center", justifyContent:"end",p:2.5 }} xs={12}>
          <h1 className="text-[#0A64F9] text-[16px] cursor-pointer">Export report</h1>
          <img
          className="cursor-pointer"
            style={{ height: "30px", width: "30px" }}
            src={downloadIcon}
            alt="downloadIcon"
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead className="TaxesTable">
                <StyledTableCell colSpan={2} sx={{ width: "33.32%" }}>
                  Taxes
                </StyledTableCell>
                <StyledTableCell colSpan={2}></StyledTableCell>
              </TableHead>
              <TableBody>
                {TaxesTableList?.map((item, index) => {
                  let TaxableAmountsum =
                    +item.taxable_amount - +item.refunded_taxable_amount;
                  return (
                    <>
                      <StyledTableRow>
                        <StyledTableCell className="BORBodyRight"></StyledTableCell>
                        <StyledTableCell className="BORBodyRight ">
                          {" "}
                          <p className="font-bold">Current Rate</p>
                        </StyledTableCell>
                        <StyledTableCell className="BORBodyRight">
                          <p className="font-bold">Taxable Amount</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="font-bold">Estimated Sales Tax Due</p>
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow key={index}>
                        <StyledTableCell className="BORBodyRight">
                          {item.taxesR2}
                        </StyledTableCell>
                        <StyledTableCell className="BORBodyRight">
                          {item.taxesR1} %
                        </StyledTableCell>
                        <StyledTableCell className="BORBodyRight">
                          <p className={getClassName(item.taxesR3)}>
                            {formatCurrency(item.taxesR3)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className={getClassName(item.taxesR4)}>
                            {formatCurrency(item.taxesR4)}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell className="BORBodyRight">
                          Refunds
                        </StyledTableCell>
                        <StyledTableCell className="BORBodyRight">
                          {item.taxesR1} %
                        </StyledTableCell>
                        <StyledTableCell className="BORBodyRight">
                          <p className={getClassName(item.taxesR3)}>
                            {formatCurrency(item.taxesR3)}
                          </p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className={getClassName(item.taxesR4)}>
                            {formatCurrency(item.taxesR4)}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow className="trBG_Color totalBORDERDOWN">
                        <StyledTableCell colSpan={2} className="BORBodyRight">
                          <div
                            className={`q_sales_trading_data p-0  totalReport`}
                          >
                            <p>Total</p>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell className="BORBodyRight">
                          <div
                            className={`q_sales_trading_data p-0  totalReport ${getClassName(
                              400
                            )}`}
                          >
                            <p>{formatCurrency(400)}</p>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div
                            className={`q_sales_trading_data p-0  totalReport ${getClassName(
                              48
                            )}`}
                          >
                            <p>{formatCurrency(48)}</p>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                      {index != 1 && (
                        <StyledTableRow
                          key={`blank-${index}`}
                          className="totalBORDERUPDOWN"
                        >
                          <StyledTableCell colSpan={7}>&nbsp;</StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  );
                })}
                <StyledTableRow className=" ">
                  <StyledTableCell
                    colSpan={2}
                    className="BORBodyRight"
                  ></StyledTableCell>
                  <StyledTableCell className="BORBodyRight">
                    <p className="font-bold">Total Tax Collected</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p className="font-bold">{formatCurrency("237.75")}</p>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow className=" ">
                  <StyledTableCell
                    colSpan={2}
                    className="BORBodyRight"
                  ></StyledTableCell>
                  <StyledTableCell className="BORBodyRight">
                    <p className="font-bold">Non-Taxable Sales</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p className="font-bold">{formatCurrency(500)}</p>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TaxesDetails;
