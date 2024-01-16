import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useState } from "react";
import Header from "./Header";
import LeftSide from "./LeftSide";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  return (
    <>
      <div className="bg-[#F9F9F9]">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div>
          <SideMenu isMenuOpen={isMenuOpen} setIsDropdownOpen={setIsDropdownOpen} />
          <div
            className="main-content"
            style={{
              paddingLeft: isMenuOpen ? "16rem" : "6rem",
              // Adjust the condition based on your requirements
              // If you want to consider isDropdownOpen
               paddingLeft: isMenuOpen && isDropdownOpen ? "16rem" : "6rem",
            }}
          >
            <Outlet />
            <LeftSide />
          </div>
        </div>
      </div>
    </>
  );
};
