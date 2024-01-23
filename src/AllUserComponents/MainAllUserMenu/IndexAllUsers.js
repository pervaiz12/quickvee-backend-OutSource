import React from 'react'

import { Outlet } from "react-router-dom";
import { useState } from "react";
import AllUserHeader from './AllUserHeader';
import AllUserMenu from './AllUserMenu';
import LeftDetailsUsers from './LeftDetailsUsers';

const IndexAllUsers = ({visible}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
<>
    <div className="bg-[#F9F9F9]">
      <AllUserHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <div>
        <AllUserMenu isMenuOpen={isMenuOpen}  />
        <div
          className="main-content"
          style={{ paddingLeft: isMenuOpen ? "16rem" : "6rem" }}
        >
       
          <Outlet />
          <LeftDetailsUsers visible={visible} />
        </div>
      </div>
      </div>
    </>
  )
}

export default IndexAllUsers
