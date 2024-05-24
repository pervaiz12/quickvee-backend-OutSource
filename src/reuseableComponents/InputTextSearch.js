import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "../Assests/Filter/Search.svg";
const InputTextSearch = ({
  placeholder,
  value,
  handleChange,
  handleSearchButton,
}) => {
  return (
    <>
      <FormControl fullWidth>
        <OutlinedInput
          size="small"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  handleSearchButton && handleSearchButton();
                }}
              >
                <img src={SearchIcon} alt="" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default InputTextSearch;
