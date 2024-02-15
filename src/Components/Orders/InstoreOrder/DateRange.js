import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const DateRange = ({ onDateRangeChange }) => {
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
        last7Days.setDate(today.getDate() - 7);
        setStartDate(last7Days);
        setEndDate(today);
        break;
      case "Last 30 days":
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );

        setStartDate(firstDayOfMonth);
        setEndDate(today);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setDatesBasedOnOption(activeOption);
  }, [activeOption]);



  return (
    <>
      <div className="q_dateRange_header">
        <div className="q-datarange-bottom-detail-section">
          {/* Date Range Section */}
          <div className="q_datafilter_section">
            <div className="q_details_header">Date Range</div>

            <div className="datarange_days_order">
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
                    {isActive(option) && <div className="dot mr-2" />}
                    {option}
                  </div>
                )
              )}
            </div>
          </div>
          <div>
      {/* Your other content goes here */}
      
        <div className="q_date_range_filter_details">
          <select
            className="border-2 border-customColor rounded px-4 py-2 mr-7 bg-white text-blue-500 text-[16px] Admin_std"
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
        </div>
     </div>

          {/* Date Picker Section */}
          <div className="q_daterange_details flex flex-col md:flex-row">
  {/* Start Date */}
  <div className="relative mb-4 md:mb-0 md:mr-4">
    <div className="q_date_range_start">Start Date</div>
    <div className="flex items-center">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="MMMM d, yyyy"
        className="q_input_details"
        ref={startDateRef}
        showPopperArrow={false}
      />
      <span
        className="absolute right-3 top-14  transform -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={handleStartDateIconClick}
      >
        <FiCalendar className="text-black" />
      </span>
    </div>
  </div>

  {/* End Date */}
  <div className="relative">
    <div className="q_date_range_start ">End Date</div>
    <div className="flex items-center">

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="MMMM d, yyyy"
        className="q_input_details ml-0 "
        ref={endDateRef}
        showPopperArrow={false}
      />
      <span
        className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={handleEndDateIconClick}
      >
        <FiCalendar className="text-black " />
      </span>
    </div>
  </div>

  {/* Search Button */}
  <span className="search_btn mt-4 md:mt-0 md:ml-6">
    <button
      onClick={handleSearch}
      className="save_btn"
    >
      Search
    </button>
  </span>
</div>

        </div>
      </div>
    </>
  );
};

export default DateRange;