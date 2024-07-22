import React from "react";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";




import Discount_per_sales_logic from "./discount_per_sales_logic";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DashboardTables from "./paginationTable";
import { Grid } from "@mui/material";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

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
          <Grid container sx={{ pb: 2.5 }} className="box_shadow_div">
            <Grid item xs={12}>
              <CustomHeader>Discount Per Sales Person Report</CustomHeader>

              <Grid container sx={{ px: 2.5, pt: 2.5 }}>
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
