import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchLabel({ checked, onChangeFun }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChangeFun}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#0A64F9",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#0A64F9",
            },
          }}
        />
      }
    />
  );
}
