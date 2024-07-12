import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeProvider } from "@mui/material/styles";
import { InputLabel } from "@mui/material";
const theme = createTheme({
  components: {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon,
      },
      styleOverrides: {
        root: {
          ".MuiSvgIcon-root": {
            color: "black",
          },
        },
      },
    },
  },
});
const SelectDropDown = ({
  heading,
  listItem = false,
  onClickHandler,
  selectedOption,
  dropdownFor,
  title,
  default_title,
  sx,
  name,
  disabled = false,
}) => {
  return (
    <>
      <FormControl sx={{ ...sx }} disabled={disabled} fullWidth>
        <ThemeProvider theme={theme}>
          <Select
            sx={{
              fontFamily: "CircularSTDBook",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            }}
            size="small"
            value={selectedOption}
            displayEmpty
            defaultValue={listItem[0]}
            renderValue={default_title && ((value) => default_title)}
            // sx={{fontFamily:"inherit"}}
            MenuProps={{
              PaperProps: {
                sx: {
                  "&::-webkit-scrollbar": {
                    width: "2px",
                    height: "auto",
                  },
                },
              },
            }}
          >
            {heading && (
              <MenuItem
                sx={{ fontFamily: "CircularSTDBook" }}
                onClick={(e) => {
                  onClickHandler(heading, dropdownFor);
                }}
                value={heading}
              >
                {heading}
              </MenuItem>
            )}

            {listItem &&
              listItem.length > 0 &&
              listItem?.map((item, index) => (
                <MenuItem
                  sx={{ fontFamily: "CircularSTDBook" }}
                  key={index}
                  onClick={(e) => {
                    onClickHandler(item, dropdownFor, name);
                  }}
                  value={item[title]}
                >
                  {item[title]}
                </MenuItem>
              ))}
          </Select>
        </ThemeProvider>
      </FormControl>
    </>
  );
};

export default SelectDropDown;
