import React from "react";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Discount_per_sales_logic from "./discount_per_sales_logic";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DashboardTables from "./paginationTable";

export default function Discount_Per_Sales() {
  const {
    onDateRangeChange,
    allEmployee,
    handleOptionClick,
    EmployeeFilterData,
    selectedoption,
  } = Discount_per_sales_logic();

  return (
    <>
      <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_input">
            <div className="pd_20">
              <div className="qvrow">
                <div className="col-qv-6">
                  <label htmlFor="orderSourceFilter">Select Employee</label>
                  <SelectDropDown
                    heading="All"
                    // listItem={allEmployee.map((item, index) => ({
                    //   title: item?.f_name,
                    //   id: item?.id,
                    // }))}
                    listItem={allEmployee}
                    title={"f_name"}
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedoption}
                  />

                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
              </div>
            </div>
          </div>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
          <div className="box_shadow_input">
            <div className="pd_20">
              <div className="qvrow">
                <div className="col-qv-12">
                  <DashboardTables EmployeeFilterData={EmployeeFilterData} />
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
