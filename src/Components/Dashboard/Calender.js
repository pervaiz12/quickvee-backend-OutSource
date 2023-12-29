import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
//import Box from '@mui/material/Box';


//import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
//import { Stack } from '@mui/material';


export default function Calendar() {
  const [selectedDateRange, setSelectedDateRange] = React.useState(null)

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="p-8 border border-gray-300 rounded-md daterange_section">
        <DateRangePicker localeText={{ start: 'Start Date', end: 'End Date' }} />
      </Box>
    </LocalizationProvider> */}
    </>
  );
}