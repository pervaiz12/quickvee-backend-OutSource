import React from "react";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Discount_per_sales_logic from "./discount_per_sales_logic";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DashboardTables from "./paginationTable";
import { Grid } from "@mui/material";

export default function Discount_Per_Sales() {
  const {
    onDateRangeChange,
    allEmployee,
    handleOptionClick,
    EmployeeFilterData,
    selectedoption,
    loader,
    merchant_new_id,
    sortByItemName,
  } = Discount_per_sales_logic();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }} className="box_shadow_div">
            <Grid item xs={12}>
              <Grid container sx={{}}>
                <Grid item xs={12}>
                  <h1 style={{  }} className="heading ">
                    Discount Per Sales Person Report
                  </h1>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <label htmlFor="orderSourceFilter">Select Employee</label>
                  <SelectDropDown
                    heading="All"
                    listItem={allEmployee}
                    title={"f_name"}
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedoption}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <DateRangeComponent onDateRangeChange={onDateRangeChange} />
            </Grid>
          </Grid>
          <Grid container sx={{ marginY: 3.8 }}>
            <Grid item xs={12}>
              <DashboardTables
                EmployeeFilterData={EmployeeFilterData}
                loader={loader}
                merchant_id={merchant_new_id}
                sortByItemName={sortByItemName}
                
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
