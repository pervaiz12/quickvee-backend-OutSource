import { Outlet } from "react-router-dom";
// import { SideMenu } from "./SideMenu";
import SideMenu from "./SideMenu";
import { useState } from "react";
import Header from "./Header";
import LeftSide from "./LeftSide";
import React from 'react'


const Index = ({visible}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
    <div className="bg-[#F9F9F9]">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
   
      <div>
        <SideMenu isMenuOpen={isMenuOpen}  />
        <div
          className="main-content"
          style={{ paddingLeft: isMenuOpen ? "16rem" : "6rem" }}
        >
         
          <Outlet />
          <LeftSide visible={visible} />
        </div>
      </div>
      </div>
    </>
  )
}

export default Index