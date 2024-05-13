import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMenuOpen } from "../../Redux/features/NavBar/MenuSlice";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import Header from "./Header";
import LeftSide from "./LeftSide";
import React from "react";
import { useMediaQuery } from "@mui/material";

const Index = ({ visible }) => {
  const dispatch = useDispatch();
  const isTabletNav = useMediaQuery("(max-width:1024px)");
  const [isMenuOpen, setIsMenuOpen] = useState(!isTabletNav);
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(!isTabletNav);
    dispatch(setMenuOpen(!isTabletNav));
    if (!isTabletNav) {
    }
  }, [isTabletNav]);

  return (
    <>
      <div className="bg-[#F9F9F9] main-page-home-dashboard">
        <Header />

        <div>
          {visible === "order-summary" ? (
            ""
          ) : (
            // <SideMenu setIsMenuOpen={setIsMenuOpen} isTabletNav={isTabletNav} isMenuOpen={isMenuOpen} />
            <></>
          )}
          <div
            className="main-content"
            style={
              visible === "order-summary"
                ? {}
                : {
                    paddingLeft: !isTabletNav && isMenuOpenRedux ? "17rem" : "5rem",
                    paddingRight: "1rem",
                  }
            }
          >
            <Outlet />
            <LeftSide visible={visible} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
