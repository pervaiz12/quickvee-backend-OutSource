import React, { useEffect, useState } from "react";
import "../../../Styles/StoreSetting.css";
import "../../../Styles/Settings/SystemAccess.css";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import Switch from "@mui/material/Switch";
import {
  fetchsystemAccessListData,
  updateSystemAccessData,
  addActualAmountData,
} from "../../../Redux/features/SystemAccess/systemAccessSlice";
import { useSelector, useDispatch } from "react-redux";

import dayjs from "dayjs";

const SystemAccessData = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const currentTime = dayjs();
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const [actualAmount, setActualAmount] = useState({
    actual_amt: "",
  });
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [systemAccess, setallSystemAccess] = useState({
    default_cash_drawer: "",
    clock_in: false,
    hide_inactive: false,
    end_day_Allow: "",
    shift_assign: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    emp_permission: "",
    no_of_station: "",
    report_history: "",
  });

  const AllInSystemAccessState = useSelector((state) => state.systemAccessList);

  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchsystemAccessListData(data));
    }
  }, []);

  useEffect(() => {
    if (
      !AllInSystemAccessState.loading &&
      AllInSystemAccessState.systemAccessData
    ) {
      setallSystemAccess(AllInSystemAccessState.systemAccessData);
    }
  }, [
    AllInSystemAccessState,
    AllInSystemAccessState.loading,
    AllInSystemAccessState.systemAccessData,
  ]);


  //This is for Report History
  const SwitchEnabledtoggleInput = (e) => {
    setIsSwitchEnabled(!isSwitchEnabled);
    
  };

  useEffect(() => {
    // console.log("Sytem Access Data", systemAccess.report_history);
    if (
      systemAccess &&
      systemAccess.report_history &&
      systemAccess.report_history === 1
    ) {
      setIsSwitchEnabled(true);
    }
    else{
        setIsSwitchEnabled(false);
    }
  }, [systemAccess]);



  //handle cash_drawer
  const handleCashDrawerChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("name and value", name, value);
  };

  //handle Clock In Change
  const handleClockInChange = (e) => {
    const { name, checked } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    // console.log("name and value", name, checked);
  };

  // Handle Hide Inactive
  const handleHideInactiveChange = (e) => {
    const { name, checked } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    // console.log("name and value", name, checked);
  };

  //Handle End Of Day Allow
  const handleEndOfDayAllowanceChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("name and value", name, value);
  };

  //Handle shift Assignment
  const handleShiftAssignmentChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("name and value", name, value);
  };

//   //Handle Start Date
//   const handleStartDateChange = (e) => {
//     const { name, value } = e.target;
//     setallSystemAccess((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     console.log("name and value", name, value);
//   };

//   //Handle End Date
//   const handleEndDateChange = (e) => {
//     const { name, value } = e.target;
//     setallSystemAccess((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     console.log("name and value", name, value);
//   };


// Handle Start Date
const handleStartDateChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
      start_time: value === "2" ? "00:00" : prevState.start_time,
    }));
    console.log("name and value", name, value);
  };
  
  // Handle End Date
  const handleEndDateChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
      end_time: value === "2" ? "00:00" : prevState.end_time,
    }));
    console.log("name and value", name, value);
  };
  


  const formatTime = (timeString) => {
    const formattedTime = dayjs(timeString, 'HH:mm').format('hh:mm A');
    return formattedTime;
};



  //Handle Start Time
  const handleStartTimeChange = (e) => {
    const { value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      start_time: value,
    }));
    console.log("Start Time:", value);
  };

  //Handle End Time
  const handleEndTimeChange = (e) => {
    const { value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      end_time: value,
    }));
    console.log("End Time:", value);
  };
  //Handle Employee Permission
  const handleEmPermissionChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("name and value", name, value);
  };

  //Handle No Of Station
  const handleNoOfStationChange = (e) => {
    const { name, value } = e.target;
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("name and value", name, value);
  };

 

  const handleActualAmtInputChange = (e) => {
    const { name, value } = e.target;
    setActualAmount((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });

    // console.log("Name and Value of AAAA", name, value);
  };

 


  const handleActualAmtSave = () => {
    const data = {
      merchant_id: "",
      actual_amt: actualAmount.actual_amt,
    };
    dispatch(addActualAmountData(data));
  };
//   console.log("Actual Amount", actualAmount);



// This is a main Save or Update  
  const handleSave = () => {
    const data = {
      merchant_id: "MAL0100CA",
      default_cash_drawer: systemAccess.default_cash_drawer,
      clock_in: systemAccess.clock_in ? "1" : "0",
      hide_inactive: systemAccess.hide_inactive ? "1" : "0",
      // end_day_Allow: systemAccess.end_day_Allow,
      end_day_Allow:
        systemAccess.end_day_Allow == 1
          ? "1"
          : systemAccess.end_day_Allow == 2
            ? "2"
            : "3",
      // shift_assign: systemAccess.shift_assign,
      shift_assign:
        systemAccess.shift_assign == 1
          ? "1"
          : systemAccess.shift_assign == 2
            ? "2"
            : "3",
      start_date: systemAccess.start_date == 1 ? "1" : "2",
      end_date: systemAccess.end_date == 1 ? "1" : "2",
      start_time: systemAccess.start_time,
      end_time: systemAccess.end_time,
      report_history: (isSwitchEnabled) ? "1" : "0",
      emp_permission: systemAccess.emp_permission,
    };
    dispatch(updateSystemAccessData(data));
  };

  //end of day
  const loginType = "login_via_superadmin"; //
  // Condition to check if the button should be shown
  const shouldShowEndOfDayButton =
    loginType == "login_via_superadmin" && systemAccess.shift_assign == 3;

  //
  useEffect(() => {
    if (shouldShowEndOfDayButton) {
      console.log(
        "Executing logic for superadmin with shift_assign 3 on component load"
      );
    }
  }, [shouldShowEndOfDayButton]);

  return (
    <>
      <div className="box_shadow_div">
        <div className="qvrow">
          <div className="col-qv-6">
            <div className="input_area">
              <label>Default Cash Drawer Start</label>
              <input
                type="text"
                placeholder="%0.00"
                maxlength="8"
                name="default_cash_drawer"
                id="cash_drawer"
                value={systemAccess.default_cash_drawer || ""}
                onChange={handleCashDrawerChange}
              />
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
                Clock In/Out Receipt
                <input
                  type="checkbox"
                  className="psize-input psize-input"
                  id="delivery103890"
                  name="clock_in"
                  value="1"
                  checked={systemAccess.clock_in == 1 ? true : false}
                  // checked={systemAccess.clock_in}

                  onChange={handleClockInChange}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
                Hide Inactive Employees
                <input
                  type="checkbox"
                  id="delivery103890"
                  name="hide_inactive"
                  value="1"
                  checked={systemAccess.hide_inactive == 1 ? true : false}
                  // checked={systemAccess.hide_inactive}
                  onChange={handleHideInactiveChange}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="box_shadow_div">
        <div className="qvrow">
          <h5 className="box_shadow_heading">Time Clock</h5>
          <div className="col-qv-6">
            <div className="input_area">
              <label>End of Day Allowance</label>
              <select
                name="end_day_Allow"
                value={systemAccess.end_day_Allow || ""}
                onChange={handleEndOfDayAllowanceChange}
              >
                <option value="1" selected={systemAccess.end_day_Allow == 1}>
                  Deny if staff clocked in
                </option>
                <option value="2" selected={systemAccess.end_day_Allow == 2}>
                  Mass clock out staff clocked in
                </option>
                <option value="3" selected={systemAccess.end_day_Allow == 3}>
                  Ignore Time Clock
                </option>
              </select>
            </div>
          </div>
          <div className="col-qv-6">
            <div className="input_area">
              <label>Shift Assignment</label>
              <select
                name="shift_assign"
                id="shift_assign"
                value={systemAccess.shift_assign || ""}
                onChange={handleShiftAssignmentChange}
              >
                <option value="1" selected={systemAccess.shift_assign == 1}>
                  Don’t Track Shifts
                </option>
                <option value="2" selected={systemAccess.shift_assign == 2}>
                  Track Shifts by Cashier
                </option>
                <option value="3" selected={systemAccess.shift_assign == 3}>
                  Track Shifts by Station
                </option>
              </select>
            </div>
          </div>
        </div>
        {shouldShowEndOfDayButton && (
          <div className="col-qv-12">
            <button className="save_btn" onClick={openModal}>
              End of Day
            </button>
          </div>
        )}
        
      </div>

      <div className="box_shadow_div">
        <div className="qvrow">
          <h5 className="box_shadow_heading">
            Default Reporting Start & End Date/Time
          </h5>
          <div className="col-qv-6">
            <div className="input_area">
              <label>Start Day</label>
              <select
                name="start_date"
                id="start_date"
                value={systemAccess.start_date || ""}
                onChange={handleStartDateChange}
              >
                <option value="1" selected={systemAccess.start_date == 1}>
                  Yesterday
                </option>
                <option value="2" selected={systemAccess.start_date == 2}>
                  Today
                </option>
              </select>
            </div>
          </div>
          <div className="col-qv-6">
            <div className="input_area">
              <label>End Day</label>
              <select
                name="end_date"
                id="end_date"
                value={systemAccess.end_date || ""}
                onChange={handleEndDateChange}
              >
                <option value="1" selected={systemAccess.end_date == 1}>
                  Today
                </option>
                <option value="2" selected={systemAccess.end_date == 2}>
                  Tomorrow
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="qvrow">
          <div className="col-qv-6">
            <div className="input_area">
              <label>Start Time</label>
              <input
                type="time"
                name="start_time"
                value={systemAccess.start_time || ""}
                id="start_tym"
                required
                onChange={handleStartTimeChange}
              />
              {/* <span>{formatTime(systemAccess.start_time)}</span> */}
            </div>
          </div>
          <div className="col-qv-6">
            <div className="input_area">
              <label>End Time</label>
              <input
                type="time"
                name="end_time"
                value={systemAccess.end_time || ""}
                id="end_tym"
                required
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="box_shadow_div">
        <div className="qvrow">
          <h5 className="box_shadow_heading">
            Viewable Sales Report History
            <div className="fr">
              <Switch
                {...label}
                name="report_history"
                checked={isSwitchEnabled}
                value={isSwitchEnabled}
                onChange={SwitchEnabledtoggleInput}
              />
            </div>
          </h5>
          <div className="col-qv-6">
            <div className="input_area">
              <label>Restricted by Employee permission (Number of Days)</label>
              <input
                type="text"
                placeholder="%0.00"
                name="emp_permission"
                value={systemAccess.emp_permission}
                onChange={handleEmPermissionChange}
              />
            </div>
          </div>
          <div className="col-qv-6">
            <div className="input_area">
              <label>Number of Station</label>
              <input
                type="text"
                placeholder="%0.00"
                name="no_of_station"
                value={systemAccess.no_of_station}
                onChange={handleNoOfStationChange}
              />
            </div>
          </div>
        </div>
        <div className="qvrow">
          <div className="col-md-6">
            <button class="save_btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="q-custom-modal-container" id="">
          {/* Your modal JSX */}
          <div className="q-custom-modal-content">
            {/* Your modal content */}
            <div className="">
              <p className="q-custom-modal-header ">
                Actual Amount
                <img
                  src={CrossIcon}
                  alt="icon"
                  className="ml-auto mb-4"
                  onClick={closeModal}
                />
              </p>
            </div>
            {/* ... other modal content ... */}
            <label>Enter Actual Amount</label>
            <input
              type="text"
              maxlength="9"
              name="actual_amt"
              id="actual_amt"
              value={actualAmount.actual_amt}
              placeholder="0.00"
              onChange={handleActualAmtInputChange}
              className="q-custom-input-field"
            />
            <span className="input-error">
              {errorMessage !== "" ? errorMessage : ""}
            </span>
            <div className="q-add-categories-section-middle-footer">
              <button
                className="quic-btn quic-btn-save"
                id="submit_actual_amt"
                value=""
                onClick={handleActualAmtSave}
              >
                Save
              </button>
              <button onClick={closeModal} className="quic-btn quic-btn-cancle">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SystemAccessData;
