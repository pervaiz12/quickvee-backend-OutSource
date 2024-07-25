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
import { priceFormate } from "../../../hooks/priceFormate";
import PasswordShow from "../../../Common/passwordShow";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
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

const TaxesDetails = ({ data }) => {
  const dispatch = useDispatch();

  const [taxesreport, settaxesreport] = useState([]);

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

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {taxesreportDataState.loading ? (
            <SkeletonTable
              columns={[
                "Tax or Fee",
                "Tax Rate or Fee",
                "Tax or Fee Refunded",
                "Tax or Fee Collected",
              ]}
            />
          ) : (
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Tax or Fee</StyledTableCell>
                  <StyledTableCell>Tax Rate or Fee</StyledTableCell>
                  <StyledTableCell>Tax or Fee Refunded</StyledTableCell>
                  <StyledTableCell> Tax or Fee Collected</StyledTableCell>
                </TableHead>
                <TableBody>
                  {(taxesreport.data1 || taxesreport.data2) &&
                  Object.keys(taxesreport?.data1?.final_arr)?.length > 0 ? (
                    Object.keys(taxesreport?.data1?.final_arr)?.map(
                      (key, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <p>{key === "Sale Tax" ? "Sales Tax" : key}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              {taxesreport.data3.tax_rate[key] &&
                              taxesreport.data3.tax_rate[key].percent
                                ? `${taxesreport.data3.tax_rate[key].percent}%`
                                : "N/A"}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            {taxesreport.data2.final_arr2[key] ? (
                              <p>
                                $
                                {priceFormate(
                                  taxesreport.data2.final_arr2[key].toFixed(2)
                                )}
                              </p>
                            ) : (
                              <p>$0.00</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              $
                              {priceFormate(
                                taxesreport.data1.final_arr[key].toFixed(2)
                              )}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )
                  ) : (
                    ""
                  )}
                </TableBody>
              </StyledTable>
              {!(taxesreport.data1 || taxesreport.data2)  && (
                  <NoDataFound />
                )}
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TaxesDetails;
