import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../../../Styles/EmployeeList/customeitem.css";

const CustomTimePicker = ({ OpenTime, CloseTime, days, id, setDays }) => {
  const formatTime = (time) => {
    let [hour, minutePeriod] = time?.split(":");
    let [minute, period] = minutePeriod?.split(" ");
    hour = hour.length < 2 ? "0" + hour : hour;
    minute = minute.length < 2 ? "0" + minute : minute;
    period = period.toUpperCase();
    return `${hour}:${minute} ${period}`;
  };
  // console.log("CustomTimePicker", days);
  
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    setStartTime(formatTime(OpenTime));
    setEndTime(formatTime(CloseTime));
  }, [OpenTime, CloseTime]);
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

    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        if (day.id === id) {
          return { ...day, close_time: event.target.value };
        }
        return day;
      });
      return updatedDays;
    });
    if (startTime == event.target.value) {
      alert("The end time cannot be the same as the start time");
      setEndTime("");
    }
  };
  const timeOptions = generateTimeOptions();
  const startTimeIndex = timeOptions.indexOf(startTime);
  const endTimeIndex = timeOptions.indexOf(endTime);
  console.log("startTimeIndex",startTimeIndex,"endTimeIndex",endTimeIndex)
  
  return (
    <>
      <div className="flex justify-between gap-2">
        <Select
          value={startTime}
          onChange={handleStartTimeChange}
          style={{ width: "200px", backgroundColor: "#fff", height: "50px" }}
        >
          {generateTimeOptions().map((time, index) => (
            <MenuItem
              className="customedateselector"
              key={time}
              value={time}
              disabled={startTimeIndex !== -1 && index <= startTimeIndex}
            >
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
          {generateTimeOptions().map((time, index) => (
            <MenuItem
              className="customedateselector"
              key={time}
              value={time}
              // disabled={endTimeIndex !== -1 && index <= endTimeIndex}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default CustomTimePicker;
