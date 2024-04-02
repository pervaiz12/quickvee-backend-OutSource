import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import caleIcon from "../../Assests/Filter/Calender.svg";
import TimeIcon from "../../Assests/Filter/Clock.svg"

const CustomDateTime = () => {
  // const [selectedStartDate, handleStartDateChange] = useState(null);
  // const [selectedEndDate, handleEndDateChange] = useState(null);

  return (
    <>
        <div className="">
        <div style={{ display: "flex", gap: "1rem",border:"1px solid #E3E3E3" , borderRadius:"4px", height:"45px"}} className="date_selected">
          <LocalizationProvider dateAdapter={AdapterDayjs} className="date-provider">
            <img src={caleIcon} alt="" className="w-6 h-6" />
            <DatePicker label="Start date" className="input_label_section" renderInput={() => <input name="start_date" id="start_date" className="date-picker-input" />}/>
            <div className="bl"></div>
          </LocalizationProvider>
          <div className="q_time_display">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Start Time" className="input_label_section" name="start_tym" id="start_tym"  />
              <img src={TimeIcon} alt="" className="w-6 h-6 clock_design" />
            </LocalizationProvider>
          </div>
          </div>
        </div>
        <div className="">
        <div style={{ display: "flex", gap: "1rem",border:"1px solid #E3E3E3" , borderRadius:"4px", height:"45px"}} className="date_selected">
          <LocalizationProvider dateAdapter={AdapterDayjs} className="date-provider">
            <img src={caleIcon} alt="" className="w-6 h-6" />
            <DatePicker label="End date" className="input_label_section" renderInput={() => <input name="start_date" id="start_date" className="date-picker-input" />}/>
            <div className="bl"></div>
          </LocalizationProvider>
          <div className="q_time_display">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="End Time" className="input_label_section" name="start_tym" id="start_tym"  />
              <img src={TimeIcon} alt="" className="w-6 h-6 clock_design" />
            </LocalizationProvider>
          </div>
          </div>
        </div>
      
    </>
  );
};


export default CustomDateTime;
