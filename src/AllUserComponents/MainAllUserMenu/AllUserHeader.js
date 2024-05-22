import React from "react";
import { useState, useEffect } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png";
import { BiMenu, BiChevronDown } from "react-icons/bi";

import OnlineData from "../../Assests/Dashboard/store.svg";

import DownIcon from "../../Assests/Dashboard/Down.svg";
import UserIcon from "../../Assests/MultipleUserIcon/useractive.svg";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
import { setMenuOpen } from "../../Redux/features/NavBar/MenuSlice";
import { useNavigate } from "react-router-dom";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const isMenuOpenRedux = useSelector((state) => state.NavBarToggle.isMenuOpen);
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
  const handleLogout = () => {
    Cookies.remove("loginDetails");
    Cookies.remove("user_auth_record");
    localStorage.removeItem("AllStore");
    // Cookies.remove('token_data');
    navigate("/login");
  };

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
            <Grid item sx={{ marginRight: 2 }}>
              <BiMenu
                className={`text-black text-[30px] hover:text-yellow-500 active:text-yellow-700 transition duration-300 ease-in-out`}
                onClick={(e) => {
                  dispatch(setMenuOpen(!isMenuOpenRedux));
                }}
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
              className="flex items-center ml-6 px-3 py-1 text-black lg:text-[20px] admin_medium cursor-pointer sm:text-[12px] md:text-[15px]"
              onClick={handleDropdownToggle}
            >
              <img src={UserIcon} alt="" className="w-6 h-6 mr-2" />
              Superadmin
              <img src={DownIcon} alt="" className="w-8 h-8 ml-2" />
            </div>

            {showDropdown && (
              <div className="dropdown-content w-full ">
                <div className="flex justify-items-start items-center">
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />{" "}
                  <a href="/users/view/unapprove/">Store Setup</a>
                </div>
                <div className="flex justify-items-start items-center">
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  <a href="/users/view/unapprove/need-help">Need Help</a>
                </div>
                <div
                  className="flex justify-items-start items-center"
                  onClick={handleLogout}
                >
                  <img src={OnlineData} alt="" className="w-6 h-6 mr-2" />
                  Logout
                </div>
              </div>
            )}
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
