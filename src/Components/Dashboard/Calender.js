import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
//import Box from '@mui/material/Box';


//import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
//import { Stack } from '@mui/material';


export default function Calendar() {
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






  const [selectedDateRange, setSelectedDateRange] = React.useState(null)

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    
  <div className='flex justify-between w-full'>
    <div className="relative">
              <div className="mb-2 text-[#818181]  Admin_std">Start Date</div>
              <div className="lg:w-full sm:w-full md:h-full mx-2">
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
                  className="border rounded px-3 py-2  mt-1 focus:outline-none focus:border-blue-500  Admin_std"
                  ref={startDateRef}
                />
                <span
                  className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={handleStartDateIconClick}
                >
                  {/* <FiCalendar className="text-black" /> */}
                </span>
              </div>
            </div>
            <div className="relative mt-4 sm:mt-0">
              <div className="mb-2 text-[#818181] Admin_std">End Date</div>
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
                className="border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500 Admin_std"
                ref={endDateRef}
              />
              <span
                className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleEndDateIconClick}
              >
                {/* <FiCalendar className="text-black " /> */}
              </span>
            </div>
            </div>
            <div className="q-add-categories-section-middle-footer">
       
        <button className="quic-btn quic-btn-cancle mr-2">Cancel</button>
        <button className="quic-btn quic-btn-save">Retrive</button>
      </div>
    </>
  );
}