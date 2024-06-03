import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorListData } from "../../../Redux/features/Reports/VendorList/VendorListSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
    fontFamily: "CircularSTDMedium",
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
    // backgroundColor: "#F5F5F5",
  },
}));

const VendorReportList = (props) => {
  const dispatch = useDispatch();
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [allVendorData, setallVendorData] = useState("");
  const AllVendorDataState = useSelector((state) => state.VendorList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    let data = {
      merchant_id,
      ...userTypeData,
    };
    // console.log(data)
    if (data) {
      dispatch(fetchVendorListData(data));
    }
  }, []);

  useEffect(() => {
    if (!AllVendorDataState.loading && AllVendorDataState.VendorListData) {
      // console.log(AllVendorDataState.VendorListData)
      setallVendorData(AllVendorDataState.VendorListData);
    } else {
      setallVendorData("");
    }
  }, [
    AllVendorDataState,
    AllVendorDataState.loading,
    AllVendorDataState.VendorListData,
  ]);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Vendor Name</StyledTableCell>
                <StyledTableCell>Contact</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
              </TableHead>
              <TableBody>
                {allVendorData &&
                  allVendorData?.length >= 1 &&
                  allVendorData?.map((CheckData, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <p>{CheckData.name}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{CheckData.phone}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{CheckData.email}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{CheckData.full_address}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          {!allVendorData && (
            <div className="box">
              <div className="q-category-bottom-categories-single-category">
                <p>No data found</p>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-sort">Vendor Name</p>
          <p className="report-sort">Contact</p>
          <p className="report-sort">Email</p>
          <p className="report-sort">Address</p>
        </div>
      </div>

      {allVendorData &&
        allVendorData.length >= 1 &&
        allVendorData.map((CheckData, index) => (
          <div className="box">
            <div key={index} className="q-category-bottom-categories-listing">
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{CheckData.name}</p>
                <p className="report-title">{CheckData.phone}</p>
                <p className="report-title">{CheckData.email}</p>
                <p className="report-title">{CheckData.full_address}</p>
      
              </div>
            </div>
          </div>
        ))} */}
    </>
  );
};

export default VendorReportList;
