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
      <Grid container sx={{py:3.6}}>

          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />

      </Grid>

      <NewItemCreatedBetweenList selectedDateRange={selectedDateRange} />
    </>
  );
};

export default NewItemCreatedBetweenMain;
