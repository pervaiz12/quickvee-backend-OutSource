import { Grid } from "@mui/material";
import React from "react";
import LeftArrow from "../Assests/Dashboard/Left.svg"
import { Link } from "react-router-dom";
export default function SwitchToBackButton({linkTo,title}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="q-add-categories-section-header">
          <Link to={linkTo}>
            <img src={LeftArrow} alt="Add-New-Vendors" />
            <span>{title}</span>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
