import React, { useState } from "react";

import MainInstantDetails from "./MainInstantDetails";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";

const InstantActvity = () => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const [filteredData, setFilteredData] = useState([]);
  const handleDataFiltered = (data) => {
    let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
    const updatedData = {
      ...data,
      merchant_id,
      ...userTypeData,
    };
    setFilteredData(updatedData);
  };
  return (
    <>
      <Grid container sx={{pt: 3.6}}>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={handleDataFiltered} />
        </Grid>
      </Grid>

      <MainInstantDetails data={filteredData} />
    </>
  );
};

export default InstantActvity;
