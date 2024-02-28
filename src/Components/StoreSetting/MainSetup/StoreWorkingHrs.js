import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import DeleteIcon from "../../../Assests/Filter/DeleteSetup.svg";
import AddIcon from "../../../Assests/Filter/AddSetup.svg";

const StoreWorkingHrs = () => {

  const [newDayAdded, setnewDayAdded] = useState(false)
  // State and handlers for each day
  const [days, setDays] = useState([
    {
      name: "Sunday",
      open: true,
      startTime: "",
      endTime: ""
    },
    {
      name: "Monday",
      open: true,
      startTime: "",
      endTime: ""
    },
    {
      name: "Tuesday",
      open: true,
      startTime: "",
      endTime: ""
    },
    {
      name: "Wednesday",
      open: true,
      startTime: "",
      endTime: ""
    },
    {
      name: "Thursday",
      open: false,
      startTime: "",
      endTime: ""
    },
    {
      name: "Friday",
      open: false,
      startTime: "",
      endTime: ""
    },
    {
      name: "Saturday",
      open: false,
      startTime: "",
      endTime: ""
    },
   

  ]);

  const handleSwitchChange = (index) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].open = !updatedDays[index].open;
      return updatedDays;
    });
  };

  const handleStartTimeChange = (index, e) => {
    const { value } = e.target;
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].startTime = value;
      return updatedDays;
    });
  };

  const handleEndTimeChange = (index, e) => {
    const { value } = e.target;
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].endTime = value;
      return updatedDays;
    });
  };

  const handleDeleteDay = (index , itemtype) => {
    if(itemtype === "new"){
      setDays((prevDays) => {
        const updatedDays = [...prevDays];
        updatedDays.splice(index, 1);
        return updatedDays;
      });
    }
    else{
      setDays((prevDays) => {
        const updatedDays = [...prevDays];
        updatedDays[index].open = "Closed";
        return updatedDays;
      });
    }
  };

  const handleAddDay = () => {
    setnewDayAdded(true)
    const newDay = {
      name: "",
      open: false,
      startTime: "",
      endTime: ""
    };
    setDays((prevDays) => [...prevDays, newDay]);
  };

  return (
    <div className="box_shadow_div">
      <div className="my-3">
        <h5 className="box_shadow_heading" style={{ padding: "15px 30px" }}>
          Store Working Hours
        </h5>

        {days.map((day, index) => (
          <div key={index} className={`flex day-container ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div style={{ width: "15%" }}>{day.name}</div>
            <div style={{ width: "15%" }}>
              <Switch
                checked={day.open}
                onChange={() => handleSwitchChange(index)}
              />
              {day.open ? "Open" : "Closed"}
            </div>
            <div className="flex" style={{ width: "45%" }}>
              <div className="input_area">
                <input
                  type="time"
                  value={day.startTime}
                  onChange={(e) => handleStartTimeChange(index, e)}
                  disabled={!day.open}
                />
              </div>
              <div className="q_store_working_section">
                <div className="text-center">To</div>
              </div>
              <div className="input_area">
                <input
                  type="time"
                  value={day.endTime}
                  onChange={(e) => handleEndTimeChange(index, e)}
                  disabled={!day.open}
                />
              </div>
            </div>
            <div style={{ width: "5%" }}>

              
              <div className="flex justify-between">
                <img
                  src={AddIcon}
                  alt=""
                  className="ml-6 mt-2"
                  onClick={() => handleDeleteDay(index, index === days.length - 1 && newDayAdded  ? "new" : "old")}
                />
                {index === days.length - 1 && (
                  <img
                    src={DeleteIcon}
                    alt=""
                    className="ml-6 mt-2"
                    onClick={handleAddDay}
                  />
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
