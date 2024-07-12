import { Grid } from "@mui/material";
import React from "react";

export default function CustomHeader({ children }) {
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{borderBottom:"1px solid #E8E8E8",}}
       
      >
        <Grid item>
          <div  className="q-category-bottom-header">
            <span>{children}</span>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
