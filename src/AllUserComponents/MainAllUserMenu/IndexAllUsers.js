import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import AllUserHeader from "./AllUserHeader";
import AllUserMenu from "./AllUserMenu";
import LeftDetailsUsers from "./LeftDetailsUsers";
import { useMediaQuery } from "@mui/material";
import {
  setMenuOpen,
  setIsDropdownOpen,
} from "../../Redux/features/NavBar/MenuSlice";
import { useSelector, useDispatch } from "react-redux";
const IndexAllUsers = ({ visible }) => {
  const isTabletNav = useMediaQuery("(max-width:1024px)");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMenuOpen(!isTabletNav));
    if (!isTabletNav) {
    }
  }, [isTabletNav]);
  const onClickHandler = () => {
    isTabletNav &&
      dispatch(setMenuOpen(false)) 
      dispatch(setIsDropdownOpen(false));
  };
  return (
    <>
      <div className="bg-[#F9F9F9] main-page-home-dashboard">
        <AllUserHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div>
          {/* <AllUserMenu isMenuOpen={isMenuOpen}  /> */}
          <div
            className="main-content"
            style={{
              paddingLeft: !isTabletNav && isMenuOpenRedux ? "16.9rem" : "5rem",
              paddingRight:"1rem",
            }}
            onClick={() => onClickHandler()}
          >
            <Outlet />
            <LeftDetailsUsers visible={visible} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexAllUsers;
