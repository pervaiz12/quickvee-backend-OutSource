import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMenuState from "../hooks/useMenuState";
import upArrow from "../Assests/Taxes/UpArrow.svg";

// Styled Button component
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  color: "#0A64F9",
  padding: "8px 7px 8px 16px",
  border: "0.2em solid #0A64F9", // Border color to match Tailwind's 'blue-800'
  borderRadius: "0.375rem", // Rounded-md in Tailwind
  width: "220px",
  display: "flex",
  height: "40px",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "#e5e7eb", // Hover bg color to match Tailwind's 'gray-200'
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "0.375rem", // Match the dropdown menu's rounded corners
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Custom shadow
    minWidth: "160px",
    width: "220px",
  },
  "& .MuiList-root": {
    paddingTop: 0, // Remove top padding
    paddingBottom: 8, // Optional: Keep or adjust bottom padding
  },
  "& .MuiMenuItem-root": {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a202c",
    padding: "8px 16px",

    "&:hover": {
      backgroundColor: "#f3f4f6", // Hover bg color to match Tailwind's 'gray-100'
    },
  },
}));

// Reusable Dropdown Component
const Dropdown = ({
  items,
  defaultSelectedItem,
  onSelect,
  buttonStyles,
  menuStyles,
}) => {
  const rotateClass = (open) => (open ? "-rotate-180" : "rotate-0");

  const { anchorEl, open, selectedOption, handleClick, handleClose } =
    useMenuState(defaultSelectedItem);
  const handleSelect = (option) => {
    handleClose(option);
    if (onSelect) {
      onSelect(option); // Call the onSelect prop function when an option is selected
    }
  };
  return (
    <div>
      <StyledButton onClick={handleClick} style={buttonStyles}>
        <div className="mr-5">
          <p className="font-[600] normal-case">Display Options</p>
        </div>
        <div className="">
          <img
            className={`transition-transform duration-500 ${rotateClass(open)}`}
            src={upArrow}
          />
        </div>
      </StyledButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={menuStyles}
      >
        {items?.map((item, index) => (
          <MenuItem key={index} onClick={() => handleSelect(item)}>
            <p
              className={`${
                selectedOption === item ? "font-bold text-[#0A64F9]" : ""
              }`}
            >
              {item}
            </p>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Dropdown;
