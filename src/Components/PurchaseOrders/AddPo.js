import React, { useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import AutoPo from "./AutoPo";
import { FormControl } from "@mui/material";  
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import BasicTextFields from "../../reuseableComponents/TextInputField";
import AddNewCategory from '../../Assests/Dashboard/Left.svg'

import { Link } from "react-router-dom";
import { event } from "jquery";

const AddPo = () => {
  // const [isHide, setIsHide] = useState(false);
  const [visible, seVisible] = useState("MainPurchase");
  const [issueDate, setIssueDate] = useState(null);
  const [stockDate, setStockDate] = useState(null);
  const temarray = [
    {
      title: "gfgk",
      name: "priya"
    },
  ];

  const handleVendorClick = () => {
    console.log("hello");
  };
  const handleIssueDateChange = (date) => {
    setIssueDate(date);
  };

  const handleStockDateChange = (date) => {
    setStockDate(date);
  };

  // const handleCheckSearchValue=(data)=>{
  //   console.log('data', data)
  //   if(!!data){
  //     setIsHide(true)
  //   }else{
  //     setIsHide(false)
  //   }
  // }
  // console.log('isHide', isHide)

  const onChangeFun =(event)=>{
    setIssueDate(event.target.value);
  }
  console.log("hello", issueDate)
  return (
    <>
     
      <div className="box">
    
          
        <div className="box_shadow_div" style={{ height: "300px" }}>
          <div className="q-add-categories-section-header">
            <span>
              <span onClick={() => seVisible("MainPurchase")}>
                  <img src={AddNewCategory} alt="Add New Category" className="w-6 h-6" />
                
              </span>
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
              </Grid>
                <Grid item xs={4}>
                  <label>Issued Date</label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker  />
                      </DemoContainer>
                    </LocalizationProvider>
                </Grid>
              <Grid item xs={4}>
                <label>Stock Due</label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker  />
                      </DemoContainer>
                    </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <label>Reference</label>
                 
                      <BasicTextFields
                  value={issueDate}
                    onChangeFun={onChangeFun}
                    type={"text"}
                      />
                    
                  
              </Grid>
              <Grid item xs={6}>
                <label>Vendor Email</label>
                <BasicTextFields
                  value={issueDate}
                  onChangeFun={onChangeFun}
                  type={"email"}
                />
                  
              </Grid>
            </Grid>
          </div>
        </div>
     
      </div>
     
        <div className="second-component">
          <AutoPo />
      </div>
       
      
   
    </>
  );
};

export default AddPo;
