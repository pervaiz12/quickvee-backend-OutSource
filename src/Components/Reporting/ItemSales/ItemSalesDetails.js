import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemSalesData } from "../../../Redux/features/Reports/ItemSales/ItemSalesSlice";
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
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";
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

const ItemSalesDetails = (props) => {
  const dispatch = useDispatch();
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [sortOrder, setSortOrder] = useState("asc");
  const [allItemSalesData, setallItemSalesData] = useState("");
  const AllItemSalesDataState = useSelector(
    (state) => state.ItemSalesReportList
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getFetchItemSalesData();
  }, [props]);

  const getFetchItemSalesData = async () => {
    if (props && props.selectedDateRange) {
      try {
        let data = {
          merchant_id,
          start_date: props.selectedDateRange.start_date,
          end_date: props.selectedDateRange.end_date,
          order_typ: props.OrderTypeData,
          order_env: props.OrderSourceData,
          cat_name: props.SelectCatData,
          search_by: props.items,
          ...userTypeData,
        };
        if (data) {
          await dispatch(fetchItemSalesData(data)).unwrap();
        }
      } catch (error) {
        if (error.status == 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        }
      }
    }
  };

  useEffect(() => {
    if (
      !AllItemSalesDataState.loading &&
      AllItemSalesDataState.ItemSalesData &&
      AllItemSalesDataState.ItemSalesData[0]
    ) {
      setallItemSalesData(AllItemSalesDataState.ItemSalesData[0]);
    } else {
      setallItemSalesData("");
    }
  }, [
    AllItemSalesDataState,
    AllItemSalesDataState.ItemSalesData,
  ]);
  const tableRow = [
    { type: "str", name: "categoryss", label: "Category" },
    { type: "str", name: "name", label: "Name" },
    { type: "num", name: "total_qty", label: "# Sold" },
    { type: "num", name: "total_price", label: "Gross Sales" },
    { type: "num", name: "adjust_price", label: "Price Override" },
    { type: "num", name: "discount_amt", label: "Discounts" },
    { type: "num", name: "saletx", label: "Default Tax" },
    { type: "num", name: "othertx", label: "Other Tax" },
    { type: "num", name: "refund_amount", label: "Refunded" },
    { type: "num", name: "discount_price", label: "Net Sales" },
  ];
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      allItemSalesData,
      type,
      name,
      sortOrder
    );
    setallItemSalesData(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <div className="q-attributes-bottom-header">
            <span>Item Sales Report</span>
          </div>
          {AllItemSalesDataState.loading ? (
            <SkeletonTable columns={tableRow.map((item) => item.label)} />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  {tableRow.map((item) => (
                    <StyledTableCell>
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
                  {allItemSalesData &&
                    allItemSalesData.length >= 1 &&
                    allItemSalesData.map((ItemData, index) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <p>{ItemData.categoryss}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{ItemData.name}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>{priceFormate(ItemData.total_qty)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.total_price)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.adjust_price)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.discount_amt)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.saletx)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.othertx)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.refund_amount)}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p>${priceFormate(ItemData.discount_price)}</p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </StyledTable>
              {!allItemSalesData.length >= 1 && <NoDataFound />}
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ItemSalesDetails;
