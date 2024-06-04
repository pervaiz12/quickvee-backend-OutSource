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

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
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

const StoreWorkingHrs = () => {
  const dispatch = useDispatch();
  const [newDayAdded, setNewDayAdded] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(null);
  const [classItem, setClassItem] = useState(1);
  const [currentDay, setCurrentDay] = useState();
  const [lastIndices, setLastIndices] = useState({});
  const [dayCount , setDayCount] = useState()

  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  const defaultDays = setupDataState?.time_slot ? setupDataState.time_slot : "";
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (setupDataState?.time_slot) {
      try {
        const defaultDays = JSON.parse(setupDataState.time_slot);
        setDays(defaultDays);
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
  console.log("days", days);
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

  const handledeletetimeslot = (dayName, timeslotIndex) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const dayIndex = updatedDays.findIndex((day) => day.name === dayName);

      if (dayIndex !== -1) {
        // Remove the specified time slot from the day's timeSlot array
        updatedDays[dayIndex].timeSlot = updatedDays[dayIndex].timeSlot.filter(
          (_, index) => index !== timeslotIndex
        );
      }

      // Additional logic if needed
      setSelectedRow(dayIndex);
      setNewDayAdded(true);
      setClassItem(classItem + 1);

      return updatedDays;
    });
  };

  // const handleaddtimeslot = (name) => {
  //   setDays((prevDays) => {
  //     const updatedDays = [...prevDays];
  //     const index = updatedDays.findIndex((day) => day.name === name);

  //     if (index !== -1) {
  //       // Add a new time slot to the specified day
  //       const newTimeSlot = {
  //         startTime: "",
  //         endTime: "",
  //         // Add any other properties needed for a time slot
  //       };

  //       updatedDays[index].timeSlot = [
  //         ...updatedDays[index].timeSlot,
  //         newTimeSlot,
  //       ];
  //     }

  //     // Additional logic if needed
  //     setSelectedRow(index);
  //     setNewDayAdded(true);
  //     setClassItem(classItem + 1);

  //     return updatedDays;
  //   });
  // };

  const handleAddTimeSlot = (dayName) => {
    setDays((prevDays) => {
      // Find the last index of the specified day
      const lastIndex = lastIndices[dayName];
  
      // Create a new day object (customize as needed)
      const newDay = {
        id: Date.now().toString(),  // Generate a unique ID for the new day
        day_name: dayName,
        day_count: prevDays[lastIndex].day_count + 1,  // Increment the day_count
        open_time: "",  // Default open time
        close_time: "",  // Default close time
        day_code: prevDays[lastIndex].day_code,
        is_holiday: "0",
        merchant_clover_id: prevDays[lastIndex].merchant_clover_id,
        multiple_flag: prevDays[lastIndex].multiple_flag + 1, // Increment the multiple_flag
      };
  
      // Insert the new day below the last index of the specified day
      const updatedDays = [
        ...prevDays.slice(0, lastIndex + 1),
        newDay,
        ...prevDays.slice(lastIndex + 1),
      ];
  
      // Recalculate lastIndices for all days
      const indicesMap = {};
      updatedDays.forEach((day, index) => {
        indicesMap[day.day_name] = index;
      });
  
      setLastIndices(indicesMap);
  
      return updatedDays;
    });
  };
  
  const handleDeleteDay = (dayName, id) => {
    console.log("Deleting", dayName, "lastIndices", lastIndices);

    // Update lastIndices state to reduce the count of the deleted day
    

    // Remove the day from the days state
    setDays((prevDays) => {
      // Filter out the deleted day
      const filteredDays = prevDays.filter((day) => day.id !== id);
    
      const updatedDays = filteredDays.map((day) => {
        if (day.day_name === dayName) {
          return { ...day, day_count: day.day_count - 1 };
        }
        return day;
      });
      // Recalculate lastIndices for all remaining days
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
                          <StyledTableRow key={index}>
                            <StyledTableCell sx={{ width: "10%" }}>
                              {!isDayAlreadyRendered && (
                                <p> {dayData.day_name}</p>
                              )}
                            </StyledTableCell>
                            <StyledTableCell sx={{ width: "10%" }}>
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
                            <StyledTableCell sx={{}}>
                              {dayData.is_holiday === "1" ? (
                                <div> </div>
                              ) : (
                                <>
                                  <div className="flex">
                                    <div className="">
                                      <CustomItem
                                        OpenTime={dayData.open_time}
                                        CloseTime={dayData.close_time}
                                      />
                                    </div>
                                    <div style={{ width: "5%" }}>
                                      <div className="flex justify-between">
                                        {index ===
                                          lastIndices[dayData.day_name] && (
                                          <>
                                            
                                            { dayData.day_count > 1 
                                               && 
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
                                            }
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
          <Grid container>
            <Grid item xs={12}>
              {/* {days &&
                days.length >= 1 &&
                days.map((dayData, index) => {
                  const isDayAlreadyRendered = renderedDays.has(
                    dayData.day_name
                  );
                  if (!isDayAlreadyRendered) {
                    renderedDays.add(dayData.day_name);
                  }

                  return (
                    <>
                      <div
                        key={index}
                        className={`flex day-container ${
                          "day_0_0 day_count_" + index
                        } ${index % 2 === 0 ? "even" : "odd"}`}
                      >
                        {!isDayAlreadyRendered && (
                          <>
                            <div style={{ width: "15%" }}>
                              {dayData.day_name}
                            </div>
                            <div style={{ width: "15%" }}>
                              {dayData.is_holiday === "" ? (
                                ""
                              ) : (
                                <>
                                  <Switch
                                    defaultChecked={
                                      (dayData.is_holiday === "0" && true) ||
                                      (dayData.is_holiday === "1" && false)
                                    }
                                    onChange={(e) =>
                                      handleSwitchChange(e, dayData.day_name)
                                    }
                                  />
                                  <span>
                                    {" "}
                                    {dayData.is_holiday
                                      ? "Open"
                                      : "Closed"}{" "}
                                  </span>
                                </>
                              )}
                            </div>
                          </>
                        )}

                        {dayData.is_holiday === "1" ? (
                          <div> </div>
                        ) : (
                          <>
                            <div className="flex" style={{ width: "45%" }}>
                              <div className="">
                                <CustomItem
                                  OpenTime={dayData.open_time}
                                  CloseTime={dayData.close_time}
                                />
                              </div>
                            </div>
                            <div style={{ width: "5%" }}>
                              <div className="flex justify-between">
                                {dayData?.timeSlot?.length <= 0 ? (
                                  <>
                                    <img
                                      src={DeleteIcon}
                                      alt=""
                                      className="ml-6 mt-2 "
                                      // onClick={() => handleDeleteDay(index)}
                                    />
                                    <img
                                      src={AddIcon}
                                      alt=""
                                      className="ml-6 mt-2"
                                      onClick={() =>
                                        handleaddtimeslot(dayData.day_name)
                                      }
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {dayData?.timeSlot?.map((timeSlotDay, ind) => (
                        <>
                          <div
                            key={index}
                            className={`flex day-container ${
                              dayData.className
                            } ${index % 2 === 0 ? "even" : "odd"}`}
                          >
                            <div style={{ width: "15%" }}></div>
                            <div style={{ width: "15%" }}></div>
                            <div className="flex" style={{ width: "45%" }}>
                              <div className="">
                                <CustomItem />
                              </div>
                            </div>
                            <div style={{ width: "5%", zIndex: "999" }}>
                              <div className="flex justify-between">
                                {dayData?.timeSlot?.length - 1 === ind ? (
                                  <>
                                    <img
                                      src={DeleteIcon}
                                      alt=""
                                      className="ml-6 mt-2 "
                                      onClick={() =>
                                        handledeletetimeslot(
                                          dayData?.day_name,
                                          ind
                                        )
                                      }
                                    />
                                    <img
                                      src={AddIcon}
                                      alt=""
                                      className="ml-6 mt-2"
                                      onClick={() =>
                                        handleaddtimeslot(
                                          dayData?.day_name,
                                          ind
                                        )
                                      }
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  );
                })} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StoreWorkingHrs;
