import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import AddIcon from "../../../Assests/Filter/DeleteSetup.svg";
import DeleteIcon from "../../../Assests/Filter/AddSetup.svg";
import CustomItem from "./CustomItem";
import ClockIcon from "../../../Assests/Filter/Clock.svg"


const StoreWorkingHrs = () => {
  const [newDayAdded, setNewDayAdded] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(null);
  const [classItem, setClassItem] = useState(1)
  
  // State and handlers for each day
  const [days, setDays] = useState([
    {
      name: "Sunday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_0_0 day_count_0"
    },
    {
      name: "Monday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_1_0 day_count_1"
    },
    {
      name: "Tuesday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_2_0 day_count_2"
    },
    {
      name: "Wednesday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_3_0 day_count_3"
    },
    {
      name: "Thursday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_4_0 day_count_4"
    },
    {
      name: "Friday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_5_0 day_count_5"
    },
    {
      name: "Saturday",
      open: true,
      startTime: "",
      endTime: "",
      className:"day_6_0 day_count_6"
    },
  ]);


  const handleSwitchChange = (index) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].open = !updatedDays[index].open;
      return updatedDays;
    });
  };


  const handleDeleteDay = (index) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays.splice(index, 1); 
      return updatedDays;
    });
  };

  


const handleAddDay = (index) => {
  setSelectedRow(index);
  setNewDayAdded(true);
  
  
  const newDay = {
    name: "",
    open: "",
    startTime: "",
    endTime: "",
    className: `day_0_${classItem} day_count_0`
  };
  setClassItem(classItem+1)
  setDays((prevDays) => {
    const updatedDays = [...prevDays];
    updatedDays.splice(index + 1, 0, newDay); 
    return updatedDays;
  });
};

  return (
    <div className="box_shadow_div">
      <div className="my-3">
        <h5 className="box_shadow_heading" style={{ padding: "15px 30px" }}>
          Store Working Hours
        </h5>

        {days.map((day, index) => (
  <div
    key={index}
    className={`flex day-container ${day.className} ${index % 2 === 0 ? "even" : "odd"}`}
  >
    <div style={{ width: "15%" }}>{day.name}</div>
    <div style={{ width: "15%" }}>
      {day.open === "" ? "" : <Switch checked={day.open} onChange={() => handleSwitchChange(index)} />}
    </div>
    <div className="flex" style={{ width: "45%" }}>
      {day.open  ? <CustomItem /> : null}
      {/* <CustomItem /> */}
    </div>
    <div style={{ width: "5%", zIndex: "999" }}>
      <div className="flex justify-between">
        {day.name === "" ? (
          <img
            src={DeleteIcon}
            alt=""
            className="ml-6 mt-2"
            onClick={() => handleDeleteDay(index)}
          />
        ) : (
          ""
        )}
        {day.open ? (
          <img
            src={AddIcon}
            alt=""
            className="ml-6 mt-2"
            onClick={() => handleAddDay(index)}
          />
        ) : (
         <>
         
         {day.open ? <img
              src={AddIcon}
              alt=""
              className="ml-6 mt-2"
              onClick={() => handleAddDay(index)}
            /> : null}
         </>

          
        )}
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default StoreWorkingHrs;
