import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
// import CalendIcon from "../../../Assests/Filter/Calender.svg";
import CalendIcon from "../Assests/Filter/Calender.svg";
import { padding } from "@mui/system";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
const DateRangeComponent = ({ onDateRangeChange, selectedDateRange }) => {
  const isDesktopWtdth = useMediaQuery("(max-width:710px)");
  // console.log("isDesktopWtdth : ", isDesktopWtdth);
  const today = dayjs();
  const [isTablet, setIsTablet] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const startDateRef = React.useRef(null);
  const endDateRef = React.useRef(null);

  const handleStartDateIconClick = () => {
    startDateRef.current.setOpen(true);
  };

  const handleEndDateIconClick = () => {
    endDateRef.current.setOpen(true);
  };

  const handleSearch = () => {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const dateRangeData = {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    onDateRangeChange(dateRangeData);
  };

  const [activeOption, setActiveOption] = useState("Today");

  const setActive = (option) => {
    setActiveOption(option);
  };

  const isActive = (option) => {
    return option === activeOption;
  };

  const setDatesBasedOnOption = (option) => {
    const today = new Date();
    const dayBeforeDay = new Date();
    switch (option) {
      case "Today":
        setStartDate(today);
        setEndDate(today);
        break;
      case "Yesterday":
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
        break;
      case "Last 7 Days":
        const last7Days = new Date();

        dayBeforeDay.setDate(today.getDate() - 1);
        last7Days.setDate(today.getDate() - 7);
        setStartDate(last7Days);
        setEndDate(dayBeforeDay);
        break;
      case "Last 30 days":
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        dayBeforeDay.setDate(today.getDate() - 1);
        setStartDate(thirtyDaysAgo);
        setEndDate(dayBeforeDay);
        break;
      default:
        break;
    }
  };
  // useEffect(() => {
  //   // console.log("inside date range selectedDateRange", selectedDateRange);
  //   let count = 0;
  //   if (selectedDateRange && selectedDateRange && count <= 0) {
  //     // console.log("inside date range selectedDateRange", selectedDateRange);
  //     setStartDate(new Date(selectedDateRange.start_date));
  //     setEndDate(new Date(selectedDateRange.end_date));
  //     // onDateRangeChange({start_date:selectedDateRange.start_date,end_date:selectedDateRange.end_date});
  //     count++;
  //   }
  // }, [selectedDateRange]);
  // console.log("inside date range selectedDateRange", selectedDateRange);
  useEffect(() => {
    handleSearch();

    setDatesBasedOnOption(activeOption);
  }, [activeOption]);
  return (
    <>
      <Grid container className="q-datarange-bottom-detail-section p-5">
        <Grid container justifyContent="space-between">
          <Grid item>
            <div className="mt_card_header q_dashbaord_netsales">
              <h1 className="">Date Range</h1>
            </div>
          </Grid>
          {!isDesktopWtdth ? (
            <>
              <Grid item className="datarange_days_order px-6">
                {["Today", "Yesterday", "Last 7 Days", "Last 30 days"].map(
                  (option) => (
                    <div
                      key={option}
                      className={`order_Details_days ${
                        isActive(option) ? "text-blue-500" : "text-gray-600"
                      }`}
                      onClick={() => {
                        setActive(option);
                        setDatesBasedOnOption(option);
                      }}
                    >
                      {isActive(option) && <div className="dot mr-1" />}
                      {option}
                    </div>
                  )
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid item className="pt-4">
                <select
                  className="border-2 p-2 border-customColor rounded bg-white text-blue-500 text-[16px] "
                  onChange={(e) => {
                    const selectedOption = e.target.value;
                    setActive(selectedOption);
                    setDatesBasedOnOption(selectedOption);
                  }}
                >
                  {["Today", "Yesterday", "Last 7 Days", "Last 30 days"].map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                        className={
                          isActive(option) ? "text-blue-500" : "text-gray-600"
                        }
                      >
                        {option}
                      </option>
                    )
                  )}
                </select>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container spacing={2} className="py-5">
          <Grid item xs={12} sm={6} md={4}>
            <div className="q_date_range_start date-picker-font">
              Start Date
            </div>
            <div className="relative">
              <DatePicker
                sx={{
                  fontFamily: "CircularSTDBook",
                  "& .react-datepicker__input-container input": {
                    "&:focus": {
                      borderColor: "black",
                      outline: "none",
                    },
                  },
                  "& .react-datepicker": {
                    fontFamily: "CircularSTDBook",
                    border: "1px solid black",
                  },
                }}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={endDate}
                dateFormat="MMMM d, yyyy"
                className="q_input_details"
                ref={startDateRef}
                showPopperArrow={false}
              />
              <span
                className="q_cal_daterange"
                onClick={handleStartDateIconClick}
              >
                <img src={CalendIcon} alt="" className="w-6 h-6" />
              </span>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className="q_date_range_start ">End Date</div>
            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()} // Set maxDate to today's date
                dateFormat="MMMM d, yyyy"
                className="q_input_details ml-0"
                ref={endDateRef}
                showPopperArrow={false}
                defaultValue={today}
              />
              <span
                className="q_cal_daterange"
                onClick={handleEndDateIconClick}
              >
                <img src={CalendIcon} alt="" className="w-6 h-6" />
              </span>
            </div>
          </Grid>
          <Grid item alignSelf={"center"} xs={12} sm={6} md={4}>
            <div className="pt-4">
              <button onClick={handleSearch} className="save_btn">
                Get Report
              </button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DateRangeComponent;
