import React, { useState } from "react";

import MainEmployee from "./MainEmployee";
import Employeedetails from "./Employeedetails";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const EmployeeWorking = () => {
  const [SelectEmpIDData, setSelectEmpIDData] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleFilterDataChange = (SelectEmpID) => {
    setSelectEmpIDData(SelectEmpID);
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <div>
      <div className="q-order-main-page">
        <MainEmployee onFilterDataChange={handleFilterDataChange} />
      </div>

      <DateRangeComponent onDateRangeChange={handleDateRangeChange} />

      <div className="q-order-main-page">
        <Employeedetails
          selectedDateRange={selectedDateRange}
          EmpId={SelectEmpIDData}
        />
      </div>
    </div>
  );
};

export default EmployeeWorking;
