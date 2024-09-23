import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, TextField } from "@mui/material";

export default function DatePickerSelect(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth components={["DatePicker"]}>
        <DatePicker
          minDate={props.minDate}
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          format={props.format}
          className={props.className}
          sx={{
            ".MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#0000003b", // Removes the red error border
              },
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
}
