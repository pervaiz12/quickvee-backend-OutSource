import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import React, { useState, useRef, useEffect } from "react";
  //   import LeftArrow from "../../Assests/Dashboard/Left.svg";
  import { styled } from "@mui/material/styles";
  // import SelectDropDown from "../../reuseableComponents/SelectDropDown";
  import DashDateRangeComponent from "../../../reuseableComponents/DashDateRangeComponent";
  import VerticalBarChart from "../../Dashboard/VerticalBarChart";
  import CustomerVerticalBarChart from "./CustomerVerticalBarChart";
  import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
  import { priceFormate } from "../../../hooks/priceFormate";
  import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import { useSelector, useDispatch } from "react-redux";
import PasswordShow from "../../../Common/passwordShow";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { fetchnewCustomerreportData } from "../../../Redux/features/NewCutomerReport/newCustomerReportSlice";
import useDebounce from "../../../hooks/useDebouncs";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import sortIcon from "../../../Assests/Category/SortingW.svg";
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
      paddingTop: "12px",
      paddingLeft: "12px",
      paddingRight: "1px",
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
    // hide last border
    //   "&:last-child td, &:last-child th": {
    //     // border: 0,
    //   },
    "& td, & th": {
      border: "none",
    },
  }));
  
  
  export default function CustomerReportMain({ hide = false }) {
    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const handleOptionClick = () => {};
    const onDateRangeChange = (dateRange) => {
      setSelectedDateRange(dateRange);
    };



    const [searchRecord, setSearchRecord] = useState("");
    const debouncedValue = useDebounce(searchRecord);
    const handleSearchInputChange = (value) => {
      setSearchRecord(value);
  
    };
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
    const [newCustomerreport, setnewCustomerreport] = useState([]);
    const [totaloderCount, settotaloderCount] = useState(0);
    const [totalqtysold, settotalqtysold] = useState(0);
    const [totalSaleAmount, settotalSaleAmount] = useState(0);
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } = PasswordShow();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();



    const newCustomerreportDataState = useSelector((state) => state.newCustomerreport);
    let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  
    // ==================== USEEFFECT ===========================================
    useEffect(() => {
      getAllCustomerreport();
    }, [dispatch, selectedDateRange,debouncedValue]);
    const getAllCustomerreport = async () => {
      try {
        let newData = { 
          start_date:selectedDateRange.start_date,
          end_date:selectedDateRange.end_date,
          search_by: Boolean(searchRecord.trim())
              ? debouncedValue
              : null,
          merchant_id,
           ...userTypeData};
        // Dispatch the action to fetch data when the component mounts
  
        await dispatch(fetchnewCustomerreportData(newData)).unwrap();
      } catch (error) {
        if (error.status == 401 ) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      }
    };
  
    useEffect(() => {
      if (!newCustomerreportDataState.loading && newCustomerreportDataState.newCustomerreportData) {
        setnewCustomerreport(newCustomerreportDataState.newCustomerreportData);
        settotaloderCount(
          newCustomerreportDataState.newCustomerreportData.length > 0
            ? newCustomerreportDataState.newCustomerreportData.reduce(
                (total, report) => total + parseFloat(report.total_orders),
                0
              )
            : 0
        );

        settotalqtysold(
          newCustomerreportDataState.newCustomerreportData.length > 0
            ? newCustomerreportDataState.newCustomerreportData.reduce(
                (totalQty, report) => totalQty + parseFloat(report.total_quantity),
                0
              )
            : 0
        );

        settotalSaleAmount(
          newCustomerreportDataState.newCustomerreportData.length > 0
            ? newCustomerreportDataState.newCustomerreportData.reduce(
                (totalAMT, report) => totalAMT + parseFloat(report.total_amount),
                0
              )
            : 0
        );

      }
    }, [
      newCustomerreportDataState,
      newCustomerreportDataState.loading,
      newCustomerreportDataState.newCustomerreportData,
    ]);


    const sortByItemName = (type, name) => {
      const { sortedItems, newOrder, sortIcon } = SortTableItemsHelperFun(
        newCustomerreport,
        type,
        name,
        sortOrder
      );
      setnewCustomerreport(sortedItems);
      setSortOrder(newOrder);
    };
    
    const formatDate = (dateString) => {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = new Date(dateString).toLocaleDateString(
        "en-US",
        options
      );
      return formattedDate;
    };
    return (
      <>
       
        <Grid container sx={{ mt: 2.5 }}>

        <DashDateRangeComponent onDateRangeChange={onDateRangeChange}  />
          
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{ mt: 0 }}
        >
          <Grid item xs={12} md={6}>
            <CustomerVerticalBarChart title="Top Vendors by Quantity Sold" GrapTitle="Quantity Sold" color="#0A64F9" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomerVerticalBarChart title="Top Vendors by Sales Amount" GrapTitle="Sales Amount" color="#FF7700" />
          </Grid>
        </Grid>
  
        <Grid container className="box_shadow_div">
          <Grid item xs={12}>
            <Grid container sx={{ padding: 2.5 }}>
              <Grid item xs={12}>
                <InputTextSearch
                  className=""
                  type="text"
                  value={searchRecord}
                  handleChange={handleSearchInputChange}
                  placeholder="Search customers by phone number, name, email"
                  autoComplete="off"
                />
                </Grid>
            </Grid>

            <Grid item xs={12}>
              {newCustomerreportDataState.loading ? (
                <SkeletonTable columns={["Customer info", "Sales Count","Quantity Sold","	Sales Amount","Avg. Item Per Sale"
                  ,"Avg. Sale Amount","Last Sale Date"]} />
              ) : (
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell className=" BORHeaderRight">
                        <button
                          className="flex items-center"
                          onClick={() =>
                            sortByItemName("str", "name")
                          }
                        >
                          <p className="whitespace-nowrap">Customer info</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "total_orders")}
                        >
                          <p className="whitespace-nowrap">Sales Count</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "total_quantity")}
                        >
                          <p className="whitespace-nowrap">Quantity Sold</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "total_amount")}
                        >
                          <p className="whitespace-nowrap">Sales Amount</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "amt")}
                        >
                          <p className="whitespace-nowrap">Avg. Item Per Sale</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "amt")}
                        >
                          <p className="whitespace-nowrap">Avg. Sale Amount</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("date", "last_order_date")}
                        >
                          <p className="whitespace-nowrap">Last Sale Date</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {newCustomerreport.length > 0 ? (
                        <>
                          <StyledTableCell  sx={ {fontWeight: "bold"} } className="BORBodyRight">
                                <p className="report-title">Total</p>
                          </StyledTableCell>
                          <StyledTableCell   sx={ {fontWeight: "bold"} }>
                                <p  >{priceFormate(totaloderCount)}</p>
                          </StyledTableCell>
                          <StyledTableCell sx={ {fontWeight: "bold"} }>
                                <p >{priceFormate(totalqtysold)}</p>
                          </StyledTableCell>
                          <StyledTableCell  sx={ {fontWeight: "bold"} }>
                                <p >${priceFormate(totalSaleAmount.toFixed(2))}</p>
                          </StyledTableCell>
                          <StyledTableCell  sx={ {fontWeight: "bold"} }>
                            {/* Quantity Sold/Sales Count */}
                                <p >{priceFormate((totalqtysold/totaloderCount).toFixed(2))}</p>
                          </StyledTableCell>
                          <StyledTableCell  sx={ {fontWeight: "bold"} }>
                             {/* Sales Amount/Sales Count */}
                                <p >${priceFormate((totalSaleAmount/totaloderCount).toFixed(2))}</p>
                          </StyledTableCell>
                          <StyledTableCell  sx={ {fontWeight: "bold"} }></StyledTableCell>
                          {newCustomerreport.map((data, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell className="BORBodyRight">
                                <p className="report-sort whitespace-nowrap">{data.name}</p>
                                <p className="report-sort whitespace-nowrap">{data.email}</p>
                                <p className="report-sort whitespace-nowrap">{data.phone}</p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="report-title">
                                  {priceFormate(data.total_orders)}
                                </p>
                              </StyledTableCell>

                              <StyledTableCell>
                                <p className="report-sort">
                                  {priceFormate(data.total_quantity)}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="report-title">
                                  ${priceFormate(data.total_amount)}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="report-title">
                                {/* Quantity Sold/Sales Count */}
                                  {priceFormate((data.total_quantity/data.total_orders).toFixed(2))}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="report-sort">
                                {/* Sales Amount/Sales Count */}
                                  ${priceFormate((data.total_amount/data.total_orders).toFixed(2))}
                                </p>
                              </StyledTableCell>
                              <StyledTableCell>
                                <p className="report-title">
                                  {formatDate(data.last_order_date)}
                                </p>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                          
                        </>
                      ) : (
                        ""
                      )}
                    </TableBody>
                  </StyledTable>
                  {!newCustomerreport.length  && <NoDataFound table={true} />}
                </TableContainer>
              )}
            </Grid>


          </Grid>
        </Grid>
        
      </>
    );
  }
  