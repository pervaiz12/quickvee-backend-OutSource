import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import AddIcon from "../../../Assests/Filter/DeleteSetup.svg";
import DeleteIcon from "../../../Assests/Filter/AddSetup.svg";
import CustomItem from "./CustomItem";
import ClockIcon from "../../../Assests/Filter/Clock.svg";
import { useDispatch, useSelector } from "react-redux";
import { set } from "date-fns";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AlertModal from "../../../reuseableComponents/AlertModal";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2,
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const StoreWorkingHrs = ({ days, setDays, setLastCloseTimeState,merchant_id }) => {
  const dayList = [
    {
      id: "1",
      merchant_clover_id: merchant_id,
      day_name: "Sunday",
      day_code: "0",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
    {
      id: "2",
      merchant_clover_id: merchant_id,
      day_name: "Monday",
      day_code: "1",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
    {
      id: "3",
      merchant_clover_id: merchant_id,
      day_name: "Tuesday",
      day_code: "2",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
    {
      id: "4",
      merchant_clover_id: merchant_id,
      day_name: "Wednesday",
      day_code: "3",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
    {
      id: "5",
      merchant_clover_id: merchant_id,
      day_name: "Thursday",
      day_code: "4",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
    {
      id: "6",
      merchant_clover_id: merchant_id,
      day_name: "Friday",
      day_code: "5",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
    {
      id: "7",
      merchant_clover_id: merchant_id,
      day_name: "Saturday",
      day_code: "6",
      open_time: "9:00 am",
      close_time: "5:00 pm",
      is_holiday: "0",
      multiple_flag: "0",
      day_count: 1,
    },
  ];
  const dispatch = useDispatch();
  const [newDayAdded, setNewDayAdded] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(null);
  const [classItem, setClassItem] = useState(1);
  const [currentDay, setCurrentDay] = useState();
  const [lastIndices, setLastIndices] = useState({});
  const [dayCount, setDayCount] = useState();

  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  const defaultDays = setupDataState?.time_slot ? setupDataState.time_slot : "";

  useEffect(() => {
    if (setupDataState?.time_slot) {
      try {
        const defaultDays = JSON.parse(setupDataState.time_slot);
        setDays(defaultDays.length > 0 ? defaultDays : dayList);
        const indicesMap = {};
        defaultDays.forEach((day, index) => {
          indicesMap[day.day_name] = index;
        });
        setLastIndices(indicesMap);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [setupDataState]);

  const handleSwitchChange = (event, name) => {
    const isChecked = event.target.checked;
    setDays((prevDays) => {
      return prevDays.map((day) => {
        if (day.day_name === name) {
          return { ...day, is_holiday: isChecked ? "0" : "1" };
        }
        return day;
      });
    });
  };

  // const handledeletetimeslot = (dayName, timeslotIndex) => {
  //   setDays((prevDays) => {
  //     const updatedDays = [...prevDays];
  //     const dayIndex = updatedDays.findIndex((day) => day.name === dayName);

  //     if (dayIndex !== -1) {
  //       // Remove the specified time slot from the day's timeSlot array
  //       updatedDays[dayIndex].timeSlot = updatedDays[dayIndex].timeSlot.filter(
  //         (_, index) => index !== timeslotIndex
  //       );
  //     }

  //     // Additional logic if needed
  //     setSelectedRow(dayIndex);
  //     setNewDayAdded(true);
  //     setClassItem(classItem + 1);

  //     return updatedDays;
  //   });
  // };

  const addMinutes = (time, minutes) => {
    let [hours, rest] = time.split(":");
    let [mins, period] = rest.split(" ");
    hours = parseInt(hours);
    mins = parseInt(mins);

    if (period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    let totalMinutes = hours * 60 + mins + minutes;
    hours = Math.floor(totalMinutes / 60) % 24;
    mins = totalMinutes % 60;

    period = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    const formattedTime = `${hours}:${mins < 10 ? "0" : ""}${mins} ${period}`;
    return formattedTime;
  };
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleAddTimeSlot = (dayName) => {
    setDays((prevDays) => {
      const lastIndex = lastIndices[dayName];
      const lastCloseTime = prevDays[lastIndex].close_time;
      setLastCloseTimeState(false);
      console.log("lastCloseTime", lastCloseTime);
      if (lastCloseTime === "") {
        showModal("End time cannot be empty");
        return prevDays;
      } else {
        const newOpenTime = addMinutes(lastCloseTime, 0);
        const newCloseTime = addMinutes(lastCloseTime, 15);

        const newDay = {
          id: Date.now().toString(),
          day_name: dayName,
          day_count: prevDays[lastIndex].day_count,
          open_time: newOpenTime,
          close_time: "",
          day_code: prevDays[lastIndex].day_code,
          is_holiday: "0",
          merchant_clover_id: prevDays[lastIndex].merchant_clover_id,
          multiple_flag: prevDays[lastIndex].multiple_flag + 1,
        };

        const updatedDays = [
          ...prevDays.slice(0, lastIndex + 1),
          newDay,
          ...prevDays.slice(lastIndex + 1),
        ];
        const updatedDaysWthIndices = updatedDays.map((day) => {
          if (day.day_name === dayName) {
            return { ...day, day_count: day.day_count + 1 };
          }
          return day;
        });

        const indicesMap = {};
        updatedDaysWthIndices.forEach((day, index) => {
          indicesMap[day.day_name] = index;
        });

        setLastIndices(indicesMap);

        return updatedDaysWthIndices;
      }
    });
  };

  const handleDeleteDay = (dayName, id) => {
    setLastCloseTimeState(true);
    setDays((prevDays) => {
      const filteredDays = prevDays.filter((day) => day.id !== id);

      const updatedDays = filteredDays.map((day) => {
        if (day.day_name === dayName) {
          return { ...day, day_count: day.day_count - 1 };
        }
        return day;
      });

      const indicesMap = {};
      updatedDays.forEach((day, index) => {
        indicesMap[day.day_name] = index;
      });
      setLastIndices(indicesMap);

      return updatedDays;
    });
  };

  const renderedDays = new Set();
  const tempRenderedDays = new Set();

  return (
    <>
      <Grid container sx={{}} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <h5 className="box_shadow_heading" style={{ marginBottom: "0" }}>
                Store Working Hours
              </h5>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableBody>
                    {days &&
                      days.length >= 1 &&
                      days.map((dayData, index) => {
                        const isDayAlreadyRendered = tempRenderedDays.has(
                          dayData.day_name
                        );

                        if (!isDayAlreadyRendered) {
                          tempRenderedDays.add(dayData.day_name);
                        }
                        return (
                          <StyledTableRow
                            sx={{
                              display:
                                dayData.is_holiday == "1" &&
                                isDayAlreadyRendered &&
                                "none",
                            }}
                            key={index}
                          >
                            <StyledTableCell
                              sx={{
                                width: "10%",
                                borderBottom:
                                  index === lastIndices[dayData.day_name]
                                    ? "1px solid rgba(224, 224, 224, 1)"
                                    : 0,
                              }}
                            >
                              {!isDayAlreadyRendered && (
                                <p> {dayData.day_name}</p>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                width: "10%",
                                borderBottom:
                                  index === lastIndices[dayData.day_name]
                                    ? "1px solid rgba(224, 224, 224, 1)"
                                    : 0,
                              }}
                            >
                              {!isDayAlreadyRendered && (
                                <Switch
                                  defaultChecked={
                                    (dayData.is_holiday === "0" && true) ||
                                    (dayData.is_holiday === "1" && false)
                                  }
                                  onChange={(e) =>
                                    handleSwitchChange(e, dayData.day_name)
                                  }
                                />
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                borderBottom:
                                  index === lastIndices[dayData.day_name]
                                    ? "1px solid rgba(224, 224, 224, 1)"
                                    : 0,
                              }}
                            >
                              {dayData.is_holiday === "1" ? (
                                ""
                              ) : (
                                <>
                                  <div className="flex">
                                    <div className="">
                                      <CustomItem
                                        id={dayData.id}
                                        setDays={setDays}
                                        days={days}
                                        OpenTime={dayData.open_time}
                                        CloseTime={dayData.close_time}
                                        dayName={dayData.day_name}
                                        setLastCloseTimeState={
                                          setLastCloseTimeState
                                        }
                                      />
                                    </div>
                                    <div style={{ width: "5%" }}>
                                      <div className="flex justify-between">
                                        {index ===
                                          lastIndices[dayData.day_name] && (
                                          <>
                                            {dayData.day_count > 1 && (
                                              <img
                                                src={DeleteIcon}
                                                alt=""
                                                className="ml-6 mt-2"
                                                onClick={() =>
                                                  handleDeleteDay(
                                                    dayData.day_name,
                                                    dayData.id
                                                  )
                                                }
                                              />
                                            )}
                                            <img
                                              src={AddIcon}
                                              alt=""
                                              className="ml-6 mt-2"
                                              onClick={() =>
                                                handleAddTimeSlot(
                                                  dayData.day_name
                                                )
                                              }
                                            />
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AlertModal
        headerText={alertModalHeaderText}
        open={alertModalOpen}
        onClose={() => {
          setAlertModalOpen(false);
        }}
      />
    </>
  );
};

export default StoreWorkingHrs;
