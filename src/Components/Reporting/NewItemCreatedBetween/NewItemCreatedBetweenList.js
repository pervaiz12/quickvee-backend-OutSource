import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewItemCreatedBetweenData } from "../../../Redux/features/Reports/NewItemCreatedBetweenSlice/NewItemCreatedBetweenSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularMedium !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularMedium !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const NewItemCreatedBetweenList = (props) => {
  // console.log(props)
  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [allNewItemData, setallNewItemData] = useState("");
  const AllNewItemDataState = useSelector(
    (state) => state.NewItemCreatedBtnList
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id,
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchNewItemCreatedBetweenData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (!AllNewItemDataState.loading && AllNewItemDataState.NewItemData) {
      // console.log(AllNewItemDataState.NewItemData)
      setallNewItemData(AllNewItemDataState.NewItemData);
    } else {
      setallNewItemData("");
    }
  }, [
    AllNewItemDataState,
    AllNewItemDataState.loading,
    AllNewItemDataState.NewItemData,
  ]);

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
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
              </TableHead>
              <TableBody>
                {allNewItemData && allNewItemData.length >= 1 ? (
                  allNewItemData.map((ItemData, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <p>{formatDate(ItemData.created_on)}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.category}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.item_name}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.price}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <Grid container sx={{ padding: 2.5 }}>
                    <Grid item xs={12}>
                      <p>No. Data found.</p>
                    </Grid>
                  </Grid>
                )}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div
          className="q-daily-report-bottom-report-header"
          style={{ borderRadius: "unset" }}
        >
          <p className="report-sort">Date</p>
          <p className="report-sort">Category</p>
          <p className="report-sort">Item name</p>
          <p className="report-sort">Cost</p>
        </div>
      </div>
      {allNewItemData && allNewItemData.length >= 1 ? (
        allNewItemData.map((ItemData, index) => (
          <div className="box">
            <div key={index} className="q-category-bottom-categories-listing">
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{ItemData.created_on}</p>
                <p className="report-title">{ItemData.category}</p>
                <p className="report-title">{ItemData.item_name}</p>
                <p className="report-title">{ItemData.price}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="box">
          <div className="empty-div">No data available</div>
        </div>
      )} */}
    </>
  );
};

export default NewItemCreatedBetweenList;
