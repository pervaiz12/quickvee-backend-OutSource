import React, { useEffect, useState } from "react";
import { fetchtopsallerData } from "../../../Redux/features/TopSaller/topsallerSlice";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { priceFormate } from "../../../hooks/priceFormate";

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
    fontFamily: "CircularMedium !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    backgroundColor: "#F5F5F5",
  },
}));

const TopSallerList = ({ data }) => {
  const dispatch = useDispatch();

  const [topsaller, settopsaller] = useState([]);
  const topsallerDataState = useSelector((state) => state.topsaller);

  useEffect(() => {
    if (!data.merchant_id) {
      console.log("empty");
    } else {
      dispatch(fetchtopsallerData(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (!topsallerDataState.loading && topsallerDataState.topsallerData) {
      settopsaller(topsallerDataState.topsallerData);
    }
  }, [
    topsallerDataState,
    topsallerDataState.loading,
    topsallerDataState.topsallerData,
  ]);

  const renderDataTable = () => {
    if (topsaller.status === "Failed" && topsaller.msg === "No. Data found.") {
      return <>
        <Grid container sx={{ padding: 2.5 }} className="box_shadow_div">
          <Grid item xs={12}>
            <p>No. Data found.</p>
          </Grid>
        </Grid>
      </>
    } else if (topsaller && topsaller.length >= 1) {
      return (
        <>
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              <TableContainer>
                <StyledTable>
                  <TableHead>
                    <StyledTableCell>Item Name</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Varient Name</StyledTableCell>
                    <StyledTableCell>Quantity Sold</StyledTableCell>
                  </TableHead>

                  <TableBody>
                    {topsaller.map((topsaller, index) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <p className="report-title ">{topsaller.real_name}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">{topsaller.categoryss}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">{topsaller.variant}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="report-title">{priceFormate(topsaller.total_sold)}</p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </Grid>
          {/* <div className="box">
            <div className="q-daily-report-bottom-report-header">
              <p className="report-title">Product Name</p>
              <p className="report-title">Category</p>
              <p className="report-title">Varient Name</p>
              <p className="report-title">Quantity Sold</p>
            </div>
          </div>
          {topsaller.map((topsaller, index) => (
            <div className="box mb-4">
              <div
                className="q-category-bottom-categories-listing "
                key={index}
              >
                <div className="q-category-bottom-categories-single-category ">
                  <p className="report-title ">{topsaller.real_name}</p>
                  <p className="report-title">{topsaller.categoryss}</p>
                  <p className="report-title">{topsaller.variant}</p>
                  <p className="report-title">{topsaller.total_sold}</p>
                </div>
              </div>
            </div>
          ))} */}
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default TopSallerList;
