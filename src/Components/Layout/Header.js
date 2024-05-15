// import * as React from "react";
import { useState, useEffect } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png";
import { BiMenu, BiChevronDown } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import DownlIcon from "../../Assests/Dashboard/download.svg";
import OnlineData from "../../Assests/Dashboard/online.svg";
import SynkData from "../../Assests/Dashboard/sync.svg";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import UserLogo from "../../Assests/Dashboard/UserLogo.svg";
import { setMenuOpen } from "../../Redux/features/NavBar/MenuSlice";
import Paper from '@mui/material/Paper';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";
import { setIsDropdownOpen } from "../../Redux/features/NavBar/MenuSlice";
export default function Header() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const [isSideBar,setIsSideBar] = useState(false);
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);
  const isDropdownOpen = useSelector((state) => state.NavBarToggle.isDropdownOpen);
  const [loginType, setLoginType] = useState("admin");
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    if (currentUrl.split('/')[1] === 'store-reporting') {
      setIsSideBar(true);
    } else {
      setIsSideBar(false);
    }
  },[currentUrl]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`q_header_section sticky bg-white  border-b-4 border-black ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        <div className="flex items-center px-4 mx-2">
          {!isSideBar && (<>
            <BiMenu
            className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out`}
            onClick={(e) => {
              // setIsMenuOpen(!isMenuOpen);
              dispatch(setMenuOpen(!isMenuOpenRedux));
              dispatch(setIsDropdownOpen(false));
            }}
          />
          </>)}
         
          <a href="/">
            <img src={Quick} alt="Logo" className="ml-6" />
          </a>
          {loginType === "admin" && (
            <>
              <div className="relative">
                {/* Button to toggle dropdown */}
                <div
                  className="flex items-center ml-6 px-3 py-1 text-black header-menu  admin_medium cursor-pointer sm:text-[12px] md:text-[15px]"
                  onClick={handleDropdownToggle}
                >
                  Vape Store
                  <img src={DownIcon} alt="" className="w-8 h-10 ml-2" />
                </div>

                {/* Dropdown content */}
                {showDropdown && (
                  <div className="absolute mt-2 bg-white border rounded shadow-lg">
                    {/* Your dropdown content goes here */}
                    <div className="p-4">
                      {/* Dropdown items */}
                      {/* <div>Category 1</div>
            <div>Category 2</div>
            <div>Category 3</div> */}
                      {/* Add more items as needed */}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center header-menu text-black ml-auto sm:text-xs md:text-sm">
                {/* Download App section */}
                <div className=" flex items-center me-3">
                  <img src={DownlIcon} alt="icon" className="" />
                  <p className="cursor-pointer ml-1 admin_medium">
                    Download App
                  </p>
                </div>

                {/* Online Store and Sync Data section */}
                <div className=" flex items-center me-3">
                  <img src={OnlineData} alt="icon" className="ml-1" />
                  <p className="cursor-pointer ml-1 admin_medium">
                    Online Store
                  </p>
                </div>
                <div className=" flex items-center me-3">
                  <img src={SynkData} alt="icon" className="ml-1" />
                  <p className="cursor-pointer ml-1 admin_medium">Sync Data</p>
                </div>
                <div className="flex mx-0 select-none cursor-pointer">
                  <div className="flex  items-center"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src={UserLogo}
                      alt="icon"
                      className="mx-2"
                    />
                    <p className="admin_medium">Admin Name</p> 
                    <img src={DownIcon} alt="" />
                  </div>
                
                  <Menu
                   PaperProps={{  
                    style: {  
                      width: 150, 
                      marginTop: 20 
                    }, 
                  }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                
                  
                </div>
                {/* Vertical line separator */}
                <div className="border-t-3 border-b-2 border-black bg-black mb-16"></div>
              </div>
            </>
          )}
          {loginType === "manager" && (
            <>
              <div className="flex justify-end w-full my-5 lg:text-[18px]">
                <div className="flex mx-0 select-none cursor-pointer">
                  <div className="flex items-center header-menu"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      style={{ height: "24px", width: "24px" }}
                      src={UserLogo}
                      alt="icon"
                      className="mx-2"
                    />
                   <p className="admin_medium text-center">Admin Name</p> 
                  
                  </div>
                
                  <Menu
                   PaperProps={{  
                    style: {  
                      width: 150, 
                      marginTop: 20 
                    }, 
                  }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                   
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                
                  
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
