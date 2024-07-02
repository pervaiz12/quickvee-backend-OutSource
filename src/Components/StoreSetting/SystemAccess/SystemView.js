import React, { useEffect, useState } from "react";
import "../../../Styles/StoreSetting.css";
import "../../../Styles/Settings/SystemAccess.css";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import TimeIcon from "../../../Assests/Filter/Clock.svg";
import Switch from "@mui/material/Switch";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import {
  fetchsystemAccessListData,
  updateSystemAccessData,
  addActualAmountData,
} from "../../../Redux/features/SystemAccess/systemAccessSlice";
import { useSelector, useDispatch } from "react-redux";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlertModal from "../../../reuseableComponents/AlertModal";
import { Box, Modal } from "@mui/material";
import { BASE_URL, CHECK_END_DAY } from "../../../Constants/Config";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import PasswordShow from "../../../Common/passwordShow";

const SystemAccessData = () => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const currentTime = dayjs();
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const [actualAmount, setActualAmount] = useState({
    actual_amt: "",
  });
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // console.log(SystemAccessData);
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
  console.log(systemAccess);

  const AllInSystemAccessState = useSelector((state) => state.systemAccessList);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const {handleCoockieExpire,getUnAutherisedTokenMessage}=PasswordShow()
  const startDay = (day) => {
    if (day == 1) {
      return "Yesterday";
    } else if (day == 2) {
      return "Today";
    }
  };
  const endDay = (day) => {
    if (day == 2) {
      return "Tomorrow";
    } else if (day == 1) {
      return "Today";
    }
  };
  const DayAll = (day) => {
    if (day == 1) {
      return "Deny if staff clocked in";
    } else if (day == 2) {
      return "Mass clock out staff clocked in";
    } else if (day == 3) {
      return "Ignore Time Clock";
    }
  };
  const defaultSiftAssign = (day) => {
    if (day == 1) {
      return "Don’t Track Shifts";
    } else if (day == 2) {
      return "Track Shifts by Cashier";
    } else if (day == 3) {
      return "Track Shifts by Station";
    }
  };
  const [selectedStartDay, setSelectedStartDay] = useState("");
  const [selectedEndDay, setSelectedEndDay] = useState("");
  const [selectedDayAllow, setSelectedDayAllow] = useState("");
  const [selectShiftAssign, setSelectShiftAssign] = useState("");
  console.log(selectedStartDay);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id,
      ...userTypeData,
    };
    if (data) {
      dispatch(fetchsystemAccessListData(data));
    }
  }, []);

  useEffect(() => {
    setSelectedStartDay(startDay(systemAccess.start_date));
    setSelectedEndDay(endDay(systemAccess.end_date));
    setSelectedDayAllow(DayAll(systemAccess.end_day_Allow));
    setSelectShiftAssign(defaultSiftAssign(systemAccess.shift_assign));
  }, [systemAccess]);

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
    } else {
      setIsSwitchEnabled(false);
    }
  }, [systemAccess]);

  //handle cash_drawer
  const handleCashDrawerChange = (e) => {
    const { name, value } = e.target;

    let fieldValue;
    fieldValue = value
      // Remove extra dots and ensure only one dot exists at most
      .replace(/[^\d.]/g, "") // Allow digits and dots only
      .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
      .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

    let inputStr = fieldValue.replace(/\D/g, "");
    inputStr = inputStr.replace(/^0+/, "");

    if (inputStr.length == "") {
      fieldValue = "0.00";
    } else if (inputStr.length === 1) {
      fieldValue = "0.0" + inputStr;
    } else if (inputStr.length === 2) {
      fieldValue = "0." + inputStr;
    } else {
      fieldValue =
        inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
    }
    setallSystemAccess((prevState) => ({
      ...prevState,
      [name]: fieldValue,
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
    // alert("First perform end of to make changes here.")
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
    const formattedTime = dayjs(timeString, "HH:mm").format("hh:mm A");
    return formattedTime;
  };

  //Handle Start Time
  // const handleStartTimeChange = (e) => {
  //   const { value } = e.target;
  //   setallSystemAccess((prevState) => ({
  //     ...prevState,
  //     start_time: value,
  //   }));
  //   console.log("Start Time:", value);
  // };

  //Handle End Time
  // const handleEndTimeChange = (e) => {
  //   const { value } = e.target;
  //   setallSystemAccess((prevState) => ({
  //     ...prevState,
  //     end_time: value,
  //   }));
  //   console.log("End Time:", value);
  // };
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
    let fieldValue;
    fieldValue = value
      // Remove extra dots and ensure only one dot exists at most
      .replace(/[^\d.]/g, "") // Allow digits and dots only
      .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
      .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point
    let inputStr = fieldValue.replace(/\D/g, "");
    inputStr = inputStr.replace(/^0+/, "");

    if (inputStr.length == "") {
      fieldValue = "0.00";
    } else if (inputStr.length === 1) {
      fieldValue = "0.0" + inputStr;
    } else if (inputStr.length === 2) {
      fieldValue = "0." + inputStr;
    } else {
      fieldValue =
        inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
    }
    setActualAmount((preValue) => {
      return {
        ...preValue,
        [name]: fieldValue,
      };
    });

    // console.log("Name and Value of AAAA", name, value);
  };

  const handleActualAmtSave = async () => {
    setLoader(true)
    try {
      const data = {
        merchant_id,
        actual_amt: actualAmount.actual_amt,
        ...userTypeData,
      };
      // console.log("data",data)
      // return
      await dispatch(addActualAmountData(data)).unwrap();
      
    } catch (error) {
      handleCoockieExpire();
      getUnAutherisedTokenMessage();
    }
    setLoader(false)
  };
  //   console.log("Actual Amount", actualAmount);

  // This is a main Save or Update
  const handleSave = async () => {
    
    // console.log("data",data)
    // return
    // dispatch(updateSystemAccessData(data));
    setLoader(true)
    try {
      const data = {
        merchant_id,
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
        report_history: isSwitchEnabled ? "1" : "0",
        emp_permission: systemAccess.emp_permission,
        ...userTypeData,
      };
      await dispatch(updateSystemAccessData(data)).unwrap();

    } catch (error) {
      handleCoockieExpire();
      getUnAutherisedTokenMessage();
    }
    setLoader(false)
  };

  //end of day
  const loginType = "login_via_superadmin"; //
  // Condition to check if the button should be shown
  const shouldShowEndOfDayButton =
    // loginType == "login_via_superadmin" && systemAccess.shift_assign == 3;
    (loginType == "login_via_superadmin" && systemAccess.shift_assign == 3) ||
    systemAccess.shift_assign == 2;

  //
  useEffect(() => {
    if (shouldShowEndOfDayButton) {
      console.log(
        "Executing logic for superadmin with shift_assign 3 on component load"
      );
    }
  }, [shouldShowEndOfDayButton]);

  // start Sumesh
  const handleStartTimeChange = (newTime) => {
    setallSystemAccess((prevState) => ({
      ...prevState,
      start_time: newTime.format("HH:mm:ss"),
    }));
    // console.log("Start Time:", newTime.format("HH:mm:ss"));
  };
  const handleEndTimeChange = (newTime) => {
    setallSystemAccess((prevState) => ({
      ...prevState,
      end_time: newTime.format("HH:mm:ss"),
    }));
  };

  const StartDay = [
    {
      title: "Yesterday",
    },
    {
      title: "Today",
    },
  ];
  const EndDay = [
    {
      title: "Today",
    },
    {
      title: "Tomorrow",
    },
  ];
  const DayAllow = [
    {
      title: "Deny if staff clocked in",
    },
    {
      title: "Mass clock out staff clocked in",
    },
    {
      title: "Ignore Time Clock",
    },
  ];
  const SiftAssign = [
    {
      title: "Don’t Track Shifts",
    },
    {
      title: "Track Shifts by Cashier",
    },
    {
      title: "Track Shifts by Station",
    },
  ];

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "StartDay":
        setSelectedStartDay(option.title);
        // Set defaults.type based on the selected option
        let StartDay;
        switch (option.title) {
          case "Yesterday":
            StartDay = 1; // You can set it to an empty string or another default value
            break;
          case "Today":
            StartDay = 2;
            break;
          // Add more cases if needed
          default:
            StartDay = ""; // Set a default value if necessary
            break;
        }
        setallSystemAccess((prevValue) => ({
          ...prevValue,
          start_date: StartDay,
        }));
        break;
      case "EndDay":
        setSelectedEndDay(option.title);
        // Set defaults.type based on the selected option
        let EndDay;
        switch (option.title) {
          case "Today":
            EndDay = 1; // You can set it to an empty string or another default value
            break;
          case "Tomorrow":
            EndDay = 2;
            break;
          // Add more cases if needed
          default:
            EndDay = ""; // Set a default value if necessary
            break;
        }
        setallSystemAccess((prevValue) => ({
          ...prevValue,
          end_date: EndDay,
        }));
        break;
      case "DayAllow":
        setSelectedDayAllow(option.title);
        // Set defaults.type based on the selected option
        let DayAllow;
        switch (option.title) {
          case "Deny if staff clocked in":
            DayAllow = 1; // You can set it to an empty string or another default value
            break;
          case "Mass clock out staff clocked in":
            DayAllow = 2;
            break;
          // Add more cases if needed
          case "Ignore Time Clock":
            DayAllow = 3;
            break;
          default:
            DayAllow = ""; // Set a default value if necessary
            break;
        }
        setallSystemAccess((prevValue) => ({
          ...prevValue,
          end_day_Allow: DayAllow,
        }));
        break;
      case "SiftAssign":
        checkEndofDay().then((res) => {
          if (
            res.status === false &&
            res.msg === "You not can change setting, perform End of Day first"
          ) {
            setAlertModalHeaderText(
              "First perform end of day to make changes here."
            );
            setAlertModalOpen(true);
            return;
          } else {
            setAlertModalHeaderText("");
            setAlertModalOpen(false);
            setSelectShiftAssign(option.title);
            let siftAssValue;
            switch (option.title) {
              case "Don’t Track Shifts":
                siftAssValue = 1;
                break;
              case "Track Shifts by Cashier":
                siftAssValue = 2;
                break;
              case "Track Shifts by Station":
                siftAssValue = 3;
                break;
              default:
                siftAssValue = "";
                break;
            }
            setallSystemAccess((prevValue) => ({
              ...prevValue,
              shift_assign: siftAssValue,
            }));
          }
        });
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };

  const handleClose = () => setShowModal(false);
  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };

  const checkEndofDay = async () => {
    const checkdata = { merchant_id, ...userTypeData };
    try {
      const res = await axios.post(BASE_URL + CHECK_END_DAY, checkdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData.token}`, // Use data?.token directly
        },
      });
      return res.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div" style={{ padding: "20px" }}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={6}>
              <label>Default Cash Drawer Start</label>
              <BasicTextFields
                type="text"
                name="default_cash_drawer"
                onChangeFun={handleCashDrawerChange}
                value={systemAccess.default_cash_drawer || ""}
                maxLength={8}
                placeholder={"0.00"}
                onKeyPressFun={handleKeyPress}
                sx={{ pt: 0.5 }}
              />
            </Grid>
          </Grid>
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
      <div className="box">
        <div className="box_shadow_div" style={{ padding: "20px" }}>
          <div className="qvrow">
            <h5 className="box_shadow_heading">Time Clock</h5>
          </div>
          <Grid container spacing={4}>
            <Grid item md={6} xs={6}>
              <label style={{ marginBottom: "3px" }}>
                End of Day Allowance
              </label>
              <SelectDropDown
                listItem={DayAllow}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedDayAllow}
                dropdownFor={"DayAllow"}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <label style={{ marginBottom: "3px" }}>Shift Assignment</label>
              <SelectDropDown
                listItem={SiftAssign}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectShiftAssign}
                dropdownFor={"SiftAssign"}
              />
            </Grid>
          </Grid>
          {shouldShowEndOfDayButton && (
            <div className="col-qv-12 mt-4">
              <button className="save_btn" onClick={openModal}>
                End of Day
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="box" style={{ paddingBottom: "80px" }}>
        <div className="box_shadow_div" style={{ padding: "20px" }}>
          <div className="qvrow">
            <h5 className="box_shadow_heading">
              Default Reporting Start & End Date/Time
            </h5>
          </div>

          <Grid container spacing={4}>
            {/* <Grid item xs={12}> */}

            {/* </Grid> */}
            <Grid item md={6} xs={6}>
              <label className="pb-1">Start Day</label>
              <SelectDropDown
                listItem={StartDay}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedStartDay}
                dropdownFor={"StartDay"}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <label className="pb-1">End Day</label>
              <SelectDropDown
                listItem={EndDay}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedEndDay}
                dropdownFor={"EndDay"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item md={6} xs={6} style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <label htmlFor=" " className="pb-1">
                  Start Time
                </label>
                <TimePicker
                  name="start_time"
                  slotProps={{
                    textField: { placeholder: "Select Time" },
                  }}
                  onChange={(newTime) => handleStartTimeChange(newTime)}
                  value={
                    systemAccess.start_time
                      ? dayjs(systemAccess.start_time, "HH:mm")
                      : null
                  }
                  components={{
                    OpenPickerIcon: () => (
                      <img src={TimeIcon} alt="time-icon" />
                    ),
                  }}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={6} xs={6} style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <label htmlFor=" " className="pb-1">
                  End Time
                </label>
                <TimePicker
                  name="end_time"
                  slotProps={{
                    textField: { placeholder: "Select Time" },
                  }}
                  onChange={(newTime) => handleEndTimeChange(newTime)}
                  value={
                    systemAccess.end_time
                      ? dayjs(systemAccess.end_time, "HH:mm")
                      : null
                  }
                  components={{
                    OpenPickerIcon: () => (
                      <img src={TimeIcon} alt="time-icon" />
                    ),
                  }}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {shouldShowEndOfDayButton && (
            <Grid container sx={{ pb: 1 }} className="mt-2">
              <Grid item xs={12}>
                <label>Number of Station</label>
                <BasicTextFields
                  name="no_of_station"
                  type={"number"}
                  value={systemAccess.no_of_station}
                  onChangeFun={handleNoOfStationChange}
                  sx={{ mt: 0.5 }}
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </Grid>
            </Grid>
          )}
        </div>
      </div>
      <div className="box" style={{display:"flex", justifyContent:"flex-end"}}>
        <button class="save_btn attributeUpdateBTN" onClick={handleSave}>
          {loader ? ( <><CircularProgress color={"inherit"} className="loaderIcon" width={15} size={15} />{" "}  Save </>) : ("Save")}
        </button>
      </div>

      {showModal && (
        <>
          <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="view-category-item-modal" style={myStyles}>
              <div
                className="q-add-categories-section-header text-[18px]"
                style={{
                  justifyContent: "space-between",
                  fontFamily: "CircularSTDBook",
                }}
              >
                <span style={{ cursor: "unset" }}>Actual Amount</span>
                <div>
                  <img
                    src={CrossIcon}
                    alt="icon"
                    className="  quic-btn-cancle w-6 h-6 cursor-pointer"
                    onClick={() => closeModal()}
                  />
                </div>
              </div>

              <div className="view-category-item-modal-header">
                <div
                  className="title_attributes_section"
                  style={{ margin: "1rem 1rem" }}
                >
                  <label className="mb-2">Enter Actual Amount</label>
                  <BasicTextFields
                    type="text"
                    name="actual_amt"
                    onChangeFun={handleActualAmtInputChange}
                    value={actualAmount.actual_amt}
                    maxLength={9}
                    placeholder={"0.00"}
                    onKeyPressFun={handleKeyPress}
                    sx={{ pt: 0.5 }}
                  />
                  <span className="input-error">
                    {errorMessage !== "" ? errorMessage : ""}
                  </span>
                </div>
              </div>

            <div className="q-add-categories-section-middle-footer">
              <button
                onClick={handleActualAmtSave}
                className="quic-btn quic-btn-save attributeUpdateBTN"
                disabled={true}
              >
                {loader ? ( <><CircularProgress color={"inherit"} className="loaderIcon" width={15} size={15} />{" "}  Save </>) : ("Save")}
              </button>
              <button onClick={closeModal} className="quic-btn quic-btn-cancle">
                Cancel
              </button>
            </div>
          </Box>
          </Modal>
        </>
      )}

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

export default SystemAccessData;
