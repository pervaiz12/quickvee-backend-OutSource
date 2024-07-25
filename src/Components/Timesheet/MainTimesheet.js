import React, { useState, useEffect, useRef } from "react";
import FilterTimesheet from "./FilterTimesheet";
import DateRange from "../../reuseableComponents/DateRangeComponent";
import TimesheetListing from "./TimesheetListing";
import { useAuthDetails } from "./../../Common/cookiesHelper";

const MainTimesheet = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("all");

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  const handleDataFiltered = (data) => {
    const updatedData = {
      ...data,
      ...userTypeData,
      merchant_id: merchant_id,
      employee_id: selectedEmployeeID,
    };
    setFilteredData(updatedData);
  };

  return (
    <>
      <div className="q-category-main-page">
        <FilterTimesheet
          selectedEmployeeID={selectedEmployeeID}
          setSelectedEmployeeID={setSelectedEmployeeID}
        />
      </div>
      <div className="q-category-main-page">
        <div className="q-category-main-page">
          <DateRange onDateRangeChange={handleDataFiltered} />
        </div>
      </div>
      <div className="q-category-main-page">
        <TimesheetListing data={filteredData} />
      </div>
    </>
  );
};

export default MainTimesheet;
