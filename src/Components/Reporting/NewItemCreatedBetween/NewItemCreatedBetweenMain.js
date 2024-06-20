import React, { useState } from "react";
import NewItemCreatedBetweenList from "./NewItemCreatedBetweenList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";

const NewItemCreatedBetweenMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      {/* <div className="box">
          <div className="box_shadow_div_order">
              <div className='px-6 py-6 my-6'>
                  <Grid container>
                      <Grid item className="mt-5" xs={12}>
                          <h1 className=" text-xl font-medium q_details_header ">Timesheet</h1>
                      </Grid>
                  </Grid>
              </div>
            </div>
      </div> */}
      <Grid
        container
        sx={{ padding: 2.5, mt: 3.6 }}
        className="box_shadow_div "
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{ marginBottom: 0 }} className="heading ">
                New Item Created Between Report
              </h1>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ }}>
        <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
      </Grid>

      <NewItemCreatedBetweenList selectedDateRange={selectedDateRange} />
    </>
  );
};

export default NewItemCreatedBetweenMain;
