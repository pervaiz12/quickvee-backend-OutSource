import React from "react";
import { useState, useEffect } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png";
import { BiMenu, BiChevronDown } from "react-icons/bi";

import OnlineData from "../../Assests/Dashboard/store.svg";
import logoutLogo from "../../Assests/Dashboard/logout.svg";
import needHelpLogo from "../../Assests/Dashboard/need_help.svg";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import UserIcon from "../../Assests/MultipleUserIcon/useractive.svg";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import {
  setMenuOpen,
  setIsDropdownOpen,
  setIsStoreActive,
} from "../../Redux/features/NavBar/MenuSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  getAuthSessionRecord,
  handleGetStoreRecord,
  getAuthInvalidMessage,
  getUserRecordData,
  getUserDashboardRecord,
} from "../../Redux/features/Authentication/loginSlice";
import { Grid } from "@mui/material";
const AllUserHeader = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // ================ handle dropdown menu =============================
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownToggle = () => {
    dispatch(setMenuOpen(!isMenuOpenRedux));
    dispatch(setIsDropdownOpen(!isDropdownOpen));
  };

  // ================ handle dropdown menu end =============================
  const dispatch = useDispatch();
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);
  const isDropdownOpen = useSelector(
    (state) => state.NavBarToggle.isDropdownOpen
  );
  let AuthFinalLogin =
    Cookies.get("loginDetails") !== undefined
      ? Cookies.get("loginDetails")
      : [];
  let LoginGetDashBoard =
    Cookies.get("token_data") !== undefined ? Cookies.get("token_data") : [];
  // =======================================================================
  let UserLoginDataStringFy =
    Cookies.get("user_auth_record") !== undefined
      ? Cookies.get("user_auth_record")
      : [];

  let UserLoginRecord = useSelector(
    (state) => state?.loginAuthentication?.getUserLoginRecord
  );
  const getUserLoginAuth = atob(UserLoginRecord);
  const GetSessionLogin =
    getUserLoginAuth !== "" ? JSON.parse(getUserLoginAuth) : [];
  // ==========================
  // useEffect for all when update data in coockie-----------------

  //AuthFinalLogin
  useEffect(() => {
    if (AuthFinalLogin !== "") {
      dispatch(getAuthSessionRecord(AuthFinalLogin));
    }
  }, [AuthFinalLogin]);

  useEffect(() => {
    dispatch(getUserDashboardRecord(LoginGetDashBoard));
  }, [LoginGetDashBoard]);
  useEffect(() => {
    dispatch(getUserRecordData(UserLoginDataStringFy));
  }, [UserLoginDataStringFy]);

  // useEffect for all when update data in coockie--------------
  // ==========================
  const navigate = useNavigate();

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
  const handleLogout = () => {
    Cookies.remove("loginDetails");
    Cookies.remove("user_auth_record");
    localStorage.removeItem("AllStore");
    Cookies.remove("token_data");
    dispatch(getAuthInvalidMessage(""));
    navigate("/login");
    dispatch(setIsStoreActive(false));

    // handleClose()
  };

  const handleNavigateToNeedHelp = () => [
    // navigate("/users/view/unapprove/need-help"),
    navigate("/need-help"),
  ];

  return (
    <>
      <Grid
        sx={{ paddingX: 1 }}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={` q_header_section sticky top-0 left-0 p-0 right-0 z-50 bg-white transition-all duration-300 h-[60px] shadow-md border-b-4 border-black ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        <Grid item>
          <Grid container>
            <Grid item sx={{ ml: 1, mr: 2 }}>
              <BiMenu
                className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out cursor-pointer`}
                onClick={handleDropdownToggle}
              />
            </Grid>
            <Grid item>
              <img src={Quick} alt="Logo" className="" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {" "}
          <div className="relative ml-auto">
            <div
              className="flex items-center ml-6 select-none px-3 py-1 text-black lg:text-[20px] admin_medium cursor-pointer sm:text-[12px] md:text-[15px]"
              // onClick={handleDropdownToggle}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img src={UserIcon} alt="" className="w-6 h-6 mr-2" />
              Superadmin
              <img src={DownIcon} alt="" className="w-8 h-8 ml-2" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                style: {
                  width: 200,
                  marginTop: 5,
                },
              }}
            >
              {/* <MenuItem onClick={handleClose}>
                <div
                  className="flex justify-items-start items-center"
                  onClick={handleNavigateToNeedHelp}
                >
                  <img src={needHelpLogo} alt="" className="w-6 h-6 mr-2" />
                  <p>Need Help</p>
                </div>
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <div className="flex justify-items-start items-center">
                  <img src={logoutLogo} alt="" className="w-6 h-6 mr-2" />
                  Logout
                </div>{" "}
              </MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>
      {/* <div
        className={` q_header_section sticky top-0 left-0 p-0 right-0 z-50 bg-white transition-all duration-300 h-[60px] shadow-md border-b-4 border-black ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        <div className="flex items-center px-4 mx-2">
          <BiMenu
            className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out`}
            onClick={(e) => {
              dispatch(setMenuOpen(!isMenuOpenRedux));
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
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />{" "}
                  <a href="/users/view/unapprove/">Store Setup</a>
                </div>
                <div className="flex justify-items-start">
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  <a href="/users/view/unapprove/need-help">Need Help</a>
                </div>
                <div
                  className="flex justify-items-start"
                  onClick={handleLogout}
                >
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AllUserHeader;
