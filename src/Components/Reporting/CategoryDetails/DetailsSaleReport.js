import React, { useEffect, useState } from "react";
import { fetchdetailCategorySaleData } from "../../../Redux/features/DetailCategorySale/detailCategorySaleSlice";

import { useSelector, useDispatch } from "react-redux";
import SortIcon from "../../../Assests/Category/Sorting.svg";
import SortIconW from "../../../Assests/Category/SortingW.svg";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { priceFormate } from "../../../hooks/priceFormate";
import PasswordShow from "../../../Common/passwordShow";

import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import Skeleton from "react-loading-skeleton";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../../reuseableComponents/NoDataFound";

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
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));

const DetailsSaleReport = ({ data }) => {
  const dispatch = useDispatch();

  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  const [detailCategorySale, setdetailCategorySale] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [sorting_type, setSorting_type] = useState("categoryTotal");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const detailCategorySaleDataState = useSelector(
    (state) => state.detailCategorySale
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getDetailedCategorySalesData();
  }, [dispatch, data, order, sorting_type]);
  const getDetailedCategorySalesData = async () => {
    try {
      if (!merchant_id) {
        console.log("empty");
      } else {
        let NewData = {
          ...data,
          merchant_id,

          order,
          sorting_type,
          ...userTypeData,
        };

        await dispatch(fetchdetailCategorySaleData(NewData)).unwrap();
      }
    } catch (error) {
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    if (
      !detailCategorySaleDataState.loading &&
      detailCategorySaleDataState.detailCategorySaleData
    ) {
      setdetailCategorySale(detailCategorySaleDataState.detailCategorySaleData);
    }
  }, [detailCategorySaleDataState]);

  const grandTotal = detailCategorySale
    ? Object.values(detailCategorySale).reduce((acc, category) => {
        return (
          acc +
          category.reduce((accCat, item) => {
            const productTotal = parseFloat(item.product_total) || 0;
            return accCat + productTotal;
          }, 0)
        );
      }, 0)
    : 0;
  const grandTotalProductQty = detailCategorySale
    ? Object.values(detailCategorySale).reduce((acc, category) => {
        return (
          acc +
          category.reduce((accCat, item) => {
            const productTotal = parseFloat(item.pro_qty) || 0;
            return accCat + productTotal;
          }, 0)
        );
      }, 0)
    : 0;

  const handleCategoryClick = () => {
    // Toggle between ASC and DESC orders
    const newSort = "categoryTotal";
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newOrder);
    setSorting_type(newSort);
  };

  const handleQuantityClick = () => {
    const newSort = "productQuantity";
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setSorting_type(newSort);
    setOrder(newOrder);
  };

  const sortByItemName = (type, name) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";

    const updatedCategorySale = Object.fromEntries(
      Object.entries(detailCategorySale).map(([category, items]) => {
        const { sortedItems } = SortTableItemsHelperFun(
          items,
          type,
          name,
          sortOrder
        );
        return [category, sortedItems];
      })
    );

    setdetailCategorySale(updatedCategorySale);
    setSortOrder(newOrder);
  };
  console.log(
    "Object.entries(detailCategorySale)",
    Object.entries(detailCategorySale)
  );
  return (
    <>
      {detailCategorySaleDataState.loading ? (
        <>
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              <div
                className="q-attributes-bottom-header bg-[#ffffff] cursor-pointer"
                onClick={handleCategoryClick}
              >
                <span>
                  <Skeleton />
                </span>
                <img src={SortIcon} alt="" className="" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <SkeletonTable columns={["Item Name", "Quantity", "Amount"]} />
            </Grid>
          </Grid>
        </>
      ) : Object.entries(detailCategorySale).length > 0 ? (
        Object.entries(detailCategorySale).map(([category, items]) => (
          <>
            <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                <div
                  className="q-attributes-bottom-header bg-[#ffffff] cursor-pointer"
                  onClick={handleCategoryClick}
                >
                  <span>{category}</span>
                  <img src={SortIcon} alt="" className="" />
                </div>
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell sx={{ width: "55%" }}>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("str", "name")}
                        >
                          <p>Item Name</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "pro_qty")}
                        >
                          <p>Quantity</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "product_total")}
                        >
                          <p>Amount</p>
                          <img src={SortIconW} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {items?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <p className="q-catereport-item">{item.name}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p className="">{item.pro_qty}</p>
                          </StyledTableCell>

                          <StyledTableCell>
                            $
                            {item.product_total
                              ? priceFormate(
                                  parseFloat(item.product_total).toFixed(2)
                                )
                              : "0.00"}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell>
                          <p>Total</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          {items.reduce(
                            (acc, item) => acc + parseInt(item.pro_qty) || 0,
                            0
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          $
                          {priceFormate(
                            items
                              .reduce(
                                (acc, item) =>
                                  acc + parseFloat(item.product_total),
                                0
                              )
                              .toFixed(2)
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              </Grid>
            </Grid>
          </>
        ))
      ) : (
        <Grid sx={{ pt: 2.5 }}>
          <NoDataFound />
        </Grid>
      )}
      {Object.entries(detailCategorySale).length > 0 && (
        <Grid container sx={{ marginY: 2.5 }} className="box_shadow_div">
          <Grid item xs={12}>
            <TableContainer>
              <StyledTable>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell sx={{ width: "55%" }}>
                      <div className="q-category-bottom-report-listing">
                        <div>
                          <p className="">Grand Total</p>
                        </div>
                      </div>
                    </StyledTableCell>

                    <StyledTableCell sx={{ width: "23%" }}>{grandTotalProductQty}</StyledTableCell>

                    <StyledTableCell>
                      <div className="q-category-bottom-report-listing">
                        <div>${priceFormate(grandTotal.toFixed(2))}</div>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DetailsSaleReport;
