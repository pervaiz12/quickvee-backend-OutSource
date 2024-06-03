import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../../../Styles/EmployeeList/customeitem.css";

const CustomTimePicker = ({ OpenTime, CloseTime }) => {
  const convertTo24HourFormat = (time) => {
    const [timePart, suffix] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (suffix === "PM" && hours !== 12) hours += 12;
    if (suffix === "AM" && hours === 12) hours = 0;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  };
  const formatTime = (time) => {
    let [hour, minutePeriod] = time?.split(":");
    let [minute, period] = minutePeriod?.split(" ");

    // Ensure hour and minute are two digits
    hour = hour.length < 2 ? "0" + hour : hour;
    minute = minute.length < 2 ? "0" + minute : minute;

    // Capitalize the period (am/pm)
    period = period.toUpperCase();

    return `${hour}:${minute} ${period}`;
  };

  const [startTime, setStartTime] = useState(formatTime(OpenTime));
  const [endTime, setEndTime] = useState(formatTime(CloseTime));
  console.log("OpenTime: ", startTime, "CloseTime :", endTime);
  // Generate time options with 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hour12 = hour % 12 || 12; // Convert to 12-hour format
        const period = hour < 12 ? "AM" : "PM"; // Determine AM or PM
        const time = `${hour12.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;
        options.push(time);
      }
    }
    return options;
  };

  const handleStartTimeChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setStartTime(value);

    if (endTime !== "" && value >= endTime) {
      setEndTime("");
    }
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    if (startTime == event.target.value) {
      alert("The end time cannot be the same as the start time");
      setEndTime("");
    }
  };

  return (
    <>
      <div className="flex justify-between gap-2">
        <Select
          value={startTime}
          onChange={handleStartTimeChange}
          style={{ width: "200px", backgroundColor: "#fff", height: "50px" }}
        >
          {generateTimeOptions().map((time) => (
            <MenuItem className="customedateselector" key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
        <div className="q_store_working_section">
          <div className="text-center">To</div>
        </div>
        <Select
          value={endTime}
          onChange={handleEndTimeChange}
          style={{ width: "200px", backgroundColor: "#fff", height: "50px" }}
        >
          {generateTimeOptions().map((time) => (
            <MenuItem className="customedateselector" key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default CustomTimePicker;
