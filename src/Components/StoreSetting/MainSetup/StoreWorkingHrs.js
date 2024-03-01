import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import DeleteIcon from "../../../Assests/Filter/DeleteSetup.svg";
import AddIcon from "../../../Assests/Filter/AddSetup.svg";

const StoreWorkingHrs = () => {
  // State and handlers for Sunday
  const [sundayOpen, setSundayOpen] = useState(false);
  const [sundayStartTime, setSundayStartTime] = useState("");
  const [sundayEndTime, setSundayEndTime] = useState("");

  const handleSundaySwitchChange = () => {
    setSundayOpen((prev) => !prev);
  };

  const handleSundayStartTimeChange = (e) => {
    setSundayStartTime(e.target.value);
  };

  const handleSundayEndTimeChange = (e) => {
    setSundayEndTime(e.target.value);
  };

  // State and handlers for Monday
  const [mondayOpen, setMondayOpen] = useState(false);
  const [mondayStartTime, setMondayStartTime] = useState("");
  const [mondayEndTime, setMondayEndTime] = useState("");

  const handleMondaySwitchChange = () => {
    setMondayOpen((prev) => !prev);
  };

  const handleMondayStartTimeChange = (e) => {
    setMondayStartTime(e.target.value);
  };

  const handleMondayEndTimeChange = (e) => {
    setMondayEndTime(e.target.value);
  };
  
  // Function to delete a day
  const handleDeleteDay = (day) => {
    // Implement deletion logic here
    console.log(`Deleting ${day}`);
  };

  // Function to add a day
  const handleAddDay = () => {
    // Implement addition logic here
    console.log("Adding a day");
  };

  return (
    <>
    <div className="box_shadow_div">
      <div className="my-3">
        <div className=""> 
        <h5 className="box_shadow_heading" style={{padding:"15px 30px"}}>Store Working Hours</h5></div>
       

        {/* Sunday */}
        <div className="flex day-container odd">
          <div style={{ width: "15%" }}>Sunday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="sunday_open"
              checked={sundayOpen}
              onChange={handleSundaySwitchChange}
            />
            {sundayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="sunday_start_time"
                value={sundayStartTime}
                id="sunday_start_tym"
                required
                onChange={handleSundayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="sunday_end_time"
                value={sundayEndTime}
                id="sunday_end_tym"
                required
                onChange={handleSundayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={() => handleDeleteDay("sunday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>

        {/* Monday */}
        <div className="flex day-container even">
          <div style={{ width: "15%" }}>Monday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="monday_open"
              checked={mondayOpen}
              onChange={handleMondaySwitchChange}
            />
            {mondayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="monday_start_time"
                value={mondayStartTime}
                id="monday_start_tym"
                required
                onChange={handleMondayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="monday_end_time"
                value={mondayEndTime}
                id="monday_end_tym"
                required
                onChange={handleMondayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={() => handleDeleteDay("monday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
        <div className="flex day-container odd">
          <div style={{ width: "15%" }}>Tuesday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="sunday_open"
              checked={sundayOpen}
              onChange={handleSundaySwitchChange}
            />
            {sundayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="sunday_start_time"
                value={sundayStartTime}
                id="sunday_start_tym"
                required
                onChange={handleSundayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="sunday_end_time"
                value={sundayEndTime}
                id="sunday_end_tym"
                required
                onChange={handleSundayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={() => handleDeleteDay("sunday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
        <div className="flex day-container even">
          <div style={{ width: "15%" }}>Wednesday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="monday_open"
              checked={mondayOpen}
              onChange={handleMondaySwitchChange}
            />
            {mondayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="monday_start_time"
                value={mondayStartTime}
                id="monday_start_tym"
                required
                onChange={handleMondayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="monday_end_time"
                value={mondayEndTime}
                id="monday_end_tym"
                required
                onChange={handleMondayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={() => handleDeleteDay("monday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>

        <div className="flex day-container odd">
          <div style={{ width: "15%" }}>Thursday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="sunday_open"
              checked={sundayOpen}
              onChange={handleSundaySwitchChange}
            />
            {sundayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="sunday_start_time"
                value={sundayStartTime}
                id="sunday_start_tym"
                required
                onChange={handleSundayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="sunday_end_time"
                value={sundayEndTime}
                id="sunday_end_tym"
                required
                onChange={handleSundayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2 d-none"
                onClick={() => handleDeleteDay("sunday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
        <div className="flex day-container even">
          <div style={{ width: "15%" }}>Friday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="monday_open"
              checked={mondayOpen}
              onChange={handleMondaySwitchChange}
            />
            {mondayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="monday_start_time"
                value={mondayStartTime}
                id="monday_start_tym"
                required
                onChange={handleMondayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="monday_end_time"
                value={mondayEndTime}
                id="monday_end_tym"
                required
                onChange={handleMondayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={() => handleDeleteDay("monday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
        <div className="flex day-container odd">
          <div style={{ width: "15%" }}>Saturday</div>
          <div style={{ width: "15%" }}>
            <Switch
              name="sunday_open"
              checked={sundayOpen}
              onChange={handleSundaySwitchChange}
            />
            {sundayOpen ? "Open" : "Closed"}
          </div>
          <div className="flex" style={{ width: "45%" }}>
            <div className="input_area">
              <input
                type="time"
                name="sunday_start_time"
                value={sundayStartTime}
                id="sunday_start_tym"
                required
                onChange={handleSundayStartTimeChange}
              />
            </div>
            <div className="q_store_working_section">
              <div className="text-center">To</div>
            </div>
            <div className="input_area">
              <input
                type="time"
                name="sunday_end_time"
                value={sundayEndTime}
                id="sunday_end_tym"
                required
                onChange={handleSundayEndTimeChange}
              />
            </div>
          </div>
          <div style={{ width: "5%" }}>
            <div className="flex justify-between">
              <img
                src={DeleteIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={() => handleDeleteDay("sunday")}
              />
              <img
                src={AddIcon}
                alt=""
                className="ml-6 mt-2"
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
        {/* Repeat the structure for other days */}
        {/* Tuesday, Wednesday, Thursday, Friday, Saturday */}
      </div>
      </div>
    </>
  );
};

export default StoreWorkingHrs;



