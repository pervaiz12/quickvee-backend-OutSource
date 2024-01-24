import React from "react";
import { useState, useEffect } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png";
import { BiMenu, BiChevronDown } from "react-icons/bi";

import OnlineData from "../../Assests/Dashboard/store.svg";

import DownIcon from "../../Assests/Dashboard/Down.svg";
import UserIcon from "../../Assests/MultipleUserIcon/useractive.svg";

const AllUserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 left-0 p-0 right-0 z-50 bg-white transition-all duration-300 h-[60px] shadow-md border-b-4 border-black ${
          isSticky ? "border-yellow-500" : ""
        }`}
      >
        <div className="flex items-center px-4 mx-2 mt-3">
          <BiMenu
            className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out`}
            onClick={(e) => {
              setIsMenuOpen(!isMenuOpen);
            }}
          />
          <img src={Quick} alt="Logo" className="ml-6" />

          <div className="relative ml-auto">
         
            <div
              className="flex items-center ml-6 px-3 py-1 text-black lg:text-[20px] admin_medium cursor-pointer sm:text-[12px] md:text-[15px]"
              onClick={handleDropdownToggle}
            >
              <img src={UserIcon} alt="" className="w-6 h-6 mr-2" />
              Superadmin
              <img src={DownIcon} alt="" className="w-8 h-8 ml-2" />
              
            </div>

         
            {showDropdown && (
              <div className="dropdown-content w-full  mt-5">
                <div className="flex justify-items-start">
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  Store Setup
                </div>
                <div className="flex justify-items-start">
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  Need Help
                </div>
                <div className="flex justify-items-start">
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUserHeader;
