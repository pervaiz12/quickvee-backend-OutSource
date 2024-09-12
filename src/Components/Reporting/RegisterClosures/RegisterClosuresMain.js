import { Grid } from "@mui/material";
import React from "react";
import downloadIcon from "../../../Assests/Dashboard/download.svg";
import RegisterClosuresTableContainer from "./RegisterClosuresTableContainer";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
export default function RegisterClosuresMain() {
    function onDateRangeChange(dateRange) {
        console.log("dateRange", dateRange);
    }
  return (  
    <>
      <Grid container sx={{ padding: 2.5, mt: 2.5 }} className=" ">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <h1 style={{ marginBottom: 0 }} className="heading">
                Register Closures
              </h1>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <h1 className="text-[#0A64F9] text-[16px]">Export CSV</h1>
              <img
                style={{ height: "30px", width: "30px" }}
                src={downloadIcon}
                alt="downloadIcon"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{  mb: 2.5 }}
       
      ><DateRangeComponent
        onDateRangeChange={onDateRangeChange}
      /></Grid>
      <RegisterClosuresTableContainer />
    </>
  );
}
