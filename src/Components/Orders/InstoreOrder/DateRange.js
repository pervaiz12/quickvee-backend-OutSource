import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";


const DateRange = ({onDateRangeChange}) => {
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
    
    console.log("Selected Start Date:", startDate);
    console.log("Selected End Date:", endDate);
    const dateRangeData = {
      startDate,
      endDate,
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
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
   
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
          <div className="q_datafilter_section">
            <div className="q_details_header">
              Date Range
            </div>

            <div className="datarange_days_order">
              {["Today", "Yesterday", "Last 7 Days", "Last 30 days"].map(
                (option) => (
                  <div
                    key={option}
                    className={`order_Details_days ${
                      isActive(option) ? "text-blue-500" : "text-gray-600"
                    }`}
                    // onClick={() => setActive(option) }
                    onClick={() => {  setActive(option);  setDatesBasedOnOption(option);  }}
                    
                  >
                    {isActive(option) && <div className="dot mr-2" />}
                    {option}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="q_daterange_details">
            {/* Start Date */}
            <div className="relative">
              <div className="q_date_range_start ml-2">Start Date</div>
              <div className="">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="q_input_details"
                  ref={startDateRef}
                />
                <span
                  className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={handleStartDateIconClick}
                >
                  <FiCalendar className="text-black" />
                </span>
              </div>
            </div>

            {/* End Date */}
            <div className="relative mt-4 sm:mt-0">
              <div className="q_date_range_start ml-6">End Date</div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="q_input_details ml-6"
                ref={endDateRef}
              />
              <span
                className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleEndDateIconClick}
              >
                <FiCalendar className="text-black " />
              </span>
            </div>
            <span className="search_btn ml-6">
              <button
                onClick={handleSearch}
                className="q-order-daterange-button"
              >
                Search
              </button>
            </span>

            {/* Search Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRange;
