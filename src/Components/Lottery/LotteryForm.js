import { Grid } from "@mui/material";
import React from "react";
import BasicTextFields from "../../reuseableComponents/TextInputField";

export default function LotteryForm() {
  return (
    <Grid container spacing={2}>
      <Grid item sx={{ px: 2.5 }} className="">
        <span className="heading">Lottery Details</span>
      </Grid>
      <Grid item xs={12}>
        <div className=" qvrowmain ">
          <label htmlFor="email">Lottery Name</label>
        </div>
        <BasicTextFields
          sx={{ mt: 0.5 }}
          type={"email"}
          name="email"
          // value={vendor.email}
          placeholder="Lottery Name"
          // onChangeFun={inputChange}
        />
        {/* {errorMessage.email && (
          <span className="error">{errorMessage.email}</span>
        )} */}
      </Grid>
      <Grid item xs={12} md={6}>
        <div className=" qvrowmain ">
          <label htmlFor="email">Price ($)</label>
        </div>
        <BasicTextFields
          sx={{ mt: 0.5 }}
          type={"email"}
          name="email"
          // value={vendor.email}
          placeholder="Price ($)"
          // onChangeFun={inputChange}
        />
        {/* {errorMessage.email && (
          <span className="error">{errorMessage.email}</span>
        )} */}
      </Grid>
      <Grid item xs={12} md={6}>
        <div className=" qvrowmain ">
          <label htmlFor="email">Quantity</label>
        </div>
        <BasicTextFields
          sx={{ mt: 0.5 }}
          type={"email"}
          name="email"
          // value={vendor.email}
          placeholder="Quantity"
          // onChangeFun={inputChange}
        />
        {/* {errorMessage.email && (
          <span className="error">{errorMessage.email}</span>
        )} */}
      </Grid>
    </Grid>
  );
}
