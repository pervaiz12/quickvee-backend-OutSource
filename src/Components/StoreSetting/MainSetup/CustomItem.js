import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import '../../../Styles/EmployeeList/customeitem.css';

const CustomTimePicker = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Generate time options with 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hour12 = (hour % 12) || 12; // Convert to 12-hour format
        const period = hour < 12 ? 'AM' : 'PM'; // Determine AM or PM
        const time = `${hour12.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
        options.push(time);
      }
    }
    return options;
  };




  const handleStartTimeChange = (event) => {
    const value = event.target.value;
    setStartTime(value);
 
    if (endTime !== "" && value >= endTime) {
      setEndTime("");
    }
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  return (
    <>
    <div className="flex justify-between gap-2">
      <Select value={startTime} onChange={handleStartTimeChange} style={{  width: "200px",  backgroundColor:"#fff", height:"50px"}}>
        <MenuItem value=""></MenuItem>
        {generateTimeOptions().map((time) => (
          <MenuItem className="customedateselector" key={time} value={time}>{time}</MenuItem>
        ))}
      </Select>
      <div className="q_store_working_section">
        <div className="text-center">To</div>
      </div>
      <Select value={endTime} onChange={handleEndTimeChange} style={{  width: "200px",  backgroundColor:"#fff", height:"50px"}}>
        <MenuItem value=""></MenuItem>
        {generateTimeOptions().map((time) => (
          <MenuItem className="customedateselector" key={time} value={time}>{time}</MenuItem>
        ))}
      </Select>
    </div>
    </>
  );
};

export default CustomTimePicker;
