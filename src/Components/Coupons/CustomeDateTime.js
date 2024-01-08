import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const CustomDateTime = () => {
  // const [selectedStartDate, handleStartDateChange] = useState(null);
  // const [selectedEndDate, handleEndDateChange] = useState(null);

  return (
    <>
        <div className="q_datetimesection">
        <div style={{ display: "flex", gap: "1rem" }} className="date_selected">
          <LocalizationProvider dateAdapter={AdapterDayjs} className="date-provider">
            <DatePicker label="Start date" className="input_label_section" renderInput={() => <input name="start_date" id="start_date" className="date-picker-input" />}/>
            <div className="bl"></div>
          </LocalizationProvider>
          <div className="q_time_display">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Start Time" className="input_label_section" name="start_tym" id="start_tym" style={{ fontSize: '12px' }} />
            </LocalizationProvider>
          </div>
          </div>
        </div>
        <div className="q_datetimesection">
        <div style={{ display: "flex", gap: "1rem" }} className="date_selected">
          <LocalizationProvider dateAdapter={AdapterDayjs} className="date-provider">
            <DatePicker label="End date" className="input_label_section" renderInput={() => <input name="end_date" id="end_date" className="date-picker-input" />}/>
            <div className="bl"></div>
          </LocalizationProvider>
          <div className="q_time_display">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="End Time" className="input_label_section" name="end_tym" id="end_tym" style={{ fontSize: '12px' }} />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </>
  );
};


export default CustomDateTime;
