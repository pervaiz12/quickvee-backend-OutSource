import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../../../Styles/EmployeeList/customeitem.css";
import AlertModal from "../../../reuseableComponents/AlertModal";

const CustomTimePicker = ({
  OpenTime,
  CloseTime,
  days,
  id,
  setDays,
  dayName,
  setLastCloseTimeState
}) => {
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
  const formatTime = (time) => {
    if (!time) return "";
    let [hour, minutePeriod] = time?.split(":");
    let [minute, period] = minutePeriod?.split(" ");
    hour = hour.length < 2 ? "0" + hour : hour;
    minute = minute.length < 2 ? "0" + minute : minute;
    period = period.toUpperCase();
    return `${hour}:${minute} ${period}`;
  };
  // console.log("CustomTimePicker", days);
  const timeOptions = generateTimeOptions();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTimeIndex, setStartTimeIndex] = useState(0);
  const [endTimeIndex, setEndTimeIndex] = useState(0);
 
  useEffect(() => {
    setStartTime(formatTime(OpenTime));
    setEndTime(CloseTime ? formatTime(CloseTime) : "");
  }, [OpenTime, CloseTime]);
  useEffect(() => {
    setStartTimeIndex(timeOptions.indexOf(startTime));
    setEndTimeIndex(timeOptions.indexOf(endTime));
  }, [startTime, endTime]);

  const checkOverlap = (start, end) => {
    const startIdx = timeOptions.indexOf(start);
    const endIdx = timeOptions.indexOf(end);
    if (startIdx === -1 || endIdx === -1) return false;

    for (let i = startIdx; i < endIdx; i++) {
      if (unavailableTimes.has(timeOptions[i])) {
        return true;
      }
    }
    return false;
  };

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleStartTimeChange = (event) => {
    const value = event.target.value;

    if (checkOverlap(value, endTime)) {
      showModal("The selected time range overlaps with an existing slot.");
      return;
    }

    setStartTimeIndex(timeOptions.indexOf(value));
    setStartTime(value);
    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        if (day.id === id) {
          return { ...day, open_time: event.target.value.toLowerCase() };
        }
        return day;
      });
      return updatedDays;
    });
  };

  const handleEndTimeChange = (event) => {
    const value = event.target.value;

    if (checkOverlap(startTime, value)) {
      showModal("The selected time range overlaps with an existing slot");
      return;
    }

    if (startTimeIndex >= timeOptions.indexOf(value)) {
      showModal("The end time cannot be the same as or before the start time");
      setEndTime("");
      return;
    }
    setEndTimeIndex(timeOptions.indexOf(value));
    // Only set endTime and update state if there are no issues
    setEndTime(value);
    setLastCloseTimeState(true);
    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        if (day.id === id) {
          return { ...day, close_time: value.toLowerCase() };
        }
        return day;
      });
      return updatedDays;
    });
  };

  const getUnavailableTimes = () => {
    const unavailableTimes = new Set();
    days.forEach((day) => {
      if (day.day_name === dayName && day.id !== id) {
        const startIdx = timeOptions.indexOf(formatTime(day.open_time));
        const endIdx = timeOptions.indexOf(formatTime(day.close_time));
        for (let i = startIdx; i < endIdx; i++) {
          unavailableTimes.add(timeOptions[i]);
        }
      }
    });
    return unavailableTimes;
  };

  const unavailableTimes = getUnavailableTimes();

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
              disabled={unavailableTimes.has(time)}
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
              disabled={unavailableTimes.has(time)}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </div>
      <AlertModal
      headerText={alertModalHeaderText}
      open={alertModalOpen}
      onClose={() => {setAlertModalOpen(false)}}
       />
    </>
  );
};

export default CustomTimePicker;
