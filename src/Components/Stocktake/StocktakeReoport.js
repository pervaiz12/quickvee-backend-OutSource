import { Grid } from "@mui/material";
import AddSvg from "../../Assests/Dashboard/Left.svg";
//       table imports ----------------------------------------------------
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import axios from "axios";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { BASE_URL, VOID_STOCKTAKE } from "../../Constants/Config";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import EmailModel from "./EmailModel";
import StocktakeReportPrint from "./StocktakeReportPrint";
import { Navigate, useNavigate } from "react-router-dom";

// end table imports --------------------------------------------

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
const StocktakeReoport = ({ setVisible, singleStocktakeState }) => {
  const navigate = useNavigate();
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const tableRow = [
    "Item Name",
    "Current Qty",
    "New Qty",
    "Discrepency",
    "Discrepency Cost",
    "UPC",
  ];

  const handleVoidClick = async () => {
    const data = {
      merchant_id: merchant_id,
      stocktake_id: singleStocktakeState.id,
    };
    try {
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + VOID_STOCKTAKE,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        ToastifyAlert(response.data.message, "success");
      } else {
        ToastifyAlert(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error creating stocktake:", error);
    }
    setVisible("StocktakeList");
  };

  const handlePrint = () => {
    navigate("/stocktake/print-stocktake-report", {
      state: {
        data: singleStocktakeState,
      },
    })
  };
  console.log("singleStocktakeState", singleStocktakeState);
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className="q-add-categories-section-header">
                <span
                  onClick={() => {
                    setVisible("StocktakeList");
                  }}
                  className="text-center items-center"
                >
                  <img
                    src={AddSvg}
                    alt="Add-New-Category"
                    className="h-9 w-9"
                  />
                  <span>Stocktake Report - {singleStocktakeState.st_id}</span>
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ py: 2.5 }}>
            <Grid item xs={12}>
              <TableContainer>
                <StyledTable aria-label="customized table">
                  <TableHead>
                    {tableRow.map((title) => (
                      <StyledTableCell>{title}</StyledTableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {singleStocktakeState?.stocktake_item.map((item, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{item.product_name}</StyledTableCell>
                        <StyledTableCell>{item.current_qty}</StyledTableCell>
                        <StyledTableCell>{item.new_qty}</StyledTableCell>
                        <StyledTableCell>{item.discrepancy}</StyledTableCell>
                        <StyledTableCell>
                          {item.discrepancy_cost}
                        </StyledTableCell>
                        <StyledTableCell>{item.upc}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                    <StyledTableRow>
                      <StyledTableCell>
                        <p className="text-[#0A64F9]">Total Discrepency</p>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[#0A64F9]">
                          {singleStocktakeState.total_discrepancy}
                        </p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[#0A64F9]">
                          {singleStocktakeState.total_discrepancy_cost}
                        </p>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 2.5 }}
          >
            <Grid item>
              <Grid container spacing={3}>
                <Grid item>
                  <button
                    onClick={() => {
                      setVisible("StocktakeList");
                    }}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </Grid>
                {singleStocktakeState.status === "0" && (
                   <Grid item>
                   <button
                     className="quic-btn 
                   quic-btn-save
                   "
                     onClick={handleVoidClick}
                     //   disabled={loader}
                   >
                     void
                     {/* {loader ? <CircularProgress /> : "Update"} */}
                   </button>
                 </Grid>
                )}
               
              </Grid>
            </Grid>
          
            <Grid item>
              {singleStocktakeState.status === "0"  &&(
                  <Grid container spacing={3}>
                  <Grid item>
                    <EmailModel singleStocktakeState={singleStocktakeState}/>
                  </Grid>
                  <Grid item>
                    <button
                      className="quic-btn quic-btn-save"
                      onClick={handlePrint}
                      //   disabled={loader}
                    >
                      Print
                      {/* {loader ? <CircularProgress /> : "Update"} */}
                    </button>
                  </Grid>
                </Grid>
              )}
              
            </Grid>
          </Grid>
        </Grid>
        <div style={{ display: "none" }}>
      
      </div>
      </Grid>
    </>
  );
};

export default StocktakeReoport;
