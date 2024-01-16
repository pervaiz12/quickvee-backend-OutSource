import { Outlet } from "react-router-dom";
// import { SideMenu } from "./SideMenu";
import SideMenu from "./SideMenu";
import { useState } from "react";
import Header from "./Header";
import LeftSide from "./LeftSide";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // const [isDropdownOpen , setIsDropdownOpen] =  useState(true);

  return (
    <>
    <div className="bg-[#F9F9F9]">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* <Header isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} /> */}
      <div>
        <SideMenu isMenuOpen={isMenuOpen}  />
        <div
          className="main-content"
          style={{ paddingLeft: isMenuOpen ? "16rem" : "6rem" }}
        >
          {/* <SideMenu isDropdownOpen={isDropdownOpen} />
          <div className="main-content"
          style={{paddingLeft:isDropdownOpen ? "16rem" : "6rem" }} 
          >
            </div> */}
          <Outlet />
          <LeftSide />
        </div>
      </div>
      </div>
    </>
  );
};
