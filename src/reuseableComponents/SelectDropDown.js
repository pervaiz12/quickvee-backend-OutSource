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
}) => {
  return (
    <>
      <FormControl fullWidth>
        <ThemeProvider theme={theme}>
          <Select
            size="small"
            value={selectedOption}
            displayEmpty
            defaultValue={listItem[0]}
          >
            {heading && (
              <MenuItem
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
                  key={index}
                  onClick={(e) => {
                    onClickHandler(item, dropdownFor);
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
