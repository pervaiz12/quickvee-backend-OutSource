import { Grid } from "@mui/material";
import React, { useState } from "react";
import LeftArrow from "../Assests/Dashboard/Left.svg";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
export default function SwitchToBackButton({ linkTo, title }) {
  const [close, setClose] = useState(true);

  const handleClose = (e) => {
    e.stopPropagation();
    setClose((prev) => !prev);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="q-add-categories-section-header">
          <Link
            to={linkTo}
            className={
              linkTo === "/inventory/products" ? "product-heading-title" : ""
            }
          >
            <img src={LeftArrow} alt="Add-New-Vendors" />
            <span>{title}</span>
          </Link>

          {linkTo === "/inventory/products" && close ? (
            <div className="product-error-note">
              <span>Special characters not allowed</span>
              <CancelIcon onClick={handleClose} />
            </div>
          ) : (
            ""
          )}
        </div>
      </Grid>
    </Grid>
  );
}
