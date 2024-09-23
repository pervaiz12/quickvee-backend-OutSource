import { Grid } from "@mui/material";
import React from "react";
import BasicTextFields from "../../reuseableComponents/TextInputField";

export default function LotteryForm({
  formValues,handleInputChanges,formError}) {
  return (
    <Grid container spacing={2}>
      <Grid item sx={{ px: 2.5 }} className="">
        <span className="heading">Lottery Details</span>
      </Grid>
      <Grid item xs={12}>
        <div className=" qvrowmain ">
          <label htmlFor="title">Lottery Name</label>
        </div>
        <BasicTextFields
          sx={{ mt: 0.5 }}
          type={"text"}
          name="title"
          value={formValues.title}
          placeholder="Lottery Name"
          onChangeFun={handleInputChanges}
        />
        {formError.title && (
          <span className="error">{formError.title}</span>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <div className=" qvrowmain ">
          <label htmlFor="price">Price ($)</label>
        </div>
        <BasicTextFields
          sx={{ mt: 0.5 }}
          type={"email"}
          name="price"
          value={formValues.price}
          placeholder="Price ($)"
          onChangeFun={handleInputChanges}
        />
        {formError.price && (
          <span className="error">{formError.price}</span>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <div className=" qvrowmain ">
          <label htmlFor="quantity">Quantity</label>
        </div>
        <BasicTextFields
          sx={{ mt: 0.5 }}
          type={"text"}
          name="quantity"
          value={formValues.quantity}
          placeholder="Quantity"
          onChangeFun={handleInputChanges}
        />
        {formError.quantity && (
          <span className="error">{formError.quantity}</span>
        )}
      </Grid>
    </Grid>
  );
}
