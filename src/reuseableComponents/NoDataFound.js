import { Grid } from "@mui/material";
import React from "react";
import NoDataFoundImg from "../Assests/Defaults/No_data_ava.svg"
export default function NoDataFound({ table }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ padding: 2.5, margin: 0 }}
      className={table ? "" : "box_shadow_div"}
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <Grid item>
        <div className="flex justify-center"> 
        <img src={NoDataFoundImg} alt="No data found" />
        </div>
       
        <p className="text-[#707070] font-normal text-[18px] tracking-normal opacity-100 Admin_std">
          No Data Found.
        </p>
      </Grid>
    </Grid>
  );
}
