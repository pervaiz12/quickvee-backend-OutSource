import * as React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../Orders/SearchBar";

const AutoPo = () => {
  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="my-8 px-6">
            {" "}
            <SearchBar />
          </div>
          <div className="">
            <div className="px-6">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <label>Item Name</label>
                </Grid>
                <Grid></Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoPo;
