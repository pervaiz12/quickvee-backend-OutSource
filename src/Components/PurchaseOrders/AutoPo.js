import * as React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../Orders/SearchBar";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";

const AutoPo = () => {
  const autoarray = [
    {
      title: "gfgk",
    },
  ];

  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="my-8 px-6">
            {" "}
            <SearchBar />
          </div>

          <div className="q-category-bottom-detail-section">
            {/* <div className="q-category-bottom-header-sticky"> */}
            <div className="q-category-bottom-purchase-header">
              <p className="purchase-data-sort">Item Name</p>

              <p className="purchase-data-title">Qty</p>

              <p className="purchase-data-sort">After</p>

              <p className="purchase-data-title ">Cost Per Unit</p>

              <p className="purchase-data-sort">Total</p>
              <p className="purchase-data-sort">UPC</p>

              <p className="purchase-data-title">Delete</p>
            </div>
          </div>

          <div className="q-category-bottom-detail-section">
            <div className="q-category-bottom-categories-single-category">
              <p className="purchase-data-sort">
                Monster Bong - v200
                <br />
                8”/Pink
                <br />
                <a href="">Add Note</a>
              </p>

              <p className="purchase-data-title">
                <Grid container >
                <Grid item xs={6}>
                <TextField fullWidth />
                </Grid>
                </Grid>
              </p>

              <p className="purchase-data-sort">15</p>

              <p className="purchase-data-title">
                <Grid container >
                <Grid item xs={6}>
                  <TextField fullWidth />
                </Grid>
                </Grid>
              
              </p>

              <p className="purchase-data-sort">$100.00</p>
              <p className="purchase-data-sort">HHJJ78789</p>

              <p className="purchase-data-title">
                <img src={DeleteIcon} alt="" className="w-6 h-6" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoPo;
