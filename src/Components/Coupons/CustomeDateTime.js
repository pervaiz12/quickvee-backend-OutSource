import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// import AdapterDayjs from '@date-io/dayjs'
const CustomDateTime = () => {
  // const [selectedStartDate, handleStartDateChange] = useState(null);
  // const [selectedEndDate, handleEndDateChange] = useState(null);

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }} className="date_selected">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          className="date-provider"
        >
          <DatePicker
            label="Start date"
         className="input_label_section"
            renderInput={() => <input className="date-picker-input" />}
          />
          <div className="bl"></div>
        </LocalizationProvider>
        <div className="q_time_display">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker label="Start Time"
         className="input_label_section"
          style={{ fontSize: '12px' }} />

        </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

export default CustomDateTime;
