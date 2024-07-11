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
  handlefocus
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
          onKeyDown={handlefocus}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
              sx={{padding:"0"}}
                onClick={() => {
                  handleSearchButton && handleSearchButton();
                }}
              >
                <img src={SearchIcon} alt="" />
              </IconButton>
            </InputAdornment>
          }
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            paddingRight:"14px"
          }}
        />
      </FormControl>
    </>
  );
};

export default InputTextSearch;
