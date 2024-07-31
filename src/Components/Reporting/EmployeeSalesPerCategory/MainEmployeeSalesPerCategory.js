import React, { useState } from "react";
import EmployeeSalesPerCategoryReport from "./EmployeeSalesPerCategoryReport";
import EmployeeSalesPerCategoryFilter from "./EmployeeSalesPerCategoryFilter";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const MainEmployeeSalesPerCategory = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [SelectEmpListData, setSelectEmpListData] = useState(null);
  const [SelectCatListData, setSelectCatListData] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleFilterDataChange = (SelectEmpList,selectedCategoryList) => {
    setSelectEmpListData(SelectEmpList);
    setSelectCatListData(selectedCategoryList)
  };
  return (
    <>
      <div className="q-order-main-page">
        <EmployeeSalesPerCategoryFilter onFilterDataChange={handleFilterDataChange} />
      </div>

      <div className="q-order-main-page">
        <div className="box">
          <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
        </div>
      </div>

      <EmployeeSalesPerCategoryReport
        selectedDateRange={selectedDateRange}
        SelectCatListData={SelectCatListData}
        SelectEmpListData={SelectEmpListData}
      />
    </>
  );
};

export default MainEmployeeSalesPerCategory;
