import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { fetchSalesHistory } from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../../Styles/ProductPage.css";
import Loader from "../../CommonComponents/Loader";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import useDebounce from "../../hooks/useDebouncs";
import { useAuthDetails } from "../../Common/cookiesHelper";
import PasswordShow from "../../Common/passwordShow";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const ProductSalesReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location?.search);

  const productId = !!searchParams.get("varientName")
    ? location?.pathname?.split("/").slice(-2, -1)[0]
    : location?.pathname?.split("/").slice(-1)[0];
  const varientId = !!searchParams.get("varientName")
    ? location?.pathname?.split("/").slice(-1)[0]
    : "";
  const dispatch = useDispatch();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();

  const [salesData, setSalesData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();

  const fetchSalesData = async () => {
    const formData = new FormData();
    formData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );
    formData.append("product_id", productId);
    formData.append("variant_id", !!varientId ? varientId : "");
    formData.append("login_type", userTypeData?.login_type);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("token", userTypeData?.token);

    setLoading(true);
    try {
      const res = await dispatch(fetchSalesHistory(formData)).unwrap();
      if (res?.status) {
        setSalesData(res?.sales_history);
        setFilterData(res?.sales_history);
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  useEffect(() => {
    setTotalCount(filterData?.length);
  }, [filterData]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    // setFilteredMerchants(VerifiedMerchantList);
    setCurrentPage(1);
  };

  const handleFilterHistory = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
    const filterList = salesData?.filter(
      (i) =>
        (i?.order_id).toLowerCase().includes(value.toLowerCase()) ||
        (i?.create_date).toLowerCase().includes(value.toLowerCase()) ||
        (i?.create_date).toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filterList?.length ? filterList : []);
    setTotalCount(filterList?.length);
  };

  return (
    <div className="box">
      {loading ? (
        <div class="loading-box">
          <Loader />
        </div>
      ) : (
        <div className="q-attributes-main-page q-category-bottom-detail-section">
          <div className="q-add-categories-section">
            <div className="q-add-categories-section-header">
              <span>
                <span
                  style={{ width: "100%", display: "flex" }}
                  onClick={() => {
                    navigate(
                      `/inventory/products/edit/${
                        location.pathname.split("/")[4]
                      }`
                    );
                  }}
                >
                  <img src={AddNewCategory} alt="Add-New-Category" />
                  Sales History - {searchParams.get("title")}{" "}
                  {searchParams.get("varientName")
                    ? "- " + searchParams.get("varientName")
                    : ""}
                </span>
              </span>
            </div>
            {salesData?.length ? (
              <Grid container sx={{ padding: 2.5 }}>
                <Grid item xs={12}>
                  <InputTextSearch
                    className=""
                    type="text"
                    value={searchRecord}
                    handleChange={(e) => handleFilterHistory(e)}
                    placeholder="Search..."
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            ) : (
              ""
            )}
            <div className="q-add-categories-section-middle-form sales-history-table">
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  {filterData?.length ? (
                    <TableHead>
                      <StyledTableCell>Date & Time</StyledTableCell>
                      <StyledTableCell>Order Number</StyledTableCell>
                      <StyledTableCell>Qty</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Cost</StyledTableCell>
                    </TableHead>
                  ) : (
                    ""
                  )}
                  <TableBody>
                    {filterData?.length ? (
                      filterData?.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell>
                            <div className="flex">
                              <div className="text-[#000000] order_method capitalize">
                                {row?.create_date}
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="text-[#000000] order_method capitalize">
                              {row?.order_id}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="text-[#000000] order_method capitalize">
                              {row?.qty}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="text-[#000000] order_method capitalize">
                              $ {row?.price}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="text-[#000000] order_method capitalize">
                              $ {row?.cost_price}
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <span>No data found</span>
                    )}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSalesReport;
