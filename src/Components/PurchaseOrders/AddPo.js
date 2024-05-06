import React, { useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import AutoPo from "./AutoPo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";


const AddPo = () => {
  const [issueDate, setIssueDate] = useState(null);
  const [stockDate, setStockDate] = useState(null);
const temarray =[
  {
    title :"gfgk",
   },

]


  const handleVendorClick = () =>{
    console.log("hello")
  }
  const handleIssueDateChange = (date) => {
    setIssueDate(date);
  };

  const handleStockDateChange = (date) => {
    setStockDate(date);
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div" style={{height:"300px"}}>
          <div className="q-add-categories-section-header">
            <span>
              <span>Create Purchase Order</span>
            </span>
          </div>

          <div className="mb-6"></div>
          <div className="px-6">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label>vendor</label>
                <SelectDropDown 
                heading={null}
                  listItem={temarray}
                  onClickHandler={handleVendorClick}
                />

                {/* <TextField select fullWidth>
                  <MenuItem value="hello">Hello</MenuItem>
                </TextField> */}
              </Grid>
              <Grid item xs={4}>
                <label>Issued Date</label>  
                <TextField fullWidth 
                
                
                />
              </Grid>
              <Grid item xs={4}>
                <label>Stock Due</label>
               
                <TextField fullWidth />
              </Grid>
              <Grid item xs={6}>
                <label>Reference</label>
                <TextField fullWidth />
              </Grid>
              <Grid item xs={6}>
                <label>Vendor Email</label>
                <TextField fullWidth />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className="">
        <AutoPo />
      </div>
    </>
  );
};

export default AddPo;
