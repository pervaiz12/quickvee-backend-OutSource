import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "../../Assests/Category/addIcon.svg";
import AddNewCategory from "../../Assests/Taxes/Left.svg";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import caleIcon from "../../Assests/Filter/Calender.svg";
import TimeIcon from "../../Assests/Filter/Clock.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { Box, Modal } from "@mui/material";
import { fetchtimeSheetData , deleteTimesheet , deleteBreak } from "../../Redux/features/Timesheet/timesheetSlice";
import axios from "axios";
import { BASE_URL, EMPLOYEE_LIST ,ADD_TIME_SHEET , TIME_SHEET_GETBREAKS , ADD_TIME_BREAK} from '../../Constants/Config';
import { useAuthDetails } from './../../Common/cookiesHelper';

const TimesheetListing = ({ data }) => {

  const dispatch = useDispatch();
  const [timesheet, settimesheet] = useState([]);
  const [employeeList, setemployeeList] = useState([]);
  const [EmployeeName, setEmployeeName] = useState(""); 
  const timeSheetDataState = useSelector((state) => state.timeSheet);
  const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat=LoginGetDashBoardRecordJson
   const merchant_id=AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id

  useEffect(() => {
    if(!data.merchant_id){
        console.log("empty")
    }else{
      dispatch(fetchtimeSheetData(data));
    }
    }, [dispatch, data]);

    // console.log("timesheet",timesheet)

  useEffect(() => {
    if (!timeSheetDataState.loading && timeSheetDataState.timeSheetData) {
      settimesheet(timeSheetDataState.timeSheetData);
    }
  }, [
    timeSheetDataState,
    timeSheetDataState.loading,
    timeSheetDataState.timeSheetData,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + EMPLOYEE_LIST,
          { merchant_id: merchant_id },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const EmpList = response.data.result;

        const mappedOptions = EmpList.map((empdata) => ({
          id: empdata.id,
          title: empdata.f_name + " " + empdata.l_name,
        }));
        setemployeeList(mappedOptions);

      } catch (error) {
        console.error("Error fetching Employee List:", error);
      }
    };
    fetchData();
  }, []);
  


  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };

  const [dateStartError, setDateStartError] = useState("");
  const [dateEndError, setDateEndError] = useState("");
  const [dateStartTimeError, setDateStartTimeError] = useState("");
  const [dateEndTimeError, setDateEndTimeError] = useState("");
  const [modalAddTimesheetID, setModalAddTimesheetID] = useState("");
  const [addTimesheetMsg, setaddTimesheetMsg] = useState("");


  const [addtimebreak, setTimeBreak] = useState({
    merchant_id:merchant_id,
    add_in_date: "",
    add_out_date: "",
    add_clocked_in: "",
    add_clocked_out: "",
    token_id:userTypeData.token_id,
    login_type:userTypeData.login_type
    // add_clocked_in: dayjs().format("HH:mm:ss"),
    // add_clocked_out: dayjs().format("HH:mm:ss"),

    // time_valid: roundedTime.format("HH:mm:ss"),
    // time_expire: roundedTime.format("HH:mm:ss"),
  });

  const openModal = (title,id) => {
    setEmployeeName(title)
    setModalAddTimesheetID(id)
    setaddTimesheetMsg("");

    setTimeBreak(prevState => ({
      ...prevState,
      add_in_date: "",
      add_out_date: "",
      add_clocked_in: "",
      add_clocked_out: ""
    }));
    setDateStartError("");
    setDateStartTimeError("");
    setDateEndError("");
    setDateEndTimeError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  

  const minutes = Math.round(dayjs().minute() / 15) * 15;
  const roundedTime = dayjs().minute(minutes).second(0);
  // console.log(roundedTime);

  const handleStartTimeChange = (newTime) => {
    if(!addtimebreak.add_clocked_out){
        setTimeBreak({
          ...addtimebreak,
          add_clocked_in: newTime.format("HH:mm:ss"),
        });
    }else{
      if(addtimebreak.add_clocked_in<addtimebreak.add_clocked_out){
        console.log("add_clocked_in<add_clocked_out")
        setDateEndTimeError("Out Date and Time should be greater than In Date and Time.")
      }else if(addtimebreak.add_clocked_in>addtimebreak.add_clocked_out){
        setTimeBreak({
          ...addtimebreak,
          add_clocked_in: newTime.format("HH:mm:ss"),
        });
        setDateEndTimeError("");
      }
    }
  };
  const handleEndTimeChange = (newTime) => {
    setTimeBreak({
      ...addtimebreak,
      add_clocked_out: newTime.format("HH:mm:ss"),
    });
  //   if(!addtimebreak.add_clocked_in){
  //     setTimeBreak({
  //       ...addtimebreak,
  //       add_clocked_out: newTime.format("HH:mm:ss"),
  //     });
  //   }else{
  //     if(addtimebreak.add_clocked_in<addtimebreak.add_clocked_out){
  //       setDateEndTimeError("Out Date and Time should be greater than In Date and Time.")
  //     }else{
  //       setTimeBreak({
  //         ...addtimebreak,
  //         add_clocked_out: newTime.format("HH:mm:ss"),
  //       });
  //       setDateEndTimeError("");
  //     }
  //   }
  };

  const handleStartDateChange = (newDate) => {
    const formattedStartDate = newDate.format("YYYY-MM-DD");
    if (dayjs(formattedStartDate).isAfter(dayjs(addtimebreak.add_out_date))) {
      alert("Start date cannot be greater than the end date");
      setTimeBreak({
        ...addtimebreak,
        add_in_date: null,
      });
      setDateStartError("Select In Date is required");
    } else {
      setTimeBreak({
        ...addtimebreak,
        add_in_date: formattedStartDate,
      });
      setDateStartError("");
    }
  };


  const handleEndDateChange = (newDate) => {
    const formattedEndDate = newDate.format("YYYY-MM-DD");

    if (dayjs(formattedEndDate).isBefore(dayjs(addtimebreak.add_in_date))){
      alert("End date cannot be less than the start date");
      setTimeBreak({
        ...addtimebreak,
        add_out_date: null,
      });
      setDateEndError("Select Out Date is required");
      // return; // Do not update the state
    } else {
      setTimeBreak({
        ...addtimebreak,
        add_out_date: formattedEndDate,
      });
      setDateEndError("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!addtimebreak.add_in_date) {
      setDateStartError("Select In Date is required");
      return;
    } else {
      setDateStartError("");
    }

    if (!addtimebreak.add_clocked_in) {
      setDateStartTimeError("Clock In Time is required");
      return;
    } else {
      setDateStartTimeError("");
    }

    if (!addtimebreak.add_out_date) {
      setDateEndError("Select Out Date is required");
      return;
    } else {
      setDateEndError("");
    }

    if (!addtimebreak.add_clocked_out) {
      setDateEndTimeError("Clock Out Time is required");
      return;
    } else {
      setDateEndTimeError("");
    }
    if(addtimebreak.add_in_date == addtimebreak.add_out_date && addtimebreak.add_clocked_in == addtimebreak.add_clocked_out){
      setDateEndTimeError("Out Date and Time should be greater than In Date and Time.")
      return
    }else if(addtimebreak.add_clocked_in<addtimebreak.add_clocked_out){
      setDateEndTimeError("Out Date and Time should be greater than In Date and Time.")
      return
    }else{
      setDateEndTimeError("");
    }
    const formData = new FormData();
    formData.append("merchant_id", addtimebreak.merchant_id);
    formData.append("employee_id", modalAddTimesheetID);
    formData.append("in_date", addtimebreak.add_in_date);
    formData.append("out_date", addtimebreak.add_out_date);
    formData.append("clocked_in", addtimebreak.add_clocked_in);
    formData.append("clocked_out", addtimebreak.add_clocked_out);
    formData.append("token_id", addtimebreak.token_id);
    formData.append("login_type", addtimebreak.login_type);
   
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    return
    try {
      const response = await axios.post(`${BASE_URL}${ADD_TIME_SHEET}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${userTypeData.token}`
        }
      });
      if (response.data.status === true && response.data.msg ==="Inserted successfully." ) {
        dispatch(fetchtimeSheetData(data));
        setShowModal(false);
      }else if(response.data.status === false && response.data.msg ==="Invalid time entered."){
        setaddTimesheetMsg(response.data.msg)
        setShowModal(true);
      }else{
        setShowModal(true);
      }
    } catch (error) {
      console.error("API Error:", error);
    }


  }


  // for Break Modal start
  const [showModalBreak, setShowModalBreak] = useState(false);
  const handleOpenBreak = () => setShowModalBreak(true);
  const handleCloseBreak = () => setShowModalBreak(false);
  const [modalDate, setModalDate] = useState("");
  const [modalDateOUT, setModalDateOUT] = useState("");
  const [modalAddBreakID, setModalAddBreakID] = useState("");
  const [BreakInTimeError, setBreakInTimeError] = useState("");
  const [BreakOutTimeError, setBreakOutTimeError] = useState("");
  const [addBreakMsg, setaddBreakMsg] = useState("");

  const openModalBreak = (title,id,date,out_date) => {
    setEmployeeName(title)
    setModalAddBreakID(id)
    setModalDate(formatDate(date));
    setModalDateOUT(out_date);
    setBreakInTimeError("");
    setBreakOutTimeError("");
    setaddBreakMsg("")
    setShowModalBreak(true);
  };

  const closeModalBreak = () => {
    setBreakInTimeError("");
    setBreakOutTimeError("");
    setShowModalBreak(false);
  };

  const [addbreak, setaddbreak] = useState({
    merchant_id: merchant_id,
    modalDate:modalDate,
    addbreakIn: "",
    addbreakOut: "",
    token_id:userTypeData.token_id,
    login_type:userTypeData.login_type
  });

  const handleBreakStartTimeChange = (newTime) => {
    setaddbreak({
      ...addbreak,
      addbreakIn: newTime.format("HH:mm:ss"),
    });
  };
  const handleBreakEndTimeChange = (newTime) => {
    setaddbreak({
      ...addbreak,
      addbreakOut: newTime.format("HH:mm:ss"),
    });
  };


  const handleBreakSave = async (e) => {
    e.preventDefault();
    
    if (!addbreak.addbreakIn) {
      setBreakInTimeError("Break In Time is required");
      return;
    } else {
      setBreakInTimeError("");
    }

    if (!addbreak.addbreakOut) {
      setBreakOutTimeError("Break Out Time is required");
      return;
    } else {
      setBreakOutTimeError("");
    }

    const formData = new FormData();
    formData.append("merchant_id", addbreak.merchant_id);
    formData.append("employee_id", modalAddBreakID);
    formData.append("break_in_date", formatDatePayload(modalDate));
    formData.append("break_out_date", modalDateOUT);
    formData.append("break_in_time", addbreak.addbreakIn);
    formData.append("break_out_time", addbreak.addbreakOut);
    formData.append("token_id", addtimebreak.token_id);
    formData.append("login_type", addtimebreak.login_type);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`${BASE_URL}${ADD_TIME_BREAK}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${userTypeData.token}`
        }
      });
      if (response.data.status === true && response.data.msg ==="Break Added." ) {
        setShowModalBreak(false);
      }else if(response.data.status === false && response.data.msg === "Invalid time entered."){
        setaddBreakMsg(response.data.msg)
        setShowModalBreak(true);
      }else{
        setShowModalBreak(true);
      }
    } catch (error) {
      console.error("API Error:", error);
    }


  }
  // for Break Modal End
  
  // for All View Break IN/Out Start  
  const [showModalViewBreak, setShowModalViewBreak] = useState(false);
  const handleOpenViewBreak = () => setShowModalViewBreak(true);
  const handleCloseViewBreak = () => setShowModalViewBreak(false);
  const [breakDetails, setBreakDetails] = useState([]);
  const [EmployeeWorkDate, setEmployeeWorkDate] = useState(""); 
  const [EmployeeWorkDateOUT, setEmployeeWorkDateOUT] = useState(""); 
  const [EmployeeTimeIn, setEmployeeTimeIn] = useState(""); 
  const [EmployeeTimeOut, setEmployeeTimeOut] = useState(""); 
  const [AllbreakDelete, setAllbreakDelete] = useState(""); 


  const openModalViewBreak = (title,data) => {
    setEmployeeName(title)
    fetchBreakDetails(data);
    setEmployeeWorkDate(data.attendance_date)
    setEmployeeWorkDateOUT(data.out_date)
    setEmployeeTimeIn(formatTime(data.check_in_time))
    setEmployeeTimeOut(formatTime(data.check_out_time))
    setAllbreakDelete(data)
    setShowModalViewBreak(true);
  };

  const closeModalViewBreak = () => {
    setShowModalViewBreak(false);
  };

  const fetchBreakDetails = async (data) => {
   
    try {
      const response = await axios.post(`${BASE_URL}${TIME_SHEET_GETBREAKS}`,  {
        merchant_id:merchant_id,
        attendance_id: data.attendance_id,
        check_in_time: formatTime(data.check_in_time),
        check_out_time: formatTime(data.check_out_time),
        indate: formatDatePayload(data.attendance_date),
        outdate: data.out_date,
        token_id:userTypeData.token_id,
        login_type:userTypeData.login_type
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${userTypeData.token}`
        }
      });
      if (response.data.status === true) {
          setBreakDetails(response.data.breaks_list);
      }else{
          setBreakDetails([]);
      }
    } catch (error) {
      console.error("API Error:", error);
    }

  };



  // for All View Break IN/Out End

   // for Delete Break Start 
   // first alert Are you sure want to delete this break timeing ?
  // Url https://sandbox.quickvee.net/Timesheet/delete_breaks
  // paramerte break_id: 10921-10922
  const deleteBreakTimesheet = (data) => {
    const datas = {
      break_id:`${data.check_in_id}-${data.check_out_id}`,
    };
   
    const userConfirmed = window.confirm("Are you sure want to delete this break timeing ?");
    if (userConfirmed) {
      if (data) {
        dispatch(deleteBreak(datas)).then(() => {
          dispatch(fetchBreakDetails(data));
        });
      }
    } else {
      console.log("Deletion canceled by break timeing");
    }
  };




  // fo all Break Delete 
  // first alert Are sure want to delete this timeclock? confirm then hit api 
  // url https://sandbox.quickvee.net/Timesheet/delete_timeclock
  // parameter inid: 10931
            // outid: 10932
            // attendanceid: 3912
            // checkin: 12:00 AM
            // checkout: 09:00 PM
            // indate: 17-05-2024
            // outdate: 17-05-2024

    const deleteAllBreakTimesheet = (dataTimesheet) => {
      const datas = {
        inid: dataTimesheet.check_in_id,
        outid: dataTimesheet.check_out_id,
        attendanceid: dataTimesheet.attendance_id,
        checkintime: formatTime(dataTimesheet.check_in_time),
        checkouttime: formatTime(dataTimesheet.check_out_time),
        indate: dataTimesheet.attendance_date,
        outdate: dataTimesheet.out_date,
        merchant_id:merchant_id,
        ...userTypeData
      };
     
      const userConfirmed = window.confirm("Are sure want to delete this timeclock?");
      if (userConfirmed) {
        if (dataTimesheet) {
          dispatch(deleteTimesheet(datas)).then(() => {
            dispatch(fetchtimeSheetData(data));
          });
        }
        closeModalViewBreak()
      } else {
        console.log("props data",data)
        console.log("Deletion canceled by timeclock");
      }
    };

   
  // for Delete Break End



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const [currentDate, setCurrentDate] = useState(getDate());
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  // Function to format time from HH:MM:SS to hh:mm AM/PM
  const formatTime = (timeString) => {
    if (!timeString) {
      return ''; // Return an empty string or a placeholder if timeString is undefined
    }
    let [hours, minutes, seconds] = timeString.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const formatDatePayload = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateBrake = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };


  const renderDataTable = () => {
    if ( timesheet && timesheet.status === false ){
      return <div className="empty-div box"></div>;
    }
    
    const renderEmployeeData = (employee,timesheetEntries) => {
      return (
        <div className="box" key={employee.id}>
          <div className="q-attributes-bottom-detail-section">
            <div className="mt-6">
              <div className="q-attributes-bottom-header bg-[#ffffff]">
                <span>{employee.title}</span>
                <p onClick={() => openModal(employee.title,employee.id)}> Add Clock-in/Clock-out<img src={AddIcon} alt="add-icon" />{" "}</p>
              </div>
              <div className="q-attributes-bottom-attriButes-header">
                <p className="q-catereport-item">Date Worked</p>
                <p className="q-catereport-item">Wage Rate</p>
                <p className="q-catereport-item">Clock In</p>
                <p className="q-catereport-item">Clock Out</p>
                <p className="q-catereport-item"></p>
              </div>
              {timesheetEntries.length > 0 ? (
                timesheetEntries.map((entry, index) => (
                  <div
                className="q-attributes-bottom-attriButes-single-attributes TimesheetRow cursor-pointer"
                key={index}
                onClick={() => openModalViewBreak(employee.title,entry)}
              >
                <p className="q-catereport-item">{formatDate(entry.attendance_date)}</p>
                <p className="q-catereport-item">{entry.wages_per_hr && entry.wages_per_hr > 0 ? `$${entry.wages_per_hr}/hr` : '-'} </p>
                {/* <p className="q-catereport-item">{formatTime(entry.check_in_time)}</p> */}
                {/* <p className="q-catereport-item">{formatTime(entry.check_out_time)}</p> */}
                {entry.incomplete === true ? (
                  <>
                    <p className="q-catereport-item">{formatTime(entry.time_entered)}</p>
                    <p className="q-catereport-item">pending</p>
                  </>
                ) : (
                  <>
                    <p className="q-catereport-item">{formatTime(entry.check_in_time)}</p>
                    <p className="q-catereport-item">
                      {formatTime(entry.check_out_time)}
                      {entry.date_diff > 0 && new Date(entry.attendance_date).toDateString() !== new Date(entry.out_date).toDateString() && ` (+${entry.date_diff})`}
                    </p>
                  </>
                )}
                <p className="q-catereport-item">
                  <div className="q-attributes-bottom-header viewTimesheet-AddBreak timesheet bg-[#ffffff]"
                  onClick={(e) => {
                    openModalBreak(employee.title,employee.id,entry.attendance_date,entry.out_date);
                    e.stopPropagation();
                  }}
                  >
                    <p>
                      Add Break<img src={AddIcon} alt="add-icon" />{" "}
                    </p>
                  </div>
                </p>
              </div>
                ))
              ) : (
                <div className="q-attributes-bottom-attriButes-single-attributes TimesheetRow ">
                <p className="q-catereport-item">-</p>
                <p className="q-catereport-item">-</p>
                <p className="q-catereport-item">-</p>
                <p className="q-catereport-item">-</p>
                <p className="q-catereport-item"></p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

  

    // if ( data.employee_id === "all") {
    //   const matchingEntries = employeeList.map(employee => {
    //     const ALLkey = `${employee.title}_${employee.id}`;
    //     return {
    //       employee,
    //       entries: timesheet[ALLkey] || []
    //     };
    //   });
    //   return matchingEntries.map(({ employee, entries }) => renderEmployeeData(employee, entries));
  
    // }


    if (data.employee_id === "all") {
      const timesheetKeys = Object.keys(timesheet).filter(key => key !== 'status');
      const prioritizedEmployees = timesheetKeys.map(key => {
        const [title, id] = key.split('_');
        return employeeList.find(employee => employee.id.toString() === id && employee.title === title);
      }).filter(Boolean);
  
      const otherEmployees = employeeList.filter(employee => !prioritizedEmployees.includes(employee));
      const allEmployees = [...prioritizedEmployees, ...otherEmployees];

      return allEmployees.map(employee => {
        const key = `${employee.title}_${employee.id}`;
        const timesheetEntries = timesheet[key] || [];
        return renderEmployeeData(employee, timesheetEntries);
      });
    }

    const selectedEmployee = employeeList.find((employee) => employee.id === data.employee_id);
    // console.log("jxdzbv",selectedEmployee?.title+'_'+selectedEmployee?.id)
    if (selectedEmployee) {
      const key = `${selectedEmployee.title}_${data.employee_id}`;
      const matchingEntries = timesheet[key] || [];
      return renderEmployeeData(selectedEmployee,matchingEntries);
    }
  };

  return <>
  {renderDataTable()}
  
        {/* Modal for Add Clock-in/ClocK-out start  */}
        <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="view-category-item-modal" style={myStyles}>
            <div className="q-add-categories-section-header text-[18px]" style={{ justifyContent:"space-between" ,fontFamily:"CircularSTDBook" }}>
              <span onClick={() => handleClose()}>
                <img
                  src={AddNewCategory}
                  alt="Timesheet"
                  className="w-6 h-6"
                />
                <span>{EmployeeName}</span>
              </span>
              <p className="viewTextBark">Clock-in/Clock-out</p>
            </div>

            <div className="view-category-item-modal-header">
              <div className="title_attributes_section " style={{margin: "1rem 1rem"}}>

                    <Grid container spacing={3}>
                      <Grid item md={6} xs={6}>
                          <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              className="date-provider"
                            >
                              <label htmlFor=" " className="pb-1">Select In Date*</label>
                              <DatePicker
                                onChange={(newDate) =>
                                  handleStartDateChange(newDate)
                                }
                                size="medium"
                                format={"DD-MM-YYYY"}
                                views={["year", "month", "day"]}
                                slotProps={{
                                  textField: { placeholder: "Select Date" },
                                }}
                                disableFuture
                                components={{
                                  OpenPickerIcon: () => (
                                    <img src={caleIcon} alt="calendar-icon" />
                                  ),
                                }}
                                sx={{ width: '100%' }}
                              />
                            </LocalizationProvider>
                            {dateStartError && (
                              <p className="error-message ">
                                {dateStartError}
                              </p>
                            )}
                      </Grid>

                      <Grid item md={6} xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <label htmlFor=" " className="pb-1">Clock In Time*</label>
                                <TimePicker
                                  name="clock_in"
                                  id="clock_in"
                                  slotProps={{
                                    textField: { placeholder: "Select Time" },
                                  }}
                                  onChange={(newTime) =>
                                    handleStartTimeChange(newTime)
                                  }
                                  components={{
                                    OpenPickerIcon: () => (
                                      <img src={TimeIcon} alt="time-icon" />
                                    ),
                                  }}
                                  sx={{ width: '100%' }}
                                />
                          </LocalizationProvider>

                          {dateStartTimeError && (
                                <p className="error-message ">
                                  {dateStartTimeError}
                                </p>
                              )}
                      </Grid>
                     
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item md={6} xs={6}>
                          <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              className="date-provider"
                            >
                              <label htmlFor=" " className="pb-1">Select Out Date*</label>
                              <DatePicker
                                onChange={(newDate) =>
                                  handleEndDateChange(newDate)
                                }
                                shouldDisableDate={(date) => {
                                  const start = addtimebreak.add_in_date;
                                  return date.format("YYYY-MM-DD") < start ;
                                }}
                                size="medium"
                                format={"DD-MM-YYYY"}
                                views={["year", "month", "day"]}
                                slotProps={{
                                  textField: { placeholder: "Select Date" },
                                }}
                                components={{
                                  OpenPickerIcon: () => (
                                    <img src={caleIcon} alt="calendar-icon" />
                                  ),
                                }}
                                sx={{ width: '100%' }}
                              />
                            </LocalizationProvider>
                            {dateEndError && (
                                <p className="error-message ">
                                  {dateEndError}
                                </p>
                              )}
                      </Grid>

                      <Grid item md={6} xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <label htmlFor=" " className="pb-1">Clock Out Time*</label>
                                <TimePicker
                                  name="break_in"
                                  id="break_in"
                                  slotProps={{
                                    textField: { placeholder: "Select Time" },
                                  }}
                                  onChange={(newTime) =>
                                    handleEndTimeChange(newTime)
                                  }
                                  components={{
                                    OpenPickerIcon: () => (
                                      <img src={TimeIcon} alt="time-icon" />
                                    ),
                                  }}
                                  sx={{ width: '100%' }}
                                />
                          </LocalizationProvider>
                          {dateEndTimeError && (
                                <p className="error-message ">
                                  {dateEndTimeError} 
                                </p>
                              )}
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                      {addTimesheetMsg && (
                          <p className="error-message " style={{margin: "14px"}}>
                            {addTimesheetMsg}
                          </p>
                      )}
                      </Grid>
                    </Grid>
                </div>
            </div>
            

            <div className="q-add-categories-section-middle-footer">
                  <button  className="quic-btn quic-btn-save" onClick={handleSave}>Add</button>
                  <button onClick={closeModal} className="quic-btn quic-btn-cancle">Cancel</button>
            </div>
          </Box>
        </Modal>
        {/* Modal for Add Clock-in/ClocK-out End  */}

        {/* Modal for Break In /Out Start  */}
        <Modal
        open={showModalBreak}
        onClose={handleCloseBreak}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
         >
          <Box className="view-category-item-modal" style={myStyles}>
            <div className="q-add-categories-section-header text-[18px]" 
            style={{ justifyContent:"space-between" ,fontFamily:"CircularSTDBook" }}>
              <span onClick={() => handleCloseBreak()}>
                <img
                  src={AddNewCategory}
                  alt="Timesheet"
                  className="w-6 h-6"
                />
                <span>{EmployeeName}</span>
              </span>
              <div className="viewTextBark">
              <span className="borderRight ">{modalDate} - {modalDateOUT ? formatDateBrake(modalDateOUT) : '-'}</span> <span className="pl-1"> Break-in/Break-out</span>
              </div>
            </div>

            <div className="view-category-item-modal-header" >
              <div className="title_attributes_section " style={{margin: "1rem 1.5rem"}}>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={6}>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <label  className="pb-1">Break In Time*</label>
                                <TimePicker
                                  name="break_in"
                                  id="break_in"
                                  slotProps={{
                                    textField: { placeholder: "Select Time" },
                                  }}
                                  onChange={(newTime) =>
                                    handleBreakStartTimeChange(newTime)
                                  }
                                  components={{
                                    OpenPickerIcon: () => (
                                      <img src={TimeIcon} alt="time-icon" />
                                    ),
                                  }}
                                  sx={{ width: '100%' }}
                                />
                          </LocalizationProvider>
                          {BreakInTimeError && (
                                <p className="error-message ">
                                  {BreakInTimeError} 
                                </p>
                          )}
                      </Grid>

                      <Grid item md={6} xs={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <label className="pb-1">Break Out Time*</label>
                                <TimePicker
                                  name="break_out"
                                  id="break_out"
                                  slotProps={{
                                    textField: { placeholder: "Select Time" },
                                  }}
                                  onChange={(newTime) =>
                                    handleBreakEndTimeChange(newTime)
                                  }
                                  components={{
                                    OpenPickerIcon: () => (
                                      <img src={TimeIcon} alt="time-icon" />
                                    ),
                                  }}
                                  sx={{ width: '100%' }}
                                />
                          </LocalizationProvider>
                          {BreakOutTimeError && (
                                <p className="error-message ">
                                  {BreakOutTimeError} 
                                </p>
                          )}
                      </Grid>

                      <Grid container spacing={3}>
                      <Grid item md={12} xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                      {addBreakMsg && (
                          <p className="error-message " style={{margin: "14px"}}>
                            {addBreakMsg}
                          </p>
                      )}
                      </Grid>
                    </Grid>
                     
                    </Grid>
                </div>
            </div>

            <div className="q-add-categories-section-middle-footer">
                  <button  className="quic-btn quic-btn-save" onClick={handleBreakSave}>Add</button>
                  <button onClick={closeModalBreak} className="quic-btn quic-btn-cancle">Cancel</button>
            </div>
          </Box>
        </Modal>

        {/* Modal for Break In /Out End */}

        {/* Modal for All View Break IN/Out Start  */}
        <Modal
        open={showModalViewBreak}
        onClose={closeModalViewBreak}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
         >
          <Box className="view-category-item-modal" style={myStyles}>
            <div className="q-add-categories-section-header text-[18px]" 
            style={{ justifyContent:"space-between" ,fontFamily:"CircularSTDBook" ,padding:"1rem 1.90rem" }}>
              <span onClick={() => closeModalViewBreak()}>
                <img
                  src={AddNewCategory}
                  alt="Timesheet"
                  className="w-6 h-6"
                />
                <span>{EmployeeName}</span>
              </span>
              <p className="pr-1" onClick={() => deleteAllBreakTimesheet(AllbreakDelete)}><img src={DeleteIcon} alt="delete-icon" className="cursor-pointer" /></p>
            </div>

            <div className="view-category-item-modal-header" >
              <div className="title_attributes_section viewbreak" style={{margin: "1rem 1.5rem"}}>
                 <span className="borderRight">Working Date: <span className="viewTextBark">{formatDate(EmployeeWorkDate)} - {formatDateBrake(EmployeeWorkDateOUT)}</span> </span>
                 <span className="borderRight">Clock In: <span className="viewTextBark">{EmployeeTimeIn}</span> </span>
                 <span className="pl-2">Clock Out: <span className="viewTextBark">{EmployeeTimeOut}</span> </span>
              </div>
              
                <div className="viewTaleBreak table__header"> 
                  <p>Break</p>
                  <p>Breaked In</p>
                  <p>Breaked Out</p>
                  <p></p>
                </div>
                  {breakDetails.length > 0 ? (
                    breakDetails.map((breakDetail, index) => {
                      const breakTimeIn = breakDetail.formatted_time.split(' to ')[0];
                      const breakTimeOut = breakDetail.formatted_time.split(' to ')[1];
                      const isLastRow = index === breakDetails.length - 1;
                      return (
                        <div className={`viewTaleBreak ${!isLastRow ? 'viewTableRow' : ''}`} key={index}>
                          <p>Break {index+1}</p>
                          <p>{breakTimeIn}</p>
                          <p>{breakTimeOut}</p>
                          <p  onClick={(e) => { deleteBreakTimesheet(AllbreakDelete);  e.stopPropagation();}}>
                            <img src={DeleteIcon} alt="delete-icon" className="cursor-pointer" />
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="viewTaleBreak ">
                      <p>No break details available.</p>
                    </div>
                  )}

            </div>

            <div className="q-add-categories-section-middle-footer">
                <button  className="quic-btn quic-btn-save mr-4"  onClick={closeModalViewBreak} >OK</button>
            </div>
          </Box>
        </Modal>
        {/* Modal for All View Break IN/Out End */}
  
  </>;
}

export default TimesheetListing