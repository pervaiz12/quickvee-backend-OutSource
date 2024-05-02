import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

import { IconButton, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "../Assests/Filter/Search.svg";
const InputTextSearch = ({ placeholder, value,handleChange,handleSearchButton }) => {
  return (
    <>
      <FormControl fullWidth>
        <OutlinedInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
              onClick={handleSearchButton}
              >
                <img src={SearchIcon} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default InputTextSearch;
