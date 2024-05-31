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
      <Grid container sx={{py:3.6}}>
        <Grid item>
          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
        </Grid>
      </Grid>

      <NewItemCreatedBetweenList selectedDateRange={selectedDateRange} />
    </>
  );
};

export default NewItemCreatedBetweenMain;
