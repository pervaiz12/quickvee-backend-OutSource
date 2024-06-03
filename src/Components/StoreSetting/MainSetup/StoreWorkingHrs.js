import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import AddIcon from "../../../Assests/Filter/DeleteSetup.svg";
import DeleteIcon from "../../../Assests/Filter/AddSetup.svg";
import CustomItem from "./CustomItem";
import ClockIcon from "../../../Assests/Filter/Clock.svg";
import { useDispatch, useSelector } from "react-redux";
import { set } from "date-fns";
import { Grid } from "@mui/material";

const StoreWorkingHrs = () => {
  const dispatch = useDispatch();
  const [newDayAdded, setNewDayAdded] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(null);
  const [classItem, setClassItem] = useState(1);

  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  // console.log("gagaga", setupDataState)

  // const [days, setDays] = useState([
  //   {
  //     name: "Sunday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_0_0 day_count_0",
  //     timeSlot: []
  //   },
  //   {
  //     name: "Monday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_1_0 day_count_1",
  //     timeSlot: []
  //   },
  //   {
  //     name: "Tuesday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_2_0 day_count_2",
  //     timeSlot: []
  //   },
  //   {
  //     name: "Wednesday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_3_0 day_count_3",
  //     timeSlot: []
  //   },
  //   {
  //     name: "Thursday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_4_0 day_count_4",
  //     timeSlot: []
  //   },
  //   {
  //     name: "Friday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_5_0 day_count_5",
  //     timeSlot: []
  //   },
  //   {
  //     name: "Saturday",
  //     open: true,
  //     startTime: "",
  //     endTime: "",
  //     className: "day_6_0 day_count_6",
  //     timeSlot: []
  //   },
  // ]);

  const defaultDays = setupDataState?.time_slot ? setupDataState.time_slot : "";
  const [days, setDays] = useState([]);
  useEffect(() => {
    if (setupDataState?.time_slot) {
      try {
        const defaultDays = JSON.parse(setupDataState.time_slot);
        setDays(defaultDays);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [setupDataState]);

  const handleSwitchChange = (name) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const index = updatedDays.findIndex((day) => day.day_name === name);
      if (index !== -1) {
        updatedDays[index].open = !updatedDays[index].open;
      }

      return updatedDays;
    });
  };

  //   const handleDeleteDay = (index) => {
  //     setDays((prevDays) => {
  //       const updatedDays = [...prevDays];
  //       updatedDays.splice(index, 1);
  //       return updatedDays;
  //     });
  //   };

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

  const handleaddtimeslot = (name) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const index = updatedDays.findIndex((day) => day.name === name);

      if (index !== -1) {
        // Add a new time slot to the specified day
        const newTimeSlot = {
          startTime: "",
          endTime: "",
          // Add any other properties needed for a time slot
        };

        updatedDays[index].timeSlot = [
          ...updatedDays[index].timeSlot,
          newTimeSlot,
        ];
      }

      // Additional logic if needed
      setSelectedRow(index);
      setNewDayAdded(true);
      setClassItem(classItem + 1);

      return updatedDays;
    });
  };
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
              {days &&
                days.length >= 1 &&
                days.map((dayData, index) => (
                  <>
                    <div
                      key={index}
                      className={`flex day-container ${
                        "day_0_0 day_count_" + index
                      } ${index % 2 === 0 ? "even" : "odd"}`}
                    >
                      <div style={{ width: "15%" }}>{dayData.day_name}</div>
                      <div style={{ width: "15%" }}>
                        {dayData.is_holiday === "" ? (
                          ""
                        ) : (
                          <>
                            <Switch
                              // checked={dayData.is_holiday}
                              defaultChecked={dayData.is_holiday}
                              onChange={() =>
                                handleSwitchChange(dayData.day_name)
                              }
                            />
                            <span>
                              {" "}
                              {dayData.is_holiday ? "Open" : "Closed"}{" "}
                            </span>
                          </>
                        )}
                      </div>

                      {dayData.is_holiday === false ? (
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
                          className={`flex day-container ${dayData.className} ${
                            index % 2 === 0 ? "even" : "odd"
                          }`}
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
                                      handleaddtimeslot(dayData?.day_name, ind)
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
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StoreWorkingHrs;
