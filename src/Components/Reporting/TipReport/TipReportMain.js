import React, { useState } from "react";
import TipReportList from "./TipReportList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";

const TipReportMain = ({ hide}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid container sx={{}}>
        <Grid item xs={12}>
          { !hide  &&
            <Grid
              container
              sx={{ padding: 2.5, mt: 3.6 }}
              className="box_shadow_div "
            >
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1 style={{ marginBottom: 0 }} className="heading ">
                      Tip Report
                    </h1>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
           }
          <Grid container sx={!hide ? { mt: 3.6 } : {}}>
          <DateRangeComponent onDateRangeChange={handleDateRangeChange}  />
          </Grid>

        </Grid>
      </Grid>

      <TipReportList selectedDateRange={selectedDateRange} />
    </>
  );
};

export default TipReportMain;
